//获取设备信息 https://cloud.tencent.com/developer/article/1084442
/*!
 * UAParser.js v0.7.23 start
 */

(function (window, undefined) {

  'use strict';

  //////////////
  // Constants
  /////////////


  var LIBVERSION  = '0.7.23',
    EMPTY       = '',
    UNKNOWN     = '?',
    FUNC_TYPE   = 'function',
    UNDEF_TYPE  = 'undefined',
    OBJ_TYPE    = 'object',
    STR_TYPE    = 'string',
    MAJOR       = 'major', // deprecated
    MODEL       = 'model',
    NAME        = 'name',
    TYPE        = 'type',
    VENDOR      = 'vendor',
    VERSION     = 'version',
    ARCHITECTURE= 'architecture',
    CONSOLE     = 'console',
    MOBILE      = 'mobile',
    TABLET      = 'tablet',
    SMARTTV     = 'smarttv',
    WEARABLE    = 'wearable',
    EMBEDDED    = 'embedded';


  ///////////
  // Helper
  //////////


  var util = {
    extend : function (regexes, extensions) {
      var mergedRegexes = {};
      for (var i in regexes) {
        if (extensions[i] && extensions[i].length % 2 === 0) {
          mergedRegexes[i] = extensions[i].concat(regexes[i]);
        } else {
          mergedRegexes[i] = regexes[i];
        }
      }
      return mergedRegexes;
    },
    has : function (str1, str2) {
      if (typeof str1 === "string") {
        return str2.toLowerCase().indexOf(str1.toLowerCase()) !== -1;
      } else {
        return false;
      }
    },
    lowerize : function (str) {
      return str.toLowerCase();
    },
    major : function (version) {
      return typeof(version) === STR_TYPE ? version.replace(/[^\d\.]/g,'').split(".")[0] : undefined;
    },
    trim : function (str) {
      return str.replace(/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g, '');
    }
  };


  ///////////////
  // Map helper
  //////////////


  var mapper = {

    rgx : function (ua, arrays) {
//             console.(ua)
// console.log(arrays)
      var i = 0, j, k, p, q, matches, match;

      // loop through all regexes maps
      while (i < arrays.length && !matches) {

        var regex = arrays[i],       // even sequence (0,2,4,..)
          props = arrays[i + 1];   // odd sequence (1,3,5,..)
        j = k = 0;

        // try matching uastring with regexes
        while (j < regex.length && !matches) {

          matches = regex[j++].exec(ua);

          if (!!matches) {
            for (p = 0; p < props.length; p++) {
              match = matches[++k];
              q = props[p];
              // check if given property is actually array
              if (typeof q === OBJ_TYPE && q.length > 0) {
                if (q.length == 2) {
                  if (typeof q[1] == FUNC_TYPE) {
                    // assign modified match
                    this[q[0]] = q[1].call(this, match);
                  } else {
                    // assign given value, ignore regex match
                    this[q[0]] = q[1];
                  }
                } else if (q.length == 3) {
                  // check whether function or regex
                  if (typeof q[1] === FUNC_TYPE && !(q[1].exec && q[1].test)) {
                    // call function (usually string mapper)
                    this[q[0]] = match ? q[1].call(this, match, q[2]) : undefined;
                  } else {
                    // sanitize match using given regex
                    this[q[0]] = match ? match.replace(q[1], q[2]) : undefined;
                  }
                } else if (q.length == 4) {
                  this[q[0]] = match ? q[3].call(this, match.replace(q[1], q[2])) : undefined;
                }
              } else {
                this[q] = match ? match : undefined;
              }
            }
          }
        }
        i += 2;
      }
    },

    str : function (str, map) {

      for (var i in map) {
        // check if array
        if (typeof map[i] === OBJ_TYPE && map[i].length > 0) {
          for (var j = 0; j < map[i].length; j++) {
            if (util.has(map[i][j], str)) {
              return (i === UNKNOWN) ? undefined : i;
            }
          }
        } else if (util.has(map[i], str)) {
          return (i === UNKNOWN) ? undefined : i;
        }
      }
      return str;
    }
  };


  ///////////////
  // String map
  //////////////


  var maps = {

    browser : {
      oldsafari : {
        version : {
          '1.0'   : '/8',
          '1.2'   : '/1',
          '1.3'   : '/3',
          '2.0'   : '/412',
          '2.0.2' : '/416',
          '2.0.3' : '/417',
          '2.0.4' : '/419',
          '?'     : '/'
        }
      }
    },

    device : {
      amazon : {
        model : {
          'Fire Phone' : ['SD', 'KF']
        }
      },
      sprint : {
        model : {
          'Evo Shift 4G' : '7373KT'
        },
        vendor : {
          'HTC'       : 'APA',
          'Sprint'    : 'Sprint'
        }
      }
    },

    os : {
      windows : {
        version : {
          'ME'        : '4.90',
          'NT 3.11'   : 'NT3.51',
          'NT 4.0'    : 'NT4.0',
          '2000'      : 'NT 5.0',
          'XP'        : ['NT 5.1', 'NT 5.2'],
          'Vista'     : 'NT 6.0',
          '7'         : 'NT 6.1',
          '8'         : 'NT 6.2',
          '8.1'       : 'NT 6.3',
          '10'        : ['NT 6.4', 'NT 10.0'],
          'RT'        : 'ARM'
        }
      }
    }
  };


  //////////////
  // Regex map
  /////////////


  var regexes = {

    browser : [[

      // Presto based
      /(opera\smini)\/([\w\.-]+)/i,                                       // Opera Mini
      /(opera\s[mobiletab]{3,6}).+version\/([\w\.-]+)/i,                  // Opera Mobi/Tablet
      /(opera).+version\/([\w\.]+)/i,                                     // Opera > 9.80
      /(opera)[\/\s]+([\w\.]+)/i                                          // Opera < 9.80
    ], [NAME, VERSION], [

      /(opios)[\/\s]+([\w\.]+)/i                                          // Opera mini on iphone >= 8.0
    ], [[NAME, 'Opera Mini'], VERSION], [

      /\s(opr)\/([\w\.]+)/i                                               // Opera Webkit
    ], [[NAME, 'Opera'], VERSION], [

      // Mixed
      /(kindle)\/([\w\.]+)/i,                                             // Kindle
      /(lunascape|maxthon|netfront|jasmine|blazer)[\/\s]?([\w\.]*)/i,
      // Lunascape/Maxthon/Netfront/Jasmine/Blazer
      // Trident based
      /(avant\s|iemobile|slim)(?:browser)?[\/\s]?([\w\.]*)/i,
      // Avant/IEMobile/SlimBrowser
      /(bidubrowser|baidubrowser)[\/\s]?([\w\.]+)/i,                      // Baidu Browser
      /(?:ms|\()(ie)\s([\w\.]+)/i,                                        // Internet Explorer

      // Webkit/KHTML based
      /(rekonq)\/([\w\.]*)/i,                                             // Rekonq
      /(chromium|flock|rockmelt|midori|epiphany|silk|skyfire|ovibrowser|bolt|iron|vivaldi|iridium|phantomjs|bowser|quark|qupzilla|falkon)\/([\w\.-]+)/i
      // Chromium/Flock/RockMelt/Midori/Epiphany/Silk/Skyfire/Bolt/Iron/Iridium/PhantomJS/Bowser/QupZilla/Falkon
    ], [NAME, VERSION], [

      /(konqueror)\/([\w\.]+)/i                                           // Konqueror
    ], [[NAME, 'Konqueror'], VERSION], [

      /(trident).+rv[:\s]([\w\.]{1,9}).+like\sgecko/i                     // IE11
    ], [[NAME, 'IE'], VERSION], [

      /(edge|edgios|edga|edg)\/((\d+)?[\w\.]+)/i                          // Microsoft Edge
    ], [[NAME, 'Edge'], VERSION], [

      /(yabrowser)\/([\w\.]+)/i                                           // Yandex
    ], [[NAME, 'Yandex'], VERSION], [

      /(Avast)\/([\w\.]+)/i                                               // Avast Secure Browser
    ], [[NAME, 'Avast Secure Browser'], VERSION], [

      /(AVG)\/([\w\.]+)/i                                                 // AVG Secure Browser
    ], [[NAME, 'AVG Secure Browser'], VERSION], [

      /(puffin)\/([\w\.]+)/i                                              // Puffin
    ], [[NAME, 'Puffin'], VERSION], [

      /(focus)\/([\w\.]+)/i                                               // Firefox Focus
    ], [[NAME, 'Firefox Focus'], VERSION], [

      /(opt)\/([\w\.]+)/i                                                 // Opera Touch
    ], [[NAME, 'Opera Touch'], VERSION], [

      /((?:[\s\/])uc?\s?browser|(?:juc.+)ucweb)[\/\s]?([\w\.]+)/i         // UCBrowser
    ], [[NAME, 'UCBrowser'], VERSION], [

      /(comodo_dragon)\/([\w\.]+)/i                                       // Comodo Dragon
    ], [[NAME, /_/g, ' '], VERSION], [

      /(windowswechat qbcore)\/([\w\.]+)/i                                // WeChat Desktop for Windows Built-in Browser
    ], [[NAME, 'WeChat(Win) Desktop'], VERSION], [

      /(micromessenger)\/([\w\.]+)/i                                      // WeChat
    ], [[NAME, 'WeChat'], VERSION], [

      /(brave)\/([\w\.]+)/i                                               // Brave browser
    ], [[NAME, 'Brave'], VERSION], [

      /(whale)\/([\w\.]+)/i                                               // Whale browser
    ], [[NAME, 'Whale'], VERSION], [

      /(qqbrowserlite)\/([\w\.]+)/i                                       // QQBrowserLite
    ], [NAME, VERSION], [

      /(QQ)\/([\d\.]+)/i                                                  // QQ, aka ShouQ
    ], [NAME, VERSION], [

      /m?(qqbrowser)[\/\s]?([\w\.]+)/i                                    // QQBrowser
    ], [NAME, VERSION], [

      /(baiduboxapp)[\/\s]?([\w\.]+)/i                                    // Baidu App
    ], [NAME, VERSION], [

      /(2345Explorer)[\/\s]?([\w\.]+)/i                                   // 2345 Browser
    ], [NAME, VERSION], [

      /(MetaSr)[\/\s]?([\w\.]+)/i                                         // SouGouBrowser
    ], [NAME], [

      /(LBBROWSER)/i                                                      // LieBao Browser
    ], [NAME], [

      /xiaomi\/miuibrowser\/([\w\.]+)/i                                   // MIUI Browser
    ], [VERSION, [NAME, 'MIUI Browser']], [

      /;fbav\/([\w\.]+);/i                                                // Facebook App for iOS & Android with version
    ], [VERSION, [NAME, 'Facebook']], [

      /FBAN\/FBIOS|FB_IAB\/FB4A/i                                         // Facebook App for iOS & Android without version
    ], [[NAME, 'Facebook']], [

      /safari\s(line)\/([\w\.]+)/i,                                       // Line App for iOS
      /android.+(line)\/([\w\.]+)\/iab/i                                  // Line App for Android
    ], [NAME, VERSION], [

      /headlesschrome(?:\/([\w\.]+)|\s)/i                                 // Chrome Headless
    ], [VERSION, [NAME, 'Chrome Headless']], [

      /\swv\).+(chrome)\/([\w\.]+)/i                                      // Chrome WebView
    ], [[NAME, /(.+)/, '$1 WebView'], VERSION], [

      /((?:oculus|samsung)browser)\/([\w\.]+)/i
    ], [[NAME, /(.+(?:g|us))(.+)/, '$1 $2'], VERSION], [                // Oculus / Samsung Browser

      /android.+version\/([\w\.]+)\s+(?:mobile\s?safari|safari)*/i        // Android Browser
    ], [VERSION, [NAME, 'Android Browser']], [

      /(sailfishbrowser)\/([\w\.]+)/i                                     // Sailfish Browser
    ], [[NAME, 'Sailfish Browser'], VERSION], [

      /(chrome|omniweb|arora|[tizenoka]{5}\s?browser)\/v?([\w\.]+)/i
      // Chrome/OmniWeb/Arora/Tizen/Nokia
    ], [NAME, VERSION], [

      /(dolfin)\/([\w\.]+)/i                                              // Dolphin
    ], [[NAME, 'Dolphin'], VERSION], [

      /(qihu|qhbrowser|qihoobrowser|360browser)/i                         // 360
    ], [[NAME, '360 Browser']], [

      /((?:android.+)crmo|crios)\/([\w\.]+)/i                             // Chrome for Android/iOS
    ], [[NAME, 'Chrome'], VERSION], [

      /(coast)\/([\w\.]+)/i                                               // Opera Coast
    ], [[NAME, 'Opera Coast'], VERSION], [

      /fxios\/([\w\.-]+)/i                                                // Firefox for iOS
    ], [VERSION, [NAME, 'Firefox']], [

      /version\/([\w\.]+)\s.*mobile\/\w+\s(safari)/i                      // Mobile Safari
    ], [VERSION, [NAME, 'Mobile Safari']], [

      /version\/([\w\.]+)\s.*(mobile\s?safari|safari)/i                   // Safari & Safari Mobile
    ], [VERSION, NAME], [

      /webkit.+?(gsa)\/([\w\.]+)\s.*(mobile\s?safari|safari)(\/[\w\.]+)/i // Google Search Appliance on iOS
    ], [[NAME, 'GSA'], VERSION], [

      /webkit.+?(mobile\s?safari|safari)(\/[\w\.]+)/i                     // Safari < 3.0
    ], [NAME, [VERSION, mapper.str, maps.browser.oldsafari.version]], [

      /(webkit|khtml)\/([\w\.]+)/i
    ], [NAME, VERSION], [

      // Gecko based
      /(navigator|netscape)\/([\w\.-]+)/i                                 // Netscape
    ], [[NAME, 'Netscape'], VERSION], [
      /(swiftfox)/i,                                                      // Swiftfox
      /(icedragon|iceweasel|camino|chimera|fennec|maemo\sbrowser|minimo|conkeror)[\/\s]?([\w\.\+]+)/i,
      // IceDragon/Iceweasel/Camino/Chimera/Fennec/Maemo/Minimo/Conkeror
      /(firefox|seamonkey|k-meleon|icecat|iceape|firebird|phoenix|palemoon|basilisk|waterfox)\/([\w\.-]+)$/i,

      // Firefox/SeaMonkey/K-Meleon/IceCat/IceApe/Firebird/Phoenix
      /(firefox)\/([\w\.]+)\s[\w\s\-]+\/[\w\.]+$/i,                       // Other Firefox-based
      /(mozilla)\/([\w\.]+)\s.+rv\:.+gecko\/\d+/i,                        // Mozilla

      // Other
      /(polaris|lynx|dillo|icab|doris|amaya|w3m|netsurf|sleipnir)[\/\s]?([\w\.]+)/i,
      // Polaris/Lynx/Dillo/iCab/Doris/Amaya/w3m/NetSurf/Sleipnir
      /(links)\s\(([\w\.]+)/i,                                            // Links
      /(gobrowser)\/?([\w\.]*)/i,                                         // GoBrowser
      /(ice\s?browser)\/v?([\w\._]+)/i,                                   // ICE Browser
      /(mosaic)[\/\s]([\w\.]+)/i                                          // Mosaic
    ], [NAME, VERSION]
    ],

    cpu : [[

      /(?:(amd|x(?:(?:86|64)[_-])?|wow|win)64)[;\)]/i                     // AMD64
    ], [[ARCHITECTURE, 'amd64']], [

      /(ia32(?=;))/i                                                      // IA32 (quicktime)
    ], [[ARCHITECTURE, util.lowerize]], [

      /((?:i[346]|x)86)[;\)]/i                                            // IA32
    ], [[ARCHITECTURE, 'ia32']], [

      // PocketPC mistakenly identified as PowerPC
      /windows\s(ce|mobile);\sppc;/i
    ], [[ARCHITECTURE, 'arm']], [

      /((?:ppc|powerpc)(?:64)?)(?:\smac|;|\))/i                           // PowerPC
    ], [[ARCHITECTURE, /ower/, '', util.lowerize]], [

      /(sun4\w)[;\)]/i                                                    // SPARC
    ], [[ARCHITECTURE, 'sparc']], [

      /((?:avr32|ia64(?=;))|68k(?=\))|arm(?:64|(?=v\d+[;l]))|(?=atmel\s)avr|(?:irix|mips|sparc)(?:64)?(?=;)|pa-risc)/i
      // IA64, 68K, ARM/64, AVR/32, IRIX/64, MIPS/64, SPARC/64, PA-RISC
    ], [[ARCHITECTURE, util.lowerize]]
    ],

    device : [[

      /\((ipad|playbook);[\w\s\),;-]+(rim|apple)/i                        // iPad/PlayBook
    ], [MODEL, VENDOR, [TYPE, TABLET]], [

      /applecoremedia\/[\w\.]+ \((ipad)/                                  // iPad
    ], [MODEL, [VENDOR, 'Apple'], [TYPE, TABLET]], [

      /(apple\s{0,1}tv)/i                                                 // Apple TV
    ], [[MODEL, 'Apple TV'], [VENDOR, 'Apple'], [TYPE, SMARTTV]], [

      /(archos)\s(gamepad2?)/i,                                           // Archos
      /(hp).+(touchpad)/i,                                                // HP TouchPad
      /(hp).+(tablet)/i,                                                  // HP Tablet
      /(kindle)\/([\w\.]+)/i,                                             // Kindle
      /\s(nook)[\w\s]+build\/(\w+)/i,                                     // Nook
      /(dell)\s(strea[kpr\s\d]*[\dko])/i                                  // Dell Streak
    ], [VENDOR, MODEL, [TYPE, TABLET]], [

      /(kf[A-z]+)(\sbuild\/|\)).+silk\//i                                 // Kindle Fire HD
    ], [MODEL, [VENDOR, 'Amazon'], [TYPE, TABLET]], [
      /(sd|kf)[0349hijorstuw]+(\sbuild\/|\)).+silk\//i                    // Fire Phone
    ], [[MODEL, mapper.str, maps.device.amazon.model], [VENDOR, 'Amazon'], [TYPE, MOBILE]], [
      /android.+aft([bms])\sbuild/i                                       // Fire TV
    ], [MODEL, [VENDOR, 'Amazon'], [TYPE, SMARTTV]], [

      /\((ip[honed|\s\w*]+);.+(apple)/i                                   // iPod/iPhone
    ], [MODEL, VENDOR, [TYPE, MOBILE]], [
      /\((ip[honed|\s\w*]+);/i                                            // iPod/iPhone
    ], [MODEL, [VENDOR, 'Apple'], [TYPE, MOBILE]], [

      /(blackberry)[\s-]?(\w+)/i,                                         // BlackBerry
      /(blackberry|benq|palm(?=\-)|sonyericsson|acer|asus|dell|meizu|motorola|polytron)[\s_-]?([\w-]*)/i,
      // BenQ/Palm/Sony-Ericsson/Acer/Asus/Dell/Meizu/Motorola/Polytron
      /(hp)\s([\w\s]+\w)/i,                                               // HP iPAQ
      /(asus)-?(\w+)/i                                                    // Asus
    ], [VENDOR, MODEL, [TYPE, MOBILE]], [
      /\(bb10;\s(\w+)/i                                                   // BlackBerry 10
    ], [MODEL, [VENDOR, 'BlackBerry'], [TYPE, MOBILE]], [
      // Asus Tablets
      /android.+(transfo[prime\s]{4,10}\s\w+|eeepc|slider\s\w+|nexus 7|padfone|p00c)/i
    ], [MODEL, [VENDOR, 'Asus'], [TYPE, TABLET]], [

      /(sony)\s(tablet\s[ps])\sbuild\//i,                                  // Sony
      /(sony)?(?:sgp.+)\sbuild\//i
    ], [[VENDOR, 'Sony'], [MODEL, 'Xperia Tablet'], [TYPE, TABLET]], [
      /android.+\s([c-g]\d{4}|so[-l]\w+)(?=\sbuild\/|\).+chrome\/(?![1-6]{0,1}\d\.))/i
    ], [MODEL, [VENDOR, 'Sony'], [TYPE, MOBILE]], [

      /\s(ouya)\s/i,                                                      // Ouya
      /(nintendo)\s([wids3u]+)/i                                          // Nintendo
    ], [VENDOR, MODEL, [TYPE, CONSOLE]], [

      /android.+;\s(shield)\sbuild/i                                      // Nvidia
    ], [MODEL, [VENDOR, 'Nvidia'], [TYPE, CONSOLE]], [

      /(playstation\s[34portablevi]+)/i                                   // Playstation
    ], [MODEL, [VENDOR, 'Sony'], [TYPE, CONSOLE]], [

      /(sprint\s(\w+))/i                                                  // Sprint Phones
    ], [[VENDOR, mapper.str, maps.device.sprint.vendor], [MODEL, mapper.str, maps.device.sprint.model], [TYPE, MOBILE]], [

      /(htc)[;_\s-]{1,2}([\w\s]+(?=\)|\sbuild)|\w+)/i,                    // HTC
      /(zte)-(\w*)/i,                                                     // ZTE
      /(alcatel|geeksphone|nexian|panasonic|(?=;\s)sony)[_\s-]?([\w-]*)/i
      // Alcatel/GeeksPhone/Nexian/Panasonic/Sony
    ], [VENDOR, [MODEL, /_/g, ' '], [TYPE, MOBILE]], [

      /(nexus\s9)/i                                                       // HTC Nexus 9
    ], [MODEL, [VENDOR, 'HTC'], [TYPE, TABLET]], [

      /d\/huawei([\w\s-]+)[;\)]/i,                                        // Huawei
      /android.+\s(nexus\s6p|vog-[at]?l\d\d|ane-[at]?l[x\d]\d|eml-a?l\d\da?|lya-[at]?l\d[\dc]|clt-a?l\d\di?)/i

    ], [MODEL, [VENDOR, 'Huawei'], [TYPE, MOBILE]], [

      /android.+(bah2?-a?[lw]\d{2})/i                                     // Huawei MediaPad
    ], [MODEL, [VENDOR, 'Huawei'], [TYPE, TABLET]], [

      /(microsoft);\s(lumia[\s\w]+)/i                                     // Microsoft Lumia
    ], [VENDOR, MODEL, [TYPE, MOBILE]], [

      /[\s\(;](xbox(?:\sone)?)[\s\);]/i                                   // Microsoft Xbox
    ], [MODEL, [VENDOR, 'Microsoft'], [TYPE, CONSOLE]], [
      /(kin\.[onetw]{3})/i                                                // Microsoft Kin
    ], [[MODEL, /\./g, ' '], [VENDOR, 'Microsoft'], [TYPE, MOBILE]], [

      // Motorola
      /\s(milestone|droid(?:[2-4x]|\s(?:bionic|x2|pro|razr))?:?(\s4g)?)[\w\s]+build\//i,
      /mot[\s-]?(\w*)/i,
      /(XT\d{3,4}) build\//i,
      /(nexus\s6)/i
    ], [MODEL, [VENDOR, 'Motorola'], [TYPE, MOBILE]], [
      /android.+\s(mz60\d|xoom[\s2]{0,2})\sbuild\//i
    ], [MODEL, [VENDOR, 'Motorola'], [TYPE, TABLET]], [

      /hbbtv\/\d+\.\d+\.\d+\s+\([\w\s]*;\s*(\w[^;]*);([^;]*)/i            // HbbTV devices
    ], [[VENDOR, util.trim], [MODEL, util.trim], [TYPE, SMARTTV]], [

      /hbbtv.+maple;(\d+)/i
    ], [[MODEL, /^/, 'SmartTV'], [VENDOR, 'Samsung'], [TYPE, SMARTTV]], [

      /\(dtv[\);].+(aquos)/i                                              // Sharp
    ], [MODEL, [VENDOR, 'Sharp'], [TYPE, SMARTTV]], [

      /android.+((sch-i[89]0\d|shw-m380s|SM-P605|SM-P610|gt-p\d{4}|gt-n\d+|sgh-t8[56]9|nexus 10))/i,
      /((SM-T\w+))/i
    ], [[VENDOR, 'Samsung'], MODEL, [TYPE, TABLET]], [                  // Samsung
      /smart-tv.+(samsung)/i
    ], [VENDOR, [TYPE, SMARTTV], MODEL], [
      /((s[cgp]h-\w+|gt-\w+|galaxy\snexus|sm-\w[\w\d]+))/i,
      /(sam[sung]*)[\s-]*(\w+-?[\w-]*)/i,
      /sec-((sgh\w+))/i
    ], [[VENDOR, 'Samsung'], MODEL, [TYPE, MOBILE]], [

      /sie-(\w*)/i                                                        // Siemens
    ], [MODEL, [VENDOR, 'Siemens'], [TYPE, MOBILE]], [

      /(maemo|nokia).*(n900|lumia\s\d+)/i,                                // Nokia
      /(nokia)[\s_-]?([\w-]*)/i
    ], [[VENDOR, 'Nokia'], MODEL, [TYPE, MOBILE]], [

      /android[x\d\.\s;]+\s([ab][1-7]\-?[0178a]\d\d?)/i                   // Acer
    ], [MODEL, [VENDOR, 'Acer'], [TYPE, TABLET]], [

      /android.+([vl]k\-?\d{3})\s+build/i                                 // LG Tablet
    ], [MODEL, [VENDOR, 'LG'], [TYPE, TABLET]], [
      /android\s3\.[\s\w;-]{10}(lg?)-([06cv9]{3,4})/i                     // LG Tablet
    ], [[VENDOR, 'LG'], MODEL, [TYPE, TABLET]], [
      /linux;\snetcast.+smarttv/i,                                        // LG SmartTV
      /lg\snetcast\.tv-201\d/i
    ], [[VENDOR, 'LG'], MODEL, [TYPE, SMARTTV]], [
      /(nexus\s[45])/i,                                                   // LG
      /lg[e;\s\/-]+(\w*)/i,
      /android.+lg(\-?[\d\w]+)\s+build/i
    ], [MODEL, [VENDOR, 'LG'], [TYPE, MOBILE]], [

      /(lenovo)\s?(s(?:5000|6000)(?:[\w-]+)|tab(?:[\s\w]+))/i             // Lenovo tablets
    ], [VENDOR, MODEL, [TYPE, TABLET]], [
      /android.+(ideatab[a-z0-9\-\s]+)/i                                  // Lenovo
    ], [MODEL, [VENDOR, 'Lenovo'], [TYPE, TABLET]], [
      /(lenovo)[_\s-]?([\w-]+)/i
    ], [VENDOR, MODEL, [TYPE, MOBILE]], [

      /linux;.+((jolla));/i                                               // Jolla
    ], [VENDOR, MODEL, [TYPE, MOBILE]], [

      /((pebble))app\/[\d\.]+\s/i                                         // Pebble
    ], [VENDOR, MODEL, [TYPE, WEARABLE]], [

      /android.+;\s(oppo)\s?([\w\s]+)\sbuild/i                            // OPPO
    ], [VENDOR, MODEL, [TYPE, MOBILE]], [

      /crkey/i                                                            // Google Chromecast
    ], [[MODEL, 'Chromecast'], [VENDOR, 'Google'], [TYPE, SMARTTV]], [

      /android.+;\s(glass)\s\d/i                                          // Google Glass
    ], [MODEL, [VENDOR, 'Google'], [TYPE, WEARABLE]], [

      /android.+;\s(pixel c)[\s)]/i                                       // Google Pixel C
    ], [MODEL, [VENDOR, 'Google'], [TYPE, TABLET]], [

      /android.+;\s(pixel( [2-9]a?)?( xl)?)[\s)]/i                        // Google Pixel
    ], [MODEL, [VENDOR, 'Google'], [TYPE, MOBILE]], [

      /android.+;\s(\w+)\s+build\/hm\1/i,                                 // Xiaomi Hongmi 'numeric' models
      /android.+(hm[\s\-_]?note?[\s_]?(?:\d\w)?)\sbuild/i,                // Xiaomi Hongmi
      /android.+(redmi[\s\-_]?(?:note|k)?(?:[\s_]?[\w\s]+))(?:\sbuild|\))/i,
      // Xiaomi Redmi
      /android.+(mi[\s\-_]?(?:a\d|one|one[\s_]plus|note lte)?[\s_]?(?:\d?\w?)[\s_]?(?:plus)?)\sbuild/i
      // Xiaomi Mi
    ], [[MODEL, /_/g, ' '], [VENDOR, 'Xiaomi'], [TYPE, MOBILE]], [
      /android.+(mi[\s\-_]?(?:pad)(?:[\s_]?[\w\s]+))(?:\sbuild|\))/i     // Mi Pad tablets
    ],[[MODEL, /_/g, ' '], [VENDOR, 'Xiaomi'], [TYPE, TABLET]], [
      /android.+;\s(m[1-5]\snote)\sbuild/i                                // Meizu
    ], [MODEL, [VENDOR, 'Meizu'], [TYPE, MOBILE]], [
      /(mz)-([\w-]{2,})/i
    ], [[VENDOR, 'Meizu'], MODEL, [TYPE, MOBILE]], [

      /android.+a000(1)\s+build/i,                                        // OnePlus
      /android.+oneplus\s(a\d{4})[\s)]/i
    ], [MODEL, [VENDOR, 'OnePlus'], [TYPE, MOBILE]], [

      /android.+[;\/]\s*(RCT[\d\w]+)\s+build/i                            // RCA Tablets
    ], [MODEL, [VENDOR, 'RCA'], [TYPE, TABLET]], [

      /android.+[;\/\s](Venue[\d\s]{2,7})\s+build/i                       // Dell Venue Tablets
    ], [MODEL, [VENDOR, 'Dell'], [TYPE, TABLET]], [

      /android.+[;\/]\s*(Q[T|M][\d\w]+)\s+build/i                         // Verizon Tablet
    ], [MODEL, [VENDOR, 'Verizon'], [TYPE, TABLET]], [

      /android.+[;\/]\s+(Barnes[&\s]+Noble\s+|BN[RT])(V?.*)\s+build/i     // Barnes & Noble Tablet
    ], [[VENDOR, 'Barnes & Noble'], MODEL, [TYPE, TABLET]], [

      /android.+[;\/]\s+(TM\d{3}.*\b)\s+build/i                           // Barnes & Noble Tablet
    ], [MODEL, [VENDOR, 'NuVision'], [TYPE, TABLET]], [

      /android.+;\s(k88)\sbuild/i                                         // ZTE K Series Tablet
    ], [MODEL, [VENDOR, 'ZTE'], [TYPE, TABLET]], [

      /android.+[;\/]\s*(gen\d{3})\s+build.*49h/i                         // Swiss GEN Mobile
    ], [MODEL, [VENDOR, 'Swiss'], [TYPE, MOBILE]], [

      /android.+[;\/]\s*(zur\d{3})\s+build/i                              // Swiss ZUR Tablet
    ], [MODEL, [VENDOR, 'Swiss'], [TYPE, TABLET]], [

      /android.+[;\/]\s*((Zeki)?TB.*\b)\s+build/i                         // Zeki Tablets
    ], [MODEL, [VENDOR, 'Zeki'], [TYPE, TABLET]], [

      /(android).+[;\/]\s+([YR]\d{2})\s+build/i,
      /android.+[;\/]\s+(Dragon[\-\s]+Touch\s+|DT)(\w{5})\sbuild/i        // Dragon Touch Tablet
    ], [[VENDOR, 'Dragon Touch'], MODEL, [TYPE, TABLET]], [

      /android.+[;\/]\s*(NS-?\w{0,9})\sbuild/i                            // Insignia Tablets
    ], [MODEL, [VENDOR, 'Insignia'], [TYPE, TABLET]], [

      /android.+[;\/]\s*((NX|Next)-?\w{0,9})\s+build/i                    // NextBook Tablets
    ], [MODEL, [VENDOR, 'NextBook'], [TYPE, TABLET]], [

      /android.+[;\/]\s*(Xtreme\_)?(V(1[045]|2[015]|30|40|60|7[05]|90))\s+build/i
    ], [[VENDOR, 'Voice'], MODEL, [TYPE, MOBILE]], [                    // Voice Xtreme Phones

      /android.+[;\/]\s*(LVTEL\-)?(V1[12])\s+build/i                     // LvTel Phones
    ], [[VENDOR, 'LvTel'], MODEL, [TYPE, MOBILE]], [

      /android.+;\s(PH-1)\s/i
    ], [MODEL, [VENDOR, 'Essential'], [TYPE, MOBILE]], [                // Essential PH-1

      /android.+[;\/]\s*(V(100MD|700NA|7011|917G).*\b)\s+build/i          // Envizen Tablets
    ], [MODEL, [VENDOR, 'Envizen'], [TYPE, TABLET]], [

      /android.+[;\/]\s*(Le[\s\-]+Pan)[\s\-]+(\w{1,9})\s+build/i          // Le Pan Tablets
    ], [VENDOR, MODEL, [TYPE, TABLET]], [

      /android.+[;\/]\s*(Trio[\s\w\-\.]+)\s+build/i                       // MachSpeed Tablets
    ], [MODEL, [VENDOR, 'MachSpeed'], [TYPE, TABLET]], [

      /android.+[;\/]\s*(Trinity)[\-\s]*(T\d{3})\s+build/i                // Trinity Tablets
    ], [VENDOR, MODEL, [TYPE, TABLET]], [

      /android.+[;\/]\s*TU_(1491)\s+build/i                               // Rotor Tablets
    ], [MODEL, [VENDOR, 'Rotor'], [TYPE, TABLET]], [

      //android.+(KS(.+))\s+build/i                                        // Amazon Kindle Tablets
      //], [MODEL, [VENDOR, 'Amazon'], [TYPE, TABLET]], [

      /android.+(Gigaset)[\s\-]+(Q\w{1,9})\s+build/i                      // Gigaset Tablets
    ], [VENDOR, MODEL, [TYPE, TABLET]], [
      // Android Phones from Unidentified Vendors
      /android .+?; ([^;]+?)(?: build|\) applewebkit).+? mobile safari/i
    ], [MODEL, [TYPE, MOBILE]], [
      // Android Tablets from Unidentified Vendors
      /android .+?;\s([^;]+?)(?: build|\) applewebkit).+?(?! mobile) safari/i
    ], [MODEL, [TYPE, TABLET]], [

      /\s(tablet|tab)[;\/]/i,                                             // Unidentifiable Tablet
      /\s(mobile)(?:[;\/]|\ssafari)/i                                     // Unidentifiable Mobile
    ], [[TYPE, util.lowerize], VENDOR, MODEL], [

      /[\s\/\(](smart-?tv)[;\)]/i                                         // SmartTV
    ], [[TYPE, SMARTTV]], [

      /(android[\w\.\s\-]{0,9});.+build/i                                 // Generic Android Device
    ], [MODEL, [VENDOR, 'Generic']]
    ],

    engine : [[

      /windows.+\sedge\/([\w\.]+)/i                                       // EdgeHTML
    ], [VERSION, [NAME, 'EdgeHTML']], [

      /webkit\/537\.36.+chrome\/(?!27)([\w\.]+)/i                         // Blink
    ], [VERSION, [NAME, 'Blink']], [

      /(presto)\/([\w\.]+)/i,                                             // Presto
      /(webkit|trident|netfront|netsurf|amaya|lynx|w3m|goanna)\/([\w\.]+)/i,
      // WebKit/Trident/NetFront/NetSurf/Amaya/Lynx/w3m/Goanna
      /(khtml|tasman|links)[\/\s]\(?([\w\.]+)/i,                          // KHTML/Tasman/Links
      /(icab)[\/\s]([23]\.[\d\.]+)/i                                      // iCab
    ], [NAME, VERSION], [

      /rv\:([\w\.]{1,9}).+(gecko)/i                                       // Gecko
    ], [VERSION, NAME]
    ],

    os : [[

      // Windows based
      /microsoft\s(windows)\s(vista|xp)/i                                 // Windows (iTunes)
    ], [NAME, VERSION], [
      /(windows)\snt\s6\.2;\s(arm)/i,                                     // Windows RT
      /(windows\sphone(?:\sos)*)[\s\/]?([\d\.\s\w]*)/i,                   // Windows Phone
      /(windows\smobile|windows)[\s\/]?([ntce\d\.\s]+\w)/i
    ], [NAME, [VERSION, mapper.str, maps.os.windows.version]], [
      /(win(?=3|9|n)|win\s9x\s)([nt\d\.]+)/i
    ], [[NAME, 'Windows'], [VERSION, mapper.str, maps.os.windows.version]], [

      // Mobile/Embedded OS
      /\((bb)(10);/i                                                      // BlackBerry 10
    ], [[NAME, 'BlackBerry'], VERSION], [
      /(blackberry)\w*\/?([\w\.]*)/i,                                     // Blackberry
      /(tizen|kaios)[\/\s]([\w\.]+)/i,                                    // Tizen/KaiOS
      /(android|webos|palm\sos|qnx|bada|rim\stablet\sos|meego|sailfish|contiki)[\/\s-]?([\w\.]*)/i
      // Android/WebOS/Palm/QNX/Bada/RIM/MeeGo/Contiki/Sailfish OS
    ], [NAME, VERSION], [
      /(symbian\s?os|symbos|s60(?=;))[\/\s-]?([\w\.]*)/i                  // Symbian
    ], [[NAME, 'Symbian'], VERSION], [
      /\((series40);/i                                                    // Series 40
    ], [NAME], [
      /mozilla.+\(mobile;.+gecko.+firefox/i                               // Firefox OS
    ], [[NAME, 'Firefox OS'], VERSION], [

      // Google Chromecast
      /crkey\/([\d\.]+)/i                                                 // Google Chromecast
    ], [VERSION, [NAME, 'Chromecast']], [

      // Console
      /(nintendo|playstation)\s([wids34portablevu]+)/i,                   // Nintendo/Playstation

      // GNU/Linux based
      /(mint)[\/\s\(]?(\w*)/i,                                            // Mint
      /(mageia|vectorlinux)[;\s]/i,                                       // Mageia/VectorLinux
      /(joli|[kxln]?ubuntu|debian|suse|opensuse|gentoo|(?=\s)arch|slackware|fedora|mandriva|centos|pclinuxos|redhat|zenwalk|linpus)[\/\s-]?(?!chrom)([\w\.-]*)/i,
      // Joli/Ubuntu/Debian/SUSE/Gentoo/Arch/Slackware
      // Fedora/Mandriva/CentOS/PCLinuxOS/RedHat/Zenwalk/Linpus
      /(hurd|linux)\s?([\w\.]*)/i,                                        // Hurd/Linux
      /(gnu)\s?([\w\.]*)/i                                                // GNU
    ], [NAME, VERSION], [

      /(cros)\s[\w]+\s([\w\.]+\w)/i                                       // Chromium OS
    ], [[NAME, 'Chromium OS'], VERSION],[

      // Solaris
      /(sunos)\s?([\w\.\d]*)/i                                            // Solaris
    ], [[NAME, 'Solaris'], VERSION], [

      // BSD based
      /\s([frentopc-]{0,4}bsd|dragonfly)\s?([\w\.]*)/i                    // FreeBSD/NetBSD/OpenBSD/PC-BSD/DragonFly
    ], [NAME, VERSION],[

      /(haiku)\s(\w+)/i                                                   // Haiku
    ], [NAME, VERSION],[

      /cfnetwork\/.+darwin/i,
      /ip[honead]{2,4}(?:.*os\s([\w]+)\slike\smac|;\sopera)/i             // iOS
    ], [[VERSION, /_/g, '.'], [NAME, 'iOS']], [

      /(mac\sos\sx)\s?([\w\s\.]*)/i,
      /(macintosh|mac(?=_powerpc)\s)/i                                    // Mac OS
    ], [[NAME, 'Mac OS'], [VERSION, /_/g, '.']], [

      // Other
      /((?:open)?solaris)[\/\s-]?([\w\.]*)/i,                             // Solaris
      /(aix)\s((\d)(?=\.|\)|\s)[\w\.])*/i,                                // AIX
      /(plan\s9|minix|beos|os\/2|amigaos|morphos|risc\sos|openvms|fuchsia)/i,
      // Plan9/Minix/BeOS/OS2/AmigaOS/MorphOS/RISCOS/OpenVMS/Fuchsia
      /(unix)\s?([\w\.]*)/i                                               // UNIX
    ], [NAME, VERSION]
    ]
  };


  /////////////////
  // Constructor
  ////////////////
  var UAParser = function (uastring, extensions) {

    if (typeof uastring === 'object') {
      extensions = uastring;
      uastring = undefined;
    }

    if (!(this instanceof UAParser)) {
      return new UAParser(uastring, extensions).getResult();
    }

    var ua = uastring || ((window && window.navigator && window.navigator.userAgent) ? window.navigator.userAgent : EMPTY);
    var rgxmap = extensions ? util.extend(regexes, extensions) : regexes;

    this.getBrowser = function () {
      var browser = { name: undefined, version: undefined };
      mapper.rgx.call(browser, ua, rgxmap.browser);
      browser.major = util.major(browser.version); // deprecated
      return browser;
    };
    this.getCPU = function () {
      var cpu = { architecture: undefined };
      mapper.rgx.call(cpu, ua, rgxmap.cpu);
      return cpu;
    };
    this.getDevice = function () {
      var device = { vendor: undefined, model: undefined, type: undefined };
      mapper.rgx.call(device, ua, rgxmap.device);
      return device;
    };
    this.getEngine = function () {
      var engine = { name: undefined, version: undefined };
      mapper.rgx.call(engine, ua, rgxmap.engine);
      return engine;
    };
    this.getOS = function () {
      var os = { name: undefined, version: undefined };
      mapper.rgx.call(os, ua, rgxmap.os);
      return os;
    };
    this.getResult = function () {
      return {
        ua      : this.getUA(),
        browser : this.getBrowser(),
        engine  : this.getEngine(),
        os      : this.getOS(),
        device  : this.getDevice(),
        cpu     : this.getCPU()
      };
    };
    this.getUA = function () {
      return ua;
    };
    this.setUA = function (uastring) {
      ua = uastring;
      return this;
    };
    return this;
  };

  UAParser.VERSION = LIBVERSION;
  UAParser.BROWSER = {
    NAME    : NAME,
    MAJOR   : MAJOR, // deprecated
    VERSION : VERSION
  };
  UAParser.CPU = {
    ARCHITECTURE : ARCHITECTURE
  };
  UAParser.DEVICE = {
    MODEL   : MODEL,
    VENDOR  : VENDOR,
    TYPE    : TYPE,
    CONSOLE : CONSOLE,
    MOBILE  : MOBILE,
    SMARTTV : SMARTTV,
    TABLET  : TABLET,
    WEARABLE: WEARABLE,
    EMBEDDED: EMBEDDED
  };
  UAParser.ENGINE = {
    NAME    : NAME,
    VERSION : VERSION
  };
  UAParser.OS = {
    NAME    : NAME,
    VERSION : VERSION
  };

  ///////////
  // Export
  //////////


  // check js environment
  if (typeof(exports) !== UNDEF_TYPE) {
    // nodejs env
    if (typeof module !== UNDEF_TYPE && module.exports) {
      exports = module.exports = UAParser;
    }
    exports.UAParser = UAParser;
  } else {
    // requirejs env (optional)
    if (typeof(define) === 'function' && define.amd) {
      define(function () {
        return UAParser;
      });
    } else if (window) {
      // browser env
      window.UAParser = UAParser;
    }
  }

  // jQuery/Zepto specific (optional)
  // Note:
  //   In AMD env the global scope should be kept clean, but jQuery is an exception.
  //   jQuery always exports to global scope, unless jQuery.noConflict(true) is used,
  //   and we should catch that.
  var $ = window && (window.jQuery || window.Zepto);
  if ($ && !$.ua) {
    var parser = new UAParser();
    $.ua = parser.getResult();
    $.ua.get = function () {
      return parser.getUA();
    };
    $.ua.set = function (uastring) {
      parser.setUA(uastring);
      var result = parser.getResult();
      for (var prop in result) {
        $.ua[prop] = result[prop];
      }
    };
  }

})(typeof window === 'object' ? window : this);

/*!
 * UAParser.js v0.7.23 end
 */


/*!
 * ///网上找的 比较全面的方法start
 */
let DeviceInfo = (function () {
  var root = typeof self !== 'undefined' ? self : this;
  var _window = root || {};
  // 变量库
  var VariableLibrary = {
    navigator: typeof root.navigator != 'undefined' ? root.navigator : {},
    // 信息map
    infoMap: {
      engine: ['WebKit', 'Trident', 'Gecko', 'Presto'],
      browser: ['Safari', 'Chrome', 'Edge', 'IE', 'Firefox', 'Firefox Focus', 'Chromium', 'Opera', 'Vivaldi', 'Yandex', 'Arora', 'Lunascape', 'QupZilla', 'Coc Coc', 'Kindle', 'Iceweasel', 'Konqueror', 'Iceape', 'SeaMonkey', 'Epiphany', '360', '360SE', '360EE', 'UC', 'QQBrowser', 'QQ', 'Baidu', 'Maxthon', 'Sogou', 'LBBROWSER', '2345Explorer', 'TheWorld', 'XiaoMi', 'Quark', 'Qiyu', 'Wechat', 'Taobao', 'Alipay', 'Weibo', 'Douban', 'Suning', 'iQiYi'],
      os: ['Windows', 'Linux', 'Mac OS', 'Android', 'Ubuntu', 'FreeBSD', 'Debian', 'iOS', 'Windows Phone', 'BlackBerry', 'MeeGo', 'Symbian', 'Chrome OS', 'WebOS'],
      device: ['Mobile', 'Tablet', 'iPad']
    }
  };
  // 方法库
  var MethodLibrary = (function () {
    return {
      // 获取匹配库
      getMatchMap: function (u) {
        return {
          // 内核
          'Trident': u.indexOf('Trident') > -1 || u.indexOf('NET CLR') > -1,
          'Presto': u.indexOf('Presto') > -1,
          'WebKit': u.indexOf('AppleWebKit') > -1,
          'Gecko': u.indexOf('Gecko/') > -1,
          // 浏览器
          'Safari': u.indexOf('Safari') > -1,
          'Chrome': u.indexOf('Chrome') > -1 || u.indexOf('CriOS') > -1,
          'IE': u.indexOf('MSIE') > -1 || u.indexOf('Trident') > -1,
          'Edge': u.indexOf('Edge') > -1,
          'Firefox': u.indexOf('Firefox') > -1 || u.indexOf('FxiOS') > -1,
          'Firefox Focus': u.indexOf('Focus') > -1,
          'Chromium': u.indexOf('Chromium') > -1,
          'Opera': u.indexOf('Opera') > -1 || u.indexOf('OPR') > -1,
          'Vivaldi': u.indexOf('Vivaldi') > -1,
          'Yandex': u.indexOf('YaBrowser') > -1,
          'Arora': u.indexOf('Arora') > -1,
          'Lunascape': u.indexOf('Lunascape') > -1,
          'QupZilla': u.indexOf('QupZilla') > -1,
          'Coc Coc': u.indexOf('coc_coc_browser') > -1,
          'Kindle': u.indexOf('Kindle') > -1 || u.indexOf('Silk/') > -1,
          'Iceweasel': u.indexOf('Iceweasel') > -1,
          'Konqueror': u.indexOf('Konqueror') > -1,
          'Iceape': u.indexOf('Iceape') > -1,
          'SeaMonkey': u.indexOf('SeaMonkey') > -1,
          'Epiphany': u.indexOf('Epiphany') > -1,
          '360': u.indexOf('QihooBrowser') > -1 || u.indexOf('QHBrowser') > -1 || u.indexOf('360') > -1,
          '360EE': u.indexOf('360EE') > -1,
          '360SE': u.indexOf('360SE') > -1,
          'UC': u.indexOf('UC') > -1 || u.indexOf(' UBrowser') > -1,
          'QQBrowser': u.indexOf('QQBrowser') > -1,
          'QQ': u.indexOf('QQ/') > -1,
          'Baidu': u.indexOf('Baidu') > -1 || u.indexOf('BIDUBrowser') > -1,
          'Maxthon': u.indexOf('Maxthon') > -1,
          'Sogou': u.indexOf('MetaSr') > -1 || u.indexOf('Sogou') > -1,
          'LBBROWSER': u.indexOf('LBBROWSER') > -1,
          '2345Explorer': u.indexOf('2345Explorer') > -1,
          'TheWorld': u.indexOf('TheWorld') > -1,
          'XiaoMi': u.indexOf('MiuiBrowser') > -1,
          'Quark': u.indexOf('Quark') > -1,
          'Qiyu': u.indexOf('Qiyu') > -1,
          'Wechat': u.indexOf('MicroMessenger') > -1,
          'Taobao': u.indexOf('AliApp(TB') > -1,
          'Alipay': u.indexOf('AliApp(AP') > -1,
          'Weibo': u.indexOf('Weibo') > -1,
          'Douban': u.indexOf('com.douban.frodo') > -1,
          'Suning': u.indexOf('SNEBUY-APP') > -1,
          'iQiYi': u.indexOf('IqiyiApp') > -1,
          // 系统或平台
          'Windows': u.indexOf('Windows') > -1,
          'Linux': u.indexOf('Linux') > -1 || u.indexOf('X11') > -1,
          'Mac OS': u.indexOf('Macintosh') > -1,
          'Android': u.indexOf('Android') > -1 || u.indexOf('Adr') > -1,
          'Ubuntu': u.indexOf('Ubuntu') > -1,
          'FreeBSD': u.indexOf('FreeBSD') > -1,
          'Debian': u.indexOf('Debian') > -1,
          'Windows Phone': u.indexOf('IEMobile') > -1 || u.indexOf('Windows Phone') > -1,
          'BlackBerry': u.indexOf('BlackBerry') > -1 || u.indexOf('RIM') > -1,
          'MeeGo': u.indexOf('MeeGo') > -1,
          'Symbian': u.indexOf('Symbian') > -1,
          'iOS': u.indexOf('like Mac OS X') > -1,
          'Chrome OS': u.indexOf('CrOS') > -1,
          'WebOS': u.indexOf('hpwOS') > -1,
          // 设备
          'Mobile': u.indexOf('Mobi') > -1 || u.indexOf('iPh') > -1 || u.indexOf('480') > -1,
          'Tablet': u.indexOf('Tablet') > -1 || u.indexOf('Nexus 7') > -1,
          'iPad': u.indexOf('iPad') > -1
        }
      },
      // 在信息map和匹配库中进行匹配 通过navigator.userAgent匹配
      matchInfoMap: function (_this) {
        var u = VariableLibrary.navigator.userAgent || {};
        var match = MethodLibrary.getMatchMap(u);
        for (var s in VariableLibrary.infoMap) {
          for (var i = 0; i < VariableLibrary.infoMap[s].length; i++) {
            var value = VariableLibrary.infoMap[s][i];
            if (match[value]) {
              _this[s] = value;
            }
          }
        }
      },
      // 在信息map和匹配库中进行匹配 通过插件信息匹配
      matchPluginName(_this) {
        var info = ['',''];
        var plugins = navigator.plugins;
        if (plugins.length > 0) {
          for (let i = 0; i < navigator.plugins.length; i++) {
            info[0] += navigator.plugins[i].name + ";";
          }
        }
        let matchs = MethodLibrary.getMatchMap(info[0].split(';')[0])

        for (let i=0;i<VariableLibrary.infoMap.browser.length;i++){
          let value = VariableLibrary.infoMap.browser[i]
          if (matchs[value]) {
            info[1]=value
          }
        }
        return info;
      },
      // 获取当前操作系统
      getOS: function () {
        var _this = this;
        MethodLibrary.matchInfoMap(_this);
        return _this.os;
      },
      // 获取操作系统版本
      getOSVersion: function () {
        var _this = this;
        var u = VariableLibrary.navigator.userAgent || {};
        _this.osVersion = '';
        // 系统版本信息
        var osVersion = {
          'Windows': function () {
            var v = u.replace(/^.*Windows NT ([\d.]+);.*$/, '$1');
            var oldWindowsVersionMap = {
              '6.4': '10',
              '6.3': '8.1',
              '6.2': '8',
              '6.1': '7',
              '6.0': 'Vista',
              '5.2': 'XP',
              '5.1': 'XP',
              '5.0': '2000'
            };
            return oldWindowsVersionMap[v] || v;
          },
          'Android': function () {
            return u.replace(/^.*Android ([\d.]+);.*$/, '$1');
          },
          'iOS': function () {
            return u.replace(/^.*OS ([\d_]+) like.*$/, '$1').replace(/_/g, '.');
          },
          'Debian': function () {
            return u.replace(/^.*Debian\/([\d.]+).*$/, '$1');
          },
          'Windows Phone': function () {
            return u.replace(/^.*Windows Phone( OS)? ([\d.]+);.*$/, '$2');
          },
          'Mac OS': function () {
            return u.replace(/^.*Mac OS X ([\d_]+).*$/, '$1').replace(/_/g, '.');
          },
          'WebOS': function () {
            return u.replace(/^.*hpwOS\/([\d.]+);.*$/, '$1');
          }
        };
        if (osVersion[_this.os]) {
          _this.osVersion = osVersion[_this.os]();
          if (_this.osVersion == u) {
            _this.osVersion = '';
          }
        };;
        return _this.osVersion;
      },
      // 获取横竖屏状态
      getOrientationStatu: function () {
        var orientationStatus = '';
        var orientation = window.matchMedia("(orientation: portrait)");
        if (orientation.matches) {
          orientationStatus = "竖屏";
        } else {
          orientationStatus = "横屏";
        }
        return orientationStatus;
      },
      // 获取设备类型
      getDeviceType: function () {
        var _this = this;
        _this.device = 'PC';
        MethodLibrary.matchInfoMap(_this);
        return _this.device;
      },
      // 获取网络状态
      getNetwork: function () {
        var netWork = navigator && navigator.connection && navigator.connection.effectiveType;
        return netWork;
      },
      // 获取当前语言
      getLanguage: function () {
        var _this = this;
        _this.language = (function () {
          var language = (VariableLibrary.navigator.browserLanguage || VariableLibrary.navigator.language);
          var arr = language.split('-');
          if (arr[1]) {
            arr[1] = arr[1].toUpperCase();
          }
          return arr.join('_');
        })();
        return _this.language;
      },
      // 生成浏览器指纹
      createFingerprint: function (domain) {
        var fingerprint;
        function bin2hex (s) {
          var i, l, n, o = '';
          s += '';
          for (i = 0, l = s.length; i < l; i++) {
            n = s.charCodeAt(i).toString(16);
            o += n.length < 2 ? '0' + n : n;
          }
          return o;
        }
        var canvas = document.createElement('canvas');
        var ctx = canvas.getContext('2d');
        var txt = domain || window.location.host;
        ctx.textBaseline = "top";
        ctx.font = "14px 'Arial'";
        ctx.textBaseline = "tencent";
        ctx.fillStyle = "#f60";
        ctx.fillRect(125, 1, 62, 20);
        ctx.fillStyle = "#069";
        ctx.fillText(txt, 2, 15);
        ctx.fillStyle = "rgba(102, 204, 0, 0.7)";
        ctx.fillText(txt, 4, 17);
        var b64 = canvas.toDataURL().replace("data:image/png;base64,", "");
        var bin = atob(b64);
        var crc = bin2hex(bin.slice(-16, -12));
        fingerprint = crc;
        return fingerprint;
      },
      // 浏览器信息
      getBrowserInfo: function () {
        var _this = this;
        MethodLibrary.matchInfoMap(_this);

        var u = VariableLibrary.navigator.userAgent || {};

        var _mime = function (option, value) {
          var mimeTypes = VariableLibrary.navigator.mimeTypes;
          for (var key in mimeTypes) {
            if (mimeTypes[key][option] == value) {
              return true;
            }
          }
          return false;
        };

        var match = MethodLibrary.getMatchMap(u);

        var is360 = false;
        if (_window.chrome) {
          var chrome_vision = u.replace(/^.*Chrome\/([\d]+).*$/, '$1');
          if (chrome_vision > 36 && _window.showModalDialog) {
            is360 = true;
          } else if (chrome_vision > 45) {
            is360 = _mime("type", "application/vnd.chromium.remoting-viewer");
          }
        }
        if (match['Baidu'] && match['Opera']) {
          match['Baidu'] = false;
        }
        if (match['Mobile']) {
          match['Mobile'] = !(u.indexOf('iPad') > -1);
        }
        if (is360) {
          if (_mime("type", "application/gameplugin")) {
            match['360SE'] = true;
          } else if (VariableLibrary.navigator && typeof VariableLibrary.navigator['connection']['saveData'] == 'undefined') {
            match['360SE'] = true;
          } else {
            match['360EE'] = true;
          }
        }
        if (match['IE'] || match['Edge']) {
          var navigator_top = window.screenTop - window.screenY;
          switch (navigator_top) {
            case 71: // 无收藏栏,贴边
              break
            case 74: // 无收藏栏,非贴边
              break
            case 99: // 有收藏栏,贴边
              break
            case 102: // 有收藏栏,非贴边
              match['360EE'] = true
              break;
            case 75: // 无收藏栏,贴边
              break
            case 74: // 无收藏栏,非贴边
              break
            case 105: // 有收藏栏,贴边
              break
            case 104: // 有收藏栏,非贴边
              match['360SE'] = true
              break
            default:
              break
          }
        }

        var browerVersionMap = {
          'Safari': function () {
            return u.replace(/^.*Version\/([\d.]+).*$/, '$1');
          },
          'Chrome': function () {
            return u.replace(/^.*Chrome\/([\d.]+).*$/, '$1').replace(/^.*CriOS\/([\d.]+).*$/, '$1');
          },
          'IE': function () {
            return u.replace(/^.*MSIE ([\d.]+).*$/, '$1').replace(/^.*rv:([\d.]+).*$/, '$1');
          },
          'Edge': function () {
            return u.replace(/^.*Edge\/([\d.]+).*$/, '$1');
          },
          'Firefox': function () {
            return u.replace(/^.*Firefox\/([\d.]+).*$/, '$1').replace(/^.*FxiOS\/([\d.]+).*$/, '$1');
          },
          'Firefox Focus': function () {
            return u.replace(/^.*Focus\/([\d.]+).*$/, '$1');
          },
          'Chromium': function () {
            return u.replace(/^.*Chromium\/([\d.]+).*$/, '$1');
          },
          'Opera': function () {
            return u.replace(/^.*Opera\/([\d.]+).*$/, '$1').replace(/^.*OPR\/([\d.]+).*$/, '$1');
          },
          'Vivaldi': function () {
            return u.replace(/^.*Vivaldi\/([\d.]+).*$/, '$1');
          },
          'Yandex': function () {
            return u.replace(/^.*YaBrowser\/([\d.]+).*$/, '$1');
          },
          'Arora': function () {
            return u.replace(/^.*Arora\/([\d.]+).*$/, '$1');
          },
          'Lunascape': function () {
            return u.replace(/^.*Lunascape[\/\s]([\d.]+).*$/, '$1');
          },
          'QupZilla': function () {
            return u.replace(/^.*QupZilla[\/\s]([\d.]+).*$/, '$1');
          },
          'Coc Coc': function () {
            return u.replace(/^.*coc_coc_browser\/([\d.]+).*$/, '$1');
          },
          'Kindle': function () {
            return u.replace(/^.*Version\/([\d.]+).*$/, '$1');
          },
          'Iceweasel': function () {
            return u.replace(/^.*Iceweasel\/([\d.]+).*$/, '$1');
          },
          'Konqueror': function () {
            return u.replace(/^.*Konqueror\/([\d.]+).*$/, '$1');
          },
          'Iceape': function () {
            return u.replace(/^.*Iceape\/([\d.]+).*$/, '$1');
          },
          'SeaMonkey': function () {
            return u.replace(/^.*SeaMonkey\/([\d.]+).*$/, '$1');
          },
          'Epiphany': function () {
            return u.replace(/^.*Epiphany\/([\d.]+).*$/, '$1');
          },
          '360': function () {
            return u.replace(/^.*QihooBrowser\/([\d.]+).*$/, '$1');
          },
          '360SE': function () {
            var hash = {'63': '10.0', '55': '9.1', '45': '8.1', '42': '8.0', '31': '7.0', '21': '6.3'};
            var chrome_vision = u.replace(/^.*Chrome\/([\d]+).*$/, '$1');
            return hash[chrome_vision] || '';
          },
          '360EE': function () {
            var hash = {'69': '11.0', '63': '9.5', '55': '9.0', '50': '8.7', '30': '7.5'};
            var chrome_vision = u.replace(/^.*Chrome\/([\d]+).*$/, '$1');
            return hash[chrome_vision] || '';
          },
          'Maxthon': function () {
            return u.replace(/^.*Maxthon\/([\d.]+).*$/, '$1');
          },
          'QQBrowser': function () {
            return u.replace(/^.*QQBrowser\/([\d.]+).*$/, '$1');
          },
          'QQ': function () {
            return u.replace(/^.*QQ\/([\d.]+).*$/, '$1');
          },
          'Baidu': function () {
            return u.replace(/^.*BIDUBrowser[\s\/]([\d.]+).*$/, '$1');
          },
          'UC': function () {
            return u.replace(/^.*UC?Browser\/([\d.]+).*$/, '$1');
          },
          'Sogou': function () {
            return u.replace(/^.*SE ([\d.X]+).*$/, '$1').replace(/^.*SogouMobileBrowser\/([\d.]+).*$/, '$1');
          },
          'LBBROWSER': function () {
            var hash = {'57': '6.5', '49': '6.0', '46': '5.9', '42': '5.3', '39': '5.2', '34': '5.0', '29': '4.5', '21': '4.0'};
            var chrome_vision = navigator.userAgent.replace(/^.*Chrome\/([\d]+).*$/, '$1');
            return hash[chrome_vision] || '';
          },
          '2345Explorer': function () {
            return u.replace(/^.*2345Explorer\/([\d.]+).*$/, '$1');
          },
          'TheWorld': function () {
            return u.replace(/^.*TheWorld ([\d.]+).*$/, '$1');
          },
          'XiaoMi': function () {
            return u.replace(/^.*MiuiBrowser\/([\d.]+).*$/, '$1');
          },
          'Quark': function () {
            return u.replace(/^.*Quark\/([\d.]+).*$/, '$1');
          },
          'Qiyu': function () {
            return u.replace(/^.*Qiyu\/([\d.]+).*$/, '$1');
          },
          'Wechat': function () {
            return u.replace(/^.*MicroMessenger\/([\d.]+).*$/, '$1');
          },
          'Taobao': function () {
            return u.replace(/^.*AliApp\(TB\/([\d.]+).*$/, '$1');
          },
          'Alipay': function () {
            return u.replace(/^.*AliApp\(AP\/([\d.]+).*$/, '$1');
          },
          'Weibo': function () {
            return u.replace(/^.*weibo__([\d.]+).*$/, '$1');
          },
          'Douban': function () {
            return u.replace(/^.*com.douban.frodo\/([\d.]+).*$/, '$1');
          },
          'Suning': function () {
            return u.replace(/^.*SNEBUY-APP([\d.]+).*$/, '$1');
          },
          'iQiYi': function () {
            return u.replace(/^.*IqiyiVersion\/([\d.]+).*$/, '$1');
          }
        };
        _this.browserVersion = '';
        if (browerVersionMap[_this.browser]) {

          _this.browserVersion = browerVersionMap[_this.browser]();
          if (_this.browserVersion == u) {
            _this.browserVersion = '';
          }
        }

        if (_this.browser == 'Edge') {
          _this.engine = 'EdgeHTML';
        }
        if (_this.browser == 'Chrome' && parseInt(_this.browserVersion) > 27) {
          _this.engine = 'Blink';
        }
        if (_this.browser == 'Opera' && parseInt(_this.browserVersion) > 12) {
          _this.engine = 'Blink';
        }
        if (_this.browser == 'Yandex') {
          _this.engine = 'Blink';
        }

        return _this.browser + '(版本:' + _this.browserVersion + ';内核:' + _this.engine + ')';
      }
    }
  })();
  // 逻辑层
  var LogicLibrary = (function () {
    return {
      DeviceInfoObj: function (params) {
        var info = {
          deviceType: MethodLibrary.getDeviceType(), // 设备类型
          deviceModel:result.device.model,//设备型号只有手机可以读取到
          deviceVendor:result.device.vendor, //设备牌子只有手机可以读取到
          PluginName:MethodLibrary.matchPluginName()[0],//插件信息
          PluginNameBrowserInfo:MethodLibrary.matchPluginName()[1], //根据插件名称确认的浏览器
          os: MethodLibrary.getOS().toLowerCase() == result.os.name.toLowerCase() ? MethodLibrary.getOS() : result.os.name, // 操作系统
          osVersion: MethodLibrary.getOSVersion(), // 操作系统版本
          screenHeight: _window.screen.height, // 屏幕高
          screenWidth: _window.screen.width, // 屏幕宽
          wbHeight: _window.innerHeight, // 浏览器可用区域高度
          wbWidth: _window.innerWidth, // 浏览器可用区域宽度
          language: MethodLibrary.getLanguage(), // 当前使用的语言-国家
          netWork: MethodLibrary.getNetwork(), // 联网类型
          cpu:result.cpu.architecture,//cpu
          orientation: MethodLibrary.getOrientationStatu(), // 横竖屏
          browserInfo: MethodLibrary.getBrowserInfo().includes(result.browser.name) ? MethodLibrary.getBrowserInfo() : `${result.browser.name}(版本：${result.browser.version};内核：${result.engine.name})`, // 浏览器信息
          fingerprint: MethodLibrary.createFingerprint(params.domain), // 浏览器指纹
          userAgent: VariableLibrary.navigator.userAgent, // 包含 appCodeName,appName,appVersion,language,platform 等
          platform:_window.navigator.platform, //操作系统
          cookieEnabled:_window.navigator.cookieEnabled, //cookie 是否开启
          plugins:_window.navigator.plugins.length //插件个数
        };
        if (!params.info || params.info.length == 0) {
          return info;
        } else {
          var infoTemp = {};
          for (var i in info) {
            params.info.forEach(function (item) {
              if (item.toLowerCase() == i.toLowerCase()) {
                item = i;
                infoTemp[item] = info[item];
              }
            })
          }
          return infoTemp;
        }
      }
    }
  })();
  // 对外暴露方法
  return {
    getDeviceInfo: function (params) {
      return LogicLibrary.DeviceInfoObj(params);
    }
  }
})();
/*!
 * ///网上找的 比较全面的方法end
 */

var parser = new UAParser();
var result = parser.getResult();
// console.time('shebei')
// console.log(DeviceInfo.getDeviceInfo({domain: ''}))
// console.timeEnd('shebei')

export default function deviceInfo(){
  return DeviceInfo.getDeviceInfo({domain: ''})
}

