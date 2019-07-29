#!/usr/bin/env node

'use strict';
const Parser = require('../.lib/parser.js');

/**
 * Recognizes the accesses to the platform Web of Science
 * @param  {Object} parsedUrl an object representing the URL to analyze
 *                            main attributes: pathname, query, hostname
 * @param  {Object} ec        an object representing the EC whose URL is being analyzed
 * @return {Object} the result
 */
module.exports = new Parser(function analyseEC(parsedUrl, ec) {
  let result = {};
  let path   = parsedUrl.pathname;
  let param  = parsedUrl.query || {};

  let match;

  if ((match = /^\/([a-z_]+)\.do$/i.exec(path)) !== null) {
    // /UA_GeneralSearch_input.do?product=UA&search_mode=GeneralSearch
    // /Search.do?product=UA&search_mode=GeneralSearch&prID=dcfade3d-550a-4076-92a6-bd6708e2c64c
    // /full_record.do?product=UA&search_mode=GeneralSearch&qid=14&page=1&doc=2
    // /InterService.do?product=WOS&toPID=WOS&action=AllCitationService&isLinks=yes&highlighted_tab=WOS&last_prod=WOS&fromPID=UA&search_mode=CitedRefList
    // /CitationReport.do?product=WOS&search_mode=CitationReport&SID=3B7nnGH8MSgIpEdYq5j&page=1&cr_pqid=3&viewType=summary&colName=WOS

    let productId = Array.isArray(param.product) ? param.product[0] : param.product;

    switch (match[1]) {
    case 'Search':
    case 'InterService' :
      result.rtype = 'TOC';
      result.mime  = 'HTML';
      if (productId) {
        result.db_id = productId;
      }
      break;
    case 'full_record' :
      result.rtype = 'REF';
      result.mime  = 'HTML';
      if (productId) {
        result.db_id = productId;
      }
      break;
    case 'CitationReport' :
      result.rtype = 'ANALYSIS';
      result.mime  = 'MISC';
      if (productId) {
        result.db_id = productId;
      }
      break;
    }

    if (/^([a-z]+)_GeneralSearch_input/i.test(match[1])) {
      result.rtype = 'SEARCH';
      result.mime  = 'HTML';

      if (productId) {
        result.db_id = productId;
      }
    }

  } else if ((match = /^\/([a-zA-z_]*)\.action$/i.exec(path)) !== null) {
    // /JCRJournalHomeAction.action?
    // https://jcr-incites-thomsonreuters-com.inee.bib.cnrs.fr/JCRJournalProfileAction.action?
    // https://esi-incites-thomsonreuters-com.inee.bib.cnrs.fr/IndicatorsAction.action?
    // https://esi-incites-thomsonreuters-com.inee.bib.cnrs.fr/DocumentsAction.action
    // https://jcr-clarivate-com.insu.bib.cnrs.fr/JCRMasterSearchAction.action?pg=SEARCH&searchString=nature

    switch (match[1]) {
    case 'JCRJournalHomeAction':
      result.rtype = 'TOC';
      result.mime  = 'HTML';
      break;
    case 'JCRJournalProfileAction' :
      result.rtype = 'TABLE';
      result.mime  = 'HTML';

      if (param.journalTitle) {
        result.publication_title = param.journalTitle;
      }
      if (param.journal) {
        result.title_id = param.journal;
        result.unitid   = `impact/${param.journal}/${param.year}`;
      }
      break;
    case 'JCRMasterSearchAction':
      result.rtype = 'SEARCH';
      result.mime  = 'HTML';
      if (param.searchString) {
        result.unitid  = param.searchString;
      }
      break;
    case 'IndicatorsAction' :
      result.rtype = 'MAP';
      result.mime  = 'MISC';
      break;
    case 'DocumentsAction' :
      result.rtype = 'GRAPH';
      result.mime  = 'MISC';
      break;
    default:
      return {};
    }
  } else if ((match = /^\/([a-z]{2,3})\/analyze\.do$/i.exec(path)) !== null) {
    // /RA/analyze.do
    result.rtype = 'ANALYSIS';
    result.mime  = 'MISC';
  } else if ((match = /^\/jif\/home/i.exec(path)) !== null) {
    // /jif/home/?journal=NATURE&editions=SCIE&year=2017
    result.rtype = 'ANALYSIS';
    result.mime  = 'HTML';
    if (param.journal) {
      result.unitid  = param.journal;
    }
    if (param.year) {
      result.publication_date  = param.year;
    }
  }

  return result;
});
