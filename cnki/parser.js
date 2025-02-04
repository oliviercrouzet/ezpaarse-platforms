#!/usr/bin/env node

'use strict';
const Parser = require('../.lib/parser.js');

/**
 * Recognizes the accesses to the platform cnki
 * @param  {Object} parsedUrl an object representing the URL to analyze
 *                            main attributes: pathname, query, hostname
 * @param  {Object} ec        an object representing the EC whose URL is being analyzed
 * @return {Object} the result
 */
module.exports = new Parser(function analyseEC(parsedUrl, ec) {
  let result = {};
  let path   = parsedUrl.pathname;
  // uncomment this line if you need parameters
  let param = parsedUrl.query || {};

  // use console.error for debuging
  // console.error(parsedUrl);

  if (/^\/cjfdsearch\/pdfdownloadnew\.asp$/i.test(path)) {
    // http://pdf.tmp.oversea.d.cnki.net.prext.num.bulac.fr/cjfdsearch/pdfdownloadnew.asp?encode=en&zt=A002&filename=UMFl2Y5MjbZJXe1JnQjdGczpkY2YWaFdVbMV1MvNHVSNEc0l3anlDTnRHaFhXaYV2T4ADcqlVRuNnUKZTY2QmQx0EM6VTUEFXb4cmRpx2aIZ0cK1Uaj9iTG9SU3Y3QTdVNDtmQXxUZDJ1V=0TT6ZVOvl3NOtCNNJmdyJkbH1UUh9yZqJnW0MWTrpFThhWQLl1bVhETXZVcrIjW2UFaxA3Vm9mSyYkV2E3TpdzMKp1Lzh1ayF1LHdEMDRDTy92TINDc4s2RWhHbFJjdVh3ZFl0UiNzQFN&doi=CNKI:SUN:KJGL.0.2017-07-015&filetitle=%e5%9f%ba%e4%ba%8e%e5%b1%82%e6%ac%a1%e5%88%86%e6%9e%90_%e6%a8%a1%e7%b3%8a%e7%bb%bc%e5%90%88%e8%af%84%e4%bb%b7%e7%9a%84%e5%8c%97%e4%ba%ac%e5%b8%82%e6%96%b0%e8%83%bd%e6%ba%90%e4%ba%a7%e4%b8%9a%e7%ab%9e%e4%ba%89%e5%8a%9b%e7%a0%94%e7%a9%b6&p=cjfq&cflag=&u=WEEvREcwSlJHSldRa1Fhb09jMjQxRGlXbmtYWWdSQ0ZBVEs5dDFHSjlnWT0%3d%249A4hF_YAuvQ5obgVAqNKPCYcEjKensW4ggI8Fm4gTkoUKaID8j8gFw!!&pager=100-104
    result.rtype    = 'ARTICLE';
    result.mime     = 'PDF';
    result.unitid   = param.doi;
    result.doi      = param.doi;
  } else if (/^\/kfdoc\/down\.aspx$/i.test(path)) {
    //https://pdf-oversea.d.cnki.net/kfdoc/down.aspx?uid=WEEvREcwSlJHSldSdmVqM1BLYmtGYWpNVVh4eE1TMWQ1bTd6Mm1Od0d6bz0=$9A4hF_YAuvQ5obgVAqNKPCYcEjKensW4IQMovwHtwkF4VYPoHbKxJw!!&fn=Q0FQSl9QVUIucWJreDIwMjIwMzE0MDA0&title=The%20Construction%20and%20Operation%20Mechanism%20of%20Open%20Government%20Data%20Sharing%20Platform%20Based%20on%20Blockchain%20Technology&dbcode=CAPJ&rescode=CAPJ&db=capjday&dflag=pdfdown&cflag=&pages=&lang=en&t=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJhcHBpZCI6IjgwNzA5IiwidGltZXN0YW1wIjoxNjUwNDg1NDg1LCJub25jZSI6Imk2TVBBc0ltVGYifQ.x82TXzeXHuFYBf1cRjorXggQ63_54bLWE7oSjAK9byY&zt=G110;I138&sid=%e4%b8%ad%e5%bf%83%e7%bd%91%e7%ab%99&filetitle=The%20Construction%20and%20Operation%20Mechanism%20of%20Open%20Government%20Data%20Sharing%20Platform%20Based%20on%20Blockchain%20Technology
    result.rtype    = 'ARTICLE';
    result.mime     = 'PDF';
    result.title_id = param.title;
    result.db_id    = param.dbcode;
    result.unitid   = param.title;
  } else if (/^\/cjfdsearch\/getpdfdownload\.asp$/i.test(path)) {
    // http://pdf.tmp.oversea.d.cnki.net.prext.num.bulac.fr/cjfdsearch/getpdfdownload.asp?display=&encode=en&zt=G110&m=&filename=14mcRFWMyMUO0l0NitUThZUTvZUQ4xEdWRTc3MFa3QzbrsiWvZ3TmJ1Q5EWNx12aOR2SoNDUxFHMKZ3NaZTUStEbmlEaYFURmF1bslFMId3YvoHZ2EUe1o0YHtUc65GURdkc5cnT3BHbrNVdyMWe1ZmNS5kb5AzVEhFUyNDVEZWbt9CNhlDVzM1NC9ycC9EWM9UTyJ1RYlnMSNDc0Azc4kTUphESzMVTYtyaNpUY0oXbiRGTUhVSsV3cCpFW6BldH9WMKJlaqpFRwIUYWNjN1JHNxoUUVdEW&pager=&doi=CNKI:CDMD:1.1015.718562&nettype=cnet&tnm=&u=WEEvREcwSlJHSldRa1Fhb09jMjQxRGlXbmtYWWdSQ0ZBVEs5dDFHSjlnWT0=$9A4hF_YAuvQ5obgVAqNKPCYcEjKensW4ggI8Fm4gTkoUKaID8j8gFw!!&p=cdfd&cflag=&downtype=pdf4
    result.rtype    = 'PHD_THESIS';
    result.mime     = 'PDF';
    result.unitid   = param.doi;
    result.doi      = param.doi;
  } else if (/^\/kns\/defaultresult\/index$/i.test(path)) {
    // https://oversea.cnki.net/kns/defaultresult/index
    result.rtype    = 'SEARCH';
    result.mime     = 'HTML';
  } else if (/^\/KCMS\/detail\/detail\.aspx$/i.test(path)) {
    // https://oversea.cnki.net/KCMS/detail/detail.aspx?dbcode=CAPJ&dbname=CAPJDAY&filename=JSJJ20220415003&uniplatform=OVERSEAS_EN&v=RxFrS6Ig2zL17wBNqyPHhTUNf0ViBvHQ23yy4k2EtEJzoa-qaLXGOOWJbVhejJO1
    result.rtype    = 'ABS';
    result.mime     = 'HTML';
    result.title_id = param.filename;
    result.db_id    = param.dbcode;
    result.unitid   = param.filename;
  } else if (/^\/KNavi\/JournalDetail$/i.test(path)) {
    // https://oversea.cnki.net/KNavi/JournalDetail?pcode=CJFD&pykm=RDYX
    result.rtype    = 'TOC';
    result.mime     = 'HTML';
    result.db_id    = param.pcode;
    result.unitid   = param.pykm;
    result.pii = param.pykm;
  } else if (/^\/KXReader\/Detail$/i.test(path)) {
    // https://oversea.cnki.net/KXReader/Detail?invoice=KZ0vtesjkUFmFb5d9WHkT5XuA5QZ%2Bvd6%2FzmwKOJoy5KN5uxhO16BxaJph6XiLqIqRw0imkcfa0yjuIdvZIGxy99KrI4eiq3d%2B0%2FNS5YoNLfSEdrwoo9x%2Fnk%2BShjrxyi%2Bj0QVQvpfWVfEazEUcCIlxreZD31QKu21Q%2F5tau6ebH4%3D&DBCODE=CJFD&FileName=SXSX202201001&TABLEName=cjfdlast2022&nonce=A02C20F1261B4BBBA0C64F641A21CD34&uid=&TIMESTAMP=1650486696664
    result.rtype    = 'ARTICLE';
    result.mime     = 'HTML';
    result.title_id = param.FileName;
    result.db_id    = param.DBCODE;
    result.unitid   = param.FileName;
  }

  return result;
});
