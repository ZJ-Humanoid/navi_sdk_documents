import {
  __commonJS
} from "./chunk-G3PMV62Z.js";

// node_modules/katex/dist/katex.js
var require_katex = __commonJS({
  "node_modules/katex/dist/katex.js"(exports, module) {
    (function webpackUniversalModuleDefinition(root, factory) {
      if (typeof exports === "object" && typeof module === "object")
        module.exports = factory();
      else if (typeof define === "function" && define.amd)
        define([], factory);
      else if (typeof exports === "object")
        exports["katex"] = factory();
      else
        root["katex"] = factory();
    })(typeof self !== "undefined" ? self : exports, function() {
      return (
        /******/
        function() {
          "use strict";
          var __webpack_require__ = {};
          !function() {
            __webpack_require__.d = function(exports2, definition) {
              for (var key in definition) {
                if (__webpack_require__.o(definition, key) && !__webpack_require__.o(exports2, key)) {
                  Object.defineProperty(exports2, key, { enumerable: true, get: definition[key] });
                }
              }
            };
          }();
          !function() {
            __webpack_require__.o = function(obj, prop) {
              return Object.prototype.hasOwnProperty.call(obj, prop);
            };
          }();
          var __webpack_exports__ = {};
          __webpack_require__.d(__webpack_exports__, {
            "default": function() {
              return (
                /* binding */
                katex_webpack
              );
            }
          });
          ;
          class ParseError {
            // Error start position based on passed-in Token or ParseNode.
            // Length of affected text based on passed-in Token or ParseNode.
            // The underlying error message without any context added.
            constructor(message, token) {
              this.name = void 0;
              this.position = void 0;
              this.length = void 0;
              this.rawMessage = void 0;
              let error = "KaTeX parse error: " + message;
              let start;
              let end;
              const loc = token && token.loc;
              if (loc && loc.start <= loc.end) {
                const input = loc.lexer.input;
                start = loc.start;
                end = loc.end;
                if (start === input.length) {
                  error += " at end of input: ";
                } else {
                  error += " at position " + (start + 1) + ": ";
                }
                const underlined = input.slice(start, end).replace(/[^]/g, "$&̲");
                let left;
                if (start > 15) {
                  left = "…" + input.slice(start - 15, start);
                } else {
                  left = input.slice(0, start);
                }
                let right;
                if (end + 15 < input.length) {
                  right = input.slice(end, end + 15) + "…";
                } else {
                  right = input.slice(end);
                }
                error += left + underlined + right;
              }
              const self2 = new Error(error);
              self2.name = "ParseError";
              self2.__proto__ = ParseError.prototype;
              self2.position = start;
              if (start != null && end != null) {
                self2.length = end - start;
              }
              self2.rawMessage = message;
              return self2;
            }
          }
          ParseError.prototype.__proto__ = Error.prototype;
          var src_ParseError = ParseError;
          ;
          const contains = function(list, elem) {
            return list.indexOf(elem) !== -1;
          };
          const deflt = function(setting, defaultIfUndefined) {
            return setting === void 0 ? defaultIfUndefined : setting;
          };
          const uppercase = /([A-Z])/g;
          const hyphenate = function(str) {
            return str.replace(uppercase, "-$1").toLowerCase();
          };
          const ESCAPE_LOOKUP = {
            "&": "&amp;",
            ">": "&gt;",
            "<": "&lt;",
            '"': "&quot;",
            "'": "&#x27;"
          };
          const ESCAPE_REGEX = /[&><"']/g;
          function utils_escape(text) {
            return String(text).replace(ESCAPE_REGEX, (match) => ESCAPE_LOOKUP[match]);
          }
          const getBaseElem = function(group) {
            if (group.type === "ordgroup") {
              if (group.body.length === 1) {
                return getBaseElem(group.body[0]);
              } else {
                return group;
              }
            } else if (group.type === "color") {
              if (group.body.length === 1) {
                return getBaseElem(group.body[0]);
              } else {
                return group;
              }
            } else if (group.type === "font") {
              return getBaseElem(group.body);
            } else {
              return group;
            }
          };
          const isCharacterBox = function(group) {
            const baseElem = getBaseElem(group);
            return baseElem.type === "mathord" || baseElem.type === "textord" || baseElem.type === "atom";
          };
          const assert = function(value) {
            if (!value) {
              throw new Error("Expected non-null, but got " + String(value));
            }
            return value;
          };
          const protocolFromUrl = function(url) {
            const protocol = /^[\x00-\x20]*([^\\/#?]*?)(:|&#0*58|&#x0*3a|&colon)/i.exec(url);
            if (!protocol) {
              return "_relative";
            }
            if (protocol[2] !== ":") {
              return null;
            }
            if (!/^[a-zA-Z][a-zA-Z0-9+\-.]*$/.test(protocol[1])) {
              return null;
            }
            return protocol[1].toLowerCase();
          };
          var utils = {
            contains,
            deflt,
            escape: utils_escape,
            hyphenate,
            getBaseElem,
            isCharacterBox,
            protocolFromUrl
          };
          ;
          const SETTINGS_SCHEMA = {
            displayMode: {
              type: "boolean",
              description: "Render math in display mode, which puts the math in display style (so \\int and \\sum are large, for example), and centers the math on the page on its own line.",
              cli: "-d, --display-mode"
            },
            output: {
              type: {
                enum: ["htmlAndMathml", "html", "mathml"]
              },
              description: "Determines the markup language of the output.",
              cli: "-F, --format <type>"
            },
            leqno: {
              type: "boolean",
              description: "Render display math in leqno style (left-justified tags)."
            },
            fleqn: {
              type: "boolean",
              description: "Render display math flush left."
            },
            throwOnError: {
              type: "boolean",
              default: true,
              cli: "-t, --no-throw-on-error",
              cliDescription: "Render errors (in the color given by --error-color) instead of throwing a ParseError exception when encountering an error."
            },
            errorColor: {
              type: "string",
              default: "#cc0000",
              cli: "-c, --error-color <color>",
              cliDescription: "A color string given in the format 'rgb' or 'rrggbb' (no #). This option determines the color of errors rendered by the -t option.",
              cliProcessor: (color) => "#" + color
            },
            macros: {
              type: "object",
              cli: "-m, --macro <def>",
              cliDescription: "Define custom macro of the form '\\foo:expansion' (use multiple -m arguments for multiple macros).",
              cliDefault: [],
              cliProcessor: (def, defs) => {
                defs.push(def);
                return defs;
              }
            },
            minRuleThickness: {
              type: "number",
              description: "Specifies a minimum thickness, in ems, for fraction lines, `\\sqrt` top lines, `{array}` vertical lines, `\\hline`, `\\hdashline`, `\\underline`, `\\overline`, and the borders of `\\fbox`, `\\boxed`, and `\\fcolorbox`.",
              processor: (t) => Math.max(0, t),
              cli: "--min-rule-thickness <size>",
              cliProcessor: parseFloat
            },
            colorIsTextColor: {
              type: "boolean",
              description: "Makes \\color behave like LaTeX's 2-argument \\textcolor, instead of LaTeX's one-argument \\color mode change.",
              cli: "-b, --color-is-text-color"
            },
            strict: {
              type: [{
                enum: ["warn", "ignore", "error"]
              }, "boolean", "function"],
              description: "Turn on strict / LaTeX faithfulness mode, which throws an error if the input uses features that are not supported by LaTeX.",
              cli: "-S, --strict",
              cliDefault: false
            },
            trust: {
              type: ["boolean", "function"],
              description: "Trust the input, enabling all HTML features such as \\url.",
              cli: "-T, --trust"
            },
            maxSize: {
              type: "number",
              default: Infinity,
              description: "If non-zero, all user-specified sizes, e.g. in \\rule{500em}{500em}, will be capped to maxSize ems. Otherwise, elements and spaces can be arbitrarily large",
              processor: (s) => Math.max(0, s),
              cli: "-s, --max-size <n>",
              cliProcessor: parseInt
            },
            maxExpand: {
              type: "number",
              default: 1e3,
              description: "Limit the number of macro expansions to the specified number, to prevent e.g. infinite macro loops. If set to Infinity, the macro expander will try to fully expand as in LaTeX.",
              processor: (n) => Math.max(0, n),
              cli: "-e, --max-expand <n>",
              cliProcessor: (n) => n === "Infinity" ? Infinity : parseInt(n)
            },
            globalGroup: {
              type: "boolean",
              cli: false
            }
          };
          function getDefaultValue(schema4) {
            if (schema4.default) {
              return schema4.default;
            }
            const type = schema4.type;
            const defaultType = Array.isArray(type) ? type[0] : type;
            if (typeof defaultType !== "string") {
              return defaultType.enum[0];
            }
            switch (defaultType) {
              case "boolean":
                return false;
              case "string":
                return "";
              case "number":
                return 0;
              case "object":
                return {};
            }
          }
          class Settings {
            constructor(options) {
              this.displayMode = void 0;
              this.output = void 0;
              this.leqno = void 0;
              this.fleqn = void 0;
              this.throwOnError = void 0;
              this.errorColor = void 0;
              this.macros = void 0;
              this.minRuleThickness = void 0;
              this.colorIsTextColor = void 0;
              this.strict = void 0;
              this.trust = void 0;
              this.maxSize = void 0;
              this.maxExpand = void 0;
              this.globalGroup = void 0;
              options = options || {};
              for (const prop in SETTINGS_SCHEMA) {
                if (SETTINGS_SCHEMA.hasOwnProperty(prop)) {
                  const schema4 = SETTINGS_SCHEMA[prop];
                  this[prop] = options[prop] !== void 0 ? schema4.processor ? schema4.processor(options[prop]) : options[prop] : getDefaultValue(schema4);
                }
              }
            }
            /**
             * Report nonstrict (non-LaTeX-compatible) input.
             * Can safely not be called if `this.strict` is false in JavaScript.
             */
            reportNonstrict(errorCode, errorMsg, token) {
              let strict = this.strict;
              if (typeof strict === "function") {
                strict = strict(errorCode, errorMsg, token);
              }
              if (!strict || strict === "ignore") {
                return;
              } else if (strict === true || strict === "error") {
                throw new src_ParseError("LaTeX-incompatible input and strict mode is set to 'error': " + (errorMsg + " [" + errorCode + "]"), token);
              } else if (strict === "warn") {
                typeof console !== "undefined" && console.warn("LaTeX-incompatible input and strict mode is set to 'warn': " + (errorMsg + " [" + errorCode + "]"));
              } else {
                typeof console !== "undefined" && console.warn("LaTeX-incompatible input and strict mode is set to " + ("unrecognized '" + strict + "': " + errorMsg + " [" + errorCode + "]"));
              }
            }
            /**
             * Check whether to apply strict (LaTeX-adhering) behavior for unusual
             * input (like `\\`).  Unlike `nonstrict`, will not throw an error;
             * instead, "error" translates to a return value of `true`, while "ignore"
             * translates to a return value of `false`.  May still print a warning:
             * "warn" prints a warning and returns `false`.
             * This is for the second category of `errorCode`s listed in the README.
             */
            useStrictBehavior(errorCode, errorMsg, token) {
              let strict = this.strict;
              if (typeof strict === "function") {
                try {
                  strict = strict(errorCode, errorMsg, token);
                } catch (error) {
                  strict = "error";
                }
              }
              if (!strict || strict === "ignore") {
                return false;
              } else if (strict === true || strict === "error") {
                return true;
              } else if (strict === "warn") {
                typeof console !== "undefined" && console.warn("LaTeX-incompatible input and strict mode is set to 'warn': " + (errorMsg + " [" + errorCode + "]"));
                return false;
              } else {
                typeof console !== "undefined" && console.warn("LaTeX-incompatible input and strict mode is set to " + ("unrecognized '" + strict + "': " + errorMsg + " [" + errorCode + "]"));
                return false;
              }
            }
            /**
             * Check whether to test potentially dangerous input, and return
             * `true` (trusted) or `false` (untrusted).  The sole argument `context`
             * should be an object with `command` field specifying the relevant LaTeX
             * command (as a string starting with `\`), and any other arguments, etc.
             * If `context` has a `url` field, a `protocol` field will automatically
             * get added by this function (changing the specified object).
             */
            isTrusted(context) {
              if (context.url && !context.protocol) {
                const protocol = utils.protocolFromUrl(context.url);
                if (protocol == null) {
                  return false;
                }
                context.protocol = protocol;
              }
              const trust = typeof this.trust === "function" ? this.trust(context) : this.trust;
              return Boolean(trust);
            }
          }
          ;
          class Style {
            constructor(id, size, cramped) {
              this.id = void 0;
              this.size = void 0;
              this.cramped = void 0;
              this.id = id;
              this.size = size;
              this.cramped = cramped;
            }
            /**
             * Get the style of a superscript given a base in the current style.
             */
            sup() {
              return styles[sup[this.id]];
            }
            /**
             * Get the style of a subscript given a base in the current style.
             */
            sub() {
              return styles[sub[this.id]];
            }
            /**
             * Get the style of a fraction numerator given the fraction in the current
             * style.
             */
            fracNum() {
              return styles[fracNum[this.id]];
            }
            /**
             * Get the style of a fraction denominator given the fraction in the current
             * style.
             */
            fracDen() {
              return styles[fracDen[this.id]];
            }
            /**
             * Get the cramped version of a style (in particular, cramping a cramped style
             * doesn't change the style).
             */
            cramp() {
              return styles[cramp[this.id]];
            }
            /**
             * Get a text or display version of this style.
             */
            text() {
              return styles[Style_text[this.id]];
            }
            /**
             * Return true if this style is tightly spaced (scriptstyle/scriptscriptstyle)
             */
            isTight() {
              return this.size >= 2;
            }
          }
          const D = 0;
          const Dc = 1;
          const T = 2;
          const Tc = 3;
          const S = 4;
          const Sc = 5;
          const SS = 6;
          const SSc = 7;
          const styles = [new Style(D, 0, false), new Style(Dc, 0, true), new Style(T, 1, false), new Style(Tc, 1, true), new Style(S, 2, false), new Style(Sc, 2, true), new Style(SS, 3, false), new Style(SSc, 3, true)];
          const sup = [S, Sc, S, Sc, SS, SSc, SS, SSc];
          const sub = [Sc, Sc, Sc, Sc, SSc, SSc, SSc, SSc];
          const fracNum = [T, Tc, S, Sc, SS, SSc, SS, SSc];
          const fracDen = [Tc, Tc, Sc, Sc, SSc, SSc, SSc, SSc];
          const cramp = [Dc, Dc, Tc, Tc, Sc, Sc, SSc, SSc];
          const Style_text = [D, Dc, T, Tc, T, Tc, T, Tc];
          var src_Style = {
            DISPLAY: styles[D],
            TEXT: styles[T],
            SCRIPT: styles[S],
            SCRIPTSCRIPT: styles[SS]
          };
          ;
          const scriptData = [{
            // Latin characters beyond the Latin-1 characters we have metrics for.
            // Needed for Czech, Hungarian and Turkish text, for example.
            name: "latin",
            blocks: [
              [256, 591],
              // Latin Extended-A and Latin Extended-B
              [768, 879]
              // Combining Diacritical marks
            ]
          }, {
            // The Cyrillic script used by Russian and related languages.
            // A Cyrillic subset used to be supported as explicitly defined
            // symbols in symbols.js
            name: "cyrillic",
            blocks: [[1024, 1279]]
          }, {
            // Armenian
            name: "armenian",
            blocks: [[1328, 1423]]
          }, {
            // The Brahmic scripts of South and Southeast Asia
            // Devanagari (0900–097F)
            // Bengali (0980–09FF)
            // Gurmukhi (0A00–0A7F)
            // Gujarati (0A80–0AFF)
            // Oriya (0B00–0B7F)
            // Tamil (0B80–0BFF)
            // Telugu (0C00–0C7F)
            // Kannada (0C80–0CFF)
            // Malayalam (0D00–0D7F)
            // Sinhala (0D80–0DFF)
            // Thai (0E00–0E7F)
            // Lao (0E80–0EFF)
            // Tibetan (0F00–0FFF)
            // Myanmar (1000–109F)
            name: "brahmic",
            blocks: [[2304, 4255]]
          }, {
            name: "georgian",
            blocks: [[4256, 4351]]
          }, {
            // Chinese and Japanese.
            // The "k" in cjk is for Korean, but we've separated Korean out
            name: "cjk",
            blocks: [
              [12288, 12543],
              // CJK symbols and punctuation, Hiragana, Katakana
              [19968, 40879],
              // CJK ideograms
              [65280, 65376]
              // Fullwidth punctuation
              // TODO: add halfwidth Katakana and Romanji glyphs
            ]
          }, {
            // Korean
            name: "hangul",
            blocks: [[44032, 55215]]
          }];
          function scriptFromCodepoint(codepoint) {
            for (let i = 0; i < scriptData.length; i++) {
              const script = scriptData[i];
              for (let i2 = 0; i2 < script.blocks.length; i2++) {
                const block = script.blocks[i2];
                if (codepoint >= block[0] && codepoint <= block[1]) {
                  return script.name;
                }
              }
            }
            return null;
          }
          const allBlocks = [];
          scriptData.forEach((s) => s.blocks.forEach((b) => allBlocks.push(...b)));
          function supportedCodepoint(codepoint) {
            for (let i = 0; i < allBlocks.length; i += 2) {
              if (codepoint >= allBlocks[i] && codepoint <= allBlocks[i + 1]) {
                return true;
              }
            }
            return false;
          }
          ;
          const hLinePad = 80;
          const sqrtMain = function(extraVinculum, hLinePad2) {
            return "M95," + (622 + extraVinculum + hLinePad2) + "\nc-2.7,0,-7.17,-2.7,-13.5,-8c-5.8,-5.3,-9.5,-10,-9.5,-14\nc0,-2,0.3,-3.3,1,-4c1.3,-2.7,23.83,-20.7,67.5,-54\nc44.2,-33.3,65.8,-50.3,66.5,-51c1.3,-1.3,3,-2,5,-2c4.7,0,8.7,3.3,12,10\ns173,378,173,378c0.7,0,35.3,-71,104,-213c68.7,-142,137.5,-285,206.5,-429\nc69,-144,104.5,-217.7,106.5,-221\nl" + extraVinculum / 2.075 + " -" + extraVinculum + "\nc5.3,-9.3,12,-14,20,-14\nH400000v" + (40 + extraVinculum) + "H845.2724\ns-225.272,467,-225.272,467s-235,486,-235,486c-2.7,4.7,-9,7,-19,7\nc-6,0,-10,-1,-12,-3s-194,-422,-194,-422s-65,47,-65,47z\nM" + (834 + extraVinculum) + " " + hLinePad2 + "h400000v" + (40 + extraVinculum) + "h-400000z";
          };
          const sqrtSize1 = function(extraVinculum, hLinePad2) {
            return "M263," + (601 + extraVinculum + hLinePad2) + "c0.7,0,18,39.7,52,119\nc34,79.3,68.167,158.7,102.5,238c34.3,79.3,51.8,119.3,52.5,120\nc340,-704.7,510.7,-1060.3,512,-1067\nl" + extraVinculum / 2.084 + " -" + extraVinculum + "\nc4.7,-7.3,11,-11,19,-11\nH40000v" + (40 + extraVinculum) + "H1012.3\ns-271.3,567,-271.3,567c-38.7,80.7,-84,175,-136,283c-52,108,-89.167,185.3,-111.5,232\nc-22.3,46.7,-33.8,70.3,-34.5,71c-4.7,4.7,-12.3,7,-23,7s-12,-1,-12,-1\ns-109,-253,-109,-253c-72.7,-168,-109.3,-252,-110,-252c-10.7,8,-22,16.7,-34,26\nc-22,17.3,-33.3,26,-34,26s-26,-26,-26,-26s76,-59,76,-59s76,-60,76,-60z\nM" + (1001 + extraVinculum) + " " + hLinePad2 + "h400000v" + (40 + extraVinculum) + "h-400000z";
          };
          const sqrtSize2 = function(extraVinculum, hLinePad2) {
            return "M983 " + (10 + extraVinculum + hLinePad2) + "\nl" + extraVinculum / 3.13 + " -" + extraVinculum + "\nc4,-6.7,10,-10,18,-10 H400000v" + (40 + extraVinculum) + "\nH1013.1s-83.4,268,-264.1,840c-180.7,572,-277,876.3,-289,913c-4.7,4.7,-12.7,7,-24,7\ns-12,0,-12,0c-1.3,-3.3,-3.7,-11.7,-7,-25c-35.3,-125.3,-106.7,-373.3,-214,-744\nc-10,12,-21,25,-33,39s-32,39,-32,39c-6,-5.3,-15,-14,-27,-26s25,-30,25,-30\nc26.7,-32.7,52,-63,76,-91s52,-60,52,-60s208,722,208,722\nc56,-175.3,126.3,-397.3,211,-666c84.7,-268.7,153.8,-488.2,207.5,-658.5\nc53.7,-170.3,84.5,-266.8,92.5,-289.5z\nM" + (1001 + extraVinculum) + " " + hLinePad2 + "h400000v" + (40 + extraVinculum) + "h-400000z";
          };
          const sqrtSize3 = function(extraVinculum, hLinePad2) {
            return "M424," + (2398 + extraVinculum + hLinePad2) + "\nc-1.3,-0.7,-38.5,-172,-111.5,-514c-73,-342,-109.8,-513.3,-110.5,-514\nc0,-2,-10.7,14.3,-32,49c-4.7,7.3,-9.8,15.7,-15.5,25c-5.7,9.3,-9.8,16,-12.5,20\ns-5,7,-5,7c-4,-3.3,-8.3,-7.7,-13,-13s-13,-13,-13,-13s76,-122,76,-122s77,-121,77,-121\ns209,968,209,968c0,-2,84.7,-361.7,254,-1079c169.3,-717.3,254.7,-1077.7,256,-1081\nl" + extraVinculum / 4.223 + " -" + extraVinculum + "c4,-6.7,10,-10,18,-10 H400000\nv" + (40 + extraVinculum) + "H1014.6\ns-87.3,378.7,-272.6,1166c-185.3,787.3,-279.3,1182.3,-282,1185\nc-2,6,-10,9,-24,9\nc-8,0,-12,-0.7,-12,-2z M" + (1001 + extraVinculum) + " " + hLinePad2 + "\nh400000v" + (40 + extraVinculum) + "h-400000z";
          };
          const sqrtSize4 = function(extraVinculum, hLinePad2) {
            return "M473," + (2713 + extraVinculum + hLinePad2) + "\nc339.3,-1799.3,509.3,-2700,510,-2702 l" + extraVinculum / 5.298 + " -" + extraVinculum + "\nc3.3,-7.3,9.3,-11,18,-11 H400000v" + (40 + extraVinculum) + "H1017.7\ns-90.5,478,-276.2,1466c-185.7,988,-279.5,1483,-281.5,1485c-2,6,-10,9,-24,9\nc-8,0,-12,-0.7,-12,-2c0,-1.3,-5.3,-32,-16,-92c-50.7,-293.3,-119.7,-693.3,-207,-1200\nc0,-1.3,-5.3,8.7,-16,30c-10.7,21.3,-21.3,42.7,-32,64s-16,33,-16,33s-26,-26,-26,-26\ns76,-153,76,-153s77,-151,77,-151c0.7,0.7,35.7,202,105,604c67.3,400.7,102,602.7,104,\n606zM" + (1001 + extraVinculum) + " " + hLinePad2 + "h400000v" + (40 + extraVinculum) + "H1017.7z";
          };
          const phasePath = function(y) {
            const x = y / 2;
            return "M400000 " + y + " H0 L" + x + " 0 l65 45 L145 " + (y - 80) + " H400000z";
          };
          const sqrtTall = function(extraVinculum, hLinePad2, viewBoxHeight) {
            const vertSegment = viewBoxHeight - 54 - hLinePad2 - extraVinculum;
            return "M702 " + (extraVinculum + hLinePad2) + "H400000" + (40 + extraVinculum) + "\nH742v" + vertSegment + "l-4 4-4 4c-.667.7 -2 1.5-4 2.5s-4.167 1.833-6.5 2.5-5.5 1-9.5 1\nh-12l-28-84c-16.667-52-96.667 -294.333-240-727l-212 -643 -85 170\nc-4-3.333-8.333-7.667-13 -13l-13-13l77-155 77-156c66 199.333 139 419.667\n219 661 l218 661zM702 " + hLinePad2 + "H400000v" + (40 + extraVinculum) + "H742z";
          };
          const sqrtPath = function(size, extraVinculum, viewBoxHeight) {
            extraVinculum = 1e3 * extraVinculum;
            let path2 = "";
            switch (size) {
              case "sqrtMain":
                path2 = sqrtMain(extraVinculum, hLinePad);
                break;
              case "sqrtSize1":
                path2 = sqrtSize1(extraVinculum, hLinePad);
                break;
              case "sqrtSize2":
                path2 = sqrtSize2(extraVinculum, hLinePad);
                break;
              case "sqrtSize3":
                path2 = sqrtSize3(extraVinculum, hLinePad);
                break;
              case "sqrtSize4":
                path2 = sqrtSize4(extraVinculum, hLinePad);
                break;
              case "sqrtTall":
                path2 = sqrtTall(extraVinculum, hLinePad, viewBoxHeight);
            }
            return path2;
          };
          const innerPath = function(name, height) {
            switch (name) {
              case "⎜":
                return "M291 0 H417 V" + height + " H291z M291 0 H417 V" + height + " H291z";
              case "∣":
                return "M145 0 H188 V" + height + " H145z M145 0 H188 V" + height + " H145z";
              case "∥":
                return "M145 0 H188 V" + height + " H145z M145 0 H188 V" + height + " H145z" + ("M367 0 H410 V" + height + " H367z M367 0 H410 V" + height + " H367z");
              case "⎟":
                return "M457 0 H583 V" + height + " H457z M457 0 H583 V" + height + " H457z";
              case "⎢":
                return "M319 0 H403 V" + height + " H319z M319 0 H403 V" + height + " H319z";
              case "⎥":
                return "M263 0 H347 V" + height + " H263z M263 0 H347 V" + height + " H263z";
              case "⎪":
                return "M384 0 H504 V" + height + " H384z M384 0 H504 V" + height + " H384z";
              case "⏐":
                return "M312 0 H355 V" + height + " H312z M312 0 H355 V" + height + " H312z";
              case "‖":
                return "M257 0 H300 V" + height + " H257z M257 0 H300 V" + height + " H257z" + ("M478 0 H521 V" + height + " H478z M478 0 H521 V" + height + " H478z");
              default:
                return "";
            }
          };
          const path = {
            // The doubleleftarrow geometry is from glyph U+21D0 in the font KaTeX Main
            doubleleftarrow: "M262 157\nl10-10c34-36 62.7-77 86-123 3.3-8 5-13.3 5-16 0-5.3-6.7-8-20-8-7.3\n 0-12.2.5-14.5 1.5-2.3 1-4.8 4.5-7.5 10.5-49.3 97.3-121.7 169.3-217 216-28\n 14-57.3 25-88 33-6.7 2-11 3.8-13 5.5-2 1.7-3 4.2-3 7.5s1 5.8 3 7.5\nc2 1.7 6.3 3.5 13 5.5 68 17.3 128.2 47.8 180.5 91.5 52.3 43.7 93.8 96.2 124.5\n 157.5 9.3 8 15.3 12.3 18 13h6c12-.7 18-4 18-10 0-2-1.7-7-5-15-23.3-46-52-87\n-86-123l-10-10h399738v-40H218c328 0 0 0 0 0l-10-8c-26.7-20-65.7-43-117-69 2.7\n-2 6-3.7 10-5 36.7-16 72.3-37.3 107-64l10-8h399782v-40z\nm8 0v40h399730v-40zm0 194v40h399730v-40z",
            // doublerightarrow is from glyph U+21D2 in font KaTeX Main
            doublerightarrow: "M399738 392l\n-10 10c-34 36-62.7 77-86 123-3.3 8-5 13.3-5 16 0 5.3 6.7 8 20 8 7.3 0 12.2-.5\n 14.5-1.5 2.3-1 4.8-4.5 7.5-10.5 49.3-97.3 121.7-169.3 217-216 28-14 57.3-25 88\n-33 6.7-2 11-3.8 13-5.5 2-1.7 3-4.2 3-7.5s-1-5.8-3-7.5c-2-1.7-6.3-3.5-13-5.5-68\n-17.3-128.2-47.8-180.5-91.5-52.3-43.7-93.8-96.2-124.5-157.5-9.3-8-15.3-12.3-18\n-13h-6c-12 .7-18 4-18 10 0 2 1.7 7 5 15 23.3 46 52 87 86 123l10 10H0v40h399782\nc-328 0 0 0 0 0l10 8c26.7 20 65.7 43 117 69-2.7 2-6 3.7-10 5-36.7 16-72.3 37.3\n-107 64l-10 8H0v40zM0 157v40h399730v-40zm0 194v40h399730v-40z",
            // leftarrow is from glyph U+2190 in font KaTeX Main
            leftarrow: "M400000 241H110l3-3c68.7-52.7 113.7-120\n 135-202 4-14.7 6-23 6-25 0-7.3-7-11-21-11-8 0-13.2.8-15.5 2.5-2.3 1.7-4.2 5.8\n-5.5 12.5-1.3 4.7-2.7 10.3-4 17-12 48.7-34.8 92-68.5 130S65.3 228.3 18 247\nc-10 4-16 7.7-18 11 0 8.7 6 14.3 18 17 47.3 18.7 87.8 47 121.5 85S196 441.3 208\n 490c.7 2 1.3 5 2 9s1.2 6.7 1.5 8c.3 1.3 1 3.3 2 6s2.2 4.5 3.5 5.5c1.3 1 3.3\n 1.8 6 2.5s6 1 10 1c14 0 21-3.7 21-11 0-2-2-10.3-6-25-20-79.3-65-146.7-135-202\n l-3-3h399890zM100 241v40h399900v-40z",
            // overbrace is from glyphs U+23A9/23A8/23A7 in font KaTeX_Size4-Regular
            leftbrace: "M6 548l-6-6v-35l6-11c56-104 135.3-181.3 238-232 57.3-28.7 117\n-45 179-50h399577v120H403c-43.3 7-81 15-113 26-100.7 33-179.7 91-237 174-2.7\n 5-6 9-10 13-.7 1-7.3 1-20 1H6z",
            leftbraceunder: "M0 6l6-6h17c12.688 0 19.313.3 20 1 4 4 7.313 8.3 10 13\n 35.313 51.3 80.813 93.8 136.5 127.5 55.688 33.7 117.188 55.8 184.5 66.5.688\n 0 2 .3 4 1 18.688 2.7 76 4.3 172 5h399450v120H429l-6-1c-124.688-8-235-61.7\n-331-161C60.687 138.7 32.312 99.3 7 54L0 41V6z",
            // overgroup is from the MnSymbol package (public domain)
            leftgroup: "M400000 80\nH435C64 80 168.3 229.4 21 260c-5.9 1.2-18 0-18 0-2 0-3-1-3-3v-38C76 61 257 0\n 435 0h399565z",
            leftgroupunder: "M400000 262\nH435C64 262 168.3 112.6 21 82c-5.9-1.2-18 0-18 0-2 0-3 1-3 3v38c76 158 257 219\n 435 219h399565z",
            // Harpoons are from glyph U+21BD in font KaTeX Main
            leftharpoon: "M0 267c.7 5.3 3 10 7 14h399993v-40H93c3.3\n-3.3 10.2-9.5 20.5-18.5s17.8-15.8 22.5-20.5c50.7-52 88-110.3 112-175 4-11.3 5\n-18.3 3-21-1.3-4-7.3-6-18-6-8 0-13 .7-15 2s-4.7 6.7-8 16c-42 98.7-107.3 174.7\n-196 228-6.7 4.7-10.7 8-12 10-1.3 2-2 5.7-2 11zm100-26v40h399900v-40z",
            leftharpoonplus: "M0 267c.7 5.3 3 10 7 14h399993v-40H93c3.3-3.3 10.2-9.5\n 20.5-18.5s17.8-15.8 22.5-20.5c50.7-52 88-110.3 112-175 4-11.3 5-18.3 3-21-1.3\n-4-7.3-6-18-6-8 0-13 .7-15 2s-4.7 6.7-8 16c-42 98.7-107.3 174.7-196 228-6.7 4.7\n-10.7 8-12 10-1.3 2-2 5.7-2 11zm100-26v40h399900v-40zM0 435v40h400000v-40z\nm0 0v40h400000v-40z",
            leftharpoondown: "M7 241c-4 4-6.333 8.667-7 14 0 5.333.667 9 2 11s5.333\n 5.333 12 10c90.667 54 156 130 196 228 3.333 10.667 6.333 16.333 9 17 2 .667 5\n 1 9 1h5c10.667 0 16.667-2 18-6 2-2.667 1-9.667-3-21-32-87.333-82.667-157.667\n-152-211l-3-3h399907v-40zM93 281 H400000 v-40L7 241z",
            leftharpoondownplus: "M7 435c-4 4-6.3 8.7-7 14 0 5.3.7 9 2 11s5.3 5.3 12\n 10c90.7 54 156 130 196 228 3.3 10.7 6.3 16.3 9 17 2 .7 5 1 9 1h5c10.7 0 16.7\n-2 18-6 2-2.7 1-9.7-3-21-32-87.3-82.7-157.7-152-211l-3-3h399907v-40H7zm93 0\nv40h399900v-40zM0 241v40h399900v-40zm0 0v40h399900v-40z",
            // hook is from glyph U+21A9 in font KaTeX Main
            lefthook: "M400000 281 H103s-33-11.2-61-33.5S0 197.3 0 164s14.2-61.2 42.5\n-83.5C70.8 58.2 104 47 142 47 c16.7 0 25 6.7 25 20 0 12-8.7 18.7-26 20-40 3.3\n-68.7 15.7-86 37-10 12-15 25.3-15 40 0 22.7 9.8 40.7 29.5 54 19.7 13.3 43.5 21\n 71.5 23h399859zM103 281v-40h399897v40z",
            leftlinesegment: "M40 281 V428 H0 V94 H40 V241 H400000 v40z\nM40 281 V428 H0 V94 H40 V241 H400000 v40z",
            leftmapsto: "M40 281 V448H0V74H40V241H400000v40z\nM40 281 V448H0V74H40V241H400000v40z",
            // tofrom is from glyph U+21C4 in font KaTeX AMS Regular
            leftToFrom: "M0 147h400000v40H0zm0 214c68 40 115.7 95.7 143 167h22c15.3 0 23\n-.3 23-1 0-1.3-5.3-13.7-16-37-18-35.3-41.3-69-70-101l-7-8h399905v-40H95l7-8\nc28.7-32 52-65.7 70-101 10.7-23.3 16-35.7 16-37 0-.7-7.7-1-23-1h-22C115.7 265.3\n 68 321 0 361zm0-174v-40h399900v40zm100 154v40h399900v-40z",
            longequal: "M0 50 h400000 v40H0z m0 194h40000v40H0z\nM0 50 h400000 v40H0z m0 194h40000v40H0z",
            midbrace: "M200428 334\nc-100.7-8.3-195.3-44-280-108-55.3-42-101.7-93-139-153l-9-14c-2.7 4-5.7 8.7-9 14\n-53.3 86.7-123.7 153-211 199-66.7 36-137.3 56.3-212 62H0V214h199568c178.3-11.7\n 311.7-78.3 403-201 6-8 9.7-12 11-12 .7-.7 6.7-1 18-1s17.3.3 18 1c1.3 0 5 4 11\n 12 44.7 59.3 101.3 106.3 170 141s145.3 54.3 229 60h199572v120z",
            midbraceunder: "M199572 214\nc100.7 8.3 195.3 44 280 108 55.3 42 101.7 93 139 153l9 14c2.7-4 5.7-8.7 9-14\n 53.3-86.7 123.7-153 211-199 66.7-36 137.3-56.3 212-62h199568v120H200432c-178.3\n 11.7-311.7 78.3-403 201-6 8-9.7 12-11 12-.7.7-6.7 1-18 1s-17.3-.3-18-1c-1.3 0\n-5-4-11-12-44.7-59.3-101.3-106.3-170-141s-145.3-54.3-229-60H0V214z",
            oiintSize1: "M512.6 71.6c272.6 0 320.3 106.8 320.3 178.2 0 70.8-47.7 177.6\n-320.3 177.6S193.1 320.6 193.1 249.8c0-71.4 46.9-178.2 319.5-178.2z\nm368.1 178.2c0-86.4-60.9-215.4-368.1-215.4-306.4 0-367.3 129-367.3 215.4 0 85.8\n60.9 214.8 367.3 214.8 307.2 0 368.1-129 368.1-214.8z",
            oiintSize2: "M757.8 100.1c384.7 0 451.1 137.6 451.1 230 0 91.3-66.4 228.8\n-451.1 228.8-386.3 0-452.7-137.5-452.7-228.8 0-92.4 66.4-230 452.7-230z\nm502.4 230c0-111.2-82.4-277.2-502.4-277.2s-504 166-504 277.2\nc0 110 84 276 504 276s502.4-166 502.4-276z",
            oiiintSize1: "M681.4 71.6c408.9 0 480.5 106.8 480.5 178.2 0 70.8-71.6 177.6\n-480.5 177.6S202.1 320.6 202.1 249.8c0-71.4 70.5-178.2 479.3-178.2z\nm525.8 178.2c0-86.4-86.8-215.4-525.7-215.4-437.9 0-524.7 129-524.7 215.4 0\n85.8 86.8 214.8 524.7 214.8 438.9 0 525.7-129 525.7-214.8z",
            oiiintSize2: "M1021.2 53c603.6 0 707.8 165.8 707.8 277.2 0 110-104.2 275.8\n-707.8 275.8-606 0-710.2-165.8-710.2-275.8C311 218.8 415.2 53 1021.2 53z\nm770.4 277.1c0-131.2-126.4-327.6-770.5-327.6S248.4 198.9 248.4 330.1\nc0 130 128.8 326.4 772.7 326.4s770.5-196.4 770.5-326.4z",
            rightarrow: "M0 241v40h399891c-47.3 35.3-84 78-110 128\n-16.7 32-27.7 63.7-33 95 0 1.3-.2 2.7-.5 4-.3 1.3-.5 2.3-.5 3 0 7.3 6.7 11 20\n 11 8 0 13.2-.8 15.5-2.5 2.3-1.7 4.2-5.5 5.5-11.5 2-13.3 5.7-27 11-41 14.7-44.7\n 39-84.5 73-119.5s73.7-60.2 119-75.5c6-2 9-5.7 9-11s-3-9-9-11c-45.3-15.3-85\n-40.5-119-75.5s-58.3-74.8-73-119.5c-4.7-14-8.3-27.3-11-40-1.3-6.7-3.2-10.8-5.5\n-12.5-2.3-1.7-7.5-2.5-15.5-2.5-14 0-21 3.7-21 11 0 2 2 10.3 6 25 20.7 83.3 67\n 151.7 139 205zm0 0v40h399900v-40z",
            rightbrace: "M400000 542l\n-6 6h-17c-12.7 0-19.3-.3-20-1-4-4-7.3-8.3-10-13-35.3-51.3-80.8-93.8-136.5-127.5\ns-117.2-55.8-184.5-66.5c-.7 0-2-.3-4-1-18.7-2.7-76-4.3-172-5H0V214h399571l6 1\nc124.7 8 235 61.7 331 161 31.3 33.3 59.7 72.7 85 118l7 13v35z",
            rightbraceunder: "M399994 0l6 6v35l-6 11c-56 104-135.3 181.3-238 232-57.3\n 28.7-117 45-179 50H-300V214h399897c43.3-7 81-15 113-26 100.7-33 179.7-91 237\n-174 2.7-5 6-9 10-13 .7-1 7.3-1 20-1h17z",
            rightgroup: "M0 80h399565c371 0 266.7 149.4 414 180 5.9 1.2 18 0 18 0 2 0\n 3-1 3-3v-38c-76-158-257-219-435-219H0z",
            rightgroupunder: "M0 262h399565c371 0 266.7-149.4 414-180 5.9-1.2 18 0 18\n 0 2 0 3 1 3 3v38c-76 158-257 219-435 219H0z",
            rightharpoon: "M0 241v40h399993c4.7-4.7 7-9.3 7-14 0-9.3\n-3.7-15.3-11-18-92.7-56.7-159-133.7-199-231-3.3-9.3-6-14.7-8-16-2-1.3-7-2-15-2\n-10.7 0-16.7 2-18 6-2 2.7-1 9.7 3 21 15.3 42 36.7 81.8 64 119.5 27.3 37.7 58\n 69.2 92 94.5zm0 0v40h399900v-40z",
            rightharpoonplus: "M0 241v40h399993c4.7-4.7 7-9.3 7-14 0-9.3-3.7-15.3-11\n-18-92.7-56.7-159-133.7-199-231-3.3-9.3-6-14.7-8-16-2-1.3-7-2-15-2-10.7 0-16.7\n 2-18 6-2 2.7-1 9.7 3 21 15.3 42 36.7 81.8 64 119.5 27.3 37.7 58 69.2 92 94.5z\nm0 0v40h399900v-40z m100 194v40h399900v-40zm0 0v40h399900v-40z",
            rightharpoondown: "M399747 511c0 7.3 6.7 11 20 11 8 0 13-.8 15-2.5s4.7-6.8\n 8-15.5c40-94 99.3-166.3 178-217 13.3-8 20.3-12.3 21-13 5.3-3.3 8.5-5.8 9.5\n-7.5 1-1.7 1.5-5.2 1.5-10.5s-2.3-10.3-7-15H0v40h399908c-34 25.3-64.7 57-92 95\n-27.3 38-48.7 77.7-64 119-3.3 8.7-5 14-5 16zM0 241v40h399900v-40z",
            rightharpoondownplus: "M399747 705c0 7.3 6.7 11 20 11 8 0 13-.8\n 15-2.5s4.7-6.8 8-15.5c40-94 99.3-166.3 178-217 13.3-8 20.3-12.3 21-13 5.3-3.3\n 8.5-5.8 9.5-7.5 1-1.7 1.5-5.2 1.5-10.5s-2.3-10.3-7-15H0v40h399908c-34 25.3\n-64.7 57-92 95-27.3 38-48.7 77.7-64 119-3.3 8.7-5 14-5 16zM0 435v40h399900v-40z\nm0-194v40h400000v-40zm0 0v40h400000v-40z",
            righthook: "M399859 241c-764 0 0 0 0 0 40-3.3 68.7-15.7 86-37 10-12 15-25.3\n 15-40 0-22.7-9.8-40.7-29.5-54-19.7-13.3-43.5-21-71.5-23-17.3-1.3-26-8-26-20 0\n-13.3 8.7-20 26-20 38 0 71 11.2 99 33.5 0 0 7 5.6 21 16.7 14 11.2 21 33.5 21\n 66.8s-14 61.2-42 83.5c-28 22.3-61 33.5-99 33.5L0 241z M0 281v-40h399859v40z",
            rightlinesegment: "M399960 241 V94 h40 V428 h-40 V281 H0 v-40z\nM399960 241 V94 h40 V428 h-40 V281 H0 v-40z",
            rightToFrom: "M400000 167c-70.7-42-118-97.7-142-167h-23c-15.3 0-23 .3-23\n 1 0 1.3 5.3 13.7 16 37 18 35.3 41.3 69 70 101l7 8H0v40h399905l-7 8c-28.7 32\n-52 65.7-70 101-10.7 23.3-16 35.7-16 37 0 .7 7.7 1 23 1h23c24-69.3 71.3-125 142\n-167z M100 147v40h399900v-40zM0 341v40h399900v-40z",
            // twoheadleftarrow is from glyph U+219E in font KaTeX AMS Regular
            twoheadleftarrow: "M0 167c68 40\n 115.7 95.7 143 167h22c15.3 0 23-.3 23-1 0-1.3-5.3-13.7-16-37-18-35.3-41.3-69\n-70-101l-7-8h125l9 7c50.7 39.3 85 86 103 140h46c0-4.7-6.3-18.7-19-42-18-35.3\n-40-67.3-66-96l-9-9h399716v-40H284l9-9c26-28.7 48-60.7 66-96 12.7-23.333 19\n-37.333 19-42h-46c-18 54-52.3 100.7-103 140l-9 7H95l7-8c28.7-32 52-65.7 70-101\n 10.7-23.333 16-35.7 16-37 0-.7-7.7-1-23-1h-22C115.7 71.3 68 127 0 167z",
            twoheadrightarrow: "M400000 167\nc-68-40-115.7-95.7-143-167h-22c-15.3 0-23 .3-23 1 0 1.3 5.3 13.7 16 37 18 35.3\n 41.3 69 70 101l7 8h-125l-9-7c-50.7-39.3-85-86-103-140h-46c0 4.7 6.3 18.7 19 42\n 18 35.3 40 67.3 66 96l9 9H0v40h399716l-9 9c-26 28.7-48 60.7-66 96-12.7 23.333\n-19 37.333-19 42h46c18-54 52.3-100.7 103-140l9-7h125l-7 8c-28.7 32-52 65.7-70\n 101-10.7 23.333-16 35.7-16 37 0 .7 7.7 1 23 1h22c27.3-71.3 75-127 143-167z",
            // tilde1 is a modified version of a glyph from the MnSymbol package
            tilde1: "M200 55.538c-77 0-168 73.953-177 73.953-3 0-7\n-2.175-9-5.437L2 97c-1-2-2-4-2-6 0-4 2-7 5-9l20-12C116 12 171 0 207 0c86 0\n 114 68 191 68 78 0 168-68 177-68 4 0 7 2 9 5l12 19c1 2.175 2 4.35 2 6.525 0\n 4.35-2 7.613-5 9.788l-19 13.05c-92 63.077-116.937 75.308-183 76.128\n-68.267.847-113-73.952-191-73.952z",
            // ditto tilde2, tilde3, & tilde4
            tilde2: "M344 55.266c-142 0-300.638 81.316-311.5 86.418\n-8.01 3.762-22.5 10.91-23.5 5.562L1 120c-1-2-1-3-1-4 0-5 3-9 8-10l18.4-9C160.9\n 31.9 283 0 358 0c148 0 188 122 331 122s314-97 326-97c4 0 8 2 10 7l7 21.114\nc1 2.14 1 3.21 1 4.28 0 5.347-3 9.626-7 10.696l-22.3 12.622C852.6 158.372 751\n 181.476 676 181.476c-149 0-189-126.21-332-126.21z",
            tilde3: "M786 59C457 59 32 175.242 13 175.242c-6 0-10-3.457\n-11-10.37L.15 138c-1-7 3-12 10-13l19.2-6.4C378.4 40.7 634.3 0 804.3 0c337 0\n 411.8 157 746.8 157 328 0 754-112 773-112 5 0 10 3 11 9l1 14.075c1 8.066-.697\n 16.595-6.697 17.492l-21.052 7.31c-367.9 98.146-609.15 122.696-778.15 122.696\n -338 0-409-156.573-744-156.573z",
            tilde4: "M786 58C457 58 32 177.487 13 177.487c-6 0-10-3.345\n-11-10.035L.15 143c-1-7 3-12 10-13l22-6.7C381.2 35 637.15 0 807.15 0c337 0 409\n 177 744 177 328 0 754-127 773-127 5 0 10 3 11 9l1 14.794c1 7.805-3 13.38-9\n 14.495l-20.7 5.574c-366.85 99.79-607.3 139.372-776.3 139.372-338 0-409\n -175.236-744-175.236z",
            // vec is from glyph U+20D7 in font KaTeX Main
            vec: "M377 20c0-5.333 1.833-10 5.5-14S391 0 397 0c4.667 0 8.667 1.667 12 5\n3.333 2.667 6.667 9 10 19 6.667 24.667 20.333 43.667 41 57 7.333 4.667 11\n10.667 11 18 0 6-1 10-3 12s-6.667 5-14 9c-28.667 14.667-53.667 35.667-75 63\n-1.333 1.333-3.167 3.5-5.5 6.5s-4 4.833-5 5.5c-1 .667-2.5 1.333-4.5 2s-4.333 1\n-7 1c-4.667 0-9.167-1.833-13.5-5.5S337 184 337 178c0-12.667 15.667-32.333 47-59\nH213l-171-1c-8.667-6-13-12.333-13-19 0-4.667 4.333-11.333 13-20h359\nc-16-25.333-24-45-24-59z",
            // widehat1 is a modified version of a glyph from the MnSymbol package
            widehat1: "M529 0h5l519 115c5 1 9 5 9 10 0 1-1 2-1 3l-4 22\nc-1 5-5 9-11 9h-2L532 67 19 159h-2c-5 0-9-4-11-9l-5-22c-1-6 2-12 8-13z",
            // ditto widehat2, widehat3, & widehat4
            widehat2: "M1181 0h2l1171 176c6 0 10 5 10 11l-2 23c-1 6-5 10\n-11 10h-1L1182 67 15 220h-1c-6 0-10-4-11-10l-2-23c-1-6 4-11 10-11z",
            widehat3: "M1181 0h2l1171 236c6 0 10 5 10 11l-2 23c-1 6-5 10\n-11 10h-1L1182 67 15 280h-1c-6 0-10-4-11-10l-2-23c-1-6 4-11 10-11z",
            widehat4: "M1181 0h2l1171 296c6 0 10 5 10 11l-2 23c-1 6-5 10\n-11 10h-1L1182 67 15 340h-1c-6 0-10-4-11-10l-2-23c-1-6 4-11 10-11z",
            // widecheck paths are all inverted versions of widehat
            widecheck1: "M529,159h5l519,-115c5,-1,9,-5,9,-10c0,-1,-1,-2,-1,-3l-4,-22c-1,\n-5,-5,-9,-11,-9h-2l-512,92l-513,-92h-2c-5,0,-9,4,-11,9l-5,22c-1,6,2,12,8,13z",
            widecheck2: "M1181,220h2l1171,-176c6,0,10,-5,10,-11l-2,-23c-1,-6,-5,-10,\n-11,-10h-1l-1168,153l-1167,-153h-1c-6,0,-10,4,-11,10l-2,23c-1,6,4,11,10,11z",
            widecheck3: "M1181,280h2l1171,-236c6,0,10,-5,10,-11l-2,-23c-1,-6,-5,-10,\n-11,-10h-1l-1168,213l-1167,-213h-1c-6,0,-10,4,-11,10l-2,23c-1,6,4,11,10,11z",
            widecheck4: "M1181,340h2l1171,-296c6,0,10,-5,10,-11l-2,-23c-1,-6,-5,-10,\n-11,-10h-1l-1168,273l-1167,-273h-1c-6,0,-10,4,-11,10l-2,23c-1,6,4,11,10,11z",
            // The next ten paths support reaction arrows from the mhchem package.
            // Arrows for \ce{<-->} are offset from xAxis by 0.22ex, per mhchem in LaTeX
            // baraboveleftarrow is mostly from glyph U+2190 in font KaTeX Main
            baraboveleftarrow: "M400000 620h-399890l3 -3c68.7 -52.7 113.7 -120 135 -202\nc4 -14.7 6 -23 6 -25c0 -7.3 -7 -11 -21 -11c-8 0 -13.2 0.8 -15.5 2.5\nc-2.3 1.7 -4.2 5.8 -5.5 12.5c-1.3 4.7 -2.7 10.3 -4 17c-12 48.7 -34.8 92 -68.5 130\ns-74.2 66.3 -121.5 85c-10 4 -16 7.7 -18 11c0 8.7 6 14.3 18 17c47.3 18.7 87.8 47\n121.5 85s56.5 81.3 68.5 130c0.7 2 1.3 5 2 9s1.2 6.7 1.5 8c0.3 1.3 1 3.3 2 6\ns2.2 4.5 3.5 5.5c1.3 1 3.3 1.8 6 2.5s6 1 10 1c14 0 21 -3.7 21 -11\nc0 -2 -2 -10.3 -6 -25c-20 -79.3 -65 -146.7 -135 -202l-3 -3h399890z\nM100 620v40h399900v-40z M0 241v40h399900v-40zM0 241v40h399900v-40z",
            // rightarrowabovebar is mostly from glyph U+2192, KaTeX Main
            rightarrowabovebar: "M0 241v40h399891c-47.3 35.3-84 78-110 128-16.7 32\n-27.7 63.7-33 95 0 1.3-.2 2.7-.5 4-.3 1.3-.5 2.3-.5 3 0 7.3 6.7 11 20 11 8 0\n13.2-.8 15.5-2.5 2.3-1.7 4.2-5.5 5.5-11.5 2-13.3 5.7-27 11-41 14.7-44.7 39\n-84.5 73-119.5s73.7-60.2 119-75.5c6-2 9-5.7 9-11s-3-9-9-11c-45.3-15.3-85-40.5\n-119-75.5s-58.3-74.8-73-119.5c-4.7-14-8.3-27.3-11-40-1.3-6.7-3.2-10.8-5.5\n-12.5-2.3-1.7-7.5-2.5-15.5-2.5-14 0-21 3.7-21 11 0 2 2 10.3 6 25 20.7 83.3 67\n151.7 139 205zm96 379h399894v40H0zm0 0h399904v40H0z",
            // The short left harpoon has 0.5em (i.e. 500 units) kern on the left end.
            // Ref from mhchem.sty: \rlap{\raisebox{-.22ex}{$\kern0.5em
            baraboveshortleftharpoon: "M507,435c-4,4,-6.3,8.7,-7,14c0,5.3,0.7,9,2,11\nc1.3,2,5.3,5.3,12,10c90.7,54,156,130,196,228c3.3,10.7,6.3,16.3,9,17\nc2,0.7,5,1,9,1c0,0,5,0,5,0c10.7,0,16.7,-2,18,-6c2,-2.7,1,-9.7,-3,-21\nc-32,-87.3,-82.7,-157.7,-152,-211c0,0,-3,-3,-3,-3l399351,0l0,-40\nc-398570,0,-399437,0,-399437,0z M593 435 v40 H399500 v-40z\nM0 281 v-40 H399908 v40z M0 281 v-40 H399908 v40z",
            rightharpoonaboveshortbar: "M0,241 l0,40c399126,0,399993,0,399993,0\nc4.7,-4.7,7,-9.3,7,-14c0,-9.3,-3.7,-15.3,-11,-18c-92.7,-56.7,-159,-133.7,-199,\n-231c-3.3,-9.3,-6,-14.7,-8,-16c-2,-1.3,-7,-2,-15,-2c-10.7,0,-16.7,2,-18,6\nc-2,2.7,-1,9.7,3,21c15.3,42,36.7,81.8,64,119.5c27.3,37.7,58,69.2,92,94.5z\nM0 241 v40 H399908 v-40z M0 475 v-40 H399500 v40z M0 475 v-40 H399500 v40z",
            shortbaraboveleftharpoon: "M7,435c-4,4,-6.3,8.7,-7,14c0,5.3,0.7,9,2,11\nc1.3,2,5.3,5.3,12,10c90.7,54,156,130,196,228c3.3,10.7,6.3,16.3,9,17c2,0.7,5,1,9,\n1c0,0,5,0,5,0c10.7,0,16.7,-2,18,-6c2,-2.7,1,-9.7,-3,-21c-32,-87.3,-82.7,-157.7,\n-152,-211c0,0,-3,-3,-3,-3l399907,0l0,-40c-399126,0,-399993,0,-399993,0z\nM93 435 v40 H400000 v-40z M500 241 v40 H400000 v-40z M500 241 v40 H400000 v-40z",
            shortrightharpoonabovebar: "M53,241l0,40c398570,0,399437,0,399437,0\nc4.7,-4.7,7,-9.3,7,-14c0,-9.3,-3.7,-15.3,-11,-18c-92.7,-56.7,-159,-133.7,-199,\n-231c-3.3,-9.3,-6,-14.7,-8,-16c-2,-1.3,-7,-2,-15,-2c-10.7,0,-16.7,2,-18,6\nc-2,2.7,-1,9.7,3,21c15.3,42,36.7,81.8,64,119.5c27.3,37.7,58,69.2,92,94.5z\nM500 241 v40 H399408 v-40z M500 435 v40 H400000 v-40z"
          };
          const tallDelim = function(label, midHeight) {
            switch (label) {
              case "lbrack":
                return "M403 1759 V84 H666 V0 H319 V1759 v" + midHeight + " v1759 h347 v-84\nH403z M403 1759 V0 H319 V1759 v" + midHeight + " v1759 h84z";
              case "rbrack":
                return "M347 1759 V0 H0 V84 H263 V1759 v" + midHeight + " v1759 H0 v84 H347z\nM347 1759 V0 H263 V1759 v" + midHeight + " v1759 h84z";
              case "vert":
                return "M145 15 v585 v" + midHeight + " v585 c2.667,10,9.667,15,21,15\nc10,0,16.667,-5,20,-15 v-585 v" + -midHeight + " v-585 c-2.667,-10,-9.667,-15,-21,-15\nc-10,0,-16.667,5,-20,15z M188 15 H145 v585 v" + midHeight + " v585 h43z";
              case "doublevert":
                return "M145 15 v585 v" + midHeight + " v585 c2.667,10,9.667,15,21,15\nc10,0,16.667,-5,20,-15 v-585 v" + -midHeight + " v-585 c-2.667,-10,-9.667,-15,-21,-15\nc-10,0,-16.667,5,-20,15z M188 15 H145 v585 v" + midHeight + " v585 h43z\nM367 15 v585 v" + midHeight + " v585 c2.667,10,9.667,15,21,15\nc10,0,16.667,-5,20,-15 v-585 v" + -midHeight + " v-585 c-2.667,-10,-9.667,-15,-21,-15\nc-10,0,-16.667,5,-20,15z M410 15 H367 v585 v" + midHeight + " v585 h43z";
              case "lfloor":
                return "M319 602 V0 H403 V602 v" + midHeight + " v1715 h263 v84 H319z\nMM319 602 V0 H403 V602 v" + midHeight + " v1715 H319z";
              case "rfloor":
                return "M319 602 V0 H403 V602 v" + midHeight + " v1799 H0 v-84 H319z\nMM319 602 V0 H403 V602 v" + midHeight + " v1715 H319z";
              case "lceil":
                return "M403 1759 V84 H666 V0 H319 V1759 v" + midHeight + " v602 h84z\nM403 1759 V0 H319 V1759 v" + midHeight + " v602 h84z";
              case "rceil":
                return "M347 1759 V0 H0 V84 H263 V1759 v" + midHeight + " v602 h84z\nM347 1759 V0 h-84 V1759 v" + midHeight + " v602 h84z";
              case "lparen":
                return "M863,9c0,-2,-2,-5,-6,-9c0,0,-17,0,-17,0c-12.7,0,-19.3,0.3,-20,1\nc-5.3,5.3,-10.3,11,-15,17c-242.7,294.7,-395.3,682,-458,1162c-21.3,163.3,-33.3,349,\n-36,557 l0," + (midHeight + 84) + "c0.2,6,0,26,0,60c2,159.3,10,310.7,24,454c53.3,528,210,\n949.7,470,1265c4.7,6,9.7,11.7,15,17c0.7,0.7,7,1,19,1c0,0,18,0,18,0c4,-4,6,-7,6,-9\nc0,-2.7,-3.3,-8.7,-10,-18c-135.3,-192.7,-235.5,-414.3,-300.5,-665c-65,-250.7,-102.5,\n-544.7,-112.5,-882c-2,-104,-3,-167,-3,-189\nl0,-" + (midHeight + 92) + "c0,-162.7,5.7,-314,17,-454c20.7,-272,63.7,-513,129,-723c65.3,\n-210,155.3,-396.3,270,-559c6.7,-9.3,10,-15.3,10,-18z";
              case "rparen":
                return "M76,0c-16.7,0,-25,3,-25,9c0,2,2,6.3,6,13c21.3,28.7,42.3,60.3,\n63,95c96.7,156.7,172.8,332.5,228.5,527.5c55.7,195,92.8,416.5,111.5,664.5\nc11.3,139.3,17,290.7,17,454c0,28,1.7,43,3.3,45l0," + (midHeight + 9) + "\nc-3,4,-3.3,16.7,-3.3,38c0,162,-5.7,313.7,-17,455c-18.7,248,-55.8,469.3,-111.5,664\nc-55.7,194.7,-131.8,370.3,-228.5,527c-20.7,34.7,-41.7,66.3,-63,95c-2,3.3,-4,7,-6,11\nc0,7.3,5.7,11,17,11c0,0,11,0,11,0c9.3,0,14.3,-0.3,15,-1c5.3,-5.3,10.3,-11,15,-17\nc242.7,-294.7,395.3,-681.7,458,-1161c21.3,-164.7,33.3,-350.7,36,-558\nl0,-" + (midHeight + 144) + "c-2,-159.3,-10,-310.7,-24,-454c-53.3,-528,-210,-949.7,\n-470,-1265c-4.7,-6,-9.7,-11.7,-15,-17c-0.7,-0.7,-6.7,-1,-18,-1z";
              default:
                throw new Error("Unknown stretchy delimiter.");
            }
          };
          ;
          class DocumentFragment {
            // HtmlDomNode
            // Never used; needed for satisfying interface.
            constructor(children) {
              this.children = void 0;
              this.classes = void 0;
              this.height = void 0;
              this.depth = void 0;
              this.maxFontSize = void 0;
              this.style = void 0;
              this.children = children;
              this.classes = [];
              this.height = 0;
              this.depth = 0;
              this.maxFontSize = 0;
              this.style = {};
            }
            hasClass(className) {
              return utils.contains(this.classes, className);
            }
            /** Convert the fragment into a node. */
            toNode() {
              const frag = document.createDocumentFragment();
              for (let i = 0; i < this.children.length; i++) {
                frag.appendChild(this.children[i].toNode());
              }
              return frag;
            }
            /** Convert the fragment into HTML markup. */
            toMarkup() {
              let markup = "";
              for (let i = 0; i < this.children.length; i++) {
                markup += this.children[i].toMarkup();
              }
              return markup;
            }
            /**
             * Converts the math node into a string, similar to innerText. Applies to
             * MathDomNode's only.
             */
            toText() {
              const toText = (child) => child.toText();
              return this.children.map(toText).join("");
            }
          }
          ;
          var fontMetricsData = {
            "AMS-Regular": {
              "32": [0, 0, 0, 0, 0.25],
              "65": [0, 0.68889, 0, 0, 0.72222],
              "66": [0, 0.68889, 0, 0, 0.66667],
              "67": [0, 0.68889, 0, 0, 0.72222],
              "68": [0, 0.68889, 0, 0, 0.72222],
              "69": [0, 0.68889, 0, 0, 0.66667],
              "70": [0, 0.68889, 0, 0, 0.61111],
              "71": [0, 0.68889, 0, 0, 0.77778],
              "72": [0, 0.68889, 0, 0, 0.77778],
              "73": [0, 0.68889, 0, 0, 0.38889],
              "74": [0.16667, 0.68889, 0, 0, 0.5],
              "75": [0, 0.68889, 0, 0, 0.77778],
              "76": [0, 0.68889, 0, 0, 0.66667],
              "77": [0, 0.68889, 0, 0, 0.94445],
              "78": [0, 0.68889, 0, 0, 0.72222],
              "79": [0.16667, 0.68889, 0, 0, 0.77778],
              "80": [0, 0.68889, 0, 0, 0.61111],
              "81": [0.16667, 0.68889, 0, 0, 0.77778],
              "82": [0, 0.68889, 0, 0, 0.72222],
              "83": [0, 0.68889, 0, 0, 0.55556],
              "84": [0, 0.68889, 0, 0, 0.66667],
              "85": [0, 0.68889, 0, 0, 0.72222],
              "86": [0, 0.68889, 0, 0, 0.72222],
              "87": [0, 0.68889, 0, 0, 1],
              "88": [0, 0.68889, 0, 0, 0.72222],
              "89": [0, 0.68889, 0, 0, 0.72222],
              "90": [0, 0.68889, 0, 0, 0.66667],
              "107": [0, 0.68889, 0, 0, 0.55556],
              "160": [0, 0, 0, 0, 0.25],
              "165": [0, 0.675, 0.025, 0, 0.75],
              "174": [0.15559, 0.69224, 0, 0, 0.94666],
              "240": [0, 0.68889, 0, 0, 0.55556],
              "295": [0, 0.68889, 0, 0, 0.54028],
              "710": [0, 0.825, 0, 0, 2.33334],
              "732": [0, 0.9, 0, 0, 2.33334],
              "770": [0, 0.825, 0, 0, 2.33334],
              "771": [0, 0.9, 0, 0, 2.33334],
              "989": [0.08167, 0.58167, 0, 0, 0.77778],
              "1008": [0, 0.43056, 0.04028, 0, 0.66667],
              "8245": [0, 0.54986, 0, 0, 0.275],
              "8463": [0, 0.68889, 0, 0, 0.54028],
              "8487": [0, 0.68889, 0, 0, 0.72222],
              "8498": [0, 0.68889, 0, 0, 0.55556],
              "8502": [0, 0.68889, 0, 0, 0.66667],
              "8503": [0, 0.68889, 0, 0, 0.44445],
              "8504": [0, 0.68889, 0, 0, 0.66667],
              "8513": [0, 0.68889, 0, 0, 0.63889],
              "8592": [-0.03598, 0.46402, 0, 0, 0.5],
              "8594": [-0.03598, 0.46402, 0, 0, 0.5],
              "8602": [-0.13313, 0.36687, 0, 0, 1],
              "8603": [-0.13313, 0.36687, 0, 0, 1],
              "8606": [0.01354, 0.52239, 0, 0, 1],
              "8608": [0.01354, 0.52239, 0, 0, 1],
              "8610": [0.01354, 0.52239, 0, 0, 1.11111],
              "8611": [0.01354, 0.52239, 0, 0, 1.11111],
              "8619": [0, 0.54986, 0, 0, 1],
              "8620": [0, 0.54986, 0, 0, 1],
              "8621": [-0.13313, 0.37788, 0, 0, 1.38889],
              "8622": [-0.13313, 0.36687, 0, 0, 1],
              "8624": [0, 0.69224, 0, 0, 0.5],
              "8625": [0, 0.69224, 0, 0, 0.5],
              "8630": [0, 0.43056, 0, 0, 1],
              "8631": [0, 0.43056, 0, 0, 1],
              "8634": [0.08198, 0.58198, 0, 0, 0.77778],
              "8635": [0.08198, 0.58198, 0, 0, 0.77778],
              "8638": [0.19444, 0.69224, 0, 0, 0.41667],
              "8639": [0.19444, 0.69224, 0, 0, 0.41667],
              "8642": [0.19444, 0.69224, 0, 0, 0.41667],
              "8643": [0.19444, 0.69224, 0, 0, 0.41667],
              "8644": [0.1808, 0.675, 0, 0, 1],
              "8646": [0.1808, 0.675, 0, 0, 1],
              "8647": [0.1808, 0.675, 0, 0, 1],
              "8648": [0.19444, 0.69224, 0, 0, 0.83334],
              "8649": [0.1808, 0.675, 0, 0, 1],
              "8650": [0.19444, 0.69224, 0, 0, 0.83334],
              "8651": [0.01354, 0.52239, 0, 0, 1],
              "8652": [0.01354, 0.52239, 0, 0, 1],
              "8653": [-0.13313, 0.36687, 0, 0, 1],
              "8654": [-0.13313, 0.36687, 0, 0, 1],
              "8655": [-0.13313, 0.36687, 0, 0, 1],
              "8666": [0.13667, 0.63667, 0, 0, 1],
              "8667": [0.13667, 0.63667, 0, 0, 1],
              "8669": [-0.13313, 0.37788, 0, 0, 1],
              "8672": [-0.064, 0.437, 0, 0, 1.334],
              "8674": [-0.064, 0.437, 0, 0, 1.334],
              "8705": [0, 0.825, 0, 0, 0.5],
              "8708": [0, 0.68889, 0, 0, 0.55556],
              "8709": [0.08167, 0.58167, 0, 0, 0.77778],
              "8717": [0, 0.43056, 0, 0, 0.42917],
              "8722": [-0.03598, 0.46402, 0, 0, 0.5],
              "8724": [0.08198, 0.69224, 0, 0, 0.77778],
              "8726": [0.08167, 0.58167, 0, 0, 0.77778],
              "8733": [0, 0.69224, 0, 0, 0.77778],
              "8736": [0, 0.69224, 0, 0, 0.72222],
              "8737": [0, 0.69224, 0, 0, 0.72222],
              "8738": [0.03517, 0.52239, 0, 0, 0.72222],
              "8739": [0.08167, 0.58167, 0, 0, 0.22222],
              "8740": [0.25142, 0.74111, 0, 0, 0.27778],
              "8741": [0.08167, 0.58167, 0, 0, 0.38889],
              "8742": [0.25142, 0.74111, 0, 0, 0.5],
              "8756": [0, 0.69224, 0, 0, 0.66667],
              "8757": [0, 0.69224, 0, 0, 0.66667],
              "8764": [-0.13313, 0.36687, 0, 0, 0.77778],
              "8765": [-0.13313, 0.37788, 0, 0, 0.77778],
              "8769": [-0.13313, 0.36687, 0, 0, 0.77778],
              "8770": [-0.03625, 0.46375, 0, 0, 0.77778],
              "8774": [0.30274, 0.79383, 0, 0, 0.77778],
              "8776": [-0.01688, 0.48312, 0, 0, 0.77778],
              "8778": [0.08167, 0.58167, 0, 0, 0.77778],
              "8782": [0.06062, 0.54986, 0, 0, 0.77778],
              "8783": [0.06062, 0.54986, 0, 0, 0.77778],
              "8785": [0.08198, 0.58198, 0, 0, 0.77778],
              "8786": [0.08198, 0.58198, 0, 0, 0.77778],
              "8787": [0.08198, 0.58198, 0, 0, 0.77778],
              "8790": [0, 0.69224, 0, 0, 0.77778],
              "8791": [0.22958, 0.72958, 0, 0, 0.77778],
              "8796": [0.08198, 0.91667, 0, 0, 0.77778],
              "8806": [0.25583, 0.75583, 0, 0, 0.77778],
              "8807": [0.25583, 0.75583, 0, 0, 0.77778],
              "8808": [0.25142, 0.75726, 0, 0, 0.77778],
              "8809": [0.25142, 0.75726, 0, 0, 0.77778],
              "8812": [0.25583, 0.75583, 0, 0, 0.5],
              "8814": [0.20576, 0.70576, 0, 0, 0.77778],
              "8815": [0.20576, 0.70576, 0, 0, 0.77778],
              "8816": [0.30274, 0.79383, 0, 0, 0.77778],
              "8817": [0.30274, 0.79383, 0, 0, 0.77778],
              "8818": [0.22958, 0.72958, 0, 0, 0.77778],
              "8819": [0.22958, 0.72958, 0, 0, 0.77778],
              "8822": [0.1808, 0.675, 0, 0, 0.77778],
              "8823": [0.1808, 0.675, 0, 0, 0.77778],
              "8828": [0.13667, 0.63667, 0, 0, 0.77778],
              "8829": [0.13667, 0.63667, 0, 0, 0.77778],
              "8830": [0.22958, 0.72958, 0, 0, 0.77778],
              "8831": [0.22958, 0.72958, 0, 0, 0.77778],
              "8832": [0.20576, 0.70576, 0, 0, 0.77778],
              "8833": [0.20576, 0.70576, 0, 0, 0.77778],
              "8840": [0.30274, 0.79383, 0, 0, 0.77778],
              "8841": [0.30274, 0.79383, 0, 0, 0.77778],
              "8842": [0.13597, 0.63597, 0, 0, 0.77778],
              "8843": [0.13597, 0.63597, 0, 0, 0.77778],
              "8847": [0.03517, 0.54986, 0, 0, 0.77778],
              "8848": [0.03517, 0.54986, 0, 0, 0.77778],
              "8858": [0.08198, 0.58198, 0, 0, 0.77778],
              "8859": [0.08198, 0.58198, 0, 0, 0.77778],
              "8861": [0.08198, 0.58198, 0, 0, 0.77778],
              "8862": [0, 0.675, 0, 0, 0.77778],
              "8863": [0, 0.675, 0, 0, 0.77778],
              "8864": [0, 0.675, 0, 0, 0.77778],
              "8865": [0, 0.675, 0, 0, 0.77778],
              "8872": [0, 0.69224, 0, 0, 0.61111],
              "8873": [0, 0.69224, 0, 0, 0.72222],
              "8874": [0, 0.69224, 0, 0, 0.88889],
              "8876": [0, 0.68889, 0, 0, 0.61111],
              "8877": [0, 0.68889, 0, 0, 0.61111],
              "8878": [0, 0.68889, 0, 0, 0.72222],
              "8879": [0, 0.68889, 0, 0, 0.72222],
              "8882": [0.03517, 0.54986, 0, 0, 0.77778],
              "8883": [0.03517, 0.54986, 0, 0, 0.77778],
              "8884": [0.13667, 0.63667, 0, 0, 0.77778],
              "8885": [0.13667, 0.63667, 0, 0, 0.77778],
              "8888": [0, 0.54986, 0, 0, 1.11111],
              "8890": [0.19444, 0.43056, 0, 0, 0.55556],
              "8891": [0.19444, 0.69224, 0, 0, 0.61111],
              "8892": [0.19444, 0.69224, 0, 0, 0.61111],
              "8901": [0, 0.54986, 0, 0, 0.27778],
              "8903": [0.08167, 0.58167, 0, 0, 0.77778],
              "8905": [0.08167, 0.58167, 0, 0, 0.77778],
              "8906": [0.08167, 0.58167, 0, 0, 0.77778],
              "8907": [0, 0.69224, 0, 0, 0.77778],
              "8908": [0, 0.69224, 0, 0, 0.77778],
              "8909": [-0.03598, 0.46402, 0, 0, 0.77778],
              "8910": [0, 0.54986, 0, 0, 0.76042],
              "8911": [0, 0.54986, 0, 0, 0.76042],
              "8912": [0.03517, 0.54986, 0, 0, 0.77778],
              "8913": [0.03517, 0.54986, 0, 0, 0.77778],
              "8914": [0, 0.54986, 0, 0, 0.66667],
              "8915": [0, 0.54986, 0, 0, 0.66667],
              "8916": [0, 0.69224, 0, 0, 0.66667],
              "8918": [0.0391, 0.5391, 0, 0, 0.77778],
              "8919": [0.0391, 0.5391, 0, 0, 0.77778],
              "8920": [0.03517, 0.54986, 0, 0, 1.33334],
              "8921": [0.03517, 0.54986, 0, 0, 1.33334],
              "8922": [0.38569, 0.88569, 0, 0, 0.77778],
              "8923": [0.38569, 0.88569, 0, 0, 0.77778],
              "8926": [0.13667, 0.63667, 0, 0, 0.77778],
              "8927": [0.13667, 0.63667, 0, 0, 0.77778],
              "8928": [0.30274, 0.79383, 0, 0, 0.77778],
              "8929": [0.30274, 0.79383, 0, 0, 0.77778],
              "8934": [0.23222, 0.74111, 0, 0, 0.77778],
              "8935": [0.23222, 0.74111, 0, 0, 0.77778],
              "8936": [0.23222, 0.74111, 0, 0, 0.77778],
              "8937": [0.23222, 0.74111, 0, 0, 0.77778],
              "8938": [0.20576, 0.70576, 0, 0, 0.77778],
              "8939": [0.20576, 0.70576, 0, 0, 0.77778],
              "8940": [0.30274, 0.79383, 0, 0, 0.77778],
              "8941": [0.30274, 0.79383, 0, 0, 0.77778],
              "8994": [0.19444, 0.69224, 0, 0, 0.77778],
              "8995": [0.19444, 0.69224, 0, 0, 0.77778],
              "9416": [0.15559, 0.69224, 0, 0, 0.90222],
              "9484": [0, 0.69224, 0, 0, 0.5],
              "9488": [0, 0.69224, 0, 0, 0.5],
              "9492": [0, 0.37788, 0, 0, 0.5],
              "9496": [0, 0.37788, 0, 0, 0.5],
              "9585": [0.19444, 0.68889, 0, 0, 0.88889],
              "9586": [0.19444, 0.74111, 0, 0, 0.88889],
              "9632": [0, 0.675, 0, 0, 0.77778],
              "9633": [0, 0.675, 0, 0, 0.77778],
              "9650": [0, 0.54986, 0, 0, 0.72222],
              "9651": [0, 0.54986, 0, 0, 0.72222],
              "9654": [0.03517, 0.54986, 0, 0, 0.77778],
              "9660": [0, 0.54986, 0, 0, 0.72222],
              "9661": [0, 0.54986, 0, 0, 0.72222],
              "9664": [0.03517, 0.54986, 0, 0, 0.77778],
              "9674": [0.11111, 0.69224, 0, 0, 0.66667],
              "9733": [0.19444, 0.69224, 0, 0, 0.94445],
              "10003": [0, 0.69224, 0, 0, 0.83334],
              "10016": [0, 0.69224, 0, 0, 0.83334],
              "10731": [0.11111, 0.69224, 0, 0, 0.66667],
              "10846": [0.19444, 0.75583, 0, 0, 0.61111],
              "10877": [0.13667, 0.63667, 0, 0, 0.77778],
              "10878": [0.13667, 0.63667, 0, 0, 0.77778],
              "10885": [0.25583, 0.75583, 0, 0, 0.77778],
              "10886": [0.25583, 0.75583, 0, 0, 0.77778],
              "10887": [0.13597, 0.63597, 0, 0, 0.77778],
              "10888": [0.13597, 0.63597, 0, 0, 0.77778],
              "10889": [0.26167, 0.75726, 0, 0, 0.77778],
              "10890": [0.26167, 0.75726, 0, 0, 0.77778],
              "10891": [0.48256, 0.98256, 0, 0, 0.77778],
              "10892": [0.48256, 0.98256, 0, 0, 0.77778],
              "10901": [0.13667, 0.63667, 0, 0, 0.77778],
              "10902": [0.13667, 0.63667, 0, 0, 0.77778],
              "10933": [0.25142, 0.75726, 0, 0, 0.77778],
              "10934": [0.25142, 0.75726, 0, 0, 0.77778],
              "10935": [0.26167, 0.75726, 0, 0, 0.77778],
              "10936": [0.26167, 0.75726, 0, 0, 0.77778],
              "10937": [0.26167, 0.75726, 0, 0, 0.77778],
              "10938": [0.26167, 0.75726, 0, 0, 0.77778],
              "10949": [0.25583, 0.75583, 0, 0, 0.77778],
              "10950": [0.25583, 0.75583, 0, 0, 0.77778],
              "10955": [0.28481, 0.79383, 0, 0, 0.77778],
              "10956": [0.28481, 0.79383, 0, 0, 0.77778],
              "57350": [0.08167, 0.58167, 0, 0, 0.22222],
              "57351": [0.08167, 0.58167, 0, 0, 0.38889],
              "57352": [0.08167, 0.58167, 0, 0, 0.77778],
              "57353": [0, 0.43056, 0.04028, 0, 0.66667],
              "57356": [0.25142, 0.75726, 0, 0, 0.77778],
              "57357": [0.25142, 0.75726, 0, 0, 0.77778],
              "57358": [0.41951, 0.91951, 0, 0, 0.77778],
              "57359": [0.30274, 0.79383, 0, 0, 0.77778],
              "57360": [0.30274, 0.79383, 0, 0, 0.77778],
              "57361": [0.41951, 0.91951, 0, 0, 0.77778],
              "57366": [0.25142, 0.75726, 0, 0, 0.77778],
              "57367": [0.25142, 0.75726, 0, 0, 0.77778],
              "57368": [0.25142, 0.75726, 0, 0, 0.77778],
              "57369": [0.25142, 0.75726, 0, 0, 0.77778],
              "57370": [0.13597, 0.63597, 0, 0, 0.77778],
              "57371": [0.13597, 0.63597, 0, 0, 0.77778]
            },
            "Caligraphic-Regular": {
              "32": [0, 0, 0, 0, 0.25],
              "65": [0, 0.68333, 0, 0.19445, 0.79847],
              "66": [0, 0.68333, 0.03041, 0.13889, 0.65681],
              "67": [0, 0.68333, 0.05834, 0.13889, 0.52653],
              "68": [0, 0.68333, 0.02778, 0.08334, 0.77139],
              "69": [0, 0.68333, 0.08944, 0.11111, 0.52778],
              "70": [0, 0.68333, 0.09931, 0.11111, 0.71875],
              "71": [0.09722, 0.68333, 0.0593, 0.11111, 0.59487],
              "72": [0, 0.68333, 965e-5, 0.11111, 0.84452],
              "73": [0, 0.68333, 0.07382, 0, 0.54452],
              "74": [0.09722, 0.68333, 0.18472, 0.16667, 0.67778],
              "75": [0, 0.68333, 0.01445, 0.05556, 0.76195],
              "76": [0, 0.68333, 0, 0.13889, 0.68972],
              "77": [0, 0.68333, 0, 0.13889, 1.2009],
              "78": [0, 0.68333, 0.14736, 0.08334, 0.82049],
              "79": [0, 0.68333, 0.02778, 0.11111, 0.79611],
              "80": [0, 0.68333, 0.08222, 0.08334, 0.69556],
              "81": [0.09722, 0.68333, 0, 0.11111, 0.81667],
              "82": [0, 0.68333, 0, 0.08334, 0.8475],
              "83": [0, 0.68333, 0.075, 0.13889, 0.60556],
              "84": [0, 0.68333, 0.25417, 0, 0.54464],
              "85": [0, 0.68333, 0.09931, 0.08334, 0.62583],
              "86": [0, 0.68333, 0.08222, 0, 0.61278],
              "87": [0, 0.68333, 0.08222, 0.08334, 0.98778],
              "88": [0, 0.68333, 0.14643, 0.13889, 0.7133],
              "89": [0.09722, 0.68333, 0.08222, 0.08334, 0.66834],
              "90": [0, 0.68333, 0.07944, 0.13889, 0.72473],
              "160": [0, 0, 0, 0, 0.25]
            },
            "Fraktur-Regular": {
              "32": [0, 0, 0, 0, 0.25],
              "33": [0, 0.69141, 0, 0, 0.29574],
              "34": [0, 0.69141, 0, 0, 0.21471],
              "38": [0, 0.69141, 0, 0, 0.73786],
              "39": [0, 0.69141, 0, 0, 0.21201],
              "40": [0.24982, 0.74947, 0, 0, 0.38865],
              "41": [0.24982, 0.74947, 0, 0, 0.38865],
              "42": [0, 0.62119, 0, 0, 0.27764],
              "43": [0.08319, 0.58283, 0, 0, 0.75623],
              "44": [0, 0.10803, 0, 0, 0.27764],
              "45": [0.08319, 0.58283, 0, 0, 0.75623],
              "46": [0, 0.10803, 0, 0, 0.27764],
              "47": [0.24982, 0.74947, 0, 0, 0.50181],
              "48": [0, 0.47534, 0, 0, 0.50181],
              "49": [0, 0.47534, 0, 0, 0.50181],
              "50": [0, 0.47534, 0, 0, 0.50181],
              "51": [0.18906, 0.47534, 0, 0, 0.50181],
              "52": [0.18906, 0.47534, 0, 0, 0.50181],
              "53": [0.18906, 0.47534, 0, 0, 0.50181],
              "54": [0, 0.69141, 0, 0, 0.50181],
              "55": [0.18906, 0.47534, 0, 0, 0.50181],
              "56": [0, 0.69141, 0, 0, 0.50181],
              "57": [0.18906, 0.47534, 0, 0, 0.50181],
              "58": [0, 0.47534, 0, 0, 0.21606],
              "59": [0.12604, 0.47534, 0, 0, 0.21606],
              "61": [-0.13099, 0.36866, 0, 0, 0.75623],
              "63": [0, 0.69141, 0, 0, 0.36245],
              "65": [0, 0.69141, 0, 0, 0.7176],
              "66": [0, 0.69141, 0, 0, 0.88397],
              "67": [0, 0.69141, 0, 0, 0.61254],
              "68": [0, 0.69141, 0, 0, 0.83158],
              "69": [0, 0.69141, 0, 0, 0.66278],
              "70": [0.12604, 0.69141, 0, 0, 0.61119],
              "71": [0, 0.69141, 0, 0, 0.78539],
              "72": [0.06302, 0.69141, 0, 0, 0.7203],
              "73": [0, 0.69141, 0, 0, 0.55448],
              "74": [0.12604, 0.69141, 0, 0, 0.55231],
              "75": [0, 0.69141, 0, 0, 0.66845],
              "76": [0, 0.69141, 0, 0, 0.66602],
              "77": [0, 0.69141, 0, 0, 1.04953],
              "78": [0, 0.69141, 0, 0, 0.83212],
              "79": [0, 0.69141, 0, 0, 0.82699],
              "80": [0.18906, 0.69141, 0, 0, 0.82753],
              "81": [0.03781, 0.69141, 0, 0, 0.82699],
              "82": [0, 0.69141, 0, 0, 0.82807],
              "83": [0, 0.69141, 0, 0, 0.82861],
              "84": [0, 0.69141, 0, 0, 0.66899],
              "85": [0, 0.69141, 0, 0, 0.64576],
              "86": [0, 0.69141, 0, 0, 0.83131],
              "87": [0, 0.69141, 0, 0, 1.04602],
              "88": [0, 0.69141, 0, 0, 0.71922],
              "89": [0.18906, 0.69141, 0, 0, 0.83293],
              "90": [0.12604, 0.69141, 0, 0, 0.60201],
              "91": [0.24982, 0.74947, 0, 0, 0.27764],
              "93": [0.24982, 0.74947, 0, 0, 0.27764],
              "94": [0, 0.69141, 0, 0, 0.49965],
              "97": [0, 0.47534, 0, 0, 0.50046],
              "98": [0, 0.69141, 0, 0, 0.51315],
              "99": [0, 0.47534, 0, 0, 0.38946],
              "100": [0, 0.62119, 0, 0, 0.49857],
              "101": [0, 0.47534, 0, 0, 0.40053],
              "102": [0.18906, 0.69141, 0, 0, 0.32626],
              "103": [0.18906, 0.47534, 0, 0, 0.5037],
              "104": [0.18906, 0.69141, 0, 0, 0.52126],
              "105": [0, 0.69141, 0, 0, 0.27899],
              "106": [0, 0.69141, 0, 0, 0.28088],
              "107": [0, 0.69141, 0, 0, 0.38946],
              "108": [0, 0.69141, 0, 0, 0.27953],
              "109": [0, 0.47534, 0, 0, 0.76676],
              "110": [0, 0.47534, 0, 0, 0.52666],
              "111": [0, 0.47534, 0, 0, 0.48885],
              "112": [0.18906, 0.52396, 0, 0, 0.50046],
              "113": [0.18906, 0.47534, 0, 0, 0.48912],
              "114": [0, 0.47534, 0, 0, 0.38919],
              "115": [0, 0.47534, 0, 0, 0.44266],
              "116": [0, 0.62119, 0, 0, 0.33301],
              "117": [0, 0.47534, 0, 0, 0.5172],
              "118": [0, 0.52396, 0, 0, 0.5118],
              "119": [0, 0.52396, 0, 0, 0.77351],
              "120": [0.18906, 0.47534, 0, 0, 0.38865],
              "121": [0.18906, 0.47534, 0, 0, 0.49884],
              "122": [0.18906, 0.47534, 0, 0, 0.39054],
              "160": [0, 0, 0, 0, 0.25],
              "8216": [0, 0.69141, 0, 0, 0.21471],
              "8217": [0, 0.69141, 0, 0, 0.21471],
              "58112": [0, 0.62119, 0, 0, 0.49749],
              "58113": [0, 0.62119, 0, 0, 0.4983],
              "58114": [0.18906, 0.69141, 0, 0, 0.33328],
              "58115": [0.18906, 0.69141, 0, 0, 0.32923],
              "58116": [0.18906, 0.47534, 0, 0, 0.50343],
              "58117": [0, 0.69141, 0, 0, 0.33301],
              "58118": [0, 0.62119, 0, 0, 0.33409],
              "58119": [0, 0.47534, 0, 0, 0.50073]
            },
            "Main-Bold": {
              "32": [0, 0, 0, 0, 0.25],
              "33": [0, 0.69444, 0, 0, 0.35],
              "34": [0, 0.69444, 0, 0, 0.60278],
              "35": [0.19444, 0.69444, 0, 0, 0.95833],
              "36": [0.05556, 0.75, 0, 0, 0.575],
              "37": [0.05556, 0.75, 0, 0, 0.95833],
              "38": [0, 0.69444, 0, 0, 0.89444],
              "39": [0, 0.69444, 0, 0, 0.31944],
              "40": [0.25, 0.75, 0, 0, 0.44722],
              "41": [0.25, 0.75, 0, 0, 0.44722],
              "42": [0, 0.75, 0, 0, 0.575],
              "43": [0.13333, 0.63333, 0, 0, 0.89444],
              "44": [0.19444, 0.15556, 0, 0, 0.31944],
              "45": [0, 0.44444, 0, 0, 0.38333],
              "46": [0, 0.15556, 0, 0, 0.31944],
              "47": [0.25, 0.75, 0, 0, 0.575],
              "48": [0, 0.64444, 0, 0, 0.575],
              "49": [0, 0.64444, 0, 0, 0.575],
              "50": [0, 0.64444, 0, 0, 0.575],
              "51": [0, 0.64444, 0, 0, 0.575],
              "52": [0, 0.64444, 0, 0, 0.575],
              "53": [0, 0.64444, 0, 0, 0.575],
              "54": [0, 0.64444, 0, 0, 0.575],
              "55": [0, 0.64444, 0, 0, 0.575],
              "56": [0, 0.64444, 0, 0, 0.575],
              "57": [0, 0.64444, 0, 0, 0.575],
              "58": [0, 0.44444, 0, 0, 0.31944],
              "59": [0.19444, 0.44444, 0, 0, 0.31944],
              "60": [0.08556, 0.58556, 0, 0, 0.89444],
              "61": [-0.10889, 0.39111, 0, 0, 0.89444],
              "62": [0.08556, 0.58556, 0, 0, 0.89444],
              "63": [0, 0.69444, 0, 0, 0.54305],
              "64": [0, 0.69444, 0, 0, 0.89444],
              "65": [0, 0.68611, 0, 0, 0.86944],
              "66": [0, 0.68611, 0, 0, 0.81805],
              "67": [0, 0.68611, 0, 0, 0.83055],
              "68": [0, 0.68611, 0, 0, 0.88194],
              "69": [0, 0.68611, 0, 0, 0.75555],
              "70": [0, 0.68611, 0, 0, 0.72361],
              "71": [0, 0.68611, 0, 0, 0.90416],
              "72": [0, 0.68611, 0, 0, 0.9],
              "73": [0, 0.68611, 0, 0, 0.43611],
              "74": [0, 0.68611, 0, 0, 0.59444],
              "75": [0, 0.68611, 0, 0, 0.90138],
              "76": [0, 0.68611, 0, 0, 0.69166],
              "77": [0, 0.68611, 0, 0, 1.09166],
              "78": [0, 0.68611, 0, 0, 0.9],
              "79": [0, 0.68611, 0, 0, 0.86388],
              "80": [0, 0.68611, 0, 0, 0.78611],
              "81": [0.19444, 0.68611, 0, 0, 0.86388],
              "82": [0, 0.68611, 0, 0, 0.8625],
              "83": [0, 0.68611, 0, 0, 0.63889],
              "84": [0, 0.68611, 0, 0, 0.8],
              "85": [0, 0.68611, 0, 0, 0.88472],
              "86": [0, 0.68611, 0.01597, 0, 0.86944],
              "87": [0, 0.68611, 0.01597, 0, 1.18888],
              "88": [0, 0.68611, 0, 0, 0.86944],
              "89": [0, 0.68611, 0.02875, 0, 0.86944],
              "90": [0, 0.68611, 0, 0, 0.70277],
              "91": [0.25, 0.75, 0, 0, 0.31944],
              "92": [0.25, 0.75, 0, 0, 0.575],
              "93": [0.25, 0.75, 0, 0, 0.31944],
              "94": [0, 0.69444, 0, 0, 0.575],
              "95": [0.31, 0.13444, 0.03194, 0, 0.575],
              "97": [0, 0.44444, 0, 0, 0.55902],
              "98": [0, 0.69444, 0, 0, 0.63889],
              "99": [0, 0.44444, 0, 0, 0.51111],
              "100": [0, 0.69444, 0, 0, 0.63889],
              "101": [0, 0.44444, 0, 0, 0.52708],
              "102": [0, 0.69444, 0.10903, 0, 0.35139],
              "103": [0.19444, 0.44444, 0.01597, 0, 0.575],
              "104": [0, 0.69444, 0, 0, 0.63889],
              "105": [0, 0.69444, 0, 0, 0.31944],
              "106": [0.19444, 0.69444, 0, 0, 0.35139],
              "107": [0, 0.69444, 0, 0, 0.60694],
              "108": [0, 0.69444, 0, 0, 0.31944],
              "109": [0, 0.44444, 0, 0, 0.95833],
              "110": [0, 0.44444, 0, 0, 0.63889],
              "111": [0, 0.44444, 0, 0, 0.575],
              "112": [0.19444, 0.44444, 0, 0, 0.63889],
              "113": [0.19444, 0.44444, 0, 0, 0.60694],
              "114": [0, 0.44444, 0, 0, 0.47361],
              "115": [0, 0.44444, 0, 0, 0.45361],
              "116": [0, 0.63492, 0, 0, 0.44722],
              "117": [0, 0.44444, 0, 0, 0.63889],
              "118": [0, 0.44444, 0.01597, 0, 0.60694],
              "119": [0, 0.44444, 0.01597, 0, 0.83055],
              "120": [0, 0.44444, 0, 0, 0.60694],
              "121": [0.19444, 0.44444, 0.01597, 0, 0.60694],
              "122": [0, 0.44444, 0, 0, 0.51111],
              "123": [0.25, 0.75, 0, 0, 0.575],
              "124": [0.25, 0.75, 0, 0, 0.31944],
              "125": [0.25, 0.75, 0, 0, 0.575],
              "126": [0.35, 0.34444, 0, 0, 0.575],
              "160": [0, 0, 0, 0, 0.25],
              "163": [0, 0.69444, 0, 0, 0.86853],
              "168": [0, 0.69444, 0, 0, 0.575],
              "172": [0, 0.44444, 0, 0, 0.76666],
              "176": [0, 0.69444, 0, 0, 0.86944],
              "177": [0.13333, 0.63333, 0, 0, 0.89444],
              "184": [0.17014, 0, 0, 0, 0.51111],
              "198": [0, 0.68611, 0, 0, 1.04166],
              "215": [0.13333, 0.63333, 0, 0, 0.89444],
              "216": [0.04861, 0.73472, 0, 0, 0.89444],
              "223": [0, 0.69444, 0, 0, 0.59722],
              "230": [0, 0.44444, 0, 0, 0.83055],
              "247": [0.13333, 0.63333, 0, 0, 0.89444],
              "248": [0.09722, 0.54167, 0, 0, 0.575],
              "305": [0, 0.44444, 0, 0, 0.31944],
              "338": [0, 0.68611, 0, 0, 1.16944],
              "339": [0, 0.44444, 0, 0, 0.89444],
              "567": [0.19444, 0.44444, 0, 0, 0.35139],
              "710": [0, 0.69444, 0, 0, 0.575],
              "711": [0, 0.63194, 0, 0, 0.575],
              "713": [0, 0.59611, 0, 0, 0.575],
              "714": [0, 0.69444, 0, 0, 0.575],
              "715": [0, 0.69444, 0, 0, 0.575],
              "728": [0, 0.69444, 0, 0, 0.575],
              "729": [0, 0.69444, 0, 0, 0.31944],
              "730": [0, 0.69444, 0, 0, 0.86944],
              "732": [0, 0.69444, 0, 0, 0.575],
              "733": [0, 0.69444, 0, 0, 0.575],
              "915": [0, 0.68611, 0, 0, 0.69166],
              "916": [0, 0.68611, 0, 0, 0.95833],
              "920": [0, 0.68611, 0, 0, 0.89444],
              "923": [0, 0.68611, 0, 0, 0.80555],
              "926": [0, 0.68611, 0, 0, 0.76666],
              "928": [0, 0.68611, 0, 0, 0.9],
              "931": [0, 0.68611, 0, 0, 0.83055],
              "933": [0, 0.68611, 0, 0, 0.89444],
              "934": [0, 0.68611, 0, 0, 0.83055],
              "936": [0, 0.68611, 0, 0, 0.89444],
              "937": [0, 0.68611, 0, 0, 0.83055],
              "8211": [0, 0.44444, 0.03194, 0, 0.575],
              "8212": [0, 0.44444, 0.03194, 0, 1.14999],
              "8216": [0, 0.69444, 0, 0, 0.31944],
              "8217": [0, 0.69444, 0, 0, 0.31944],
              "8220": [0, 0.69444, 0, 0, 0.60278],
              "8221": [0, 0.69444, 0, 0, 0.60278],
              "8224": [0.19444, 0.69444, 0, 0, 0.51111],
              "8225": [0.19444, 0.69444, 0, 0, 0.51111],
              "8242": [0, 0.55556, 0, 0, 0.34444],
              "8407": [0, 0.72444, 0.15486, 0, 0.575],
              "8463": [0, 0.69444, 0, 0, 0.66759],
              "8465": [0, 0.69444, 0, 0, 0.83055],
              "8467": [0, 0.69444, 0, 0, 0.47361],
              "8472": [0.19444, 0.44444, 0, 0, 0.74027],
              "8476": [0, 0.69444, 0, 0, 0.83055],
              "8501": [0, 0.69444, 0, 0, 0.70277],
              "8592": [-0.10889, 0.39111, 0, 0, 1.14999],
              "8593": [0.19444, 0.69444, 0, 0, 0.575],
              "8594": [-0.10889, 0.39111, 0, 0, 1.14999],
              "8595": [0.19444, 0.69444, 0, 0, 0.575],
              "8596": [-0.10889, 0.39111, 0, 0, 1.14999],
              "8597": [0.25, 0.75, 0, 0, 0.575],
              "8598": [0.19444, 0.69444, 0, 0, 1.14999],
              "8599": [0.19444, 0.69444, 0, 0, 1.14999],
              "8600": [0.19444, 0.69444, 0, 0, 1.14999],
              "8601": [0.19444, 0.69444, 0, 0, 1.14999],
              "8636": [-0.10889, 0.39111, 0, 0, 1.14999],
              "8637": [-0.10889, 0.39111, 0, 0, 1.14999],
              "8640": [-0.10889, 0.39111, 0, 0, 1.14999],
              "8641": [-0.10889, 0.39111, 0, 0, 1.14999],
              "8656": [-0.10889, 0.39111, 0, 0, 1.14999],
              "8657": [0.19444, 0.69444, 0, 0, 0.70277],
              "8658": [-0.10889, 0.39111, 0, 0, 1.14999],
              "8659": [0.19444, 0.69444, 0, 0, 0.70277],
              "8660": [-0.10889, 0.39111, 0, 0, 1.14999],
              "8661": [0.25, 0.75, 0, 0, 0.70277],
              "8704": [0, 0.69444, 0, 0, 0.63889],
              "8706": [0, 0.69444, 0.06389, 0, 0.62847],
              "8707": [0, 0.69444, 0, 0, 0.63889],
              "8709": [0.05556, 0.75, 0, 0, 0.575],
              "8711": [0, 0.68611, 0, 0, 0.95833],
              "8712": [0.08556, 0.58556, 0, 0, 0.76666],
              "8715": [0.08556, 0.58556, 0, 0, 0.76666],
              "8722": [0.13333, 0.63333, 0, 0, 0.89444],
              "8723": [0.13333, 0.63333, 0, 0, 0.89444],
              "8725": [0.25, 0.75, 0, 0, 0.575],
              "8726": [0.25, 0.75, 0, 0, 0.575],
              "8727": [-0.02778, 0.47222, 0, 0, 0.575],
              "8728": [-0.02639, 0.47361, 0, 0, 0.575],
              "8729": [-0.02639, 0.47361, 0, 0, 0.575],
              "8730": [0.18, 0.82, 0, 0, 0.95833],
              "8733": [0, 0.44444, 0, 0, 0.89444],
              "8734": [0, 0.44444, 0, 0, 1.14999],
              "8736": [0, 0.69224, 0, 0, 0.72222],
              "8739": [0.25, 0.75, 0, 0, 0.31944],
              "8741": [0.25, 0.75, 0, 0, 0.575],
              "8743": [0, 0.55556, 0, 0, 0.76666],
              "8744": [0, 0.55556, 0, 0, 0.76666],
              "8745": [0, 0.55556, 0, 0, 0.76666],
              "8746": [0, 0.55556, 0, 0, 0.76666],
              "8747": [0.19444, 0.69444, 0.12778, 0, 0.56875],
              "8764": [-0.10889, 0.39111, 0, 0, 0.89444],
              "8768": [0.19444, 0.69444, 0, 0, 0.31944],
              "8771": [222e-5, 0.50222, 0, 0, 0.89444],
              "8773": [0.027, 0.638, 0, 0, 0.894],
              "8776": [0.02444, 0.52444, 0, 0, 0.89444],
              "8781": [222e-5, 0.50222, 0, 0, 0.89444],
              "8801": [222e-5, 0.50222, 0, 0, 0.89444],
              "8804": [0.19667, 0.69667, 0, 0, 0.89444],
              "8805": [0.19667, 0.69667, 0, 0, 0.89444],
              "8810": [0.08556, 0.58556, 0, 0, 1.14999],
              "8811": [0.08556, 0.58556, 0, 0, 1.14999],
              "8826": [0.08556, 0.58556, 0, 0, 0.89444],
              "8827": [0.08556, 0.58556, 0, 0, 0.89444],
              "8834": [0.08556, 0.58556, 0, 0, 0.89444],
              "8835": [0.08556, 0.58556, 0, 0, 0.89444],
              "8838": [0.19667, 0.69667, 0, 0, 0.89444],
              "8839": [0.19667, 0.69667, 0, 0, 0.89444],
              "8846": [0, 0.55556, 0, 0, 0.76666],
              "8849": [0.19667, 0.69667, 0, 0, 0.89444],
              "8850": [0.19667, 0.69667, 0, 0, 0.89444],
              "8851": [0, 0.55556, 0, 0, 0.76666],
              "8852": [0, 0.55556, 0, 0, 0.76666],
              "8853": [0.13333, 0.63333, 0, 0, 0.89444],
              "8854": [0.13333, 0.63333, 0, 0, 0.89444],
              "8855": [0.13333, 0.63333, 0, 0, 0.89444],
              "8856": [0.13333, 0.63333, 0, 0, 0.89444],
              "8857": [0.13333, 0.63333, 0, 0, 0.89444],
              "8866": [0, 0.69444, 0, 0, 0.70277],
              "8867": [0, 0.69444, 0, 0, 0.70277],
              "8868": [0, 0.69444, 0, 0, 0.89444],
              "8869": [0, 0.69444, 0, 0, 0.89444],
              "8900": [-0.02639, 0.47361, 0, 0, 0.575],
              "8901": [-0.02639, 0.47361, 0, 0, 0.31944],
              "8902": [-0.02778, 0.47222, 0, 0, 0.575],
              "8968": [0.25, 0.75, 0, 0, 0.51111],
              "8969": [0.25, 0.75, 0, 0, 0.51111],
              "8970": [0.25, 0.75, 0, 0, 0.51111],
              "8971": [0.25, 0.75, 0, 0, 0.51111],
              "8994": [-0.13889, 0.36111, 0, 0, 1.14999],
              "8995": [-0.13889, 0.36111, 0, 0, 1.14999],
              "9651": [0.19444, 0.69444, 0, 0, 1.02222],
              "9657": [-0.02778, 0.47222, 0, 0, 0.575],
              "9661": [0.19444, 0.69444, 0, 0, 1.02222],
              "9667": [-0.02778, 0.47222, 0, 0, 0.575],
              "9711": [0.19444, 0.69444, 0, 0, 1.14999],
              "9824": [0.12963, 0.69444, 0, 0, 0.89444],
              "9825": [0.12963, 0.69444, 0, 0, 0.89444],
              "9826": [0.12963, 0.69444, 0, 0, 0.89444],
              "9827": [0.12963, 0.69444, 0, 0, 0.89444],
              "9837": [0, 0.75, 0, 0, 0.44722],
              "9838": [0.19444, 0.69444, 0, 0, 0.44722],
              "9839": [0.19444, 0.69444, 0, 0, 0.44722],
              "10216": [0.25, 0.75, 0, 0, 0.44722],
              "10217": [0.25, 0.75, 0, 0, 0.44722],
              "10815": [0, 0.68611, 0, 0, 0.9],
              "10927": [0.19667, 0.69667, 0, 0, 0.89444],
              "10928": [0.19667, 0.69667, 0, 0, 0.89444],
              "57376": [0.19444, 0.69444, 0, 0, 0]
            },
            "Main-BoldItalic": {
              "32": [0, 0, 0, 0, 0.25],
              "33": [0, 0.69444, 0.11417, 0, 0.38611],
              "34": [0, 0.69444, 0.07939, 0, 0.62055],
              "35": [0.19444, 0.69444, 0.06833, 0, 0.94444],
              "37": [0.05556, 0.75, 0.12861, 0, 0.94444],
              "38": [0, 0.69444, 0.08528, 0, 0.88555],
              "39": [0, 0.69444, 0.12945, 0, 0.35555],
              "40": [0.25, 0.75, 0.15806, 0, 0.47333],
              "41": [0.25, 0.75, 0.03306, 0, 0.47333],
              "42": [0, 0.75, 0.14333, 0, 0.59111],
              "43": [0.10333, 0.60333, 0.03306, 0, 0.88555],
              "44": [0.19444, 0.14722, 0, 0, 0.35555],
              "45": [0, 0.44444, 0.02611, 0, 0.41444],
              "46": [0, 0.14722, 0, 0, 0.35555],
              "47": [0.25, 0.75, 0.15806, 0, 0.59111],
              "48": [0, 0.64444, 0.13167, 0, 0.59111],
              "49": [0, 0.64444, 0.13167, 0, 0.59111],
              "50": [0, 0.64444, 0.13167, 0, 0.59111],
              "51": [0, 0.64444, 0.13167, 0, 0.59111],
              "52": [0.19444, 0.64444, 0.13167, 0, 0.59111],
              "53": [0, 0.64444, 0.13167, 0, 0.59111],
              "54": [0, 0.64444, 0.13167, 0, 0.59111],
              "55": [0.19444, 0.64444, 0.13167, 0, 0.59111],
              "56": [0, 0.64444, 0.13167, 0, 0.59111],
              "57": [0, 0.64444, 0.13167, 0, 0.59111],
              "58": [0, 0.44444, 0.06695, 0, 0.35555],
              "59": [0.19444, 0.44444, 0.06695, 0, 0.35555],
              "61": [-0.10889, 0.39111, 0.06833, 0, 0.88555],
              "63": [0, 0.69444, 0.11472, 0, 0.59111],
              "64": [0, 0.69444, 0.09208, 0, 0.88555],
              "65": [0, 0.68611, 0, 0, 0.86555],
              "66": [0, 0.68611, 0.0992, 0, 0.81666],
              "67": [0, 0.68611, 0.14208, 0, 0.82666],
              "68": [0, 0.68611, 0.09062, 0, 0.87555],
              "69": [0, 0.68611, 0.11431, 0, 0.75666],
              "70": [0, 0.68611, 0.12903, 0, 0.72722],
              "71": [0, 0.68611, 0.07347, 0, 0.89527],
              "72": [0, 0.68611, 0.17208, 0, 0.8961],
              "73": [0, 0.68611, 0.15681, 0, 0.47166],
              "74": [0, 0.68611, 0.145, 0, 0.61055],
              "75": [0, 0.68611, 0.14208, 0, 0.89499],
              "76": [0, 0.68611, 0, 0, 0.69777],
              "77": [0, 0.68611, 0.17208, 0, 1.07277],
              "78": [0, 0.68611, 0.17208, 0, 0.8961],
              "79": [0, 0.68611, 0.09062, 0, 0.85499],
              "80": [0, 0.68611, 0.0992, 0, 0.78721],
              "81": [0.19444, 0.68611, 0.09062, 0, 0.85499],
              "82": [0, 0.68611, 0.02559, 0, 0.85944],
              "83": [0, 0.68611, 0.11264, 0, 0.64999],
              "84": [0, 0.68611, 0.12903, 0, 0.7961],
              "85": [0, 0.68611, 0.17208, 0, 0.88083],
              "86": [0, 0.68611, 0.18625, 0, 0.86555],
              "87": [0, 0.68611, 0.18625, 0, 1.15999],
              "88": [0, 0.68611, 0.15681, 0, 0.86555],
              "89": [0, 0.68611, 0.19803, 0, 0.86555],
              "90": [0, 0.68611, 0.14208, 0, 0.70888],
              "91": [0.25, 0.75, 0.1875, 0, 0.35611],
              "93": [0.25, 0.75, 0.09972, 0, 0.35611],
              "94": [0, 0.69444, 0.06709, 0, 0.59111],
              "95": [0.31, 0.13444, 0.09811, 0, 0.59111],
              "97": [0, 0.44444, 0.09426, 0, 0.59111],
              "98": [0, 0.69444, 0.07861, 0, 0.53222],
              "99": [0, 0.44444, 0.05222, 0, 0.53222],
              "100": [0, 0.69444, 0.10861, 0, 0.59111],
              "101": [0, 0.44444, 0.085, 0, 0.53222],
              "102": [0.19444, 0.69444, 0.21778, 0, 0.4],
              "103": [0.19444, 0.44444, 0.105, 0, 0.53222],
              "104": [0, 0.69444, 0.09426, 0, 0.59111],
              "105": [0, 0.69326, 0.11387, 0, 0.35555],
              "106": [0.19444, 0.69326, 0.1672, 0, 0.35555],
              "107": [0, 0.69444, 0.11111, 0, 0.53222],
              "108": [0, 0.69444, 0.10861, 0, 0.29666],
              "109": [0, 0.44444, 0.09426, 0, 0.94444],
              "110": [0, 0.44444, 0.09426, 0, 0.64999],
              "111": [0, 0.44444, 0.07861, 0, 0.59111],
              "112": [0.19444, 0.44444, 0.07861, 0, 0.59111],
              "113": [0.19444, 0.44444, 0.105, 0, 0.53222],
              "114": [0, 0.44444, 0.11111, 0, 0.50167],
              "115": [0, 0.44444, 0.08167, 0, 0.48694],
              "116": [0, 0.63492, 0.09639, 0, 0.385],
              "117": [0, 0.44444, 0.09426, 0, 0.62055],
              "118": [0, 0.44444, 0.11111, 0, 0.53222],
              "119": [0, 0.44444, 0.11111, 0, 0.76777],
              "120": [0, 0.44444, 0.12583, 0, 0.56055],
              "121": [0.19444, 0.44444, 0.105, 0, 0.56166],
              "122": [0, 0.44444, 0.13889, 0, 0.49055],
              "126": [0.35, 0.34444, 0.11472, 0, 0.59111],
              "160": [0, 0, 0, 0, 0.25],
              "168": [0, 0.69444, 0.11473, 0, 0.59111],
              "176": [0, 0.69444, 0, 0, 0.94888],
              "184": [0.17014, 0, 0, 0, 0.53222],
              "198": [0, 0.68611, 0.11431, 0, 1.02277],
              "216": [0.04861, 0.73472, 0.09062, 0, 0.88555],
              "223": [0.19444, 0.69444, 0.09736, 0, 0.665],
              "230": [0, 0.44444, 0.085, 0, 0.82666],
              "248": [0.09722, 0.54167, 0.09458, 0, 0.59111],
              "305": [0, 0.44444, 0.09426, 0, 0.35555],
              "338": [0, 0.68611, 0.11431, 0, 1.14054],
              "339": [0, 0.44444, 0.085, 0, 0.82666],
              "567": [0.19444, 0.44444, 0.04611, 0, 0.385],
              "710": [0, 0.69444, 0.06709, 0, 0.59111],
              "711": [0, 0.63194, 0.08271, 0, 0.59111],
              "713": [0, 0.59444, 0.10444, 0, 0.59111],
              "714": [0, 0.69444, 0.08528, 0, 0.59111],
              "715": [0, 0.69444, 0, 0, 0.59111],
              "728": [0, 0.69444, 0.10333, 0, 0.59111],
              "729": [0, 0.69444, 0.12945, 0, 0.35555],
              "730": [0, 0.69444, 0, 0, 0.94888],
              "732": [0, 0.69444, 0.11472, 0, 0.59111],
              "733": [0, 0.69444, 0.11472, 0, 0.59111],
              "915": [0, 0.68611, 0.12903, 0, 0.69777],
              "916": [0, 0.68611, 0, 0, 0.94444],
              "920": [0, 0.68611, 0.09062, 0, 0.88555],
              "923": [0, 0.68611, 0, 0, 0.80666],
              "926": [0, 0.68611, 0.15092, 0, 0.76777],
              "928": [0, 0.68611, 0.17208, 0, 0.8961],
              "931": [0, 0.68611, 0.11431, 0, 0.82666],
              "933": [0, 0.68611, 0.10778, 0, 0.88555],
              "934": [0, 0.68611, 0.05632, 0, 0.82666],
              "936": [0, 0.68611, 0.10778, 0, 0.88555],
              "937": [0, 0.68611, 0.0992, 0, 0.82666],
              "8211": [0, 0.44444, 0.09811, 0, 0.59111],
              "8212": [0, 0.44444, 0.09811, 0, 1.18221],
              "8216": [0, 0.69444, 0.12945, 0, 0.35555],
              "8217": [0, 0.69444, 0.12945, 0, 0.35555],
              "8220": [0, 0.69444, 0.16772, 0, 0.62055],
              "8221": [0, 0.69444, 0.07939, 0, 0.62055]
            },
            "Main-Italic": {
              "32": [0, 0, 0, 0, 0.25],
              "33": [0, 0.69444, 0.12417, 0, 0.30667],
              "34": [0, 0.69444, 0.06961, 0, 0.51444],
              "35": [0.19444, 0.69444, 0.06616, 0, 0.81777],
              "37": [0.05556, 0.75, 0.13639, 0, 0.81777],
              "38": [0, 0.69444, 0.09694, 0, 0.76666],
              "39": [0, 0.69444, 0.12417, 0, 0.30667],
              "40": [0.25, 0.75, 0.16194, 0, 0.40889],
              "41": [0.25, 0.75, 0.03694, 0, 0.40889],
              "42": [0, 0.75, 0.14917, 0, 0.51111],
              "43": [0.05667, 0.56167, 0.03694, 0, 0.76666],
              "44": [0.19444, 0.10556, 0, 0, 0.30667],
              "45": [0, 0.43056, 0.02826, 0, 0.35778],
              "46": [0, 0.10556, 0, 0, 0.30667],
              "47": [0.25, 0.75, 0.16194, 0, 0.51111],
              "48": [0, 0.64444, 0.13556, 0, 0.51111],
              "49": [0, 0.64444, 0.13556, 0, 0.51111],
              "50": [0, 0.64444, 0.13556, 0, 0.51111],
              "51": [0, 0.64444, 0.13556, 0, 0.51111],
              "52": [0.19444, 0.64444, 0.13556, 0, 0.51111],
              "53": [0, 0.64444, 0.13556, 0, 0.51111],
              "54": [0, 0.64444, 0.13556, 0, 0.51111],
              "55": [0.19444, 0.64444, 0.13556, 0, 0.51111],
              "56": [0, 0.64444, 0.13556, 0, 0.51111],
              "57": [0, 0.64444, 0.13556, 0, 0.51111],
              "58": [0, 0.43056, 0.0582, 0, 0.30667],
              "59": [0.19444, 0.43056, 0.0582, 0, 0.30667],
              "61": [-0.13313, 0.36687, 0.06616, 0, 0.76666],
              "63": [0, 0.69444, 0.1225, 0, 0.51111],
              "64": [0, 0.69444, 0.09597, 0, 0.76666],
              "65": [0, 0.68333, 0, 0, 0.74333],
              "66": [0, 0.68333, 0.10257, 0, 0.70389],
              "67": [0, 0.68333, 0.14528, 0, 0.71555],
              "68": [0, 0.68333, 0.09403, 0, 0.755],
              "69": [0, 0.68333, 0.12028, 0, 0.67833],
              "70": [0, 0.68333, 0.13305, 0, 0.65277],
              "71": [0, 0.68333, 0.08722, 0, 0.77361],
              "72": [0, 0.68333, 0.16389, 0, 0.74333],
              "73": [0, 0.68333, 0.15806, 0, 0.38555],
              "74": [0, 0.68333, 0.14028, 0, 0.525],
              "75": [0, 0.68333, 0.14528, 0, 0.76888],
              "76": [0, 0.68333, 0, 0, 0.62722],
              "77": [0, 0.68333, 0.16389, 0, 0.89666],
              "78": [0, 0.68333, 0.16389, 0, 0.74333],
              "79": [0, 0.68333, 0.09403, 0, 0.76666],
              "80": [0, 0.68333, 0.10257, 0, 0.67833],
              "81": [0.19444, 0.68333, 0.09403, 0, 0.76666],
              "82": [0, 0.68333, 0.03868, 0, 0.72944],
              "83": [0, 0.68333, 0.11972, 0, 0.56222],
              "84": [0, 0.68333, 0.13305, 0, 0.71555],
              "85": [0, 0.68333, 0.16389, 0, 0.74333],
              "86": [0, 0.68333, 0.18361, 0, 0.74333],
              "87": [0, 0.68333, 0.18361, 0, 0.99888],
              "88": [0, 0.68333, 0.15806, 0, 0.74333],
              "89": [0, 0.68333, 0.19383, 0, 0.74333],
              "90": [0, 0.68333, 0.14528, 0, 0.61333],
              "91": [0.25, 0.75, 0.1875, 0, 0.30667],
              "93": [0.25, 0.75, 0.10528, 0, 0.30667],
              "94": [0, 0.69444, 0.06646, 0, 0.51111],
              "95": [0.31, 0.12056, 0.09208, 0, 0.51111],
              "97": [0, 0.43056, 0.07671, 0, 0.51111],
              "98": [0, 0.69444, 0.06312, 0, 0.46],
              "99": [0, 0.43056, 0.05653, 0, 0.46],
              "100": [0, 0.69444, 0.10333, 0, 0.51111],
              "101": [0, 0.43056, 0.07514, 0, 0.46],
              "102": [0.19444, 0.69444, 0.21194, 0, 0.30667],
              "103": [0.19444, 0.43056, 0.08847, 0, 0.46],
              "104": [0, 0.69444, 0.07671, 0, 0.51111],
              "105": [0, 0.65536, 0.1019, 0, 0.30667],
              "106": [0.19444, 0.65536, 0.14467, 0, 0.30667],
              "107": [0, 0.69444, 0.10764, 0, 0.46],
              "108": [0, 0.69444, 0.10333, 0, 0.25555],
              "109": [0, 0.43056, 0.07671, 0, 0.81777],
              "110": [0, 0.43056, 0.07671, 0, 0.56222],
              "111": [0, 0.43056, 0.06312, 0, 0.51111],
              "112": [0.19444, 0.43056, 0.06312, 0, 0.51111],
              "113": [0.19444, 0.43056, 0.08847, 0, 0.46],
              "114": [0, 0.43056, 0.10764, 0, 0.42166],
              "115": [0, 0.43056, 0.08208, 0, 0.40889],
              "116": [0, 0.61508, 0.09486, 0, 0.33222],
              "117": [0, 0.43056, 0.07671, 0, 0.53666],
              "118": [0, 0.43056, 0.10764, 0, 0.46],
              "119": [0, 0.43056, 0.10764, 0, 0.66444],
              "120": [0, 0.43056, 0.12042, 0, 0.46389],
              "121": [0.19444, 0.43056, 0.08847, 0, 0.48555],
              "122": [0, 0.43056, 0.12292, 0, 0.40889],
              "126": [0.35, 0.31786, 0.11585, 0, 0.51111],
              "160": [0, 0, 0, 0, 0.25],
              "168": [0, 0.66786, 0.10474, 0, 0.51111],
              "176": [0, 0.69444, 0, 0, 0.83129],
              "184": [0.17014, 0, 0, 0, 0.46],
              "198": [0, 0.68333, 0.12028, 0, 0.88277],
              "216": [0.04861, 0.73194, 0.09403, 0, 0.76666],
              "223": [0.19444, 0.69444, 0.10514, 0, 0.53666],
              "230": [0, 0.43056, 0.07514, 0, 0.71555],
              "248": [0.09722, 0.52778, 0.09194, 0, 0.51111],
              "338": [0, 0.68333, 0.12028, 0, 0.98499],
              "339": [0, 0.43056, 0.07514, 0, 0.71555],
              "710": [0, 0.69444, 0.06646, 0, 0.51111],
              "711": [0, 0.62847, 0.08295, 0, 0.51111],
              "713": [0, 0.56167, 0.10333, 0, 0.51111],
              "714": [0, 0.69444, 0.09694, 0, 0.51111],
              "715": [0, 0.69444, 0, 0, 0.51111],
              "728": [0, 0.69444, 0.10806, 0, 0.51111],
              "729": [0, 0.66786, 0.11752, 0, 0.30667],
              "730": [0, 0.69444, 0, 0, 0.83129],
              "732": [0, 0.66786, 0.11585, 0, 0.51111],
              "733": [0, 0.69444, 0.1225, 0, 0.51111],
              "915": [0, 0.68333, 0.13305, 0, 0.62722],
              "916": [0, 0.68333, 0, 0, 0.81777],
              "920": [0, 0.68333, 0.09403, 0, 0.76666],
              "923": [0, 0.68333, 0, 0, 0.69222],
              "926": [0, 0.68333, 0.15294, 0, 0.66444],
              "928": [0, 0.68333, 0.16389, 0, 0.74333],
              "931": [0, 0.68333, 0.12028, 0, 0.71555],
              "933": [0, 0.68333, 0.11111, 0, 0.76666],
              "934": [0, 0.68333, 0.05986, 0, 0.71555],
              "936": [0, 0.68333, 0.11111, 0, 0.76666],
              "937": [0, 0.68333, 0.10257, 0, 0.71555],
              "8211": [0, 0.43056, 0.09208, 0, 0.51111],
              "8212": [0, 0.43056, 0.09208, 0, 1.02222],
              "8216": [0, 0.69444, 0.12417, 0, 0.30667],
              "8217": [0, 0.69444, 0.12417, 0, 0.30667],
              "8220": [0, 0.69444, 0.1685, 0, 0.51444],
              "8221": [0, 0.69444, 0.06961, 0, 0.51444],
              "8463": [0, 0.68889, 0, 0, 0.54028]
            },
            "Main-Regular": {
              "32": [0, 0, 0, 0, 0.25],
              "33": [0, 0.69444, 0, 0, 0.27778],
              "34": [0, 0.69444, 0, 0, 0.5],
              "35": [0.19444, 0.69444, 0, 0, 0.83334],
              "36": [0.05556, 0.75, 0, 0, 0.5],
              "37": [0.05556, 0.75, 0, 0, 0.83334],
              "38": [0, 0.69444, 0, 0, 0.77778],
              "39": [0, 0.69444, 0, 0, 0.27778],
              "40": [0.25, 0.75, 0, 0, 0.38889],
              "41": [0.25, 0.75, 0, 0, 0.38889],
              "42": [0, 0.75, 0, 0, 0.5],
              "43": [0.08333, 0.58333, 0, 0, 0.77778],
              "44": [0.19444, 0.10556, 0, 0, 0.27778],
              "45": [0, 0.43056, 0, 0, 0.33333],
              "46": [0, 0.10556, 0, 0, 0.27778],
              "47": [0.25, 0.75, 0, 0, 0.5],
              "48": [0, 0.64444, 0, 0, 0.5],
              "49": [0, 0.64444, 0, 0, 0.5],
              "50": [0, 0.64444, 0, 0, 0.5],
              "51": [0, 0.64444, 0, 0, 0.5],
              "52": [0, 0.64444, 0, 0, 0.5],
              "53": [0, 0.64444, 0, 0, 0.5],
              "54": [0, 0.64444, 0, 0, 0.5],
              "55": [0, 0.64444, 0, 0, 0.5],
              "56": [0, 0.64444, 0, 0, 0.5],
              "57": [0, 0.64444, 0, 0, 0.5],
              "58": [0, 0.43056, 0, 0, 0.27778],
              "59": [0.19444, 0.43056, 0, 0, 0.27778],
              "60": [0.0391, 0.5391, 0, 0, 0.77778],
              "61": [-0.13313, 0.36687, 0, 0, 0.77778],
              "62": [0.0391, 0.5391, 0, 0, 0.77778],
              "63": [0, 0.69444, 0, 0, 0.47222],
              "64": [0, 0.69444, 0, 0, 0.77778],
              "65": [0, 0.68333, 0, 0, 0.75],
              "66": [0, 0.68333, 0, 0, 0.70834],
              "67": [0, 0.68333, 0, 0, 0.72222],
              "68": [0, 0.68333, 0, 0, 0.76389],
              "69": [0, 0.68333, 0, 0, 0.68056],
              "70": [0, 0.68333, 0, 0, 0.65278],
              "71": [0, 0.68333, 0, 0, 0.78472],
              "72": [0, 0.68333, 0, 0, 0.75],
              "73": [0, 0.68333, 0, 0, 0.36111],
              "74": [0, 0.68333, 0, 0, 0.51389],
              "75": [0, 0.68333, 0, 0, 0.77778],
              "76": [0, 0.68333, 0, 0, 0.625],
              "77": [0, 0.68333, 0, 0, 0.91667],
              "78": [0, 0.68333, 0, 0, 0.75],
              "79": [0, 0.68333, 0, 0, 0.77778],
              "80": [0, 0.68333, 0, 0, 0.68056],
              "81": [0.19444, 0.68333, 0, 0, 0.77778],
              "82": [0, 0.68333, 0, 0, 0.73611],
              "83": [0, 0.68333, 0, 0, 0.55556],
              "84": [0, 0.68333, 0, 0, 0.72222],
              "85": [0, 0.68333, 0, 0, 0.75],
              "86": [0, 0.68333, 0.01389, 0, 0.75],
              "87": [0, 0.68333, 0.01389, 0, 1.02778],
              "88": [0, 0.68333, 0, 0, 0.75],
              "89": [0, 0.68333, 0.025, 0, 0.75],
              "90": [0, 0.68333, 0, 0, 0.61111],
              "91": [0.25, 0.75, 0, 0, 0.27778],
              "92": [0.25, 0.75, 0, 0, 0.5],
              "93": [0.25, 0.75, 0, 0, 0.27778],
              "94": [0, 0.69444, 0, 0, 0.5],
              "95": [0.31, 0.12056, 0.02778, 0, 0.5],
              "97": [0, 0.43056, 0, 0, 0.5],
              "98": [0, 0.69444, 0, 0, 0.55556],
              "99": [0, 0.43056, 0, 0, 0.44445],
              "100": [0, 0.69444, 0, 0, 0.55556],
              "101": [0, 0.43056, 0, 0, 0.44445],
              "102": [0, 0.69444, 0.07778, 0, 0.30556],
              "103": [0.19444, 0.43056, 0.01389, 0, 0.5],
              "104": [0, 0.69444, 0, 0, 0.55556],
              "105": [0, 0.66786, 0, 0, 0.27778],
              "106": [0.19444, 0.66786, 0, 0, 0.30556],
              "107": [0, 0.69444, 0, 0, 0.52778],
              "108": [0, 0.69444, 0, 0, 0.27778],
              "109": [0, 0.43056, 0, 0, 0.83334],
              "110": [0, 0.43056, 0, 0, 0.55556],
              "111": [0, 0.43056, 0, 0, 0.5],
              "112": [0.19444, 0.43056, 0, 0, 0.55556],
              "113": [0.19444, 0.43056, 0, 0, 0.52778],
              "114": [0, 0.43056, 0, 0, 0.39167],
              "115": [0, 0.43056, 0, 0, 0.39445],
              "116": [0, 0.61508, 0, 0, 0.38889],
              "117": [0, 0.43056, 0, 0, 0.55556],
              "118": [0, 0.43056, 0.01389, 0, 0.52778],
              "119": [0, 0.43056, 0.01389, 0, 0.72222],
              "120": [0, 0.43056, 0, 0, 0.52778],
              "121": [0.19444, 0.43056, 0.01389, 0, 0.52778],
              "122": [0, 0.43056, 0, 0, 0.44445],
              "123": [0.25, 0.75, 0, 0, 0.5],
              "124": [0.25, 0.75, 0, 0, 0.27778],
              "125": [0.25, 0.75, 0, 0, 0.5],
              "126": [0.35, 0.31786, 0, 0, 0.5],
              "160": [0, 0, 0, 0, 0.25],
              "163": [0, 0.69444, 0, 0, 0.76909],
              "167": [0.19444, 0.69444, 0, 0, 0.44445],
              "168": [0, 0.66786, 0, 0, 0.5],
              "172": [0, 0.43056, 0, 0, 0.66667],
              "176": [0, 0.69444, 0, 0, 0.75],
              "177": [0.08333, 0.58333, 0, 0, 0.77778],
              "182": [0.19444, 0.69444, 0, 0, 0.61111],
              "184": [0.17014, 0, 0, 0, 0.44445],
              "198": [0, 0.68333, 0, 0, 0.90278],
              "215": [0.08333, 0.58333, 0, 0, 0.77778],
              "216": [0.04861, 0.73194, 0, 0, 0.77778],
              "223": [0, 0.69444, 0, 0, 0.5],
              "230": [0, 0.43056, 0, 0, 0.72222],
              "247": [0.08333, 0.58333, 0, 0, 0.77778],
              "248": [0.09722, 0.52778, 0, 0, 0.5],
              "305": [0, 0.43056, 0, 0, 0.27778],
              "338": [0, 0.68333, 0, 0, 1.01389],
              "339": [0, 0.43056, 0, 0, 0.77778],
              "567": [0.19444, 0.43056, 0, 0, 0.30556],
              "710": [0, 0.69444, 0, 0, 0.5],
              "711": [0, 0.62847, 0, 0, 0.5],
              "713": [0, 0.56778, 0, 0, 0.5],
              "714": [0, 0.69444, 0, 0, 0.5],
              "715": [0, 0.69444, 0, 0, 0.5],
              "728": [0, 0.69444, 0, 0, 0.5],
              "729": [0, 0.66786, 0, 0, 0.27778],
              "730": [0, 0.69444, 0, 0, 0.75],
              "732": [0, 0.66786, 0, 0, 0.5],
              "733": [0, 0.69444, 0, 0, 0.5],
              "915": [0, 0.68333, 0, 0, 0.625],
              "916": [0, 0.68333, 0, 0, 0.83334],
              "920": [0, 0.68333, 0, 0, 0.77778],
              "923": [0, 0.68333, 0, 0, 0.69445],
              "926": [0, 0.68333, 0, 0, 0.66667],
              "928": [0, 0.68333, 0, 0, 0.75],
              "931": [0, 0.68333, 0, 0, 0.72222],
              "933": [0, 0.68333, 0, 0, 0.77778],
              "934": [0, 0.68333, 0, 0, 0.72222],
              "936": [0, 0.68333, 0, 0, 0.77778],
              "937": [0, 0.68333, 0, 0, 0.72222],
              "8211": [0, 0.43056, 0.02778, 0, 0.5],
              "8212": [0, 0.43056, 0.02778, 0, 1],
              "8216": [0, 0.69444, 0, 0, 0.27778],
              "8217": [0, 0.69444, 0, 0, 0.27778],
              "8220": [0, 0.69444, 0, 0, 0.5],
              "8221": [0, 0.69444, 0, 0, 0.5],
              "8224": [0.19444, 0.69444, 0, 0, 0.44445],
              "8225": [0.19444, 0.69444, 0, 0, 0.44445],
              "8230": [0, 0.123, 0, 0, 1.172],
              "8242": [0, 0.55556, 0, 0, 0.275],
              "8407": [0, 0.71444, 0.15382, 0, 0.5],
              "8463": [0, 0.68889, 0, 0, 0.54028],
              "8465": [0, 0.69444, 0, 0, 0.72222],
              "8467": [0, 0.69444, 0, 0.11111, 0.41667],
              "8472": [0.19444, 0.43056, 0, 0.11111, 0.63646],
              "8476": [0, 0.69444, 0, 0, 0.72222],
              "8501": [0, 0.69444, 0, 0, 0.61111],
              "8592": [-0.13313, 0.36687, 0, 0, 1],
              "8593": [0.19444, 0.69444, 0, 0, 0.5],
              "8594": [-0.13313, 0.36687, 0, 0, 1],
              "8595": [0.19444, 0.69444, 0, 0, 0.5],
              "8596": [-0.13313, 0.36687, 0, 0, 1],
              "8597": [0.25, 0.75, 0, 0, 0.5],
              "8598": [0.19444, 0.69444, 0, 0, 1],
              "8599": [0.19444, 0.69444, 0, 0, 1],
              "8600": [0.19444, 0.69444, 0, 0, 1],
              "8601": [0.19444, 0.69444, 0, 0, 1],
              "8614": [0.011, 0.511, 0, 0, 1],
              "8617": [0.011, 0.511, 0, 0, 1.126],
              "8618": [0.011, 0.511, 0, 0, 1.126],
              "8636": [-0.13313, 0.36687, 0, 0, 1],
              "8637": [-0.13313, 0.36687, 0, 0, 1],
              "8640": [-0.13313, 0.36687, 0, 0, 1],
              "8641": [-0.13313, 0.36687, 0, 0, 1],
              "8652": [0.011, 0.671, 0, 0, 1],
              "8656": [-0.13313, 0.36687, 0, 0, 1],
              "8657": [0.19444, 0.69444, 0, 0, 0.61111],
              "8658": [-0.13313, 0.36687, 0, 0, 1],
              "8659": [0.19444, 0.69444, 0, 0, 0.61111],
              "8660": [-0.13313, 0.36687, 0, 0, 1],
              "8661": [0.25, 0.75, 0, 0, 0.61111],
              "8704": [0, 0.69444, 0, 0, 0.55556],
              "8706": [0, 0.69444, 0.05556, 0.08334, 0.5309],
              "8707": [0, 0.69444, 0, 0, 0.55556],
              "8709": [0.05556, 0.75, 0, 0, 0.5],
              "8711": [0, 0.68333, 0, 0, 0.83334],
              "8712": [0.0391, 0.5391, 0, 0, 0.66667],
              "8715": [0.0391, 0.5391, 0, 0, 0.66667],
              "8722": [0.08333, 0.58333, 0, 0, 0.77778],
              "8723": [0.08333, 0.58333, 0, 0, 0.77778],
              "8725": [0.25, 0.75, 0, 0, 0.5],
              "8726": [0.25, 0.75, 0, 0, 0.5],
              "8727": [-0.03472, 0.46528, 0, 0, 0.5],
              "8728": [-0.05555, 0.44445, 0, 0, 0.5],
              "8729": [-0.05555, 0.44445, 0, 0, 0.5],
              "8730": [0.2, 0.8, 0, 0, 0.83334],
              "8733": [0, 0.43056, 0, 0, 0.77778],
              "8734": [0, 0.43056, 0, 0, 1],
              "8736": [0, 0.69224, 0, 0, 0.72222],
              "8739": [0.25, 0.75, 0, 0, 0.27778],
              "8741": [0.25, 0.75, 0, 0, 0.5],
              "8743": [0, 0.55556, 0, 0, 0.66667],
              "8744": [0, 0.55556, 0, 0, 0.66667],
              "8745": [0, 0.55556, 0, 0, 0.66667],
              "8746": [0, 0.55556, 0, 0, 0.66667],
              "8747": [0.19444, 0.69444, 0.11111, 0, 0.41667],
              "8764": [-0.13313, 0.36687, 0, 0, 0.77778],
              "8768": [0.19444, 0.69444, 0, 0, 0.27778],
              "8771": [-0.03625, 0.46375, 0, 0, 0.77778],
              "8773": [-0.022, 0.589, 0, 0, 0.778],
              "8776": [-0.01688, 0.48312, 0, 0, 0.77778],
              "8781": [-0.03625, 0.46375, 0, 0, 0.77778],
              "8784": [-0.133, 0.673, 0, 0, 0.778],
              "8801": [-0.03625, 0.46375, 0, 0, 0.77778],
              "8804": [0.13597, 0.63597, 0, 0, 0.77778],
              "8805": [0.13597, 0.63597, 0, 0, 0.77778],
              "8810": [0.0391, 0.5391, 0, 0, 1],
              "8811": [0.0391, 0.5391, 0, 0, 1],
              "8826": [0.0391, 0.5391, 0, 0, 0.77778],
              "8827": [0.0391, 0.5391, 0, 0, 0.77778],
              "8834": [0.0391, 0.5391, 0, 0, 0.77778],
              "8835": [0.0391, 0.5391, 0, 0, 0.77778],
              "8838": [0.13597, 0.63597, 0, 0, 0.77778],
              "8839": [0.13597, 0.63597, 0, 0, 0.77778],
              "8846": [0, 0.55556, 0, 0, 0.66667],
              "8849": [0.13597, 0.63597, 0, 0, 0.77778],
              "8850": [0.13597, 0.63597, 0, 0, 0.77778],
              "8851": [0, 0.55556, 0, 0, 0.66667],
              "8852": [0, 0.55556, 0, 0, 0.66667],
              "8853": [0.08333, 0.58333, 0, 0, 0.77778],
              "8854": [0.08333, 0.58333, 0, 0, 0.77778],
              "8855": [0.08333, 0.58333, 0, 0, 0.77778],
              "8856": [0.08333, 0.58333, 0, 0, 0.77778],
              "8857": [0.08333, 0.58333, 0, 0, 0.77778],
              "8866": [0, 0.69444, 0, 0, 0.61111],
              "8867": [0, 0.69444, 0, 0, 0.61111],
              "8868": [0, 0.69444, 0, 0, 0.77778],
              "8869": [0, 0.69444, 0, 0, 0.77778],
              "8872": [0.249, 0.75, 0, 0, 0.867],
              "8900": [-0.05555, 0.44445, 0, 0, 0.5],
              "8901": [-0.05555, 0.44445, 0, 0, 0.27778],
              "8902": [-0.03472, 0.46528, 0, 0, 0.5],
              "8904": [5e-3, 0.505, 0, 0, 0.9],
              "8942": [0.03, 0.903, 0, 0, 0.278],
              "8943": [-0.19, 0.313, 0, 0, 1.172],
              "8945": [-0.1, 0.823, 0, 0, 1.282],
              "8968": [0.25, 0.75, 0, 0, 0.44445],
              "8969": [0.25, 0.75, 0, 0, 0.44445],
              "8970": [0.25, 0.75, 0, 0, 0.44445],
              "8971": [0.25, 0.75, 0, 0, 0.44445],
              "8994": [-0.14236, 0.35764, 0, 0, 1],
              "8995": [-0.14236, 0.35764, 0, 0, 1],
              "9136": [0.244, 0.744, 0, 0, 0.412],
              "9137": [0.244, 0.745, 0, 0, 0.412],
              "9651": [0.19444, 0.69444, 0, 0, 0.88889],
              "9657": [-0.03472, 0.46528, 0, 0, 0.5],
              "9661": [0.19444, 0.69444, 0, 0, 0.88889],
              "9667": [-0.03472, 0.46528, 0, 0, 0.5],
              "9711": [0.19444, 0.69444, 0, 0, 1],
              "9824": [0.12963, 0.69444, 0, 0, 0.77778],
              "9825": [0.12963, 0.69444, 0, 0, 0.77778],
              "9826": [0.12963, 0.69444, 0, 0, 0.77778],
              "9827": [0.12963, 0.69444, 0, 0, 0.77778],
              "9837": [0, 0.75, 0, 0, 0.38889],
              "9838": [0.19444, 0.69444, 0, 0, 0.38889],
              "9839": [0.19444, 0.69444, 0, 0, 0.38889],
              "10216": [0.25, 0.75, 0, 0, 0.38889],
              "10217": [0.25, 0.75, 0, 0, 0.38889],
              "10222": [0.244, 0.744, 0, 0, 0.412],
              "10223": [0.244, 0.745, 0, 0, 0.412],
              "10229": [0.011, 0.511, 0, 0, 1.609],
              "10230": [0.011, 0.511, 0, 0, 1.638],
              "10231": [0.011, 0.511, 0, 0, 1.859],
              "10232": [0.024, 0.525, 0, 0, 1.609],
              "10233": [0.024, 0.525, 0, 0, 1.638],
              "10234": [0.024, 0.525, 0, 0, 1.858],
              "10236": [0.011, 0.511, 0, 0, 1.638],
              "10815": [0, 0.68333, 0, 0, 0.75],
              "10927": [0.13597, 0.63597, 0, 0, 0.77778],
              "10928": [0.13597, 0.63597, 0, 0, 0.77778],
              "57376": [0.19444, 0.69444, 0, 0, 0]
            },
            "Math-BoldItalic": {
              "32": [0, 0, 0, 0, 0.25],
              "48": [0, 0.44444, 0, 0, 0.575],
              "49": [0, 0.44444, 0, 0, 0.575],
              "50": [0, 0.44444, 0, 0, 0.575],
              "51": [0.19444, 0.44444, 0, 0, 0.575],
              "52": [0.19444, 0.44444, 0, 0, 0.575],
              "53": [0.19444, 0.44444, 0, 0, 0.575],
              "54": [0, 0.64444, 0, 0, 0.575],
              "55": [0.19444, 0.44444, 0, 0, 0.575],
              "56": [0, 0.64444, 0, 0, 0.575],
              "57": [0.19444, 0.44444, 0, 0, 0.575],
              "65": [0, 0.68611, 0, 0, 0.86944],
              "66": [0, 0.68611, 0.04835, 0, 0.8664],
              "67": [0, 0.68611, 0.06979, 0, 0.81694],
              "68": [0, 0.68611, 0.03194, 0, 0.93812],
              "69": [0, 0.68611, 0.05451, 0, 0.81007],
              "70": [0, 0.68611, 0.15972, 0, 0.68889],
              "71": [0, 0.68611, 0, 0, 0.88673],
              "72": [0, 0.68611, 0.08229, 0, 0.98229],
              "73": [0, 0.68611, 0.07778, 0, 0.51111],
              "74": [0, 0.68611, 0.10069, 0, 0.63125],
              "75": [0, 0.68611, 0.06979, 0, 0.97118],
              "76": [0, 0.68611, 0, 0, 0.75555],
              "77": [0, 0.68611, 0.11424, 0, 1.14201],
              "78": [0, 0.68611, 0.11424, 0, 0.95034],
              "79": [0, 0.68611, 0.03194, 0, 0.83666],
              "80": [0, 0.68611, 0.15972, 0, 0.72309],
              "81": [0.19444, 0.68611, 0, 0, 0.86861],
              "82": [0, 0.68611, 421e-5, 0, 0.87235],
              "83": [0, 0.68611, 0.05382, 0, 0.69271],
              "84": [0, 0.68611, 0.15972, 0, 0.63663],
              "85": [0, 0.68611, 0.11424, 0, 0.80027],
              "86": [0, 0.68611, 0.25555, 0, 0.67778],
              "87": [0, 0.68611, 0.15972, 0, 1.09305],
              "88": [0, 0.68611, 0.07778, 0, 0.94722],
              "89": [0, 0.68611, 0.25555, 0, 0.67458],
              "90": [0, 0.68611, 0.06979, 0, 0.77257],
              "97": [0, 0.44444, 0, 0, 0.63287],
              "98": [0, 0.69444, 0, 0, 0.52083],
              "99": [0, 0.44444, 0, 0, 0.51342],
              "100": [0, 0.69444, 0, 0, 0.60972],
              "101": [0, 0.44444, 0, 0, 0.55361],
              "102": [0.19444, 0.69444, 0.11042, 0, 0.56806],
              "103": [0.19444, 0.44444, 0.03704, 0, 0.5449],
              "104": [0, 0.69444, 0, 0, 0.66759],
              "105": [0, 0.69326, 0, 0, 0.4048],
              "106": [0.19444, 0.69326, 0.0622, 0, 0.47083],
              "107": [0, 0.69444, 0.01852, 0, 0.6037],
              "108": [0, 0.69444, 88e-4, 0, 0.34815],
              "109": [0, 0.44444, 0, 0, 1.0324],
              "110": [0, 0.44444, 0, 0, 0.71296],
              "111": [0, 0.44444, 0, 0, 0.58472],
              "112": [0.19444, 0.44444, 0, 0, 0.60092],
              "113": [0.19444, 0.44444, 0.03704, 0, 0.54213],
              "114": [0, 0.44444, 0.03194, 0, 0.5287],
              "115": [0, 0.44444, 0, 0, 0.53125],
              "116": [0, 0.63492, 0, 0, 0.41528],
              "117": [0, 0.44444, 0, 0, 0.68102],
              "118": [0, 0.44444, 0.03704, 0, 0.56666],
              "119": [0, 0.44444, 0.02778, 0, 0.83148],
              "120": [0, 0.44444, 0, 0, 0.65903],
              "121": [0.19444, 0.44444, 0.03704, 0, 0.59028],
              "122": [0, 0.44444, 0.04213, 0, 0.55509],
              "160": [0, 0, 0, 0, 0.25],
              "915": [0, 0.68611, 0.15972, 0, 0.65694],
              "916": [0, 0.68611, 0, 0, 0.95833],
              "920": [0, 0.68611, 0.03194, 0, 0.86722],
              "923": [0, 0.68611, 0, 0, 0.80555],
              "926": [0, 0.68611, 0.07458, 0, 0.84125],
              "928": [0, 0.68611, 0.08229, 0, 0.98229],
              "931": [0, 0.68611, 0.05451, 0, 0.88507],
              "933": [0, 0.68611, 0.15972, 0, 0.67083],
              "934": [0, 0.68611, 0, 0, 0.76666],
              "936": [0, 0.68611, 0.11653, 0, 0.71402],
              "937": [0, 0.68611, 0.04835, 0, 0.8789],
              "945": [0, 0.44444, 0, 0, 0.76064],
              "946": [0.19444, 0.69444, 0.03403, 0, 0.65972],
              "947": [0.19444, 0.44444, 0.06389, 0, 0.59003],
              "948": [0, 0.69444, 0.03819, 0, 0.52222],
              "949": [0, 0.44444, 0, 0, 0.52882],
              "950": [0.19444, 0.69444, 0.06215, 0, 0.50833],
              "951": [0.19444, 0.44444, 0.03704, 0, 0.6],
              "952": [0, 0.69444, 0.03194, 0, 0.5618],
              "953": [0, 0.44444, 0, 0, 0.41204],
              "954": [0, 0.44444, 0, 0, 0.66759],
              "955": [0, 0.69444, 0, 0, 0.67083],
              "956": [0.19444, 0.44444, 0, 0, 0.70787],
              "957": [0, 0.44444, 0.06898, 0, 0.57685],
              "958": [0.19444, 0.69444, 0.03021, 0, 0.50833],
              "959": [0, 0.44444, 0, 0, 0.58472],
              "960": [0, 0.44444, 0.03704, 0, 0.68241],
              "961": [0.19444, 0.44444, 0, 0, 0.6118],
              "962": [0.09722, 0.44444, 0.07917, 0, 0.42361],
              "963": [0, 0.44444, 0.03704, 0, 0.68588],
              "964": [0, 0.44444, 0.13472, 0, 0.52083],
              "965": [0, 0.44444, 0.03704, 0, 0.63055],
              "966": [0.19444, 0.44444, 0, 0, 0.74722],
              "967": [0.19444, 0.44444, 0, 0, 0.71805],
              "968": [0.19444, 0.69444, 0.03704, 0, 0.75833],
              "969": [0, 0.44444, 0.03704, 0, 0.71782],
              "977": [0, 0.69444, 0, 0, 0.69155],
              "981": [0.19444, 0.69444, 0, 0, 0.7125],
              "982": [0, 0.44444, 0.03194, 0, 0.975],
              "1009": [0.19444, 0.44444, 0, 0, 0.6118],
              "1013": [0, 0.44444, 0, 0, 0.48333],
              "57649": [0, 0.44444, 0, 0, 0.39352],
              "57911": [0.19444, 0.44444, 0, 0, 0.43889]
            },
            "Math-Italic": {
              "32": [0, 0, 0, 0, 0.25],
              "48": [0, 0.43056, 0, 0, 0.5],
              "49": [0, 0.43056, 0, 0, 0.5],
              "50": [0, 0.43056, 0, 0, 0.5],
              "51": [0.19444, 0.43056, 0, 0, 0.5],
              "52": [0.19444, 0.43056, 0, 0, 0.5],
              "53": [0.19444, 0.43056, 0, 0, 0.5],
              "54": [0, 0.64444, 0, 0, 0.5],
              "55": [0.19444, 0.43056, 0, 0, 0.5],
              "56": [0, 0.64444, 0, 0, 0.5],
              "57": [0.19444, 0.43056, 0, 0, 0.5],
              "65": [0, 0.68333, 0, 0.13889, 0.75],
              "66": [0, 0.68333, 0.05017, 0.08334, 0.75851],
              "67": [0, 0.68333, 0.07153, 0.08334, 0.71472],
              "68": [0, 0.68333, 0.02778, 0.05556, 0.82792],
              "69": [0, 0.68333, 0.05764, 0.08334, 0.7382],
              "70": [0, 0.68333, 0.13889, 0.08334, 0.64306],
              "71": [0, 0.68333, 0, 0.08334, 0.78625],
              "72": [0, 0.68333, 0.08125, 0.05556, 0.83125],
              "73": [0, 0.68333, 0.07847, 0.11111, 0.43958],
              "74": [0, 0.68333, 0.09618, 0.16667, 0.55451],
              "75": [0, 0.68333, 0.07153, 0.05556, 0.84931],
              "76": [0, 0.68333, 0, 0.02778, 0.68056],
              "77": [0, 0.68333, 0.10903, 0.08334, 0.97014],
              "78": [0, 0.68333, 0.10903, 0.08334, 0.80347],
              "79": [0, 0.68333, 0.02778, 0.08334, 0.76278],
              "80": [0, 0.68333, 0.13889, 0.08334, 0.64201],
              "81": [0.19444, 0.68333, 0, 0.08334, 0.79056],
              "82": [0, 0.68333, 773e-5, 0.08334, 0.75929],
              "83": [0, 0.68333, 0.05764, 0.08334, 0.6132],
              "84": [0, 0.68333, 0.13889, 0.08334, 0.58438],
              "85": [0, 0.68333, 0.10903, 0.02778, 0.68278],
              "86": [0, 0.68333, 0.22222, 0, 0.58333],
              "87": [0, 0.68333, 0.13889, 0, 0.94445],
              "88": [0, 0.68333, 0.07847, 0.08334, 0.82847],
              "89": [0, 0.68333, 0.22222, 0, 0.58056],
              "90": [0, 0.68333, 0.07153, 0.08334, 0.68264],
              "97": [0, 0.43056, 0, 0, 0.52859],
              "98": [0, 0.69444, 0, 0, 0.42917],
              "99": [0, 0.43056, 0, 0.05556, 0.43276],
              "100": [0, 0.69444, 0, 0.16667, 0.52049],
              "101": [0, 0.43056, 0, 0.05556, 0.46563],
              "102": [0.19444, 0.69444, 0.10764, 0.16667, 0.48959],
              "103": [0.19444, 0.43056, 0.03588, 0.02778, 0.47697],
              "104": [0, 0.69444, 0, 0, 0.57616],
              "105": [0, 0.65952, 0, 0, 0.34451],
              "106": [0.19444, 0.65952, 0.05724, 0, 0.41181],
              "107": [0, 0.69444, 0.03148, 0, 0.5206],
              "108": [0, 0.69444, 0.01968, 0.08334, 0.29838],
              "109": [0, 0.43056, 0, 0, 0.87801],
              "110": [0, 0.43056, 0, 0, 0.60023],
              "111": [0, 0.43056, 0, 0.05556, 0.48472],
              "112": [0.19444, 0.43056, 0, 0.08334, 0.50313],
              "113": [0.19444, 0.43056, 0.03588, 0.08334, 0.44641],
              "114": [0, 0.43056, 0.02778, 0.05556, 0.45116],
              "115": [0, 0.43056, 0, 0.05556, 0.46875],
              "116": [0, 0.61508, 0, 0.08334, 0.36111],
              "117": [0, 0.43056, 0, 0.02778, 0.57246],
              "118": [0, 0.43056, 0.03588, 0.02778, 0.48472],
              "119": [0, 0.43056, 0.02691, 0.08334, 0.71592],
              "120": [0, 0.43056, 0, 0.02778, 0.57153],
              "121": [0.19444, 0.43056, 0.03588, 0.05556, 0.49028],
              "122": [0, 0.43056, 0.04398, 0.05556, 0.46505],
              "160": [0, 0, 0, 0, 0.25],
              "915": [0, 0.68333, 0.13889, 0.08334, 0.61528],
              "916": [0, 0.68333, 0, 0.16667, 0.83334],
              "920": [0, 0.68333, 0.02778, 0.08334, 0.76278],
              "923": [0, 0.68333, 0, 0.16667, 0.69445],
              "926": [0, 0.68333, 0.07569, 0.08334, 0.74236],
              "928": [0, 0.68333, 0.08125, 0.05556, 0.83125],
              "931": [0, 0.68333, 0.05764, 0.08334, 0.77986],
              "933": [0, 0.68333, 0.13889, 0.05556, 0.58333],
              "934": [0, 0.68333, 0, 0.08334, 0.66667],
              "936": [0, 0.68333, 0.11, 0.05556, 0.61222],
              "937": [0, 0.68333, 0.05017, 0.08334, 0.7724],
              "945": [0, 0.43056, 37e-4, 0.02778, 0.6397],
              "946": [0.19444, 0.69444, 0.05278, 0.08334, 0.56563],
              "947": [0.19444, 0.43056, 0.05556, 0, 0.51773],
              "948": [0, 0.69444, 0.03785, 0.05556, 0.44444],
              "949": [0, 0.43056, 0, 0.08334, 0.46632],
              "950": [0.19444, 0.69444, 0.07378, 0.08334, 0.4375],
              "951": [0.19444, 0.43056, 0.03588, 0.05556, 0.49653],
              "952": [0, 0.69444, 0.02778, 0.08334, 0.46944],
              "953": [0, 0.43056, 0, 0.05556, 0.35394],
              "954": [0, 0.43056, 0, 0, 0.57616],
              "955": [0, 0.69444, 0, 0, 0.58334],
              "956": [0.19444, 0.43056, 0, 0.02778, 0.60255],
              "957": [0, 0.43056, 0.06366, 0.02778, 0.49398],
              "958": [0.19444, 0.69444, 0.04601, 0.11111, 0.4375],
              "959": [0, 0.43056, 0, 0.05556, 0.48472],
              "960": [0, 0.43056, 0.03588, 0, 0.57003],
              "961": [0.19444, 0.43056, 0, 0.08334, 0.51702],
              "962": [0.09722, 0.43056, 0.07986, 0.08334, 0.36285],
              "963": [0, 0.43056, 0.03588, 0, 0.57141],
              "964": [0, 0.43056, 0.1132, 0.02778, 0.43715],
              "965": [0, 0.43056, 0.03588, 0.02778, 0.54028],
              "966": [0.19444, 0.43056, 0, 0.08334, 0.65417],
              "967": [0.19444, 0.43056, 0, 0.05556, 0.62569],
              "968": [0.19444, 0.69444, 0.03588, 0.11111, 0.65139],
              "969": [0, 0.43056, 0.03588, 0, 0.62245],
              "977": [0, 0.69444, 0, 0.08334, 0.59144],
              "981": [0.19444, 0.69444, 0, 0.08334, 0.59583],
              "982": [0, 0.43056, 0.02778, 0, 0.82813],
              "1009": [0.19444, 0.43056, 0, 0.08334, 0.51702],
              "1013": [0, 0.43056, 0, 0.05556, 0.4059],
              "57649": [0, 0.43056, 0, 0.02778, 0.32246],
              "57911": [0.19444, 0.43056, 0, 0.08334, 0.38403]
            },
            "SansSerif-Bold": {
              "32": [0, 0, 0, 0, 0.25],
              "33": [0, 0.69444, 0, 0, 0.36667],
              "34": [0, 0.69444, 0, 0, 0.55834],
              "35": [0.19444, 0.69444, 0, 0, 0.91667],
              "36": [0.05556, 0.75, 0, 0, 0.55],
              "37": [0.05556, 0.75, 0, 0, 1.02912],
              "38": [0, 0.69444, 0, 0, 0.83056],
              "39": [0, 0.69444, 0, 0, 0.30556],
              "40": [0.25, 0.75, 0, 0, 0.42778],
              "41": [0.25, 0.75, 0, 0, 0.42778],
              "42": [0, 0.75, 0, 0, 0.55],
              "43": [0.11667, 0.61667, 0, 0, 0.85556],
              "44": [0.10556, 0.13056, 0, 0, 0.30556],
              "45": [0, 0.45833, 0, 0, 0.36667],
              "46": [0, 0.13056, 0, 0, 0.30556],
              "47": [0.25, 0.75, 0, 0, 0.55],
              "48": [0, 0.69444, 0, 0, 0.55],
              "49": [0, 0.69444, 0, 0, 0.55],
              "50": [0, 0.69444, 0, 0, 0.55],
              "51": [0, 0.69444, 0, 0, 0.55],
              "52": [0, 0.69444, 0, 0, 0.55],
              "53": [0, 0.69444, 0, 0, 0.55],
              "54": [0, 0.69444, 0, 0, 0.55],
              "55": [0, 0.69444, 0, 0, 0.55],
              "56": [0, 0.69444, 0, 0, 0.55],
              "57": [0, 0.69444, 0, 0, 0.55],
              "58": [0, 0.45833, 0, 0, 0.30556],
              "59": [0.10556, 0.45833, 0, 0, 0.30556],
              "61": [-0.09375, 0.40625, 0, 0, 0.85556],
              "63": [0, 0.69444, 0, 0, 0.51945],
              "64": [0, 0.69444, 0, 0, 0.73334],
              "65": [0, 0.69444, 0, 0, 0.73334],
              "66": [0, 0.69444, 0, 0, 0.73334],
              "67": [0, 0.69444, 0, 0, 0.70278],
              "68": [0, 0.69444, 0, 0, 0.79445],
              "69": [0, 0.69444, 0, 0, 0.64167],
              "70": [0, 0.69444, 0, 0, 0.61111],
              "71": [0, 0.69444, 0, 0, 0.73334],
              "72": [0, 0.69444, 0, 0, 0.79445],
              "73": [0, 0.69444, 0, 0, 0.33056],
              "74": [0, 0.69444, 0, 0, 0.51945],
              "75": [0, 0.69444, 0, 0, 0.76389],
              "76": [0, 0.69444, 0, 0, 0.58056],
              "77": [0, 0.69444, 0, 0, 0.97778],
              "78": [0, 0.69444, 0, 0, 0.79445],
              "79": [0, 0.69444, 0, 0, 0.79445],
              "80": [0, 0.69444, 0, 0, 0.70278],
              "81": [0.10556, 0.69444, 0, 0, 0.79445],
              "82": [0, 0.69444, 0, 0, 0.70278],
              "83": [0, 0.69444, 0, 0, 0.61111],
              "84": [0, 0.69444, 0, 0, 0.73334],
              "85": [0, 0.69444, 0, 0, 0.76389],
              "86": [0, 0.69444, 0.01528, 0, 0.73334],
              "87": [0, 0.69444, 0.01528, 0, 1.03889],
              "88": [0, 0.69444, 0, 0, 0.73334],
              "89": [0, 0.69444, 0.0275, 0, 0.73334],
              "90": [0, 0.69444, 0, 0, 0.67223],
              "91": [0.25, 0.75, 0, 0, 0.34306],
              "93": [0.25, 0.75, 0, 0, 0.34306],
              "94": [0, 0.69444, 0, 0, 0.55],
              "95": [0.35, 0.10833, 0.03056, 0, 0.55],
              "97": [0, 0.45833, 0, 0, 0.525],
              "98": [0, 0.69444, 0, 0, 0.56111],
              "99": [0, 0.45833, 0, 0, 0.48889],
              "100": [0, 0.69444, 0, 0, 0.56111],
              "101": [0, 0.45833, 0, 0, 0.51111],
              "102": [0, 0.69444, 0.07639, 0, 0.33611],
              "103": [0.19444, 0.45833, 0.01528, 0, 0.55],
              "104": [0, 0.69444, 0, 0, 0.56111],
              "105": [0, 0.69444, 0, 0, 0.25556],
              "106": [0.19444, 0.69444, 0, 0, 0.28611],
              "107": [0, 0.69444, 0, 0, 0.53056],
              "108": [0, 0.69444, 0, 0, 0.25556],
              "109": [0, 0.45833, 0, 0, 0.86667],
              "110": [0, 0.45833, 0, 0, 0.56111],
              "111": [0, 0.45833, 0, 0, 0.55],
              "112": [0.19444, 0.45833, 0, 0, 0.56111],
              "113": [0.19444, 0.45833, 0, 0, 0.56111],
              "114": [0, 0.45833, 0.01528, 0, 0.37222],
              "115": [0, 0.45833, 0, 0, 0.42167],
              "116": [0, 0.58929, 0, 0, 0.40417],
              "117": [0, 0.45833, 0, 0, 0.56111],
              "118": [0, 0.45833, 0.01528, 0, 0.5],
              "119": [0, 0.45833, 0.01528, 0, 0.74445],
              "120": [0, 0.45833, 0, 0, 0.5],
              "121": [0.19444, 0.45833, 0.01528, 0, 0.5],
              "122": [0, 0.45833, 0, 0, 0.47639],
              "126": [0.35, 0.34444, 0, 0, 0.55],
              "160": [0, 0, 0, 0, 0.25],
              "168": [0, 0.69444, 0, 0, 0.55],
              "176": [0, 0.69444, 0, 0, 0.73334],
              "180": [0, 0.69444, 0, 0, 0.55],
              "184": [0.17014, 0, 0, 0, 0.48889],
              "305": [0, 0.45833, 0, 0, 0.25556],
              "567": [0.19444, 0.45833, 0, 0, 0.28611],
              "710": [0, 0.69444, 0, 0, 0.55],
              "711": [0, 0.63542, 0, 0, 0.55],
              "713": [0, 0.63778, 0, 0, 0.55],
              "728": [0, 0.69444, 0, 0, 0.55],
              "729": [0, 0.69444, 0, 0, 0.30556],
              "730": [0, 0.69444, 0, 0, 0.73334],
              "732": [0, 0.69444, 0, 0, 0.55],
              "733": [0, 0.69444, 0, 0, 0.55],
              "915": [0, 0.69444, 0, 0, 0.58056],
              "916": [0, 0.69444, 0, 0, 0.91667],
              "920": [0, 0.69444, 0, 0, 0.85556],
              "923": [0, 0.69444, 0, 0, 0.67223],
              "926": [0, 0.69444, 0, 0, 0.73334],
              "928": [0, 0.69444, 0, 0, 0.79445],
              "931": [0, 0.69444, 0, 0, 0.79445],
              "933": [0, 0.69444, 0, 0, 0.85556],
              "934": [0, 0.69444, 0, 0, 0.79445],
              "936": [0, 0.69444, 0, 0, 0.85556],
              "937": [0, 0.69444, 0, 0, 0.79445],
              "8211": [0, 0.45833, 0.03056, 0, 0.55],
              "8212": [0, 0.45833, 0.03056, 0, 1.10001],
              "8216": [0, 0.69444, 0, 0, 0.30556],
              "8217": [0, 0.69444, 0, 0, 0.30556],
              "8220": [0, 0.69444, 0, 0, 0.55834],
              "8221": [0, 0.69444, 0, 0, 0.55834]
            },
            "SansSerif-Italic": {
              "32": [0, 0, 0, 0, 0.25],
              "33": [0, 0.69444, 0.05733, 0, 0.31945],
              "34": [0, 0.69444, 316e-5, 0, 0.5],
              "35": [0.19444, 0.69444, 0.05087, 0, 0.83334],
              "36": [0.05556, 0.75, 0.11156, 0, 0.5],
              "37": [0.05556, 0.75, 0.03126, 0, 0.83334],
              "38": [0, 0.69444, 0.03058, 0, 0.75834],
              "39": [0, 0.69444, 0.07816, 0, 0.27778],
              "40": [0.25, 0.75, 0.13164, 0, 0.38889],
              "41": [0.25, 0.75, 0.02536, 0, 0.38889],
              "42": [0, 0.75, 0.11775, 0, 0.5],
              "43": [0.08333, 0.58333, 0.02536, 0, 0.77778],
              "44": [0.125, 0.08333, 0, 0, 0.27778],
              "45": [0, 0.44444, 0.01946, 0, 0.33333],
              "46": [0, 0.08333, 0, 0, 0.27778],
              "47": [0.25, 0.75, 0.13164, 0, 0.5],
              "48": [0, 0.65556, 0.11156, 0, 0.5],
              "49": [0, 0.65556, 0.11156, 0, 0.5],
              "50": [0, 0.65556, 0.11156, 0, 0.5],
              "51": [0, 0.65556, 0.11156, 0, 0.5],
              "52": [0, 0.65556, 0.11156, 0, 0.5],
              "53": [0, 0.65556, 0.11156, 0, 0.5],
              "54": [0, 0.65556, 0.11156, 0, 0.5],
              "55": [0, 0.65556, 0.11156, 0, 0.5],
              "56": [0, 0.65556, 0.11156, 0, 0.5],
              "57": [0, 0.65556, 0.11156, 0, 0.5],
              "58": [0, 0.44444, 0.02502, 0, 0.27778],
              "59": [0.125, 0.44444, 0.02502, 0, 0.27778],
              "61": [-0.13, 0.37, 0.05087, 0, 0.77778],
              "63": [0, 0.69444, 0.11809, 0, 0.47222],
              "64": [0, 0.69444, 0.07555, 0, 0.66667],
              "65": [0, 0.69444, 0, 0, 0.66667],
              "66": [0, 0.69444, 0.08293, 0, 0.66667],
              "67": [0, 0.69444, 0.11983, 0, 0.63889],
              "68": [0, 0.69444, 0.07555, 0, 0.72223],
              "69": [0, 0.69444, 0.11983, 0, 0.59722],
              "70": [0, 0.69444, 0.13372, 0, 0.56945],
              "71": [0, 0.69444, 0.11983, 0, 0.66667],
              "72": [0, 0.69444, 0.08094, 0, 0.70834],
              "73": [0, 0.69444, 0.13372, 0, 0.27778],
              "74": [0, 0.69444, 0.08094, 0, 0.47222],
              "75": [0, 0.69444, 0.11983, 0, 0.69445],
              "76": [0, 0.69444, 0, 0, 0.54167],
              "77": [0, 0.69444, 0.08094, 0, 0.875],
              "78": [0, 0.69444, 0.08094, 0, 0.70834],
              "79": [0, 0.69444, 0.07555, 0, 0.73611],
              "80": [0, 0.69444, 0.08293, 0, 0.63889],
              "81": [0.125, 0.69444, 0.07555, 0, 0.73611],
              "82": [0, 0.69444, 0.08293, 0, 0.64584],
              "83": [0, 0.69444, 0.09205, 0, 0.55556],
              "84": [0, 0.69444, 0.13372, 0, 0.68056],
              "85": [0, 0.69444, 0.08094, 0, 0.6875],
              "86": [0, 0.69444, 0.1615, 0, 0.66667],
              "87": [0, 0.69444, 0.1615, 0, 0.94445],
              "88": [0, 0.69444, 0.13372, 0, 0.66667],
              "89": [0, 0.69444, 0.17261, 0, 0.66667],
              "90": [0, 0.69444, 0.11983, 0, 0.61111],
              "91": [0.25, 0.75, 0.15942, 0, 0.28889],
              "93": [0.25, 0.75, 0.08719, 0, 0.28889],
              "94": [0, 0.69444, 0.0799, 0, 0.5],
              "95": [0.35, 0.09444, 0.08616, 0, 0.5],
              "97": [0, 0.44444, 981e-5, 0, 0.48056],
              "98": [0, 0.69444, 0.03057, 0, 0.51667],
              "99": [0, 0.44444, 0.08336, 0, 0.44445],
              "100": [0, 0.69444, 0.09483, 0, 0.51667],
              "101": [0, 0.44444, 0.06778, 0, 0.44445],
              "102": [0, 0.69444, 0.21705, 0, 0.30556],
              "103": [0.19444, 0.44444, 0.10836, 0, 0.5],
              "104": [0, 0.69444, 0.01778, 0, 0.51667],
              "105": [0, 0.67937, 0.09718, 0, 0.23889],
              "106": [0.19444, 0.67937, 0.09162, 0, 0.26667],
              "107": [0, 0.69444, 0.08336, 0, 0.48889],
              "108": [0, 0.69444, 0.09483, 0, 0.23889],
              "109": [0, 0.44444, 0.01778, 0, 0.79445],
              "110": [0, 0.44444, 0.01778, 0, 0.51667],
              "111": [0, 0.44444, 0.06613, 0, 0.5],
              "112": [0.19444, 0.44444, 0.0389, 0, 0.51667],
              "113": [0.19444, 0.44444, 0.04169, 0, 0.51667],
              "114": [0, 0.44444, 0.10836, 0, 0.34167],
              "115": [0, 0.44444, 0.0778, 0, 0.38333],
              "116": [0, 0.57143, 0.07225, 0, 0.36111],
              "117": [0, 0.44444, 0.04169, 0, 0.51667],
              "118": [0, 0.44444, 0.10836, 0, 0.46111],
              "119": [0, 0.44444, 0.10836, 0, 0.68334],
              "120": [0, 0.44444, 0.09169, 0, 0.46111],
              "121": [0.19444, 0.44444, 0.10836, 0, 0.46111],
              "122": [0, 0.44444, 0.08752, 0, 0.43472],
              "126": [0.35, 0.32659, 0.08826, 0, 0.5],
              "160": [0, 0, 0, 0, 0.25],
              "168": [0, 0.67937, 0.06385, 0, 0.5],
              "176": [0, 0.69444, 0, 0, 0.73752],
              "184": [0.17014, 0, 0, 0, 0.44445],
              "305": [0, 0.44444, 0.04169, 0, 0.23889],
              "567": [0.19444, 0.44444, 0.04169, 0, 0.26667],
              "710": [0, 0.69444, 0.0799, 0, 0.5],
              "711": [0, 0.63194, 0.08432, 0, 0.5],
              "713": [0, 0.60889, 0.08776, 0, 0.5],
              "714": [0, 0.69444, 0.09205, 0, 0.5],
              "715": [0, 0.69444, 0, 0, 0.5],
              "728": [0, 0.69444, 0.09483, 0, 0.5],
              "729": [0, 0.67937, 0.07774, 0, 0.27778],
              "730": [0, 0.69444, 0, 0, 0.73752],
              "732": [0, 0.67659, 0.08826, 0, 0.5],
              "733": [0, 0.69444, 0.09205, 0, 0.5],
              "915": [0, 0.69444, 0.13372, 0, 0.54167],
              "916": [0, 0.69444, 0, 0, 0.83334],
              "920": [0, 0.69444, 0.07555, 0, 0.77778],
              "923": [0, 0.69444, 0, 0, 0.61111],
              "926": [0, 0.69444, 0.12816, 0, 0.66667],
              "928": [0, 0.69444, 0.08094, 0, 0.70834],
              "931": [0, 0.69444, 0.11983, 0, 0.72222],
              "933": [0, 0.69444, 0.09031, 0, 0.77778],
              "934": [0, 0.69444, 0.04603, 0, 0.72222],
              "936": [0, 0.69444, 0.09031, 0, 0.77778],
              "937": [0, 0.69444, 0.08293, 0, 0.72222],
              "8211": [0, 0.44444, 0.08616, 0, 0.5],
              "8212": [0, 0.44444, 0.08616, 0, 1],
              "8216": [0, 0.69444, 0.07816, 0, 0.27778],
              "8217": [0, 0.69444, 0.07816, 0, 0.27778],
              "8220": [0, 0.69444, 0.14205, 0, 0.5],
              "8221": [0, 0.69444, 316e-5, 0, 0.5]
            },
            "SansSerif-Regular": {
              "32": [0, 0, 0, 0, 0.25],
              "33": [0, 0.69444, 0, 0, 0.31945],
              "34": [0, 0.69444, 0, 0, 0.5],
              "35": [0.19444, 0.69444, 0, 0, 0.83334],
              "36": [0.05556, 0.75, 0, 0, 0.5],
              "37": [0.05556, 0.75, 0, 0, 0.83334],
              "38": [0, 0.69444, 0, 0, 0.75834],
              "39": [0, 0.69444, 0, 0, 0.27778],
              "40": [0.25, 0.75, 0, 0, 0.38889],
              "41": [0.25, 0.75, 0, 0, 0.38889],
              "42": [0, 0.75, 0, 0, 0.5],
              "43": [0.08333, 0.58333, 0, 0, 0.77778],
              "44": [0.125, 0.08333, 0, 0, 0.27778],
              "45": [0, 0.44444, 0, 0, 0.33333],
              "46": [0, 0.08333, 0, 0, 0.27778],
              "47": [0.25, 0.75, 0, 0, 0.5],
              "48": [0, 0.65556, 0, 0, 0.5],
              "49": [0, 0.65556, 0, 0, 0.5],
              "50": [0, 0.65556, 0, 0, 0.5],
              "51": [0, 0.65556, 0, 0, 0.5],
              "52": [0, 0.65556, 0, 0, 0.5],
              "53": [0, 0.65556, 0, 0, 0.5],
              "54": [0, 0.65556, 0, 0, 0.5],
              "55": [0, 0.65556, 0, 0, 0.5],
              "56": [0, 0.65556, 0, 0, 0.5],
              "57": [0, 0.65556, 0, 0, 0.5],
              "58": [0, 0.44444, 0, 0, 0.27778],
              "59": [0.125, 0.44444, 0, 0, 0.27778],
              "61": [-0.13, 0.37, 0, 0, 0.77778],
              "63": [0, 0.69444, 0, 0, 0.47222],
              "64": [0, 0.69444, 0, 0, 0.66667],
              "65": [0, 0.69444, 0, 0, 0.66667],
              "66": [0, 0.69444, 0, 0, 0.66667],
              "67": [0, 0.69444, 0, 0, 0.63889],
              "68": [0, 0.69444, 0, 0, 0.72223],
              "69": [0, 0.69444, 0, 0, 0.59722],
              "70": [0, 0.69444, 0, 0, 0.56945],
              "71": [0, 0.69444, 0, 0, 0.66667],
              "72": [0, 0.69444, 0, 0, 0.70834],
              "73": [0, 0.69444, 0, 0, 0.27778],
              "74": [0, 0.69444, 0, 0, 0.47222],
              "75": [0, 0.69444, 0, 0, 0.69445],
              "76": [0, 0.69444, 0, 0, 0.54167],
              "77": [0, 0.69444, 0, 0, 0.875],
              "78": [0, 0.69444, 0, 0, 0.70834],
              "79": [0, 0.69444, 0, 0, 0.73611],
              "80": [0, 0.69444, 0, 0, 0.63889],
              "81": [0.125, 0.69444, 0, 0, 0.73611],
              "82": [0, 0.69444, 0, 0, 0.64584],
              "83": [0, 0.69444, 0, 0, 0.55556],
              "84": [0, 0.69444, 0, 0, 0.68056],
              "85": [0, 0.69444, 0, 0, 0.6875],
              "86": [0, 0.69444, 0.01389, 0, 0.66667],
              "87": [0, 0.69444, 0.01389, 0, 0.94445],
              "88": [0, 0.69444, 0, 0, 0.66667],
              "89": [0, 0.69444, 0.025, 0, 0.66667],
              "90": [0, 0.69444, 0, 0, 0.61111],
              "91": [0.25, 0.75, 0, 0, 0.28889],
              "93": [0.25, 0.75, 0, 0, 0.28889],
              "94": [0, 0.69444, 0, 0, 0.5],
              "95": [0.35, 0.09444, 0.02778, 0, 0.5],
              "97": [0, 0.44444, 0, 0, 0.48056],
              "98": [0, 0.69444, 0, 0, 0.51667],
              "99": [0, 0.44444, 0, 0, 0.44445],
              "100": [0, 0.69444, 0, 0, 0.51667],
              "101": [0, 0.44444, 0, 0, 0.44445],
              "102": [0, 0.69444, 0.06944, 0, 0.30556],
              "103": [0.19444, 0.44444, 0.01389, 0, 0.5],
              "104": [0, 0.69444, 0, 0, 0.51667],
              "105": [0, 0.67937, 0, 0, 0.23889],
              "106": [0.19444, 0.67937, 0, 0, 0.26667],
              "107": [0, 0.69444, 0, 0, 0.48889],
              "108": [0, 0.69444, 0, 0, 0.23889],
              "109": [0, 0.44444, 0, 0, 0.79445],
              "110": [0, 0.44444, 0, 0, 0.51667],
              "111": [0, 0.44444, 0, 0, 0.5],
              "112": [0.19444, 0.44444, 0, 0, 0.51667],
              "113": [0.19444, 0.44444, 0, 0, 0.51667],
              "114": [0, 0.44444, 0.01389, 0, 0.34167],
              "115": [0, 0.44444, 0, 0, 0.38333],
              "116": [0, 0.57143, 0, 0, 0.36111],
              "117": [0, 0.44444, 0, 0, 0.51667],
              "118": [0, 0.44444, 0.01389, 0, 0.46111],
              "119": [0, 0.44444, 0.01389, 0, 0.68334],
              "120": [0, 0.44444, 0, 0, 0.46111],
              "121": [0.19444, 0.44444, 0.01389, 0, 0.46111],
              "122": [0, 0.44444, 0, 0, 0.43472],
              "126": [0.35, 0.32659, 0, 0, 0.5],
              "160": [0, 0, 0, 0, 0.25],
              "168": [0, 0.67937, 0, 0, 0.5],
              "176": [0, 0.69444, 0, 0, 0.66667],
              "184": [0.17014, 0, 0, 0, 0.44445],
              "305": [0, 0.44444, 0, 0, 0.23889],
              "567": [0.19444, 0.44444, 0, 0, 0.26667],
              "710": [0, 0.69444, 0, 0, 0.5],
              "711": [0, 0.63194, 0, 0, 0.5],
              "713": [0, 0.60889, 0, 0, 0.5],
              "714": [0, 0.69444, 0, 0, 0.5],
              "715": [0, 0.69444, 0, 0, 0.5],
              "728": [0, 0.69444, 0, 0, 0.5],
              "729": [0, 0.67937, 0, 0, 0.27778],
              "730": [0, 0.69444, 0, 0, 0.66667],
              "732": [0, 0.67659, 0, 0, 0.5],
              "733": [0, 0.69444, 0, 0, 0.5],
              "915": [0, 0.69444, 0, 0, 0.54167],
              "916": [0, 0.69444, 0, 0, 0.83334],
              "920": [0, 0.69444, 0, 0, 0.77778],
              "923": [0, 0.69444, 0, 0, 0.61111],
              "926": [0, 0.69444, 0, 0, 0.66667],
              "928": [0, 0.69444, 0, 0, 0.70834],
              "931": [0, 0.69444, 0, 0, 0.72222],
              "933": [0, 0.69444, 0, 0, 0.77778],
              "934": [0, 0.69444, 0, 0, 0.72222],
              "936": [0, 0.69444, 0, 0, 0.77778],
              "937": [0, 0.69444, 0, 0, 0.72222],
              "8211": [0, 0.44444, 0.02778, 0, 0.5],
              "8212": [0, 0.44444, 0.02778, 0, 1],
              "8216": [0, 0.69444, 0, 0, 0.27778],
              "8217": [0, 0.69444, 0, 0, 0.27778],
              "8220": [0, 0.69444, 0, 0, 0.5],
              "8221": [0, 0.69444, 0, 0, 0.5]
            },
            "Script-Regular": {
              "32": [0, 0, 0, 0, 0.25],
              "65": [0, 0.7, 0.22925, 0, 0.80253],
              "66": [0, 0.7, 0.04087, 0, 0.90757],
              "67": [0, 0.7, 0.1689, 0, 0.66619],
              "68": [0, 0.7, 0.09371, 0, 0.77443],
              "69": [0, 0.7, 0.18583, 0, 0.56162],
              "70": [0, 0.7, 0.13634, 0, 0.89544],
              "71": [0, 0.7, 0.17322, 0, 0.60961],
              "72": [0, 0.7, 0.29694, 0, 0.96919],
              "73": [0, 0.7, 0.19189, 0, 0.80907],
              "74": [0.27778, 0.7, 0.19189, 0, 1.05159],
              "75": [0, 0.7, 0.31259, 0, 0.91364],
              "76": [0, 0.7, 0.19189, 0, 0.87373],
              "77": [0, 0.7, 0.15981, 0, 1.08031],
              "78": [0, 0.7, 0.3525, 0, 0.9015],
              "79": [0, 0.7, 0.08078, 0, 0.73787],
              "80": [0, 0.7, 0.08078, 0, 1.01262],
              "81": [0, 0.7, 0.03305, 0, 0.88282],
              "82": [0, 0.7, 0.06259, 0, 0.85],
              "83": [0, 0.7, 0.19189, 0, 0.86767],
              "84": [0, 0.7, 0.29087, 0, 0.74697],
              "85": [0, 0.7, 0.25815, 0, 0.79996],
              "86": [0, 0.7, 0.27523, 0, 0.62204],
              "87": [0, 0.7, 0.27523, 0, 0.80532],
              "88": [0, 0.7, 0.26006, 0, 0.94445],
              "89": [0, 0.7, 0.2939, 0, 0.70961],
              "90": [0, 0.7, 0.24037, 0, 0.8212],
              "160": [0, 0, 0, 0, 0.25]
            },
            "Size1-Regular": {
              "32": [0, 0, 0, 0, 0.25],
              "40": [0.35001, 0.85, 0, 0, 0.45834],
              "41": [0.35001, 0.85, 0, 0, 0.45834],
              "47": [0.35001, 0.85, 0, 0, 0.57778],
              "91": [0.35001, 0.85, 0, 0, 0.41667],
              "92": [0.35001, 0.85, 0, 0, 0.57778],
              "93": [0.35001, 0.85, 0, 0, 0.41667],
              "123": [0.35001, 0.85, 0, 0, 0.58334],
              "125": [0.35001, 0.85, 0, 0, 0.58334],
              "160": [0, 0, 0, 0, 0.25],
              "710": [0, 0.72222, 0, 0, 0.55556],
              "732": [0, 0.72222, 0, 0, 0.55556],
              "770": [0, 0.72222, 0, 0, 0.55556],
              "771": [0, 0.72222, 0, 0, 0.55556],
              "8214": [-99e-5, 0.601, 0, 0, 0.77778],
              "8593": [1e-5, 0.6, 0, 0, 0.66667],
              "8595": [1e-5, 0.6, 0, 0, 0.66667],
              "8657": [1e-5, 0.6, 0, 0, 0.77778],
              "8659": [1e-5, 0.6, 0, 0, 0.77778],
              "8719": [0.25001, 0.75, 0, 0, 0.94445],
              "8720": [0.25001, 0.75, 0, 0, 0.94445],
              "8721": [0.25001, 0.75, 0, 0, 1.05556],
              "8730": [0.35001, 0.85, 0, 0, 1],
              "8739": [-599e-5, 0.606, 0, 0, 0.33333],
              "8741": [-599e-5, 0.606, 0, 0, 0.55556],
              "8747": [0.30612, 0.805, 0.19445, 0, 0.47222],
              "8748": [0.306, 0.805, 0.19445, 0, 0.47222],
              "8749": [0.306, 0.805, 0.19445, 0, 0.47222],
              "8750": [0.30612, 0.805, 0.19445, 0, 0.47222],
              "8896": [0.25001, 0.75, 0, 0, 0.83334],
              "8897": [0.25001, 0.75, 0, 0, 0.83334],
              "8898": [0.25001, 0.75, 0, 0, 0.83334],
              "8899": [0.25001, 0.75, 0, 0, 0.83334],
              "8968": [0.35001, 0.85, 0, 0, 0.47222],
              "8969": [0.35001, 0.85, 0, 0, 0.47222],
              "8970": [0.35001, 0.85, 0, 0, 0.47222],
              "8971": [0.35001, 0.85, 0, 0, 0.47222],
              "9168": [-99e-5, 0.601, 0, 0, 0.66667],
              "10216": [0.35001, 0.85, 0, 0, 0.47222],
              "10217": [0.35001, 0.85, 0, 0, 0.47222],
              "10752": [0.25001, 0.75, 0, 0, 1.11111],
              "10753": [0.25001, 0.75, 0, 0, 1.11111],
              "10754": [0.25001, 0.75, 0, 0, 1.11111],
              "10756": [0.25001, 0.75, 0, 0, 0.83334],
              "10758": [0.25001, 0.75, 0, 0, 0.83334]
            },
            "Size2-Regular": {
              "32": [0, 0, 0, 0, 0.25],
              "40": [0.65002, 1.15, 0, 0, 0.59722],
              "41": [0.65002, 1.15, 0, 0, 0.59722],
              "47": [0.65002, 1.15, 0, 0, 0.81111],
              "91": [0.65002, 1.15, 0, 0, 0.47222],
              "92": [0.65002, 1.15, 0, 0, 0.81111],
              "93": [0.65002, 1.15, 0, 0, 0.47222],
              "123": [0.65002, 1.15, 0, 0, 0.66667],
              "125": [0.65002, 1.15, 0, 0, 0.66667],
              "160": [0, 0, 0, 0, 0.25],
              "710": [0, 0.75, 0, 0, 1],
              "732": [0, 0.75, 0, 0, 1],
              "770": [0, 0.75, 0, 0, 1],
              "771": [0, 0.75, 0, 0, 1],
              "8719": [0.55001, 1.05, 0, 0, 1.27778],
              "8720": [0.55001, 1.05, 0, 0, 1.27778],
              "8721": [0.55001, 1.05, 0, 0, 1.44445],
              "8730": [0.65002, 1.15, 0, 0, 1],
              "8747": [0.86225, 1.36, 0.44445, 0, 0.55556],
              "8748": [0.862, 1.36, 0.44445, 0, 0.55556],
              "8749": [0.862, 1.36, 0.44445, 0, 0.55556],
              "8750": [0.86225, 1.36, 0.44445, 0, 0.55556],
              "8896": [0.55001, 1.05, 0, 0, 1.11111],
              "8897": [0.55001, 1.05, 0, 0, 1.11111],
              "8898": [0.55001, 1.05, 0, 0, 1.11111],
              "8899": [0.55001, 1.05, 0, 0, 1.11111],
              "8968": [0.65002, 1.15, 0, 0, 0.52778],
              "8969": [0.65002, 1.15, 0, 0, 0.52778],
              "8970": [0.65002, 1.15, 0, 0, 0.52778],
              "8971": [0.65002, 1.15, 0, 0, 0.52778],
              "10216": [0.65002, 1.15, 0, 0, 0.61111],
              "10217": [0.65002, 1.15, 0, 0, 0.61111],
              "10752": [0.55001, 1.05, 0, 0, 1.51112],
              "10753": [0.55001, 1.05, 0, 0, 1.51112],
              "10754": [0.55001, 1.05, 0, 0, 1.51112],
              "10756": [0.55001, 1.05, 0, 0, 1.11111],
              "10758": [0.55001, 1.05, 0, 0, 1.11111]
            },
            "Size3-Regular": {
              "32": [0, 0, 0, 0, 0.25],
              "40": [0.95003, 1.45, 0, 0, 0.73611],
              "41": [0.95003, 1.45, 0, 0, 0.73611],
              "47": [0.95003, 1.45, 0, 0, 1.04445],
              "91": [0.95003, 1.45, 0, 0, 0.52778],
              "92": [0.95003, 1.45, 0, 0, 1.04445],
              "93": [0.95003, 1.45, 0, 0, 0.52778],
              "123": [0.95003, 1.45, 0, 0, 0.75],
              "125": [0.95003, 1.45, 0, 0, 0.75],
              "160": [0, 0, 0, 0, 0.25],
              "710": [0, 0.75, 0, 0, 1.44445],
              "732": [0, 0.75, 0, 0, 1.44445],
              "770": [0, 0.75, 0, 0, 1.44445],
              "771": [0, 0.75, 0, 0, 1.44445],
              "8730": [0.95003, 1.45, 0, 0, 1],
              "8968": [0.95003, 1.45, 0, 0, 0.58334],
              "8969": [0.95003, 1.45, 0, 0, 0.58334],
              "8970": [0.95003, 1.45, 0, 0, 0.58334],
              "8971": [0.95003, 1.45, 0, 0, 0.58334],
              "10216": [0.95003, 1.45, 0, 0, 0.75],
              "10217": [0.95003, 1.45, 0, 0, 0.75]
            },
            "Size4-Regular": {
              "32": [0, 0, 0, 0, 0.25],
              "40": [1.25003, 1.75, 0, 0, 0.79167],
              "41": [1.25003, 1.75, 0, 0, 0.79167],
              "47": [1.25003, 1.75, 0, 0, 1.27778],
              "91": [1.25003, 1.75, 0, 0, 0.58334],
              "92": [1.25003, 1.75, 0, 0, 1.27778],
              "93": [1.25003, 1.75, 0, 0, 0.58334],
              "123": [1.25003, 1.75, 0, 0, 0.80556],
              "125": [1.25003, 1.75, 0, 0, 0.80556],
              "160": [0, 0, 0, 0, 0.25],
              "710": [0, 0.825, 0, 0, 1.8889],
              "732": [0, 0.825, 0, 0, 1.8889],
              "770": [0, 0.825, 0, 0, 1.8889],
              "771": [0, 0.825, 0, 0, 1.8889],
              "8730": [1.25003, 1.75, 0, 0, 1],
              "8968": [1.25003, 1.75, 0, 0, 0.63889],
              "8969": [1.25003, 1.75, 0, 0, 0.63889],
              "8970": [1.25003, 1.75, 0, 0, 0.63889],
              "8971": [1.25003, 1.75, 0, 0, 0.63889],
              "9115": [0.64502, 1.155, 0, 0, 0.875],
              "9116": [1e-5, 0.6, 0, 0, 0.875],
              "9117": [0.64502, 1.155, 0, 0, 0.875],
              "9118": [0.64502, 1.155, 0, 0, 0.875],
              "9119": [1e-5, 0.6, 0, 0, 0.875],
              "9120": [0.64502, 1.155, 0, 0, 0.875],
              "9121": [0.64502, 1.155, 0, 0, 0.66667],
              "9122": [-99e-5, 0.601, 0, 0, 0.66667],
              "9123": [0.64502, 1.155, 0, 0, 0.66667],
              "9124": [0.64502, 1.155, 0, 0, 0.66667],
              "9125": [-99e-5, 0.601, 0, 0, 0.66667],
              "9126": [0.64502, 1.155, 0, 0, 0.66667],
              "9127": [1e-5, 0.9, 0, 0, 0.88889],
              "9128": [0.65002, 1.15, 0, 0, 0.88889],
              "9129": [0.90001, 0, 0, 0, 0.88889],
              "9130": [0, 0.3, 0, 0, 0.88889],
              "9131": [1e-5, 0.9, 0, 0, 0.88889],
              "9132": [0.65002, 1.15, 0, 0, 0.88889],
              "9133": [0.90001, 0, 0, 0, 0.88889],
              "9143": [0.88502, 0.915, 0, 0, 1.05556],
              "10216": [1.25003, 1.75, 0, 0, 0.80556],
              "10217": [1.25003, 1.75, 0, 0, 0.80556],
              "57344": [-499e-5, 0.605, 0, 0, 1.05556],
              "57345": [-499e-5, 0.605, 0, 0, 1.05556],
              "57680": [0, 0.12, 0, 0, 0.45],
              "57681": [0, 0.12, 0, 0, 0.45],
              "57682": [0, 0.12, 0, 0, 0.45],
              "57683": [0, 0.12, 0, 0, 0.45]
            },
            "Typewriter-Regular": {
              "32": [0, 0, 0, 0, 0.525],
              "33": [0, 0.61111, 0, 0, 0.525],
              "34": [0, 0.61111, 0, 0, 0.525],
              "35": [0, 0.61111, 0, 0, 0.525],
              "36": [0.08333, 0.69444, 0, 0, 0.525],
              "37": [0.08333, 0.69444, 0, 0, 0.525],
              "38": [0, 0.61111, 0, 0, 0.525],
              "39": [0, 0.61111, 0, 0, 0.525],
              "40": [0.08333, 0.69444, 0, 0, 0.525],
              "41": [0.08333, 0.69444, 0, 0, 0.525],
              "42": [0, 0.52083, 0, 0, 0.525],
              "43": [-0.08056, 0.53055, 0, 0, 0.525],
              "44": [0.13889, 0.125, 0, 0, 0.525],
              "45": [-0.08056, 0.53055, 0, 0, 0.525],
              "46": [0, 0.125, 0, 0, 0.525],
              "47": [0.08333, 0.69444, 0, 0, 0.525],
              "48": [0, 0.61111, 0, 0, 0.525],
              "49": [0, 0.61111, 0, 0, 0.525],
              "50": [0, 0.61111, 0, 0, 0.525],
              "51": [0, 0.61111, 0, 0, 0.525],
              "52": [0, 0.61111, 0, 0, 0.525],
              "53": [0, 0.61111, 0, 0, 0.525],
              "54": [0, 0.61111, 0, 0, 0.525],
              "55": [0, 0.61111, 0, 0, 0.525],
              "56": [0, 0.61111, 0, 0, 0.525],
              "57": [0, 0.61111, 0, 0, 0.525],
              "58": [0, 0.43056, 0, 0, 0.525],
              "59": [0.13889, 0.43056, 0, 0, 0.525],
              "60": [-0.05556, 0.55556, 0, 0, 0.525],
              "61": [-0.19549, 0.41562, 0, 0, 0.525],
              "62": [-0.05556, 0.55556, 0, 0, 0.525],
              "63": [0, 0.61111, 0, 0, 0.525],
              "64": [0, 0.61111, 0, 0, 0.525],
              "65": [0, 0.61111, 0, 0, 0.525],
              "66": [0, 0.61111, 0, 0, 0.525],
              "67": [0, 0.61111, 0, 0, 0.525],
              "68": [0, 0.61111, 0, 0, 0.525],
              "69": [0, 0.61111, 0, 0, 0.525],
              "70": [0, 0.61111, 0, 0, 0.525],
              "71": [0, 0.61111, 0, 0, 0.525],
              "72": [0, 0.61111, 0, 0, 0.525],
              "73": [0, 0.61111, 0, 0, 0.525],
              "74": [0, 0.61111, 0, 0, 0.525],
              "75": [0, 0.61111, 0, 0, 0.525],
              "76": [0, 0.61111, 0, 0, 0.525],
              "77": [0, 0.61111, 0, 0, 0.525],
              "78": [0, 0.61111, 0, 0, 0.525],
              "79": [0, 0.61111, 0, 0, 0.525],
              "80": [0, 0.61111, 0, 0, 0.525],
              "81": [0.13889, 0.61111, 0, 0, 0.525],
              "82": [0, 0.61111, 0, 0, 0.525],
              "83": [0, 0.61111, 0, 0, 0.525],
              "84": [0, 0.61111, 0, 0, 0.525],
              "85": [0, 0.61111, 0, 0, 0.525],
              "86": [0, 0.61111, 0, 0, 0.525],
              "87": [0, 0.61111, 0, 0, 0.525],
              "88": [0, 0.61111, 0, 0, 0.525],
              "89": [0, 0.61111, 0, 0, 0.525],
              "90": [0, 0.61111, 0, 0, 0.525],
              "91": [0.08333, 0.69444, 0, 0, 0.525],
              "92": [0.08333, 0.69444, 0, 0, 0.525],
              "93": [0.08333, 0.69444, 0, 0, 0.525],
              "94": [0, 0.61111, 0, 0, 0.525],
              "95": [0.09514, 0, 0, 0, 0.525],
              "96": [0, 0.61111, 0, 0, 0.525],
              "97": [0, 0.43056, 0, 0, 0.525],
              "98": [0, 0.61111, 0, 0, 0.525],
              "99": [0, 0.43056, 0, 0, 0.525],
              "100": [0, 0.61111, 0, 0, 0.525],
              "101": [0, 0.43056, 0, 0, 0.525],
              "102": [0, 0.61111, 0, 0, 0.525],
              "103": [0.22222, 0.43056, 0, 0, 0.525],
              "104": [0, 0.61111, 0, 0, 0.525],
              "105": [0, 0.61111, 0, 0, 0.525],
              "106": [0.22222, 0.61111, 0, 0, 0.525],
              "107": [0, 0.61111, 0, 0, 0.525],
              "108": [0, 0.61111, 0, 0, 0.525],
              "109": [0, 0.43056, 0, 0, 0.525],
              "110": [0, 0.43056, 0, 0, 0.525],
              "111": [0, 0.43056, 0, 0, 0.525],
              "112": [0.22222, 0.43056, 0, 0, 0.525],
              "113": [0.22222, 0.43056, 0, 0, 0.525],
              "114": [0, 0.43056, 0, 0, 0.525],
              "115": [0, 0.43056, 0, 0, 0.525],
              "116": [0, 0.55358, 0, 0, 0.525],
              "117": [0, 0.43056, 0, 0, 0.525],
              "118": [0, 0.43056, 0, 0, 0.525],
              "119": [0, 0.43056, 0, 0, 0.525],
              "120": [0, 0.43056, 0, 0, 0.525],
              "121": [0.22222, 0.43056, 0, 0, 0.525],
              "122": [0, 0.43056, 0, 0, 0.525],
              "123": [0.08333, 0.69444, 0, 0, 0.525],
              "124": [0.08333, 0.69444, 0, 0, 0.525],
              "125": [0.08333, 0.69444, 0, 0, 0.525],
              "126": [0, 0.61111, 0, 0, 0.525],
              "127": [0, 0.61111, 0, 0, 0.525],
              "160": [0, 0, 0, 0, 0.525],
              "176": [0, 0.61111, 0, 0, 0.525],
              "184": [0.19445, 0, 0, 0, 0.525],
              "305": [0, 0.43056, 0, 0, 0.525],
              "567": [0.22222, 0.43056, 0, 0, 0.525],
              "711": [0, 0.56597, 0, 0, 0.525],
              "713": [0, 0.56555, 0, 0, 0.525],
              "714": [0, 0.61111, 0, 0, 0.525],
              "715": [0, 0.61111, 0, 0, 0.525],
              "728": [0, 0.61111, 0, 0, 0.525],
              "730": [0, 0.61111, 0, 0, 0.525],
              "770": [0, 0.61111, 0, 0, 0.525],
              "771": [0, 0.61111, 0, 0, 0.525],
              "776": [0, 0.61111, 0, 0, 0.525],
              "915": [0, 0.61111, 0, 0, 0.525],
              "916": [0, 0.61111, 0, 0, 0.525],
              "920": [0, 0.61111, 0, 0, 0.525],
              "923": [0, 0.61111, 0, 0, 0.525],
              "926": [0, 0.61111, 0, 0, 0.525],
              "928": [0, 0.61111, 0, 0, 0.525],
              "931": [0, 0.61111, 0, 0, 0.525],
              "933": [0, 0.61111, 0, 0, 0.525],
              "934": [0, 0.61111, 0, 0, 0.525],
              "936": [0, 0.61111, 0, 0, 0.525],
              "937": [0, 0.61111, 0, 0, 0.525],
              "8216": [0, 0.61111, 0, 0, 0.525],
              "8217": [0, 0.61111, 0, 0, 0.525],
              "8242": [0, 0.61111, 0, 0, 0.525],
              "9251": [0.11111, 0.21944, 0, 0, 0.525]
            }
          };
          ;
          const sigmasAndXis = {
            slant: [0.25, 0.25, 0.25],
            // sigma1
            space: [0, 0, 0],
            // sigma2
            stretch: [0, 0, 0],
            // sigma3
            shrink: [0, 0, 0],
            // sigma4
            xHeight: [0.431, 0.431, 0.431],
            // sigma5
            quad: [1, 1.171, 1.472],
            // sigma6
            extraSpace: [0, 0, 0],
            // sigma7
            num1: [0.677, 0.732, 0.925],
            // sigma8
            num2: [0.394, 0.384, 0.387],
            // sigma9
            num3: [0.444, 0.471, 0.504],
            // sigma10
            denom1: [0.686, 0.752, 1.025],
            // sigma11
            denom2: [0.345, 0.344, 0.532],
            // sigma12
            sup1: [0.413, 0.503, 0.504],
            // sigma13
            sup2: [0.363, 0.431, 0.404],
            // sigma14
            sup3: [0.289, 0.286, 0.294],
            // sigma15
            sub1: [0.15, 0.143, 0.2],
            // sigma16
            sub2: [0.247, 0.286, 0.4],
            // sigma17
            supDrop: [0.386, 0.353, 0.494],
            // sigma18
            subDrop: [0.05, 0.071, 0.1],
            // sigma19
            delim1: [2.39, 1.7, 1.98],
            // sigma20
            delim2: [1.01, 1.157, 1.42],
            // sigma21
            axisHeight: [0.25, 0.25, 0.25],
            // sigma22
            // These font metrics are extracted from TeX by using tftopl on cmex10.tfm;
            // they correspond to the font parameters of the extension fonts (family 3).
            // See the TeXbook, page 441. In AMSTeX, the extension fonts scale; to
            // match cmex7, we'd use cmex7.tfm values for script and scriptscript
            // values.
            defaultRuleThickness: [0.04, 0.049, 0.049],
            // xi8; cmex7: 0.049
            bigOpSpacing1: [0.111, 0.111, 0.111],
            // xi9
            bigOpSpacing2: [0.166, 0.166, 0.166],
            // xi10
            bigOpSpacing3: [0.2, 0.2, 0.2],
            // xi11
            bigOpSpacing4: [0.6, 0.611, 0.611],
            // xi12; cmex7: 0.611
            bigOpSpacing5: [0.1, 0.143, 0.143],
            // xi13; cmex7: 0.143
            // The \sqrt rule width is taken from the height of the surd character.
            // Since we use the same font at all sizes, this thickness doesn't scale.
            sqrtRuleThickness: [0.04, 0.04, 0.04],
            // This value determines how large a pt is, for metrics which are defined
            // in terms of pts.
            // This value is also used in katex.scss; if you change it make sure the
            // values match.
            ptPerEm: [10, 10, 10],
            // The space between adjacent `|` columns in an array definition. From
            // `\showthe\doublerulesep` in LaTeX. Equals 2.0 / ptPerEm.
            doubleRuleSep: [0.2, 0.2, 0.2],
            // The width of separator lines in {array} environments. From
            // `\showthe\arrayrulewidth` in LaTeX. Equals 0.4 / ptPerEm.
            arrayRuleWidth: [0.04, 0.04, 0.04],
            // Two values from LaTeX source2e:
            fboxsep: [0.3, 0.3, 0.3],
            //        3 pt / ptPerEm
            fboxrule: [0.04, 0.04, 0.04]
            // 0.4 pt / ptPerEm
          };
          const extraCharacterMap = {
            // Latin-1
            "Å": "A",
            "Ð": "D",
            "Þ": "o",
            "å": "a",
            "ð": "d",
            "þ": "o",
            // Cyrillic
            "А": "A",
            "Б": "B",
            "В": "B",
            "Г": "F",
            "Д": "A",
            "Е": "E",
            "Ж": "K",
            "З": "3",
            "И": "N",
            "Й": "N",
            "К": "K",
            "Л": "N",
            "М": "M",
            "Н": "H",
            "О": "O",
            "П": "N",
            "Р": "P",
            "С": "C",
            "Т": "T",
            "У": "y",
            "Ф": "O",
            "Х": "X",
            "Ц": "U",
            "Ч": "h",
            "Ш": "W",
            "Щ": "W",
            "Ъ": "B",
            "Ы": "X",
            "Ь": "B",
            "Э": "3",
            "Ю": "X",
            "Я": "R",
            "а": "a",
            "б": "b",
            "в": "a",
            "г": "r",
            "д": "y",
            "е": "e",
            "ж": "m",
            "з": "e",
            "и": "n",
            "й": "n",
            "к": "n",
            "л": "n",
            "м": "m",
            "н": "n",
            "о": "o",
            "п": "n",
            "р": "p",
            "с": "c",
            "т": "o",
            "у": "y",
            "ф": "b",
            "х": "x",
            "ц": "n",
            "ч": "n",
            "ш": "w",
            "щ": "w",
            "ъ": "a",
            "ы": "m",
            "ь": "a",
            "э": "e",
            "ю": "m",
            "я": "r"
          };
          function setFontMetrics(fontName, metrics) {
            fontMetricsData[fontName] = metrics;
          }
          function getCharacterMetrics(character, font, mode) {
            if (!fontMetricsData[font]) {
              throw new Error("Font metrics not found for font: " + font + ".");
            }
            let ch = character.charCodeAt(0);
            let metrics = fontMetricsData[font][ch];
            if (!metrics && character[0] in extraCharacterMap) {
              ch = extraCharacterMap[character[0]].charCodeAt(0);
              metrics = fontMetricsData[font][ch];
            }
            if (!metrics && mode === "text") {
              if (supportedCodepoint(ch)) {
                metrics = fontMetricsData[font][77];
              }
            }
            if (metrics) {
              return {
                depth: metrics[0],
                height: metrics[1],
                italic: metrics[2],
                skew: metrics[3],
                width: metrics[4]
              };
            }
          }
          const fontMetricsBySizeIndex = {};
          function getGlobalMetrics(size) {
            let sizeIndex;
            if (size >= 5) {
              sizeIndex = 0;
            } else if (size >= 3) {
              sizeIndex = 1;
            } else {
              sizeIndex = 2;
            }
            if (!fontMetricsBySizeIndex[sizeIndex]) {
              const metrics = fontMetricsBySizeIndex[sizeIndex] = {
                cssEmPerMu: sigmasAndXis.quad[sizeIndex] / 18
              };
              for (const key in sigmasAndXis) {
                if (sigmasAndXis.hasOwnProperty(key)) {
                  metrics[key] = sigmasAndXis[key][sizeIndex];
                }
              }
            }
            return fontMetricsBySizeIndex[sizeIndex];
          }
          ;
          const sizeStyleMap = [
            // Each element contains [textsize, scriptsize, scriptscriptsize].
            // The size mappings are taken from TeX with \normalsize=10pt.
            [1, 1, 1],
            // size1: [5, 5, 5]              \tiny
            [2, 1, 1],
            // size2: [6, 5, 5]
            [3, 1, 1],
            // size3: [7, 5, 5]              \scriptsize
            [4, 2, 1],
            // size4: [8, 6, 5]              \footnotesize
            [5, 2, 1],
            // size5: [9, 6, 5]              \small
            [6, 3, 1],
            // size6: [10, 7, 5]             \normalsize
            [7, 4, 2],
            // size7: [12, 8, 6]             \large
            [8, 6, 3],
            // size8: [14.4, 10, 7]          \Large
            [9, 7, 6],
            // size9: [17.28, 12, 10]        \LARGE
            [10, 8, 7],
            // size10: [20.74, 14.4, 12]     \huge
            [11, 10, 9]
            // size11: [24.88, 20.74, 17.28] \HUGE
          ];
          const sizeMultipliers = [
            // fontMetrics.js:getGlobalMetrics also uses size indexes, so if
            // you change size indexes, change that function.
            0.5,
            0.6,
            0.7,
            0.8,
            0.9,
            1,
            1.2,
            1.44,
            1.728,
            2.074,
            2.488
          ];
          const sizeAtStyle = function(size, style) {
            return style.size < 2 ? size : sizeStyleMap[size - 1][style.size - 1];
          };
          class Options {
            // A font family applies to a group of fonts (i.e. SansSerif), while a font
            // represents a specific font (i.e. SansSerif Bold).
            // See: https://tex.stackexchange.com/questions/22350/difference-between-textrm-and-mathrm
            /**
             * The base size index.
             */
            constructor(data) {
              this.style = void 0;
              this.color = void 0;
              this.size = void 0;
              this.textSize = void 0;
              this.phantom = void 0;
              this.font = void 0;
              this.fontFamily = void 0;
              this.fontWeight = void 0;
              this.fontShape = void 0;
              this.sizeMultiplier = void 0;
              this.maxSize = void 0;
              this.minRuleThickness = void 0;
              this._fontMetrics = void 0;
              this.style = data.style;
              this.color = data.color;
              this.size = data.size || Options.BASESIZE;
              this.textSize = data.textSize || this.size;
              this.phantom = !!data.phantom;
              this.font = data.font || "";
              this.fontFamily = data.fontFamily || "";
              this.fontWeight = data.fontWeight || "";
              this.fontShape = data.fontShape || "";
              this.sizeMultiplier = sizeMultipliers[this.size - 1];
              this.maxSize = data.maxSize;
              this.minRuleThickness = data.minRuleThickness;
              this._fontMetrics = void 0;
            }
            /**
             * Returns a new options object with the same properties as "this".  Properties
             * from "extension" will be copied to the new options object.
             */
            extend(extension) {
              const data = {
                style: this.style,
                size: this.size,
                textSize: this.textSize,
                color: this.color,
                phantom: this.phantom,
                font: this.font,
                fontFamily: this.fontFamily,
                fontWeight: this.fontWeight,
                fontShape: this.fontShape,
                maxSize: this.maxSize,
                minRuleThickness: this.minRuleThickness
              };
              for (const key in extension) {
                if (extension.hasOwnProperty(key)) {
                  data[key] = extension[key];
                }
              }
              return new Options(data);
            }
            /**
             * Return an options object with the given style. If `this.style === style`,
             * returns `this`.
             */
            havingStyle(style) {
              if (this.style === style) {
                return this;
              } else {
                return this.extend({
                  style,
                  size: sizeAtStyle(this.textSize, style)
                });
              }
            }
            /**
             * Return an options object with a cramped version of the current style. If
             * the current style is cramped, returns `this`.
             */
            havingCrampedStyle() {
              return this.havingStyle(this.style.cramp());
            }
            /**
             * Return an options object with the given size and in at least `\textstyle`.
             * Returns `this` if appropriate.
             */
            havingSize(size) {
              if (this.size === size && this.textSize === size) {
                return this;
              } else {
                return this.extend({
                  style: this.style.text(),
                  size,
                  textSize: size,
                  sizeMultiplier: sizeMultipliers[size - 1]
                });
              }
            }
            /**
             * Like `this.havingSize(BASESIZE).havingStyle(style)`. If `style` is omitted,
             * changes to at least `\textstyle`.
             */
            havingBaseStyle(style) {
              style = style || this.style.text();
              const wantSize = sizeAtStyle(Options.BASESIZE, style);
              if (this.size === wantSize && this.textSize === Options.BASESIZE && this.style === style) {
                return this;
              } else {
                return this.extend({
                  style,
                  size: wantSize
                });
              }
            }
            /**
             * Remove the effect of sizing changes such as \Huge.
             * Keep the effect of the current style, such as \scriptstyle.
             */
            havingBaseSizing() {
              let size;
              switch (this.style.id) {
                case 4:
                case 5:
                  size = 3;
                  break;
                case 6:
                case 7:
                  size = 1;
                  break;
                default:
                  size = 6;
              }
              return this.extend({
                style: this.style.text(),
                size
              });
            }
            /**
             * Create a new options object with the given color.
             */
            withColor(color) {
              return this.extend({
                color
              });
            }
            /**
             * Create a new options object with "phantom" set to true.
             */
            withPhantom() {
              return this.extend({
                phantom: true
              });
            }
            /**
             * Creates a new options object with the given math font or old text font.
             * @type {[type]}
             */
            withFont(font) {
              return this.extend({
                font
              });
            }
            /**
             * Create a new options objects with the given fontFamily.
             */
            withTextFontFamily(fontFamily) {
              return this.extend({
                fontFamily,
                font: ""
              });
            }
            /**
             * Creates a new options object with the given font weight
             */
            withTextFontWeight(fontWeight) {
              return this.extend({
                fontWeight,
                font: ""
              });
            }
            /**
             * Creates a new options object with the given font weight
             */
            withTextFontShape(fontShape) {
              return this.extend({
                fontShape,
                font: ""
              });
            }
            /**
             * Return the CSS sizing classes required to switch from enclosing options
             * `oldOptions` to `this`. Returns an array of classes.
             */
            sizingClasses(oldOptions) {
              if (oldOptions.size !== this.size) {
                return ["sizing", "reset-size" + oldOptions.size, "size" + this.size];
              } else {
                return [];
              }
            }
            /**
             * Return the CSS sizing classes required to switch to the base size. Like
             * `this.havingSize(BASESIZE).sizingClasses(this)`.
             */
            baseSizingClasses() {
              if (this.size !== Options.BASESIZE) {
                return ["sizing", "reset-size" + this.size, "size" + Options.BASESIZE];
              } else {
                return [];
              }
            }
            /**
             * Return the font metrics for this size.
             */
            fontMetrics() {
              if (!this._fontMetrics) {
                this._fontMetrics = getGlobalMetrics(this.size);
              }
              return this._fontMetrics;
            }
            /**
             * Gets the CSS color of the current options object
             */
            getColor() {
              if (this.phantom) {
                return "transparent";
              } else {
                return this.color;
              }
            }
          }
          Options.BASESIZE = 6;
          var src_Options = Options;
          ;
          const ptPerUnit = {
            // https://en.wikibooks.org/wiki/LaTeX/Lengths and
            // https://tex.stackexchange.com/a/8263
            "pt": 1,
            // TeX point
            "mm": 7227 / 2540,
            // millimeter
            "cm": 7227 / 254,
            // centimeter
            "in": 72.27,
            // inch
            "bp": 803 / 800,
            // big (PostScript) points
            "pc": 12,
            // pica
            "dd": 1238 / 1157,
            // didot
            "cc": 14856 / 1157,
            // cicero (12 didot)
            "nd": 685 / 642,
            // new didot
            "nc": 1370 / 107,
            // new cicero (12 new didot)
            "sp": 1 / 65536,
            // scaled point (TeX's internal smallest unit)
            // https://tex.stackexchange.com/a/41371
            "px": 803 / 800
            // \pdfpxdimen defaults to 1 bp in pdfTeX and LuaTeX
          };
          const relativeUnit = {
            "ex": true,
            "em": true,
            "mu": true
          };
          const validUnit = function(unit) {
            if (typeof unit !== "string") {
              unit = unit.unit;
            }
            return unit in ptPerUnit || unit in relativeUnit || unit === "ex";
          };
          const calculateSize = function(sizeValue, options) {
            let scale;
            if (sizeValue.unit in ptPerUnit) {
              scale = ptPerUnit[sizeValue.unit] / options.fontMetrics().ptPerEm / options.sizeMultiplier;
            } else if (sizeValue.unit === "mu") {
              scale = options.fontMetrics().cssEmPerMu;
            } else {
              let unitOptions;
              if (options.style.isTight()) {
                unitOptions = options.havingStyle(options.style.text());
              } else {
                unitOptions = options;
              }
              if (sizeValue.unit === "ex") {
                scale = unitOptions.fontMetrics().xHeight;
              } else if (sizeValue.unit === "em") {
                scale = unitOptions.fontMetrics().quad;
              } else {
                throw new src_ParseError("Invalid unit: '" + sizeValue.unit + "'");
              }
              if (unitOptions !== options) {
                scale *= unitOptions.sizeMultiplier / options.sizeMultiplier;
              }
            }
            return Math.min(sizeValue.number * scale, options.maxSize);
          };
          const makeEm = function(n) {
            return +n.toFixed(4) + "em";
          };
          ;
          const createClass = function(classes) {
            return classes.filter((cls) => cls).join(" ");
          };
          const initNode = function(classes, options, style) {
            this.classes = classes || [];
            this.attributes = {};
            this.height = 0;
            this.depth = 0;
            this.maxFontSize = 0;
            this.style = style || {};
            if (options) {
              if (options.style.isTight()) {
                this.classes.push("mtight");
              }
              const color = options.getColor();
              if (color) {
                this.style.color = color;
              }
            }
          };
          const toNode = function(tagName) {
            const node = document.createElement(tagName);
            node.className = createClass(this.classes);
            for (const style in this.style) {
              if (this.style.hasOwnProperty(style)) {
                node.style[style] = this.style[style];
              }
            }
            for (const attr in this.attributes) {
              if (this.attributes.hasOwnProperty(attr)) {
                node.setAttribute(attr, this.attributes[attr]);
              }
            }
            for (let i = 0; i < this.children.length; i++) {
              node.appendChild(this.children[i].toNode());
            }
            return node;
          };
          const invalidAttributeNameRegex = /[\s"'>/=\x00-\x1f]/;
          const toMarkup = function(tagName) {
            let markup = "<" + tagName;
            if (this.classes.length) {
              markup += ' class="' + utils.escape(createClass(this.classes)) + '"';
            }
            let styles2 = "";
            for (const style in this.style) {
              if (this.style.hasOwnProperty(style)) {
                styles2 += utils.hyphenate(style) + ":" + this.style[style] + ";";
              }
            }
            if (styles2) {
              markup += ' style="' + utils.escape(styles2) + '"';
            }
            for (const attr in this.attributes) {
              if (this.attributes.hasOwnProperty(attr)) {
                if (invalidAttributeNameRegex.test(attr)) {
                  throw new src_ParseError("Invalid attribute name '" + attr + "'");
                }
                markup += " " + attr + '="' + utils.escape(this.attributes[attr]) + '"';
              }
            }
            markup += ">";
            for (let i = 0; i < this.children.length; i++) {
              markup += this.children[i].toMarkup();
            }
            markup += "</" + tagName + ">";
            return markup;
          };
          class Span {
            constructor(classes, children, options, style) {
              this.children = void 0;
              this.attributes = void 0;
              this.classes = void 0;
              this.height = void 0;
              this.depth = void 0;
              this.width = void 0;
              this.maxFontSize = void 0;
              this.style = void 0;
              initNode.call(this, classes, options, style);
              this.children = children || [];
            }
            /**
             * Sets an arbitrary attribute on the span. Warning: use this wisely. Not
             * all browsers support attributes the same, and having too many custom
             * attributes is probably bad.
             */
            setAttribute(attribute, value) {
              this.attributes[attribute] = value;
            }
            hasClass(className) {
              return utils.contains(this.classes, className);
            }
            toNode() {
              return toNode.call(this, "span");
            }
            toMarkup() {
              return toMarkup.call(this, "span");
            }
          }
          class Anchor {
            constructor(href, classes, children, options) {
              this.children = void 0;
              this.attributes = void 0;
              this.classes = void 0;
              this.height = void 0;
              this.depth = void 0;
              this.maxFontSize = void 0;
              this.style = void 0;
              initNode.call(this, classes, options);
              this.children = children || [];
              this.setAttribute("href", href);
            }
            setAttribute(attribute, value) {
              this.attributes[attribute] = value;
            }
            hasClass(className) {
              return utils.contains(this.classes, className);
            }
            toNode() {
              return toNode.call(this, "a");
            }
            toMarkup() {
              return toMarkup.call(this, "a");
            }
          }
          class Img {
            constructor(src, alt, style) {
              this.src = void 0;
              this.alt = void 0;
              this.classes = void 0;
              this.height = void 0;
              this.depth = void 0;
              this.maxFontSize = void 0;
              this.style = void 0;
              this.alt = alt;
              this.src = src;
              this.classes = ["mord"];
              this.style = style;
            }
            hasClass(className) {
              return utils.contains(this.classes, className);
            }
            toNode() {
              const node = document.createElement("img");
              node.src = this.src;
              node.alt = this.alt;
              node.className = "mord";
              for (const style in this.style) {
                if (this.style.hasOwnProperty(style)) {
                  node.style[style] = this.style[style];
                }
              }
              return node;
            }
            toMarkup() {
              let markup = '<img src="' + utils.escape(this.src) + '"' + (' alt="' + utils.escape(this.alt) + '"');
              let styles2 = "";
              for (const style in this.style) {
                if (this.style.hasOwnProperty(style)) {
                  styles2 += utils.hyphenate(style) + ":" + this.style[style] + ";";
                }
              }
              if (styles2) {
                markup += ' style="' + utils.escape(styles2) + '"';
              }
              markup += "'/>";
              return markup;
            }
          }
          const iCombinations = {
            "î": "ı̂",
            "ï": "ı̈",
            "í": "ı́",
            // 'ī': '\u0131\u0304', // enable when we add Extended Latin
            "ì": "ı̀"
          };
          class SymbolNode {
            constructor(text, height, depth, italic, skew, width, classes, style) {
              this.text = void 0;
              this.height = void 0;
              this.depth = void 0;
              this.italic = void 0;
              this.skew = void 0;
              this.width = void 0;
              this.maxFontSize = void 0;
              this.classes = void 0;
              this.style = void 0;
              this.text = text;
              this.height = height || 0;
              this.depth = depth || 0;
              this.italic = italic || 0;
              this.skew = skew || 0;
              this.width = width || 0;
              this.classes = classes || [];
              this.style = style || {};
              this.maxFontSize = 0;
              const script = scriptFromCodepoint(this.text.charCodeAt(0));
              if (script) {
                this.classes.push(script + "_fallback");
              }
              if (/[îïíì]/.test(this.text)) {
                this.text = iCombinations[this.text];
              }
            }
            hasClass(className) {
              return utils.contains(this.classes, className);
            }
            /**
             * Creates a text node or span from a symbol node. Note that a span is only
             * created if it is needed.
             */
            toNode() {
              const node = document.createTextNode(this.text);
              let span = null;
              if (this.italic > 0) {
                span = document.createElement("span");
                span.style.marginRight = makeEm(this.italic);
              }
              if (this.classes.length > 0) {
                span = span || document.createElement("span");
                span.className = createClass(this.classes);
              }
              for (const style in this.style) {
                if (this.style.hasOwnProperty(style)) {
                  span = span || document.createElement("span");
                  span.style[style] = this.style[style];
                }
              }
              if (span) {
                span.appendChild(node);
                return span;
              } else {
                return node;
              }
            }
            /**
             * Creates markup for a symbol node.
             */
            toMarkup() {
              let needsSpan = false;
              let markup = "<span";
              if (this.classes.length) {
                needsSpan = true;
                markup += ' class="';
                markup += utils.escape(createClass(this.classes));
                markup += '"';
              }
              let styles2 = "";
              if (this.italic > 0) {
                styles2 += "margin-right:" + this.italic + "em;";
              }
              for (const style in this.style) {
                if (this.style.hasOwnProperty(style)) {
                  styles2 += utils.hyphenate(style) + ":" + this.style[style] + ";";
                }
              }
              if (styles2) {
                needsSpan = true;
                markup += ' style="' + utils.escape(styles2) + '"';
              }
              const escaped = utils.escape(this.text);
              if (needsSpan) {
                markup += ">";
                markup += escaped;
                markup += "</span>";
                return markup;
              } else {
                return escaped;
              }
            }
          }
          class SvgNode {
            constructor(children, attributes) {
              this.children = void 0;
              this.attributes = void 0;
              this.children = children || [];
              this.attributes = attributes || {};
            }
            toNode() {
              const svgNS = "http://www.w3.org/2000/svg";
              const node = document.createElementNS(svgNS, "svg");
              for (const attr in this.attributes) {
                if (Object.prototype.hasOwnProperty.call(this.attributes, attr)) {
                  node.setAttribute(attr, this.attributes[attr]);
                }
              }
              for (let i = 0; i < this.children.length; i++) {
                node.appendChild(this.children[i].toNode());
              }
              return node;
            }
            toMarkup() {
              let markup = '<svg xmlns="http://www.w3.org/2000/svg"';
              for (const attr in this.attributes) {
                if (Object.prototype.hasOwnProperty.call(this.attributes, attr)) {
                  markup += " " + attr + '="' + utils.escape(this.attributes[attr]) + '"';
                }
              }
              markup += ">";
              for (let i = 0; i < this.children.length; i++) {
                markup += this.children[i].toMarkup();
              }
              markup += "</svg>";
              return markup;
            }
          }
          class PathNode {
            constructor(pathName, alternate) {
              this.pathName = void 0;
              this.alternate = void 0;
              this.pathName = pathName;
              this.alternate = alternate;
            }
            toNode() {
              const svgNS = "http://www.w3.org/2000/svg";
              const node = document.createElementNS(svgNS, "path");
              if (this.alternate) {
                node.setAttribute("d", this.alternate);
              } else {
                node.setAttribute("d", path[this.pathName]);
              }
              return node;
            }
            toMarkup() {
              if (this.alternate) {
                return '<path d="' + utils.escape(this.alternate) + '"/>';
              } else {
                return '<path d="' + utils.escape(path[this.pathName]) + '"/>';
              }
            }
          }
          class LineNode {
            constructor(attributes) {
              this.attributes = void 0;
              this.attributes = attributes || {};
            }
            toNode() {
              const svgNS = "http://www.w3.org/2000/svg";
              const node = document.createElementNS(svgNS, "line");
              for (const attr in this.attributes) {
                if (Object.prototype.hasOwnProperty.call(this.attributes, attr)) {
                  node.setAttribute(attr, this.attributes[attr]);
                }
              }
              return node;
            }
            toMarkup() {
              let markup = "<line";
              for (const attr in this.attributes) {
                if (Object.prototype.hasOwnProperty.call(this.attributes, attr)) {
                  markup += " " + attr + '="' + utils.escape(this.attributes[attr]) + '"';
                }
              }
              markup += "/>";
              return markup;
            }
          }
          function assertSymbolDomNode(group) {
            if (group instanceof SymbolNode) {
              return group;
            } else {
              throw new Error("Expected symbolNode but got " + String(group) + ".");
            }
          }
          function assertSpan(group) {
            if (group instanceof Span) {
              return group;
            } else {
              throw new Error("Expected span<HtmlDomNode> but got " + String(group) + ".");
            }
          }
          ;
          const ATOMS = {
            "bin": 1,
            "close": 1,
            "inner": 1,
            "open": 1,
            "punct": 1,
            "rel": 1
          };
          const NON_ATOMS = {
            "accent-token": 1,
            "mathord": 1,
            "op-token": 1,
            "spacing": 1,
            "textord": 1
          };
          const symbols = {
            "math": {},
            "text": {}
          };
          var src_symbols = symbols;
          function defineSymbol(mode, font, group, replace, name, acceptUnicodeChar) {
            symbols[mode][name] = {
              font,
              group,
              replace
            };
            if (acceptUnicodeChar && replace) {
              symbols[mode][replace] = symbols[mode][name];
            }
          }
          const math = "math";
          const symbols_text = "text";
          const main = "main";
          const ams = "ams";
          const accent = "accent-token";
          const bin = "bin";
          const symbols_close = "close";
          const inner = "inner";
          const mathord = "mathord";
          const op = "op-token";
          const symbols_open = "open";
          const punct = "punct";
          const rel = "rel";
          const spacing = "spacing";
          const textord = "textord";
          defineSymbol(math, main, rel, "≡", "\\equiv", true);
          defineSymbol(math, main, rel, "≺", "\\prec", true);
          defineSymbol(math, main, rel, "≻", "\\succ", true);
          defineSymbol(math, main, rel, "∼", "\\sim", true);
          defineSymbol(math, main, rel, "⊥", "\\perp");
          defineSymbol(math, main, rel, "⪯", "\\preceq", true);
          defineSymbol(math, main, rel, "⪰", "\\succeq", true);
          defineSymbol(math, main, rel, "≃", "\\simeq", true);
          defineSymbol(math, main, rel, "∣", "\\mid", true);
          defineSymbol(math, main, rel, "≪", "\\ll", true);
          defineSymbol(math, main, rel, "≫", "\\gg", true);
          defineSymbol(math, main, rel, "≍", "\\asymp", true);
          defineSymbol(math, main, rel, "∥", "\\parallel");
          defineSymbol(math, main, rel, "⋈", "\\bowtie", true);
          defineSymbol(math, main, rel, "⌣", "\\smile", true);
          defineSymbol(math, main, rel, "⊑", "\\sqsubseteq", true);
          defineSymbol(math, main, rel, "⊒", "\\sqsupseteq", true);
          defineSymbol(math, main, rel, "≐", "\\doteq", true);
          defineSymbol(math, main, rel, "⌢", "\\frown", true);
          defineSymbol(math, main, rel, "∋", "\\ni", true);
          defineSymbol(math, main, rel, "∝", "\\propto", true);
          defineSymbol(math, main, rel, "⊢", "\\vdash", true);
          defineSymbol(math, main, rel, "⊣", "\\dashv", true);
          defineSymbol(math, main, rel, "∋", "\\owns");
          defineSymbol(math, main, punct, ".", "\\ldotp");
          defineSymbol(math, main, punct, "⋅", "\\cdotp");
          defineSymbol(math, main, textord, "#", "\\#");
          defineSymbol(symbols_text, main, textord, "#", "\\#");
          defineSymbol(math, main, textord, "&", "\\&");
          defineSymbol(symbols_text, main, textord, "&", "\\&");
          defineSymbol(math, main, textord, "ℵ", "\\aleph", true);
          defineSymbol(math, main, textord, "∀", "\\forall", true);
          defineSymbol(math, main, textord, "ℏ", "\\hbar", true);
          defineSymbol(math, main, textord, "∃", "\\exists", true);
          defineSymbol(math, main, textord, "∇", "\\nabla", true);
          defineSymbol(math, main, textord, "♭", "\\flat", true);
          defineSymbol(math, main, textord, "ℓ", "\\ell", true);
          defineSymbol(math, main, textord, "♮", "\\natural", true);
          defineSymbol(math, main, textord, "♣", "\\clubsuit", true);
          defineSymbol(math, main, textord, "℘", "\\wp", true);
          defineSymbol(math, main, textord, "♯", "\\sharp", true);
          defineSymbol(math, main, textord, "♢", "\\diamondsuit", true);
          defineSymbol(math, main, textord, "ℜ", "\\Re", true);
          defineSymbol(math, main, textord, "♡", "\\heartsuit", true);
          defineSymbol(math, main, textord, "ℑ", "\\Im", true);
          defineSymbol(math, main, textord, "♠", "\\spadesuit", true);
          defineSymbol(math, main, textord, "§", "\\S", true);
          defineSymbol(symbols_text, main, textord, "§", "\\S");
          defineSymbol(math, main, textord, "¶", "\\P", true);
          defineSymbol(symbols_text, main, textord, "¶", "\\P");
          defineSymbol(math, main, textord, "†", "\\dag");
          defineSymbol(symbols_text, main, textord, "†", "\\dag");
          defineSymbol(symbols_text, main, textord, "†", "\\textdagger");
          defineSymbol(math, main, textord, "‡", "\\ddag");
          defineSymbol(symbols_text, main, textord, "‡", "\\ddag");
          defineSymbol(symbols_text, main, textord, "‡", "\\textdaggerdbl");
          defineSymbol(math, main, symbols_close, "⎱", "\\rmoustache", true);
          defineSymbol(math, main, symbols_open, "⎰", "\\lmoustache", true);
          defineSymbol(math, main, symbols_close, "⟯", "\\rgroup", true);
          defineSymbol(math, main, symbols_open, "⟮", "\\lgroup", true);
          defineSymbol(math, main, bin, "∓", "\\mp", true);
          defineSymbol(math, main, bin, "⊖", "\\ominus", true);
          defineSymbol(math, main, bin, "⊎", "\\uplus", true);
          defineSymbol(math, main, bin, "⊓", "\\sqcap", true);
          defineSymbol(math, main, bin, "∗", "\\ast");
          defineSymbol(math, main, bin, "⊔", "\\sqcup", true);
          defineSymbol(math, main, bin, "◯", "\\bigcirc", true);
          defineSymbol(math, main, bin, "∙", "\\bullet", true);
          defineSymbol(math, main, bin, "‡", "\\ddagger");
          defineSymbol(math, main, bin, "≀", "\\wr", true);
          defineSymbol(math, main, bin, "⨿", "\\amalg");
          defineSymbol(math, main, bin, "&", "\\And");
          defineSymbol(math, main, rel, "⟵", "\\longleftarrow", true);
          defineSymbol(math, main, rel, "⇐", "\\Leftarrow", true);
          defineSymbol(math, main, rel, "⟸", "\\Longleftarrow", true);
          defineSymbol(math, main, rel, "⟶", "\\longrightarrow", true);
          defineSymbol(math, main, rel, "⇒", "\\Rightarrow", true);
          defineSymbol(math, main, rel, "⟹", "\\Longrightarrow", true);
          defineSymbol(math, main, rel, "↔", "\\leftrightarrow", true);
          defineSymbol(math, main, rel, "⟷", "\\longleftrightarrow", true);
          defineSymbol(math, main, rel, "⇔", "\\Leftrightarrow", true);
          defineSymbol(math, main, rel, "⟺", "\\Longleftrightarrow", true);
          defineSymbol(math, main, rel, "↦", "\\mapsto", true);
          defineSymbol(math, main, rel, "⟼", "\\longmapsto", true);
          defineSymbol(math, main, rel, "↗", "\\nearrow", true);
          defineSymbol(math, main, rel, "↩", "\\hookleftarrow", true);
          defineSymbol(math, main, rel, "↪", "\\hookrightarrow", true);
          defineSymbol(math, main, rel, "↘", "\\searrow", true);
          defineSymbol(math, main, rel, "↼", "\\leftharpoonup", true);
          defineSymbol(math, main, rel, "⇀", "\\rightharpoonup", true);
          defineSymbol(math, main, rel, "↙", "\\swarrow", true);
          defineSymbol(math, main, rel, "↽", "\\leftharpoondown", true);
          defineSymbol(math, main, rel, "⇁", "\\rightharpoondown", true);
          defineSymbol(math, main, rel, "↖", "\\nwarrow", true);
          defineSymbol(math, main, rel, "⇌", "\\rightleftharpoons", true);
          defineSymbol(math, ams, rel, "≮", "\\nless", true);
          defineSymbol(math, ams, rel, "", "\\@nleqslant");
          defineSymbol(math, ams, rel, "", "\\@nleqq");
          defineSymbol(math, ams, rel, "⪇", "\\lneq", true);
          defineSymbol(math, ams, rel, "≨", "\\lneqq", true);
          defineSymbol(math, ams, rel, "", "\\@lvertneqq");
          defineSymbol(math, ams, rel, "⋦", "\\lnsim", true);
          defineSymbol(math, ams, rel, "⪉", "\\lnapprox", true);
          defineSymbol(math, ams, rel, "⊀", "\\nprec", true);
          defineSymbol(math, ams, rel, "⋠", "\\npreceq", true);
          defineSymbol(math, ams, rel, "⋨", "\\precnsim", true);
          defineSymbol(math, ams, rel, "⪹", "\\precnapprox", true);
          defineSymbol(math, ams, rel, "≁", "\\nsim", true);
          defineSymbol(math, ams, rel, "", "\\@nshortmid");
          defineSymbol(math, ams, rel, "∤", "\\nmid", true);
          defineSymbol(math, ams, rel, "⊬", "\\nvdash", true);
          defineSymbol(math, ams, rel, "⊭", "\\nvDash", true);
          defineSymbol(math, ams, rel, "⋪", "\\ntriangleleft");
          defineSymbol(math, ams, rel, "⋬", "\\ntrianglelefteq", true);
          defineSymbol(math, ams, rel, "⊊", "\\subsetneq", true);
          defineSymbol(math, ams, rel, "", "\\@varsubsetneq");
          defineSymbol(math, ams, rel, "⫋", "\\subsetneqq", true);
          defineSymbol(math, ams, rel, "", "\\@varsubsetneqq");
          defineSymbol(math, ams, rel, "≯", "\\ngtr", true);
          defineSymbol(math, ams, rel, "", "\\@ngeqslant");
          defineSymbol(math, ams, rel, "", "\\@ngeqq");
          defineSymbol(math, ams, rel, "⪈", "\\gneq", true);
          defineSymbol(math, ams, rel, "≩", "\\gneqq", true);
          defineSymbol(math, ams, rel, "", "\\@gvertneqq");
          defineSymbol(math, ams, rel, "⋧", "\\gnsim", true);
          defineSymbol(math, ams, rel, "⪊", "\\gnapprox", true);
          defineSymbol(math, ams, rel, "⊁", "\\nsucc", true);
          defineSymbol(math, ams, rel, "⋡", "\\nsucceq", true);
          defineSymbol(math, ams, rel, "⋩", "\\succnsim", true);
          defineSymbol(math, ams, rel, "⪺", "\\succnapprox", true);
          defineSymbol(math, ams, rel, "≆", "\\ncong", true);
          defineSymbol(math, ams, rel, "", "\\@nshortparallel");
          defineSymbol(math, ams, rel, "∦", "\\nparallel", true);
          defineSymbol(math, ams, rel, "⊯", "\\nVDash", true);
          defineSymbol(math, ams, rel, "⋫", "\\ntriangleright");
          defineSymbol(math, ams, rel, "⋭", "\\ntrianglerighteq", true);
          defineSymbol(math, ams, rel, "", "\\@nsupseteqq");
          defineSymbol(math, ams, rel, "⊋", "\\supsetneq", true);
          defineSymbol(math, ams, rel, "", "\\@varsupsetneq");
          defineSymbol(math, ams, rel, "⫌", "\\supsetneqq", true);
          defineSymbol(math, ams, rel, "", "\\@varsupsetneqq");
          defineSymbol(math, ams, rel, "⊮", "\\nVdash", true);
          defineSymbol(math, ams, rel, "⪵", "\\precneqq", true);
          defineSymbol(math, ams, rel, "⪶", "\\succneqq", true);
          defineSymbol(math, ams, rel, "", "\\@nsubseteqq");
          defineSymbol(math, ams, bin, "⊴", "\\unlhd");
          defineSymbol(math, ams, bin, "⊵", "\\unrhd");
          defineSymbol(math, ams, rel, "↚", "\\nleftarrow", true);
          defineSymbol(math, ams, rel, "↛", "\\nrightarrow", true);
          defineSymbol(math, ams, rel, "⇍", "\\nLeftarrow", true);
          defineSymbol(math, ams, rel, "⇏", "\\nRightarrow", true);
          defineSymbol(math, ams, rel, "↮", "\\nleftrightarrow", true);
          defineSymbol(math, ams, rel, "⇎", "\\nLeftrightarrow", true);
          defineSymbol(math, ams, rel, "△", "\\vartriangle");
          defineSymbol(math, ams, textord, "ℏ", "\\hslash");
          defineSymbol(math, ams, textord, "▽", "\\triangledown");
          defineSymbol(math, ams, textord, "◊", "\\lozenge");
          defineSymbol(math, ams, textord, "Ⓢ", "\\circledS");
          defineSymbol(math, ams, textord, "®", "\\circledR");
          defineSymbol(symbols_text, ams, textord, "®", "\\circledR");
          defineSymbol(math, ams, textord, "∡", "\\measuredangle", true);
          defineSymbol(math, ams, textord, "∄", "\\nexists");
          defineSymbol(math, ams, textord, "℧", "\\mho");
          defineSymbol(math, ams, textord, "Ⅎ", "\\Finv", true);
          defineSymbol(math, ams, textord, "⅁", "\\Game", true);
          defineSymbol(math, ams, textord, "‵", "\\backprime");
          defineSymbol(math, ams, textord, "▲", "\\blacktriangle");
          defineSymbol(math, ams, textord, "▼", "\\blacktriangledown");
          defineSymbol(math, ams, textord, "■", "\\blacksquare");
          defineSymbol(math, ams, textord, "⧫", "\\blacklozenge");
          defineSymbol(math, ams, textord, "★", "\\bigstar");
          defineSymbol(math, ams, textord, "∢", "\\sphericalangle", true);
          defineSymbol(math, ams, textord, "∁", "\\complement", true);
          defineSymbol(math, ams, textord, "ð", "\\eth", true);
          defineSymbol(symbols_text, main, textord, "ð", "ð");
          defineSymbol(math, ams, textord, "╱", "\\diagup");
          defineSymbol(math, ams, textord, "╲", "\\diagdown");
          defineSymbol(math, ams, textord, "□", "\\square");
          defineSymbol(math, ams, textord, "□", "\\Box");
          defineSymbol(math, ams, textord, "◊", "\\Diamond");
          defineSymbol(math, ams, textord, "¥", "\\yen", true);
          defineSymbol(symbols_text, ams, textord, "¥", "\\yen", true);
          defineSymbol(math, ams, textord, "✓", "\\checkmark", true);
          defineSymbol(symbols_text, ams, textord, "✓", "\\checkmark");
          defineSymbol(math, ams, textord, "ℶ", "\\beth", true);
          defineSymbol(math, ams, textord, "ℸ", "\\daleth", true);
          defineSymbol(math, ams, textord, "ℷ", "\\gimel", true);
          defineSymbol(math, ams, textord, "ϝ", "\\digamma", true);
          defineSymbol(math, ams, textord, "ϰ", "\\varkappa");
          defineSymbol(math, ams, symbols_open, "┌", "\\@ulcorner", true);
          defineSymbol(math, ams, symbols_close, "┐", "\\@urcorner", true);
          defineSymbol(math, ams, symbols_open, "└", "\\@llcorner", true);
          defineSymbol(math, ams, symbols_close, "┘", "\\@lrcorner", true);
          defineSymbol(math, ams, rel, "≦", "\\leqq", true);
          defineSymbol(math, ams, rel, "⩽", "\\leqslant", true);
          defineSymbol(math, ams, rel, "⪕", "\\eqslantless", true);
          defineSymbol(math, ams, rel, "≲", "\\lesssim", true);
          defineSymbol(math, ams, rel, "⪅", "\\lessapprox", true);
          defineSymbol(math, ams, rel, "≊", "\\approxeq", true);
          defineSymbol(math, ams, bin, "⋖", "\\lessdot");
          defineSymbol(math, ams, rel, "⋘", "\\lll", true);
          defineSymbol(math, ams, rel, "≶", "\\lessgtr", true);
          defineSymbol(math, ams, rel, "⋚", "\\lesseqgtr", true);
          defineSymbol(math, ams, rel, "⪋", "\\lesseqqgtr", true);
          defineSymbol(math, ams, rel, "≑", "\\doteqdot");
          defineSymbol(math, ams, rel, "≓", "\\risingdotseq", true);
          defineSymbol(math, ams, rel, "≒", "\\fallingdotseq", true);
          defineSymbol(math, ams, rel, "∽", "\\backsim", true);
          defineSymbol(math, ams, rel, "⋍", "\\backsimeq", true);
          defineSymbol(math, ams, rel, "⫅", "\\subseteqq", true);
          defineSymbol(math, ams, rel, "⋐", "\\Subset", true);
          defineSymbol(math, ams, rel, "⊏", "\\sqsubset", true);
          defineSymbol(math, ams, rel, "≼", "\\preccurlyeq", true);
          defineSymbol(math, ams, rel, "⋞", "\\curlyeqprec", true);
          defineSymbol(math, ams, rel, "≾", "\\precsim", true);
          defineSymbol(math, ams, rel, "⪷", "\\precapprox", true);
          defineSymbol(math, ams, rel, "⊲", "\\vartriangleleft");
          defineSymbol(math, ams, rel, "⊴", "\\trianglelefteq");
          defineSymbol(math, ams, rel, "⊨", "\\vDash", true);
          defineSymbol(math, ams, rel, "⊪", "\\Vvdash", true);
          defineSymbol(math, ams, rel, "⌣", "\\smallsmile");
          defineSymbol(math, ams, rel, "⌢", "\\smallfrown");
          defineSymbol(math, ams, rel, "≏", "\\bumpeq", true);
          defineSymbol(math, ams, rel, "≎", "\\Bumpeq", true);
          defineSymbol(math, ams, rel, "≧", "\\geqq", true);
          defineSymbol(math, ams, rel, "⩾", "\\geqslant", true);
          defineSymbol(math, ams, rel, "⪖", "\\eqslantgtr", true);
          defineSymbol(math, ams, rel, "≳", "\\gtrsim", true);
          defineSymbol(math, ams, rel, "⪆", "\\gtrapprox", true);
          defineSymbol(math, ams, bin, "⋗", "\\gtrdot");
          defineSymbol(math, ams, rel, "⋙", "\\ggg", true);
          defineSymbol(math, ams, rel, "≷", "\\gtrless", true);
          defineSymbol(math, ams, rel, "⋛", "\\gtreqless", true);
          defineSymbol(math, ams, rel, "⪌", "\\gtreqqless", true);
          defineSymbol(math, ams, rel, "≖", "\\eqcirc", true);
          defineSymbol(math, ams, rel, "≗", "\\circeq", true);
          defineSymbol(math, ams, rel, "≜", "\\triangleq", true);
          defineSymbol(math, ams, rel, "∼", "\\thicksim");
          defineSymbol(math, ams, rel, "≈", "\\thickapprox");
          defineSymbol(math, ams, rel, "⫆", "\\supseteqq", true);
          defineSymbol(math, ams, rel, "⋑", "\\Supset", true);
          defineSymbol(math, ams, rel, "⊐", "\\sqsupset", true);
          defineSymbol(math, ams, rel, "≽", "\\succcurlyeq", true);
          defineSymbol(math, ams, rel, "⋟", "\\curlyeqsucc", true);
          defineSymbol(math, ams, rel, "≿", "\\succsim", true);
          defineSymbol(math, ams, rel, "⪸", "\\succapprox", true);
          defineSymbol(math, ams, rel, "⊳", "\\vartriangleright");
          defineSymbol(math, ams, rel, "⊵", "\\trianglerighteq");
          defineSymbol(math, ams, rel, "⊩", "\\Vdash", true);
          defineSymbol(math, ams, rel, "∣", "\\shortmid");
          defineSymbol(math, ams, rel, "∥", "\\shortparallel");
          defineSymbol(math, ams, rel, "≬", "\\between", true);
          defineSymbol(math, ams, rel, "⋔", "\\pitchfork", true);
          defineSymbol(math, ams, rel, "∝", "\\varpropto");
          defineSymbol(math, ams, rel, "◀", "\\blacktriangleleft");
          defineSymbol(math, ams, rel, "∴", "\\therefore", true);
          defineSymbol(math, ams, rel, "∍", "\\backepsilon");
          defineSymbol(math, ams, rel, "▶", "\\blacktriangleright");
          defineSymbol(math, ams, rel, "∵", "\\because", true);
          defineSymbol(math, ams, rel, "⋘", "\\llless");
          defineSymbol(math, ams, rel, "⋙", "\\gggtr");
          defineSymbol(math, ams, bin, "⊲", "\\lhd");
          defineSymbol(math, ams, bin, "⊳", "\\rhd");
          defineSymbol(math, ams, rel, "≂", "\\eqsim", true);
          defineSymbol(math, main, rel, "⋈", "\\Join");
          defineSymbol(math, ams, rel, "≑", "\\Doteq", true);
          defineSymbol(math, ams, bin, "∔", "\\dotplus", true);
          defineSymbol(math, ams, bin, "∖", "\\smallsetminus");
          defineSymbol(math, ams, bin, "⋒", "\\Cap", true);
          defineSymbol(math, ams, bin, "⋓", "\\Cup", true);
          defineSymbol(math, ams, bin, "⩞", "\\doublebarwedge", true);
          defineSymbol(math, ams, bin, "⊟", "\\boxminus", true);
          defineSymbol(math, ams, bin, "⊞", "\\boxplus", true);
          defineSymbol(math, ams, bin, "⋇", "\\divideontimes", true);
          defineSymbol(math, ams, bin, "⋉", "\\ltimes", true);
          defineSymbol(math, ams, bin, "⋊", "\\rtimes", true);
          defineSymbol(math, ams, bin, "⋋", "\\leftthreetimes", true);
          defineSymbol(math, ams, bin, "⋌", "\\rightthreetimes", true);
          defineSymbol(math, ams, bin, "⋏", "\\curlywedge", true);
          defineSymbol(math, ams, bin, "⋎", "\\curlyvee", true);
          defineSymbol(math, ams, bin, "⊝", "\\circleddash", true);
          defineSymbol(math, ams, bin, "⊛", "\\circledast", true);
          defineSymbol(math, ams, bin, "⋅", "\\centerdot");
          defineSymbol(math, ams, bin, "⊺", "\\intercal", true);
          defineSymbol(math, ams, bin, "⋒", "\\doublecap");
          defineSymbol(math, ams, bin, "⋓", "\\doublecup");
          defineSymbol(math, ams, bin, "⊠", "\\boxtimes", true);
          defineSymbol(math, ams, rel, "⇢", "\\dashrightarrow", true);
          defineSymbol(math, ams, rel, "⇠", "\\dashleftarrow", true);
          defineSymbol(math, ams, rel, "⇇", "\\leftleftarrows", true);
          defineSymbol(math, ams, rel, "⇆", "\\leftrightarrows", true);
          defineSymbol(math, ams, rel, "⇚", "\\Lleftarrow", true);
          defineSymbol(math, ams, rel, "↞", "\\twoheadleftarrow", true);
          defineSymbol(math, ams, rel, "↢", "\\leftarrowtail", true);
          defineSymbol(math, ams, rel, "↫", "\\looparrowleft", true);
          defineSymbol(math, ams, rel, "⇋", "\\leftrightharpoons", true);
          defineSymbol(math, ams, rel, "↶", "\\curvearrowleft", true);
          defineSymbol(math, ams, rel, "↺", "\\circlearrowleft", true);
          defineSymbol(math, ams, rel, "↰", "\\Lsh", true);
          defineSymbol(math, ams, rel, "⇈", "\\upuparrows", true);
          defineSymbol(math, ams, rel, "↿", "\\upharpoonleft", true);
          defineSymbol(math, ams, rel, "⇃", "\\downharpoonleft", true);
          defineSymbol(math, main, rel, "⊶", "\\origof", true);
          defineSymbol(math, main, rel, "⊷", "\\imageof", true);
          defineSymbol(math, ams, rel, "⊸", "\\multimap", true);
          defineSymbol(math, ams, rel, "↭", "\\leftrightsquigarrow", true);
          defineSymbol(math, ams, rel, "⇉", "\\rightrightarrows", true);
          defineSymbol(math, ams, rel, "⇄", "\\rightleftarrows", true);
          defineSymbol(math, ams, rel, "↠", "\\twoheadrightarrow", true);
          defineSymbol(math, ams, rel, "↣", "\\rightarrowtail", true);
          defineSymbol(math, ams, rel, "↬", "\\looparrowright", true);
          defineSymbol(math, ams, rel, "↷", "\\curvearrowright", true);
          defineSymbol(math, ams, rel, "↻", "\\circlearrowright", true);
          defineSymbol(math, ams, rel, "↱", "\\Rsh", true);
          defineSymbol(math, ams, rel, "⇊", "\\downdownarrows", true);
          defineSymbol(math, ams, rel, "↾", "\\upharpoonright", true);
          defineSymbol(math, ams, rel, "⇂", "\\downharpoonright", true);
          defineSymbol(math, ams, rel, "⇝", "\\rightsquigarrow", true);
          defineSymbol(math, ams, rel, "⇝", "\\leadsto");
          defineSymbol(math, ams, rel, "⇛", "\\Rrightarrow", true);
          defineSymbol(math, ams, rel, "↾", "\\restriction");
          defineSymbol(math, main, textord, "‘", "`");
          defineSymbol(math, main, textord, "$", "\\$");
          defineSymbol(symbols_text, main, textord, "$", "\\$");
          defineSymbol(symbols_text, main, textord, "$", "\\textdollar");
          defineSymbol(math, main, textord, "%", "\\%");
          defineSymbol(symbols_text, main, textord, "%", "\\%");
          defineSymbol(math, main, textord, "_", "\\_");
          defineSymbol(symbols_text, main, textord, "_", "\\_");
          defineSymbol(symbols_text, main, textord, "_", "\\textunderscore");
          defineSymbol(math, main, textord, "∠", "\\angle", true);
          defineSymbol(math, main, textord, "∞", "\\infty", true);
          defineSymbol(math, main, textord, "′", "\\prime");
          defineSymbol(math, main, textord, "△", "\\triangle");
          defineSymbol(math, main, textord, "Γ", "\\Gamma", true);
          defineSymbol(math, main, textord, "Δ", "\\Delta", true);
          defineSymbol(math, main, textord, "Θ", "\\Theta", true);
          defineSymbol(math, main, textord, "Λ", "\\Lambda", true);
          defineSymbol(math, main, textord, "Ξ", "\\Xi", true);
          defineSymbol(math, main, textord, "Π", "\\Pi", true);
          defineSymbol(math, main, textord, "Σ", "\\Sigma", true);
          defineSymbol(math, main, textord, "Υ", "\\Upsilon", true);
          defineSymbol(math, main, textord, "Φ", "\\Phi", true);
          defineSymbol(math, main, textord, "Ψ", "\\Psi", true);
          defineSymbol(math, main, textord, "Ω", "\\Omega", true);
          defineSymbol(math, main, textord, "A", "Α");
          defineSymbol(math, main, textord, "B", "Β");
          defineSymbol(math, main, textord, "E", "Ε");
          defineSymbol(math, main, textord, "Z", "Ζ");
          defineSymbol(math, main, textord, "H", "Η");
          defineSymbol(math, main, textord, "I", "Ι");
          defineSymbol(math, main, textord, "K", "Κ");
          defineSymbol(math, main, textord, "M", "Μ");
          defineSymbol(math, main, textord, "N", "Ν");
          defineSymbol(math, main, textord, "O", "Ο");
          defineSymbol(math, main, textord, "P", "Ρ");
          defineSymbol(math, main, textord, "T", "Τ");
          defineSymbol(math, main, textord, "X", "Χ");
          defineSymbol(math, main, textord, "¬", "\\neg", true);
          defineSymbol(math, main, textord, "¬", "\\lnot");
          defineSymbol(math, main, textord, "⊤", "\\top");
          defineSymbol(math, main, textord, "⊥", "\\bot");
          defineSymbol(math, main, textord, "∅", "\\emptyset");
          defineSymbol(math, ams, textord, "∅", "\\varnothing");
          defineSymbol(math, main, mathord, "α", "\\alpha", true);
          defineSymbol(math, main, mathord, "β", "\\beta", true);
          defineSymbol(math, main, mathord, "γ", "\\gamma", true);
          defineSymbol(math, main, mathord, "δ", "\\delta", true);
          defineSymbol(math, main, mathord, "ϵ", "\\epsilon", true);
          defineSymbol(math, main, mathord, "ζ", "\\zeta", true);
          defineSymbol(math, main, mathord, "η", "\\eta", true);
          defineSymbol(math, main, mathord, "θ", "\\theta", true);
          defineSymbol(math, main, mathord, "ι", "\\iota", true);
          defineSymbol(math, main, mathord, "κ", "\\kappa", true);
          defineSymbol(math, main, mathord, "λ", "\\lambda", true);
          defineSymbol(math, main, mathord, "μ", "\\mu", true);
          defineSymbol(math, main, mathord, "ν", "\\nu", true);
          defineSymbol(math, main, mathord, "ξ", "\\xi", true);
          defineSymbol(math, main, mathord, "ο", "\\omicron", true);
          defineSymbol(math, main, mathord, "π", "\\pi", true);
          defineSymbol(math, main, mathord, "ρ", "\\rho", true);
          defineSymbol(math, main, mathord, "σ", "\\sigma", true);
          defineSymbol(math, main, mathord, "τ", "\\tau", true);
          defineSymbol(math, main, mathord, "υ", "\\upsilon", true);
          defineSymbol(math, main, mathord, "ϕ", "\\phi", true);
          defineSymbol(math, main, mathord, "χ", "\\chi", true);
          defineSymbol(math, main, mathord, "ψ", "\\psi", true);
          defineSymbol(math, main, mathord, "ω", "\\omega", true);
          defineSymbol(math, main, mathord, "ε", "\\varepsilon", true);
          defineSymbol(math, main, mathord, "ϑ", "\\vartheta", true);
          defineSymbol(math, main, mathord, "ϖ", "\\varpi", true);
          defineSymbol(math, main, mathord, "ϱ", "\\varrho", true);
          defineSymbol(math, main, mathord, "ς", "\\varsigma", true);
          defineSymbol(math, main, mathord, "φ", "\\varphi", true);
          defineSymbol(math, main, bin, "∗", "*", true);
          defineSymbol(math, main, bin, "+", "+");
          defineSymbol(math, main, bin, "−", "-", true);
          defineSymbol(math, main, bin, "⋅", "\\cdot", true);
          defineSymbol(math, main, bin, "∘", "\\circ", true);
          defineSymbol(math, main, bin, "÷", "\\div", true);
          defineSymbol(math, main, bin, "±", "\\pm", true);
          defineSymbol(math, main, bin, "×", "\\times", true);
          defineSymbol(math, main, bin, "∩", "\\cap", true);
          defineSymbol(math, main, bin, "∪", "\\cup", true);
          defineSymbol(math, main, bin, "∖", "\\setminus", true);
          defineSymbol(math, main, bin, "∧", "\\land");
          defineSymbol(math, main, bin, "∨", "\\lor");
          defineSymbol(math, main, bin, "∧", "\\wedge", true);
          defineSymbol(math, main, bin, "∨", "\\vee", true);
          defineSymbol(math, main, textord, "√", "\\surd");
          defineSymbol(math, main, symbols_open, "⟨", "\\langle", true);
          defineSymbol(math, main, symbols_open, "∣", "\\lvert");
          defineSymbol(math, main, symbols_open, "∥", "\\lVert");
          defineSymbol(math, main, symbols_close, "?", "?");
          defineSymbol(math, main, symbols_close, "!", "!");
          defineSymbol(math, main, symbols_close, "⟩", "\\rangle", true);
          defineSymbol(math, main, symbols_close, "∣", "\\rvert");
          defineSymbol(math, main, symbols_close, "∥", "\\rVert");
          defineSymbol(math, main, rel, "=", "=");
          defineSymbol(math, main, rel, ":", ":");
          defineSymbol(math, main, rel, "≈", "\\approx", true);
          defineSymbol(math, main, rel, "≅", "\\cong", true);
          defineSymbol(math, main, rel, "≥", "\\ge");
          defineSymbol(math, main, rel, "≥", "\\geq", true);
          defineSymbol(math, main, rel, "←", "\\gets");
          defineSymbol(math, main, rel, ">", "\\gt", true);
          defineSymbol(math, main, rel, "∈", "\\in", true);
          defineSymbol(math, main, rel, "", "\\@not");
          defineSymbol(math, main, rel, "⊂", "\\subset", true);
          defineSymbol(math, main, rel, "⊃", "\\supset", true);
          defineSymbol(math, main, rel, "⊆", "\\subseteq", true);
          defineSymbol(math, main, rel, "⊇", "\\supseteq", true);
          defineSymbol(math, ams, rel, "⊈", "\\nsubseteq", true);
          defineSymbol(math, ams, rel, "⊉", "\\nsupseteq", true);
          defineSymbol(math, main, rel, "⊨", "\\models");
          defineSymbol(math, main, rel, "←", "\\leftarrow", true);
          defineSymbol(math, main, rel, "≤", "\\le");
          defineSymbol(math, main, rel, "≤", "\\leq", true);
          defineSymbol(math, main, rel, "<", "\\lt", true);
          defineSymbol(math, main, rel, "→", "\\rightarrow", true);
          defineSymbol(math, main, rel, "→", "\\to");
          defineSymbol(math, ams, rel, "≱", "\\ngeq", true);
          defineSymbol(math, ams, rel, "≰", "\\nleq", true);
          defineSymbol(math, main, spacing, " ", "\\ ");
          defineSymbol(math, main, spacing, " ", "\\space");
          defineSymbol(math, main, spacing, " ", "\\nobreakspace");
          defineSymbol(symbols_text, main, spacing, " ", "\\ ");
          defineSymbol(symbols_text, main, spacing, " ", " ");
          defineSymbol(symbols_text, main, spacing, " ", "\\space");
          defineSymbol(symbols_text, main, spacing, " ", "\\nobreakspace");
          defineSymbol(math, main, spacing, null, "\\nobreak");
          defineSymbol(math, main, spacing, null, "\\allowbreak");
          defineSymbol(math, main, punct, ",", ",");
          defineSymbol(math, main, punct, ";", ";");
          defineSymbol(math, ams, bin, "⊼", "\\barwedge", true);
          defineSymbol(math, ams, bin, "⊻", "\\veebar", true);
          defineSymbol(math, main, bin, "⊙", "\\odot", true);
          defineSymbol(math, main, bin, "⊕", "\\oplus", true);
          defineSymbol(math, main, bin, "⊗", "\\otimes", true);
          defineSymbol(math, main, textord, "∂", "\\partial", true);
          defineSymbol(math, main, bin, "⊘", "\\oslash", true);
          defineSymbol(math, ams, bin, "⊚", "\\circledcirc", true);
          defineSymbol(math, ams, bin, "⊡", "\\boxdot", true);
          defineSymbol(math, main, bin, "△", "\\bigtriangleup");
          defineSymbol(math, main, bin, "▽", "\\bigtriangledown");
          defineSymbol(math, main, bin, "†", "\\dagger");
          defineSymbol(math, main, bin, "⋄", "\\diamond");
          defineSymbol(math, main, bin, "⋆", "\\star");
          defineSymbol(math, main, bin, "◃", "\\triangleleft");
          defineSymbol(math, main, bin, "▹", "\\triangleright");
          defineSymbol(math, main, symbols_open, "{", "\\{");
          defineSymbol(symbols_text, main, textord, "{", "\\{");
          defineSymbol(symbols_text, main, textord, "{", "\\textbraceleft");
          defineSymbol(math, main, symbols_close, "}", "\\}");
          defineSymbol(symbols_text, main, textord, "}", "\\}");
          defineSymbol(symbols_text, main, textord, "}", "\\textbraceright");
          defineSymbol(math, main, symbols_open, "{", "\\lbrace");
          defineSymbol(math, main, symbols_close, "}", "\\rbrace");
          defineSymbol(math, main, symbols_open, "[", "\\lbrack", true);
          defineSymbol(symbols_text, main, textord, "[", "\\lbrack", true);
          defineSymbol(math, main, symbols_close, "]", "\\rbrack", true);
          defineSymbol(symbols_text, main, textord, "]", "\\rbrack", true);
          defineSymbol(math, main, symbols_open, "(", "\\lparen", true);
          defineSymbol(math, main, symbols_close, ")", "\\rparen", true);
          defineSymbol(symbols_text, main, textord, "<", "\\textless", true);
          defineSymbol(symbols_text, main, textord, ">", "\\textgreater", true);
          defineSymbol(math, main, symbols_open, "⌊", "\\lfloor", true);
          defineSymbol(math, main, symbols_close, "⌋", "\\rfloor", true);
          defineSymbol(math, main, symbols_open, "⌈", "\\lceil", true);
          defineSymbol(math, main, symbols_close, "⌉", "\\rceil", true);
          defineSymbol(math, main, textord, "\\", "\\backslash");
          defineSymbol(math, main, textord, "∣", "|");
          defineSymbol(math, main, textord, "∣", "\\vert");
          defineSymbol(symbols_text, main, textord, "|", "\\textbar", true);
          defineSymbol(math, main, textord, "∥", "\\|");
          defineSymbol(math, main, textord, "∥", "\\Vert");
          defineSymbol(symbols_text, main, textord, "∥", "\\textbardbl");
          defineSymbol(symbols_text, main, textord, "~", "\\textasciitilde");
          defineSymbol(symbols_text, main, textord, "\\", "\\textbackslash");
          defineSymbol(symbols_text, main, textord, "^", "\\textasciicircum");
          defineSymbol(math, main, rel, "↑", "\\uparrow", true);
          defineSymbol(math, main, rel, "⇑", "\\Uparrow", true);
          defineSymbol(math, main, rel, "↓", "\\downarrow", true);
          defineSymbol(math, main, rel, "⇓", "\\Downarrow", true);
          defineSymbol(math, main, rel, "↕", "\\updownarrow", true);
          defineSymbol(math, main, rel, "⇕", "\\Updownarrow", true);
          defineSymbol(math, main, op, "∐", "\\coprod");
          defineSymbol(math, main, op, "⋁", "\\bigvee");
          defineSymbol(math, main, op, "⋀", "\\bigwedge");
          defineSymbol(math, main, op, "⨄", "\\biguplus");
          defineSymbol(math, main, op, "⋂", "\\bigcap");
          defineSymbol(math, main, op, "⋃", "\\bigcup");
          defineSymbol(math, main, op, "∫", "\\int");
          defineSymbol(math, main, op, "∫", "\\intop");
          defineSymbol(math, main, op, "∬", "\\iint");
          defineSymbol(math, main, op, "∭", "\\iiint");
          defineSymbol(math, main, op, "∏", "\\prod");
          defineSymbol(math, main, op, "∑", "\\sum");
          defineSymbol(math, main, op, "⨂", "\\bigotimes");
          defineSymbol(math, main, op, "⨁", "\\bigoplus");
          defineSymbol(math, main, op, "⨀", "\\bigodot");
          defineSymbol(math, main, op, "∮", "\\oint");
          defineSymbol(math, main, op, "∯", "\\oiint");
          defineSymbol(math, main, op, "∰", "\\oiiint");
          defineSymbol(math, main, op, "⨆", "\\bigsqcup");
          defineSymbol(math, main, op, "∫", "\\smallint");
          defineSymbol(symbols_text, main, inner, "…", "\\textellipsis");
          defineSymbol(math, main, inner, "…", "\\mathellipsis");
          defineSymbol(symbols_text, main, inner, "…", "\\ldots", true);
          defineSymbol(math, main, inner, "…", "\\ldots", true);
          defineSymbol(math, main, inner, "⋯", "\\@cdots", true);
          defineSymbol(math, main, inner, "⋱", "\\ddots", true);
          defineSymbol(math, main, textord, "⋮", "\\varvdots");
          defineSymbol(symbols_text, main, textord, "⋮", "\\varvdots");
          defineSymbol(math, main, accent, "ˊ", "\\acute");
          defineSymbol(math, main, accent, "ˋ", "\\grave");
          defineSymbol(math, main, accent, "¨", "\\ddot");
          defineSymbol(math, main, accent, "~", "\\tilde");
          defineSymbol(math, main, accent, "ˉ", "\\bar");
          defineSymbol(math, main, accent, "˘", "\\breve");
          defineSymbol(math, main, accent, "ˇ", "\\check");
          defineSymbol(math, main, accent, "^", "\\hat");
          defineSymbol(math, main, accent, "⃗", "\\vec");
          defineSymbol(math, main, accent, "˙", "\\dot");
          defineSymbol(math, main, accent, "˚", "\\mathring");
          defineSymbol(math, main, mathord, "", "\\@imath");
          defineSymbol(math, main, mathord, "", "\\@jmath");
          defineSymbol(math, main, textord, "ı", "ı");
          defineSymbol(math, main, textord, "ȷ", "ȷ");
          defineSymbol(symbols_text, main, textord, "ı", "\\i", true);
          defineSymbol(symbols_text, main, textord, "ȷ", "\\j", true);
          defineSymbol(symbols_text, main, textord, "ß", "\\ss", true);
          defineSymbol(symbols_text, main, textord, "æ", "\\ae", true);
          defineSymbol(symbols_text, main, textord, "œ", "\\oe", true);
          defineSymbol(symbols_text, main, textord, "ø", "\\o", true);
          defineSymbol(symbols_text, main, textord, "Æ", "\\AE", true);
          defineSymbol(symbols_text, main, textord, "Œ", "\\OE", true);
          defineSymbol(symbols_text, main, textord, "Ø", "\\O", true);
          defineSymbol(symbols_text, main, accent, "ˊ", "\\'");
          defineSymbol(symbols_text, main, accent, "ˋ", "\\`");
          defineSymbol(symbols_text, main, accent, "ˆ", "\\^");
          defineSymbol(symbols_text, main, accent, "˜", "\\~");
          defineSymbol(symbols_text, main, accent, "ˉ", "\\=");
          defineSymbol(symbols_text, main, accent, "˘", "\\u");
          defineSymbol(symbols_text, main, accent, "˙", "\\.");
          defineSymbol(symbols_text, main, accent, "¸", "\\c");
          defineSymbol(symbols_text, main, accent, "˚", "\\r");
          defineSymbol(symbols_text, main, accent, "ˇ", "\\v");
          defineSymbol(symbols_text, main, accent, "¨", '\\"');
          defineSymbol(symbols_text, main, accent, "˝", "\\H");
          defineSymbol(symbols_text, main, accent, "◯", "\\textcircled");
          const ligatures = {
            "--": true,
            "---": true,
            "``": true,
            "''": true
          };
          defineSymbol(symbols_text, main, textord, "–", "--", true);
          defineSymbol(symbols_text, main, textord, "–", "\\textendash");
          defineSymbol(symbols_text, main, textord, "—", "---", true);
          defineSymbol(symbols_text, main, textord, "—", "\\textemdash");
          defineSymbol(symbols_text, main, textord, "‘", "`", true);
          defineSymbol(symbols_text, main, textord, "‘", "\\textquoteleft");
          defineSymbol(symbols_text, main, textord, "’", "'", true);
          defineSymbol(symbols_text, main, textord, "’", "\\textquoteright");
          defineSymbol(symbols_text, main, textord, "“", "``", true);
          defineSymbol(symbols_text, main, textord, "“", "\\textquotedblleft");
          defineSymbol(symbols_text, main, textord, "”", "''", true);
          defineSymbol(symbols_text, main, textord, "”", "\\textquotedblright");
          defineSymbol(math, main, textord, "°", "\\degree", true);
          defineSymbol(symbols_text, main, textord, "°", "\\degree");
          defineSymbol(symbols_text, main, textord, "°", "\\textdegree", true);
          defineSymbol(math, main, textord, "£", "\\pounds");
          defineSymbol(math, main, textord, "£", "\\mathsterling", true);
          defineSymbol(symbols_text, main, textord, "£", "\\pounds");
          defineSymbol(symbols_text, main, textord, "£", "\\textsterling", true);
          defineSymbol(math, ams, textord, "✠", "\\maltese");
          defineSymbol(symbols_text, ams, textord, "✠", "\\maltese");
          const mathTextSymbols = '0123456789/@."';
          for (let i = 0; i < mathTextSymbols.length; i++) {
            const ch = mathTextSymbols.charAt(i);
            defineSymbol(math, main, textord, ch, ch);
          }
          const textSymbols = '0123456789!@*()-=+";:?/.,';
          for (let i = 0; i < textSymbols.length; i++) {
            const ch = textSymbols.charAt(i);
            defineSymbol(symbols_text, main, textord, ch, ch);
          }
          const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
          for (let i = 0; i < letters.length; i++) {
            const ch = letters.charAt(i);
            defineSymbol(math, main, mathord, ch, ch);
            defineSymbol(symbols_text, main, textord, ch, ch);
          }
          defineSymbol(math, ams, textord, "C", "ℂ");
          defineSymbol(symbols_text, ams, textord, "C", "ℂ");
          defineSymbol(math, ams, textord, "H", "ℍ");
          defineSymbol(symbols_text, ams, textord, "H", "ℍ");
          defineSymbol(math, ams, textord, "N", "ℕ");
          defineSymbol(symbols_text, ams, textord, "N", "ℕ");
          defineSymbol(math, ams, textord, "P", "ℙ");
          defineSymbol(symbols_text, ams, textord, "P", "ℙ");
          defineSymbol(math, ams, textord, "Q", "ℚ");
          defineSymbol(symbols_text, ams, textord, "Q", "ℚ");
          defineSymbol(math, ams, textord, "R", "ℝ");
          defineSymbol(symbols_text, ams, textord, "R", "ℝ");
          defineSymbol(math, ams, textord, "Z", "ℤ");
          defineSymbol(symbols_text, ams, textord, "Z", "ℤ");
          defineSymbol(math, main, mathord, "h", "ℎ");
          defineSymbol(symbols_text, main, mathord, "h", "ℎ");
          let wideChar = "";
          for (let i = 0; i < letters.length; i++) {
            const ch = letters.charAt(i);
            wideChar = String.fromCharCode(55349, 56320 + i);
            defineSymbol(math, main, mathord, ch, wideChar);
            defineSymbol(symbols_text, main, textord, ch, wideChar);
            wideChar = String.fromCharCode(55349, 56372 + i);
            defineSymbol(math, main, mathord, ch, wideChar);
            defineSymbol(symbols_text, main, textord, ch, wideChar);
            wideChar = String.fromCharCode(55349, 56424 + i);
            defineSymbol(math, main, mathord, ch, wideChar);
            defineSymbol(symbols_text, main, textord, ch, wideChar);
            wideChar = String.fromCharCode(55349, 56580 + i);
            defineSymbol(math, main, mathord, ch, wideChar);
            defineSymbol(symbols_text, main, textord, ch, wideChar);
            wideChar = String.fromCharCode(55349, 56684 + i);
            defineSymbol(math, main, mathord, ch, wideChar);
            defineSymbol(symbols_text, main, textord, ch, wideChar);
            wideChar = String.fromCharCode(55349, 56736 + i);
            defineSymbol(math, main, mathord, ch, wideChar);
            defineSymbol(symbols_text, main, textord, ch, wideChar);
            wideChar = String.fromCharCode(55349, 56788 + i);
            defineSymbol(math, main, mathord, ch, wideChar);
            defineSymbol(symbols_text, main, textord, ch, wideChar);
            wideChar = String.fromCharCode(55349, 56840 + i);
            defineSymbol(math, main, mathord, ch, wideChar);
            defineSymbol(symbols_text, main, textord, ch, wideChar);
            wideChar = String.fromCharCode(55349, 56944 + i);
            defineSymbol(math, main, mathord, ch, wideChar);
            defineSymbol(symbols_text, main, textord, ch, wideChar);
            if (i < 26) {
              wideChar = String.fromCharCode(55349, 56632 + i);
              defineSymbol(math, main, mathord, ch, wideChar);
              defineSymbol(symbols_text, main, textord, ch, wideChar);
              wideChar = String.fromCharCode(55349, 56476 + i);
              defineSymbol(math, main, mathord, ch, wideChar);
              defineSymbol(symbols_text, main, textord, ch, wideChar);
            }
          }
          wideChar = String.fromCharCode(55349, 56668);
          defineSymbol(math, main, mathord, "k", wideChar);
          defineSymbol(symbols_text, main, textord, "k", wideChar);
          for (let i = 0; i < 10; i++) {
            const ch = i.toString();
            wideChar = String.fromCharCode(55349, 57294 + i);
            defineSymbol(math, main, mathord, ch, wideChar);
            defineSymbol(symbols_text, main, textord, ch, wideChar);
            wideChar = String.fromCharCode(55349, 57314 + i);
            defineSymbol(math, main, mathord, ch, wideChar);
            defineSymbol(symbols_text, main, textord, ch, wideChar);
            wideChar = String.fromCharCode(55349, 57324 + i);
            defineSymbol(math, main, mathord, ch, wideChar);
            defineSymbol(symbols_text, main, textord, ch, wideChar);
            wideChar = String.fromCharCode(55349, 57334 + i);
            defineSymbol(math, main, mathord, ch, wideChar);
            defineSymbol(symbols_text, main, textord, ch, wideChar);
          }
          const extraLatin = "ÐÞþ";
          for (let i = 0; i < extraLatin.length; i++) {
            const ch = extraLatin.charAt(i);
            defineSymbol(math, main, mathord, ch, ch);
            defineSymbol(symbols_text, main, textord, ch, ch);
          }
          ;
          const wideLatinLetterData = [
            ["mathbf", "textbf", "Main-Bold"],
            // A-Z bold upright
            ["mathbf", "textbf", "Main-Bold"],
            // a-z bold upright
            ["mathnormal", "textit", "Math-Italic"],
            // A-Z italic
            ["mathnormal", "textit", "Math-Italic"],
            // a-z italic
            ["boldsymbol", "boldsymbol", "Main-BoldItalic"],
            // A-Z bold italic
            ["boldsymbol", "boldsymbol", "Main-BoldItalic"],
            // a-z bold italic
            // Map fancy A-Z letters to script, not calligraphic.
            // This aligns with unicode-math and math fonts (except Cambria Math).
            ["mathscr", "textscr", "Script-Regular"],
            // A-Z script
            ["", "", ""],
            // a-z script.  No font
            ["", "", ""],
            // A-Z bold script. No font
            ["", "", ""],
            // a-z bold script. No font
            ["mathfrak", "textfrak", "Fraktur-Regular"],
            // A-Z Fraktur
            ["mathfrak", "textfrak", "Fraktur-Regular"],
            // a-z Fraktur
            ["mathbb", "textbb", "AMS-Regular"],
            // A-Z double-struck
            ["mathbb", "textbb", "AMS-Regular"],
            // k double-struck
            // Note that we are using a bold font, but font metrics for regular Fraktur.
            ["mathboldfrak", "textboldfrak", "Fraktur-Regular"],
            // A-Z bold Fraktur
            ["mathboldfrak", "textboldfrak", "Fraktur-Regular"],
            // a-z bold Fraktur
            ["mathsf", "textsf", "SansSerif-Regular"],
            // A-Z sans-serif
            ["mathsf", "textsf", "SansSerif-Regular"],
            // a-z sans-serif
            ["mathboldsf", "textboldsf", "SansSerif-Bold"],
            // A-Z bold sans-serif
            ["mathboldsf", "textboldsf", "SansSerif-Bold"],
            // a-z bold sans-serif
            ["mathitsf", "textitsf", "SansSerif-Italic"],
            // A-Z italic sans-serif
            ["mathitsf", "textitsf", "SansSerif-Italic"],
            // a-z italic sans-serif
            ["", "", ""],
            // A-Z bold italic sans. No font
            ["", "", ""],
            // a-z bold italic sans. No font
            ["mathtt", "texttt", "Typewriter-Regular"],
            // A-Z monospace
            ["mathtt", "texttt", "Typewriter-Regular"]
            // a-z monospace
          ];
          const wideNumeralData = [
            ["mathbf", "textbf", "Main-Bold"],
            // 0-9 bold
            ["", "", ""],
            // 0-9 double-struck. No KaTeX font.
            ["mathsf", "textsf", "SansSerif-Regular"],
            // 0-9 sans-serif
            ["mathboldsf", "textboldsf", "SansSerif-Bold"],
            // 0-9 bold sans-serif
            ["mathtt", "texttt", "Typewriter-Regular"]
            // 0-9 monospace
          ];
          const wideCharacterFont = function(wideChar2, mode) {
            const H = wideChar2.charCodeAt(0);
            const L = wideChar2.charCodeAt(1);
            const codePoint = (H - 55296) * 1024 + (L - 56320) + 65536;
            const j = mode === "math" ? 0 : 1;
            if (119808 <= codePoint && codePoint < 120484) {
              const i = Math.floor((codePoint - 119808) / 26);
              return [wideLatinLetterData[i][2], wideLatinLetterData[i][j]];
            } else if (120782 <= codePoint && codePoint <= 120831) {
              const i = Math.floor((codePoint - 120782) / 10);
              return [wideNumeralData[i][2], wideNumeralData[i][j]];
            } else if (codePoint === 120485 || codePoint === 120486) {
              return [wideLatinLetterData[0][2], wideLatinLetterData[0][j]];
            } else if (120486 < codePoint && codePoint < 120782) {
              return ["", ""];
            } else {
              throw new src_ParseError("Unsupported character: " + wideChar2);
            }
          };
          ;
          const lookupSymbol = function(value, fontName, mode) {
            if (src_symbols[mode][value] && src_symbols[mode][value].replace) {
              value = src_symbols[mode][value].replace;
            }
            return {
              value,
              metrics: getCharacterMetrics(value, fontName, mode)
            };
          };
          const makeSymbol = function(value, fontName, mode, options, classes) {
            const lookup = lookupSymbol(value, fontName, mode);
            const metrics = lookup.metrics;
            value = lookup.value;
            let symbolNode;
            if (metrics) {
              let italic = metrics.italic;
              if (mode === "text" || options && options.font === "mathit") {
                italic = 0;
              }
              symbolNode = new SymbolNode(value, metrics.height, metrics.depth, italic, metrics.skew, metrics.width, classes);
            } else {
              typeof console !== "undefined" && console.warn("No character metrics " + ("for '" + value + "' in style '" + fontName + "' and mode '" + mode + "'"));
              symbolNode = new SymbolNode(value, 0, 0, 0, 0, 0, classes);
            }
            if (options) {
              symbolNode.maxFontSize = options.sizeMultiplier;
              if (options.style.isTight()) {
                symbolNode.classes.push("mtight");
              }
              const color = options.getColor();
              if (color) {
                symbolNode.style.color = color;
              }
            }
            return symbolNode;
          };
          const mathsym = function(value, mode, options, classes) {
            if (classes === void 0) {
              classes = [];
            }
            if (options.font === "boldsymbol" && lookupSymbol(value, "Main-Bold", mode).metrics) {
              return makeSymbol(value, "Main-Bold", mode, options, classes.concat(["mathbf"]));
            } else if (value === "\\" || src_symbols[mode][value].font === "main") {
              return makeSymbol(value, "Main-Regular", mode, options, classes);
            } else {
              return makeSymbol(value, "AMS-Regular", mode, options, classes.concat(["amsrm"]));
            }
          };
          const boldsymbol = function(value, mode, options, classes, type) {
            if (type !== "textord" && lookupSymbol(value, "Math-BoldItalic", mode).metrics) {
              return {
                fontName: "Math-BoldItalic",
                fontClass: "boldsymbol"
              };
            } else {
              return {
                fontName: "Main-Bold",
                fontClass: "mathbf"
              };
            }
          };
          const makeOrd = function(group, options, type) {
            const mode = group.mode;
            const text = group.text;
            const classes = ["mord"];
            const isFont = mode === "math" || mode === "text" && options.font;
            const fontOrFamily = isFont ? options.font : options.fontFamily;
            let wideFontName = "";
            let wideFontClass = "";
            if (text.charCodeAt(0) === 55349) {
              [wideFontName, wideFontClass] = wideCharacterFont(text, mode);
            }
            if (wideFontName.length > 0) {
              return makeSymbol(text, wideFontName, mode, options, classes.concat(wideFontClass));
            } else if (fontOrFamily) {
              let fontName;
              let fontClasses;
              if (fontOrFamily === "boldsymbol") {
                const fontData = boldsymbol(text, mode, options, classes, type);
                fontName = fontData.fontName;
                fontClasses = [fontData.fontClass];
              } else if (isFont) {
                fontName = fontMap[fontOrFamily].fontName;
                fontClasses = [fontOrFamily];
              } else {
                fontName = retrieveTextFontName(fontOrFamily, options.fontWeight, options.fontShape);
                fontClasses = [fontOrFamily, options.fontWeight, options.fontShape];
              }
              if (lookupSymbol(text, fontName, mode).metrics) {
                return makeSymbol(text, fontName, mode, options, classes.concat(fontClasses));
              } else if (ligatures.hasOwnProperty(text) && fontName.slice(0, 10) === "Typewriter") {
                const parts = [];
                for (let i = 0; i < text.length; i++) {
                  parts.push(makeSymbol(text[i], fontName, mode, options, classes.concat(fontClasses)));
                }
                return makeFragment(parts);
              }
            }
            if (type === "mathord") {
              return makeSymbol(text, "Math-Italic", mode, options, classes.concat(["mathnormal"]));
            } else if (type === "textord") {
              const font = src_symbols[mode][text] && src_symbols[mode][text].font;
              if (font === "ams") {
                const fontName = retrieveTextFontName("amsrm", options.fontWeight, options.fontShape);
                return makeSymbol(text, fontName, mode, options, classes.concat("amsrm", options.fontWeight, options.fontShape));
              } else if (font === "main" || !font) {
                const fontName = retrieveTextFontName("textrm", options.fontWeight, options.fontShape);
                return makeSymbol(text, fontName, mode, options, classes.concat(options.fontWeight, options.fontShape));
              } else {
                const fontName = retrieveTextFontName(font, options.fontWeight, options.fontShape);
                return makeSymbol(text, fontName, mode, options, classes.concat(fontName, options.fontWeight, options.fontShape));
              }
            } else {
              throw new Error("unexpected type: " + type + " in makeOrd");
            }
          };
          const canCombine = (prev, next) => {
            if (createClass(prev.classes) !== createClass(next.classes) || prev.skew !== next.skew || prev.maxFontSize !== next.maxFontSize) {
              return false;
            }
            if (prev.classes.length === 1) {
              const cls = prev.classes[0];
              if (cls === "mbin" || cls === "mord") {
                return false;
              }
            }
            for (const style in prev.style) {
              if (prev.style.hasOwnProperty(style) && prev.style[style] !== next.style[style]) {
                return false;
              }
            }
            for (const style in next.style) {
              if (next.style.hasOwnProperty(style) && prev.style[style] !== next.style[style]) {
                return false;
              }
            }
            return true;
          };
          const tryCombineChars = (chars) => {
            for (let i = 0; i < chars.length - 1; i++) {
              const prev = chars[i];
              const next = chars[i + 1];
              if (prev instanceof SymbolNode && next instanceof SymbolNode && canCombine(prev, next)) {
                prev.text += next.text;
                prev.height = Math.max(prev.height, next.height);
                prev.depth = Math.max(prev.depth, next.depth);
                prev.italic = next.italic;
                chars.splice(i + 1, 1);
                i--;
              }
            }
            return chars;
          };
          const sizeElementFromChildren = function(elem) {
            let height = 0;
            let depth = 0;
            let maxFontSize = 0;
            for (let i = 0; i < elem.children.length; i++) {
              const child = elem.children[i];
              if (child.height > height) {
                height = child.height;
              }
              if (child.depth > depth) {
                depth = child.depth;
              }
              if (child.maxFontSize > maxFontSize) {
                maxFontSize = child.maxFontSize;
              }
            }
            elem.height = height;
            elem.depth = depth;
            elem.maxFontSize = maxFontSize;
          };
          const makeSpan = function(classes, children, options, style) {
            const span = new Span(classes, children, options, style);
            sizeElementFromChildren(span);
            return span;
          };
          const makeSvgSpan = (classes, children, options, style) => new Span(classes, children, options, style);
          const makeLineSpan = function(className, options, thickness) {
            const line = makeSpan([className], [], options);
            line.height = Math.max(thickness || options.fontMetrics().defaultRuleThickness, options.minRuleThickness);
            line.style.borderBottomWidth = makeEm(line.height);
            line.maxFontSize = 1;
            return line;
          };
          const makeAnchor = function(href, classes, children, options) {
            const anchor = new Anchor(href, classes, children, options);
            sizeElementFromChildren(anchor);
            return anchor;
          };
          const makeFragment = function(children) {
            const fragment = new DocumentFragment(children);
            sizeElementFromChildren(fragment);
            return fragment;
          };
          const wrapFragment = function(group, options) {
            if (group instanceof DocumentFragment) {
              return makeSpan([], [group], options);
            }
            return group;
          };
          const getVListChildrenAndDepth = function(params) {
            if (params.positionType === "individualShift") {
              const oldChildren = params.children;
              const children = [oldChildren[0]];
              const depth2 = -oldChildren[0].shift - oldChildren[0].elem.depth;
              let currPos = depth2;
              for (let i = 1; i < oldChildren.length; i++) {
                const diff = -oldChildren[i].shift - currPos - oldChildren[i].elem.depth;
                const size = diff - (oldChildren[i - 1].elem.height + oldChildren[i - 1].elem.depth);
                currPos = currPos + diff;
                children.push({
                  type: "kern",
                  size
                });
                children.push(oldChildren[i]);
              }
              return {
                children,
                depth: depth2
              };
            }
            let depth;
            if (params.positionType === "top") {
              let bottom = params.positionData;
              for (let i = 0; i < params.children.length; i++) {
                const child = params.children[i];
                bottom -= child.type === "kern" ? child.size : child.elem.height + child.elem.depth;
              }
              depth = bottom;
            } else if (params.positionType === "bottom") {
              depth = -params.positionData;
            } else {
              const firstChild = params.children[0];
              if (firstChild.type !== "elem") {
                throw new Error('First child must have type "elem".');
              }
              if (params.positionType === "shift") {
                depth = -firstChild.elem.depth - params.positionData;
              } else if (params.positionType === "firstBaseline") {
                depth = -firstChild.elem.depth;
              } else {
                throw new Error("Invalid positionType " + params.positionType + ".");
              }
            }
            return {
              children: params.children,
              depth
            };
          };
          const makeVList = function(params, options) {
            const {
              children,
              depth
            } = getVListChildrenAndDepth(params);
            let pstrutSize = 0;
            for (let i = 0; i < children.length; i++) {
              const child = children[i];
              if (child.type === "elem") {
                const elem = child.elem;
                pstrutSize = Math.max(pstrutSize, elem.maxFontSize, elem.height);
              }
            }
            pstrutSize += 2;
            const pstrut = makeSpan(["pstrut"], []);
            pstrut.style.height = makeEm(pstrutSize);
            const realChildren = [];
            let minPos = depth;
            let maxPos = depth;
            let currPos = depth;
            for (let i = 0; i < children.length; i++) {
              const child = children[i];
              if (child.type === "kern") {
                currPos += child.size;
              } else {
                const elem = child.elem;
                const classes = child.wrapperClasses || [];
                const style = child.wrapperStyle || {};
                const childWrap = makeSpan(classes, [pstrut, elem], void 0, style);
                childWrap.style.top = makeEm(-pstrutSize - currPos - elem.depth);
                if (child.marginLeft) {
                  childWrap.style.marginLeft = child.marginLeft;
                }
                if (child.marginRight) {
                  childWrap.style.marginRight = child.marginRight;
                }
                realChildren.push(childWrap);
                currPos += elem.height + elem.depth;
              }
              minPos = Math.min(minPos, currPos);
              maxPos = Math.max(maxPos, currPos);
            }
            const vlist = makeSpan(["vlist"], realChildren);
            vlist.style.height = makeEm(maxPos);
            let rows;
            if (minPos < 0) {
              const emptySpan = makeSpan([], []);
              const depthStrut = makeSpan(["vlist"], [emptySpan]);
              depthStrut.style.height = makeEm(-minPos);
              const topStrut = makeSpan(["vlist-s"], [new SymbolNode("​")]);
              rows = [makeSpan(["vlist-r"], [vlist, topStrut]), makeSpan(["vlist-r"], [depthStrut])];
            } else {
              rows = [makeSpan(["vlist-r"], [vlist])];
            }
            const vtable = makeSpan(["vlist-t"], rows);
            if (rows.length === 2) {
              vtable.classes.push("vlist-t2");
            }
            vtable.height = maxPos;
            vtable.depth = -minPos;
            return vtable;
          };
          const makeGlue = (measurement, options) => {
            const rule = makeSpan(["mspace"], [], options);
            const size = calculateSize(measurement, options);
            rule.style.marginRight = makeEm(size);
            return rule;
          };
          const retrieveTextFontName = function(fontFamily, fontWeight, fontShape) {
            let baseFontName = "";
            switch (fontFamily) {
              case "amsrm":
                baseFontName = "AMS";
                break;
              case "textrm":
                baseFontName = "Main";
                break;
              case "textsf":
                baseFontName = "SansSerif";
                break;
              case "texttt":
                baseFontName = "Typewriter";
                break;
              default:
                baseFontName = fontFamily;
            }
            let fontStylesName;
            if (fontWeight === "textbf" && fontShape === "textit") {
              fontStylesName = "BoldItalic";
            } else if (fontWeight === "textbf") {
              fontStylesName = "Bold";
            } else if (fontWeight === "textit") {
              fontStylesName = "Italic";
            } else {
              fontStylesName = "Regular";
            }
            return baseFontName + "-" + fontStylesName;
          };
          const fontMap = {
            // styles
            "mathbf": {
              variant: "bold",
              fontName: "Main-Bold"
            },
            "mathrm": {
              variant: "normal",
              fontName: "Main-Regular"
            },
            "textit": {
              variant: "italic",
              fontName: "Main-Italic"
            },
            "mathit": {
              variant: "italic",
              fontName: "Main-Italic"
            },
            "mathnormal": {
              variant: "italic",
              fontName: "Math-Italic"
            },
            "mathsfit": {
              variant: "sans-serif-italic",
              fontName: "SansSerif-Italic"
            },
            // "boldsymbol" is missing because they require the use of multiple fonts:
            // Math-BoldItalic and Main-Bold.  This is handled by a special case in
            // makeOrd which ends up calling boldsymbol.
            // families
            "mathbb": {
              variant: "double-struck",
              fontName: "AMS-Regular"
            },
            "mathcal": {
              variant: "script",
              fontName: "Caligraphic-Regular"
            },
            "mathfrak": {
              variant: "fraktur",
              fontName: "Fraktur-Regular"
            },
            "mathscr": {
              variant: "script",
              fontName: "Script-Regular"
            },
            "mathsf": {
              variant: "sans-serif",
              fontName: "SansSerif-Regular"
            },
            "mathtt": {
              variant: "monospace",
              fontName: "Typewriter-Regular"
            }
          };
          const svgData = {
            //   path, width, height
            vec: ["vec", 0.471, 0.714],
            // values from the font glyph
            oiintSize1: ["oiintSize1", 0.957, 0.499],
            // oval to overlay the integrand
            oiintSize2: ["oiintSize2", 1.472, 0.659],
            oiiintSize1: ["oiiintSize1", 1.304, 0.499],
            oiiintSize2: ["oiiintSize2", 1.98, 0.659]
          };
          const staticSvg = function(value, options) {
            const [pathName, width, height] = svgData[value];
            const path2 = new PathNode(pathName);
            const svgNode = new SvgNode([path2], {
              "width": makeEm(width),
              "height": makeEm(height),
              // Override CSS rule `.katex svg { width: 100% }`
              "style": "width:" + makeEm(width),
              "viewBox": "0 0 " + 1e3 * width + " " + 1e3 * height,
              "preserveAspectRatio": "xMinYMin"
            });
            const span = makeSvgSpan(["overlay"], [svgNode], options);
            span.height = height;
            span.style.height = makeEm(height);
            span.style.width = makeEm(width);
            return span;
          };
          var buildCommon = {
            fontMap,
            makeSymbol,
            mathsym,
            makeSpan,
            makeSvgSpan,
            makeLineSpan,
            makeAnchor,
            makeFragment,
            wrapFragment,
            makeVList,
            makeOrd,
            makeGlue,
            staticSvg,
            svgData,
            tryCombineChars
          };
          ;
          const thinspace = {
            number: 3,
            unit: "mu"
          };
          const mediumspace = {
            number: 4,
            unit: "mu"
          };
          const thickspace = {
            number: 5,
            unit: "mu"
          };
          const spacings = {
            mord: {
              mop: thinspace,
              mbin: mediumspace,
              mrel: thickspace,
              minner: thinspace
            },
            mop: {
              mord: thinspace,
              mop: thinspace,
              mrel: thickspace,
              minner: thinspace
            },
            mbin: {
              mord: mediumspace,
              mop: mediumspace,
              mopen: mediumspace,
              minner: mediumspace
            },
            mrel: {
              mord: thickspace,
              mop: thickspace,
              mopen: thickspace,
              minner: thickspace
            },
            mopen: {},
            mclose: {
              mop: thinspace,
              mbin: mediumspace,
              mrel: thickspace,
              minner: thinspace
            },
            mpunct: {
              mord: thinspace,
              mop: thinspace,
              mrel: thickspace,
              mopen: thinspace,
              mclose: thinspace,
              mpunct: thinspace,
              minner: thinspace
            },
            minner: {
              mord: thinspace,
              mop: thinspace,
              mbin: mediumspace,
              mrel: thickspace,
              mopen: thinspace,
              mpunct: thinspace,
              minner: thinspace
            }
          };
          const tightSpacings = {
            mord: {
              mop: thinspace
            },
            mop: {
              mord: thinspace,
              mop: thinspace
            },
            mbin: {},
            mrel: {},
            mopen: {},
            mclose: {
              mop: thinspace
            },
            mpunct: {},
            minner: {
              mop: thinspace
            }
          };
          ;
          const _functions = {};
          const _htmlGroupBuilders = {};
          const _mathmlGroupBuilders = {};
          function defineFunction(_ref) {
            let {
              type,
              names,
              props,
              handler,
              htmlBuilder: htmlBuilder2,
              mathmlBuilder: mathmlBuilder2
            } = _ref;
            const data = {
              type,
              numArgs: props.numArgs,
              argTypes: props.argTypes,
              allowedInArgument: !!props.allowedInArgument,
              allowedInText: !!props.allowedInText,
              allowedInMath: props.allowedInMath === void 0 ? true : props.allowedInMath,
              numOptionalArgs: props.numOptionalArgs || 0,
              infix: !!props.infix,
              primitive: !!props.primitive,
              handler
            };
            for (let i = 0; i < names.length; ++i) {
              _functions[names[i]] = data;
            }
            if (type) {
              if (htmlBuilder2) {
                _htmlGroupBuilders[type] = htmlBuilder2;
              }
              if (mathmlBuilder2) {
                _mathmlGroupBuilders[type] = mathmlBuilder2;
              }
            }
          }
          function defineFunctionBuilders(_ref2) {
            let {
              type,
              htmlBuilder: htmlBuilder2,
              mathmlBuilder: mathmlBuilder2
            } = _ref2;
            defineFunction({
              type,
              names: [],
              props: {
                numArgs: 0
              },
              handler() {
                throw new Error("Should never be called.");
              },
              htmlBuilder: htmlBuilder2,
              mathmlBuilder: mathmlBuilder2
            });
          }
          const normalizeArgument = function(arg) {
            return arg.type === "ordgroup" && arg.body.length === 1 ? arg.body[0] : arg;
          };
          const ordargument = function(arg) {
            return arg.type === "ordgroup" ? arg.body : [arg];
          };
          ;
          const buildHTML_makeSpan = buildCommon.makeSpan;
          const binLeftCanceller = ["leftmost", "mbin", "mopen", "mrel", "mop", "mpunct"];
          const binRightCanceller = ["rightmost", "mrel", "mclose", "mpunct"];
          const styleMap = {
            "display": src_Style.DISPLAY,
            "text": src_Style.TEXT,
            "script": src_Style.SCRIPT,
            "scriptscript": src_Style.SCRIPTSCRIPT
          };
          const DomEnum = {
            mord: "mord",
            mop: "mop",
            mbin: "mbin",
            mrel: "mrel",
            mopen: "mopen",
            mclose: "mclose",
            mpunct: "mpunct",
            minner: "minner"
          };
          const buildExpression = function(expression, options, isRealGroup, surrounding) {
            if (surrounding === void 0) {
              surrounding = [null, null];
            }
            const groups = [];
            for (let i = 0; i < expression.length; i++) {
              const output = buildGroup(expression[i], options);
              if (output instanceof DocumentFragment) {
                const children = output.children;
                groups.push(...children);
              } else {
                groups.push(output);
              }
            }
            buildCommon.tryCombineChars(groups);
            if (!isRealGroup) {
              return groups;
            }
            let glueOptions = options;
            if (expression.length === 1) {
              const node = expression[0];
              if (node.type === "sizing") {
                glueOptions = options.havingSize(node.size);
              } else if (node.type === "styling") {
                glueOptions = options.havingStyle(styleMap[node.style]);
              }
            }
            const dummyPrev = buildHTML_makeSpan([surrounding[0] || "leftmost"], [], options);
            const dummyNext = buildHTML_makeSpan([surrounding[1] || "rightmost"], [], options);
            const isRoot = isRealGroup === "root";
            traverseNonSpaceNodes(groups, (node, prev) => {
              const prevType = prev.classes[0];
              const type = node.classes[0];
              if (prevType === "mbin" && utils.contains(binRightCanceller, type)) {
                prev.classes[0] = "mord";
              } else if (type === "mbin" && utils.contains(binLeftCanceller, prevType)) {
                node.classes[0] = "mord";
              }
            }, {
              node: dummyPrev
            }, dummyNext, isRoot);
            traverseNonSpaceNodes(groups, (node, prev) => {
              const prevType = getTypeOfDomTree(prev);
              const type = getTypeOfDomTree(node);
              const space = prevType && type ? node.hasClass("mtight") ? tightSpacings[prevType][type] : spacings[prevType][type] : null;
              if (space) {
                return buildCommon.makeGlue(space, glueOptions);
              }
            }, {
              node: dummyPrev
            }, dummyNext, isRoot);
            return groups;
          };
          const traverseNonSpaceNodes = function(nodes, callback, prev, next, isRoot) {
            if (next) {
              nodes.push(next);
            }
            let i = 0;
            for (; i < nodes.length; i++) {
              const node = nodes[i];
              const partialGroup = checkPartialGroup(node);
              if (partialGroup) {
                traverseNonSpaceNodes(partialGroup.children, callback, prev, null, isRoot);
                continue;
              }
              const nonspace = !node.hasClass("mspace");
              if (nonspace) {
                const result = callback(node, prev.node);
                if (result) {
                  if (prev.insertAfter) {
                    prev.insertAfter(result);
                  } else {
                    nodes.unshift(result);
                    i++;
                  }
                }
              }
              if (nonspace) {
                prev.node = node;
              } else if (isRoot && node.hasClass("newline")) {
                prev.node = buildHTML_makeSpan(["leftmost"]);
              }
              prev.insertAfter = /* @__PURE__ */ ((index) => (n) => {
                nodes.splice(index + 1, 0, n);
                i++;
              })(i);
            }
            if (next) {
              nodes.pop();
            }
          };
          const checkPartialGroup = function(node) {
            if (node instanceof DocumentFragment || node instanceof Anchor || node instanceof Span && node.hasClass("enclosing")) {
              return node;
            }
            return null;
          };
          const getOutermostNode = function(node, side) {
            const partialGroup = checkPartialGroup(node);
            if (partialGroup) {
              const children = partialGroup.children;
              if (children.length) {
                if (side === "right") {
                  return getOutermostNode(children[children.length - 1], "right");
                } else if (side === "left") {
                  return getOutermostNode(children[0], "left");
                }
              }
            }
            return node;
          };
          const getTypeOfDomTree = function(node, side) {
            if (!node) {
              return null;
            }
            if (side) {
              node = getOutermostNode(node, side);
            }
            return DomEnum[node.classes[0]] || null;
          };
          const makeNullDelimiter = function(options, classes) {
            const moreClasses = ["nulldelimiter"].concat(options.baseSizingClasses());
            return buildHTML_makeSpan(classes.concat(moreClasses));
          };
          const buildGroup = function(group, options, baseOptions) {
            if (!group) {
              return buildHTML_makeSpan();
            }
            if (_htmlGroupBuilders[group.type]) {
              let groupNode = _htmlGroupBuilders[group.type](group, options);
              if (baseOptions && options.size !== baseOptions.size) {
                groupNode = buildHTML_makeSpan(options.sizingClasses(baseOptions), [groupNode], options);
                const multiplier = options.sizeMultiplier / baseOptions.sizeMultiplier;
                groupNode.height *= multiplier;
                groupNode.depth *= multiplier;
              }
              return groupNode;
            } else {
              throw new src_ParseError("Got group of unknown type: '" + group.type + "'");
            }
          };
          function buildHTMLUnbreakable(children, options) {
            const body = buildHTML_makeSpan(["base"], children, options);
            const strut = buildHTML_makeSpan(["strut"]);
            strut.style.height = makeEm(body.height + body.depth);
            if (body.depth) {
              strut.style.verticalAlign = makeEm(-body.depth);
            }
            body.children.unshift(strut);
            return body;
          }
          function buildHTML(tree, options) {
            let tag = null;
            if (tree.length === 1 && tree[0].type === "tag") {
              tag = tree[0].tag;
              tree = tree[0].body;
            }
            const expression = buildExpression(tree, options, "root");
            let eqnNum;
            if (expression.length === 2 && expression[1].hasClass("tag")) {
              eqnNum = expression.pop();
            }
            const children = [];
            let parts = [];
            for (let i = 0; i < expression.length; i++) {
              parts.push(expression[i]);
              if (expression[i].hasClass("mbin") || expression[i].hasClass("mrel") || expression[i].hasClass("allowbreak")) {
                let nobreak = false;
                while (i < expression.length - 1 && expression[i + 1].hasClass("mspace") && !expression[i + 1].hasClass("newline")) {
                  i++;
                  parts.push(expression[i]);
                  if (expression[i].hasClass("nobreak")) {
                    nobreak = true;
                  }
                }
                if (!nobreak) {
                  children.push(buildHTMLUnbreakable(parts, options));
                  parts = [];
                }
              } else if (expression[i].hasClass("newline")) {
                parts.pop();
                if (parts.length > 0) {
                  children.push(buildHTMLUnbreakable(parts, options));
                  parts = [];
                }
                children.push(expression[i]);
              }
            }
            if (parts.length > 0) {
              children.push(buildHTMLUnbreakable(parts, options));
            }
            let tagChild;
            if (tag) {
              tagChild = buildHTMLUnbreakable(buildExpression(tag, options, true));
              tagChild.classes = ["tag"];
              children.push(tagChild);
            } else if (eqnNum) {
              children.push(eqnNum);
            }
            const htmlNode = buildHTML_makeSpan(["katex-html"], children);
            htmlNode.setAttribute("aria-hidden", "true");
            if (tagChild) {
              const strut = tagChild.children[0];
              strut.style.height = makeEm(htmlNode.height + htmlNode.depth);
              if (htmlNode.depth) {
                strut.style.verticalAlign = makeEm(-htmlNode.depth);
              }
            }
            return htmlNode;
          }
          ;
          function newDocumentFragment(children) {
            return new DocumentFragment(children);
          }
          class MathNode {
            constructor(type, children, classes) {
              this.type = void 0;
              this.attributes = void 0;
              this.children = void 0;
              this.classes = void 0;
              this.type = type;
              this.attributes = {};
              this.children = children || [];
              this.classes = classes || [];
            }
            /**
             * Sets an attribute on a MathML node. MathML depends on attributes to convey a
             * semantic content, so this is used heavily.
             */
            setAttribute(name, value) {
              this.attributes[name] = value;
            }
            /**
             * Gets an attribute on a MathML node.
             */
            getAttribute(name) {
              return this.attributes[name];
            }
            /**
             * Converts the math node into a MathML-namespaced DOM element.
             */
            toNode() {
              const node = document.createElementNS("http://www.w3.org/1998/Math/MathML", this.type);
              for (const attr in this.attributes) {
                if (Object.prototype.hasOwnProperty.call(this.attributes, attr)) {
                  node.setAttribute(attr, this.attributes[attr]);
                }
              }
              if (this.classes.length > 0) {
                node.className = createClass(this.classes);
              }
              for (let i = 0; i < this.children.length; i++) {
                if (this.children[i] instanceof TextNode && this.children[i + 1] instanceof TextNode) {
                  let text = this.children[i].toText() + this.children[++i].toText();
                  while (this.children[i + 1] instanceof TextNode) {
                    text += this.children[++i].toText();
                  }
                  node.appendChild(new TextNode(text).toNode());
                } else {
                  node.appendChild(this.children[i].toNode());
                }
              }
              return node;
            }
            /**
             * Converts the math node into an HTML markup string.
             */
            toMarkup() {
              let markup = "<" + this.type;
              for (const attr in this.attributes) {
                if (Object.prototype.hasOwnProperty.call(this.attributes, attr)) {
                  markup += " " + attr + '="';
                  markup += utils.escape(this.attributes[attr]);
                  markup += '"';
                }
              }
              if (this.classes.length > 0) {
                markup += ' class ="' + utils.escape(createClass(this.classes)) + '"';
              }
              markup += ">";
              for (let i = 0; i < this.children.length; i++) {
                markup += this.children[i].toMarkup();
              }
              markup += "</" + this.type + ">";
              return markup;
            }
            /**
             * Converts the math node into a string, similar to innerText, but escaped.
             */
            toText() {
              return this.children.map((child) => child.toText()).join("");
            }
          }
          class TextNode {
            constructor(text) {
              this.text = void 0;
              this.text = text;
            }
            /**
             * Converts the text node into a DOM text node.
             */
            toNode() {
              return document.createTextNode(this.text);
            }
            /**
             * Converts the text node into escaped HTML markup
             * (representing the text itself).
             */
            toMarkup() {
              return utils.escape(this.toText());
            }
            /**
             * Converts the text node into a string
             * (representing the text itself).
             */
            toText() {
              return this.text;
            }
          }
          class SpaceNode {
            /**
             * Create a Space node with width given in CSS ems.
             */
            constructor(width) {
              this.width = void 0;
              this.character = void 0;
              this.width = width;
              if (width >= 0.05555 && width <= 0.05556) {
                this.character = " ";
              } else if (width >= 0.1666 && width <= 0.1667) {
                this.character = " ";
              } else if (width >= 0.2222 && width <= 0.2223) {
                this.character = " ";
              } else if (width >= 0.2777 && width <= 0.2778) {
                this.character = "  ";
              } else if (width >= -0.05556 && width <= -0.05555) {
                this.character = " ⁣";
              } else if (width >= -0.1667 && width <= -0.1666) {
                this.character = " ⁣";
              } else if (width >= -0.2223 && width <= -0.2222) {
                this.character = " ⁣";
              } else if (width >= -0.2778 && width <= -0.2777) {
                this.character = " ⁣";
              } else {
                this.character = null;
              }
            }
            /**
             * Converts the math node into a MathML-namespaced DOM element.
             */
            toNode() {
              if (this.character) {
                return document.createTextNode(this.character);
              } else {
                const node = document.createElementNS("http://www.w3.org/1998/Math/MathML", "mspace");
                node.setAttribute("width", makeEm(this.width));
                return node;
              }
            }
            /**
             * Converts the math node into an HTML markup string.
             */
            toMarkup() {
              if (this.character) {
                return "<mtext>" + this.character + "</mtext>";
              } else {
                return '<mspace width="' + makeEm(this.width) + '"/>';
              }
            }
            /**
             * Converts the math node into a string, similar to innerText.
             */
            toText() {
              if (this.character) {
                return this.character;
              } else {
                return " ";
              }
            }
          }
          var mathMLTree = {
            MathNode,
            TextNode,
            SpaceNode,
            newDocumentFragment
          };
          ;
          const makeText = function(text, mode, options) {
            if (src_symbols[mode][text] && src_symbols[mode][text].replace && text.charCodeAt(0) !== 55349 && !(ligatures.hasOwnProperty(text) && options && (options.fontFamily && options.fontFamily.slice(4, 6) === "tt" || options.font && options.font.slice(4, 6) === "tt"))) {
              text = src_symbols[mode][text].replace;
            }
            return new mathMLTree.TextNode(text);
          };
          const makeRow = function(body) {
            if (body.length === 1) {
              return body[0];
            } else {
              return new mathMLTree.MathNode("mrow", body);
            }
          };
          const getVariant = function(group, options) {
            if (options.fontFamily === "texttt") {
              return "monospace";
            } else if (options.fontFamily === "textsf") {
              if (options.fontShape === "textit" && options.fontWeight === "textbf") {
                return "sans-serif-bold-italic";
              } else if (options.fontShape === "textit") {
                return "sans-serif-italic";
              } else if (options.fontWeight === "textbf") {
                return "bold-sans-serif";
              } else {
                return "sans-serif";
              }
            } else if (options.fontShape === "textit" && options.fontWeight === "textbf") {
              return "bold-italic";
            } else if (options.fontShape === "textit") {
              return "italic";
            } else if (options.fontWeight === "textbf") {
              return "bold";
            }
            const font = options.font;
            if (!font || font === "mathnormal") {
              return null;
            }
            const mode = group.mode;
            if (font === "mathit") {
              return "italic";
            } else if (font === "boldsymbol") {
              return group.type === "textord" ? "bold" : "bold-italic";
            } else if (font === "mathbf") {
              return "bold";
            } else if (font === "mathbb") {
              return "double-struck";
            } else if (font === "mathsfit") {
              return "sans-serif-italic";
            } else if (font === "mathfrak") {
              return "fraktur";
            } else if (font === "mathscr" || font === "mathcal") {
              return "script";
            } else if (font === "mathsf") {
              return "sans-serif";
            } else if (font === "mathtt") {
              return "monospace";
            }
            let text = group.text;
            if (utils.contains(["\\imath", "\\jmath"], text)) {
              return null;
            }
            if (src_symbols[mode][text] && src_symbols[mode][text].replace) {
              text = src_symbols[mode][text].replace;
            }
            const fontName = buildCommon.fontMap[font].fontName;
            if (getCharacterMetrics(text, fontName, mode)) {
              return buildCommon.fontMap[font].variant;
            }
            return null;
          };
          function isNumberPunctuation(group) {
            if (!group) {
              return false;
            }
            if (group.type === "mi" && group.children.length === 1) {
              const child = group.children[0];
              return child instanceof TextNode && child.text === ".";
            } else if (group.type === "mo" && group.children.length === 1 && group.getAttribute("separator") === "true" && group.getAttribute("lspace") === "0em" && group.getAttribute("rspace") === "0em") {
              const child = group.children[0];
              return child instanceof TextNode && child.text === ",";
            } else {
              return false;
            }
          }
          const buildMathML_buildExpression = function(expression, options, isOrdgroup) {
            if (expression.length === 1) {
              const group = buildMathML_buildGroup(expression[0], options);
              if (isOrdgroup && group instanceof MathNode && group.type === "mo") {
                group.setAttribute("lspace", "0em");
                group.setAttribute("rspace", "0em");
              }
              return [group];
            }
            const groups = [];
            let lastGroup;
            for (let i = 0; i < expression.length; i++) {
              const group = buildMathML_buildGroup(expression[i], options);
              if (group instanceof MathNode && lastGroup instanceof MathNode) {
                if (group.type === "mtext" && lastGroup.type === "mtext" && group.getAttribute("mathvariant") === lastGroup.getAttribute("mathvariant")) {
                  lastGroup.children.push(...group.children);
                  continue;
                } else if (group.type === "mn" && lastGroup.type === "mn") {
                  lastGroup.children.push(...group.children);
                  continue;
                } else if (isNumberPunctuation(group) && lastGroup.type === "mn") {
                  lastGroup.children.push(...group.children);
                  continue;
                } else if (group.type === "mn" && isNumberPunctuation(lastGroup)) {
                  group.children = [...lastGroup.children, ...group.children];
                  groups.pop();
                } else if ((group.type === "msup" || group.type === "msub") && group.children.length >= 1 && (lastGroup.type === "mn" || isNumberPunctuation(lastGroup))) {
                  const base = group.children[0];
                  if (base instanceof MathNode && base.type === "mn") {
                    base.children = [...lastGroup.children, ...base.children];
                    groups.pop();
                  }
                } else if (lastGroup.type === "mi" && lastGroup.children.length === 1) {
                  const lastChild = lastGroup.children[0];
                  if (lastChild instanceof TextNode && lastChild.text === "̸" && (group.type === "mo" || group.type === "mi" || group.type === "mn")) {
                    const child = group.children[0];
                    if (child instanceof TextNode && child.text.length > 0) {
                      child.text = child.text.slice(0, 1) + "̸" + child.text.slice(1);
                      groups.pop();
                    }
                  }
                }
              }
              groups.push(group);
              lastGroup = group;
            }
            return groups;
          };
          const buildExpressionRow = function(expression, options, isOrdgroup) {
            return makeRow(buildMathML_buildExpression(expression, options, isOrdgroup));
          };
          const buildMathML_buildGroup = function(group, options) {
            if (!group) {
              return new mathMLTree.MathNode("mrow");
            }
            if (_mathmlGroupBuilders[group.type]) {
              const result = _mathmlGroupBuilders[group.type](group, options);
              return result;
            } else {
              throw new src_ParseError("Got group of unknown type: '" + group.type + "'");
            }
          };
          function buildMathML(tree, texExpression, options, isDisplayMode, forMathmlOnly) {
            const expression = buildMathML_buildExpression(tree, options);
            let wrapper;
            if (expression.length === 1 && expression[0] instanceof MathNode && utils.contains(["mrow", "mtable"], expression[0].type)) {
              wrapper = expression[0];
            } else {
              wrapper = new mathMLTree.MathNode("mrow", expression);
            }
            const annotation = new mathMLTree.MathNode("annotation", [new mathMLTree.TextNode(texExpression)]);
            annotation.setAttribute("encoding", "application/x-tex");
            const semantics = new mathMLTree.MathNode("semantics", [wrapper, annotation]);
            const math2 = new mathMLTree.MathNode("math", [semantics]);
            math2.setAttribute("xmlns", "http://www.w3.org/1998/Math/MathML");
            if (isDisplayMode) {
              math2.setAttribute("display", "block");
            }
            const wrapperClass = forMathmlOnly ? "katex" : "katex-mathml";
            return buildCommon.makeSpan([wrapperClass], [math2]);
          }
          ;
          const optionsFromSettings = function(settings) {
            return new src_Options({
              style: settings.displayMode ? src_Style.DISPLAY : src_Style.TEXT,
              maxSize: settings.maxSize,
              minRuleThickness: settings.minRuleThickness
            });
          };
          const displayWrap = function(node, settings) {
            if (settings.displayMode) {
              const classes = ["katex-display"];
              if (settings.leqno) {
                classes.push("leqno");
              }
              if (settings.fleqn) {
                classes.push("fleqn");
              }
              node = buildCommon.makeSpan(classes, [node]);
            }
            return node;
          };
          const buildTree = function(tree, expression, settings) {
            const options = optionsFromSettings(settings);
            let katexNode;
            if (settings.output === "mathml") {
              return buildMathML(tree, expression, options, settings.displayMode, true);
            } else if (settings.output === "html") {
              const htmlNode = buildHTML(tree, options);
              katexNode = buildCommon.makeSpan(["katex"], [htmlNode]);
            } else {
              const mathMLNode = buildMathML(tree, expression, options, settings.displayMode, false);
              const htmlNode = buildHTML(tree, options);
              katexNode = buildCommon.makeSpan(["katex"], [mathMLNode, htmlNode]);
            }
            return displayWrap(katexNode, settings);
          };
          const buildHTMLTree = function(tree, expression, settings) {
            const options = optionsFromSettings(settings);
            const htmlNode = buildHTML(tree, options);
            const katexNode = buildCommon.makeSpan(["katex"], [htmlNode]);
            return displayWrap(katexNode, settings);
          };
          var src_buildTree = (
            /* unused pure expression or super */
            null
          );
          ;
          const stretchyCodePoint = {
            widehat: "^",
            widecheck: "ˇ",
            widetilde: "~",
            utilde: "~",
            overleftarrow: "←",
            underleftarrow: "←",
            xleftarrow: "←",
            overrightarrow: "→",
            underrightarrow: "→",
            xrightarrow: "→",
            underbrace: "⏟",
            overbrace: "⏞",
            overgroup: "⏠",
            undergroup: "⏡",
            overleftrightarrow: "↔",
            underleftrightarrow: "↔",
            xleftrightarrow: "↔",
            Overrightarrow: "⇒",
            xRightarrow: "⇒",
            overleftharpoon: "↼",
            xleftharpoonup: "↼",
            overrightharpoon: "⇀",
            xrightharpoonup: "⇀",
            xLeftarrow: "⇐",
            xLeftrightarrow: "⇔",
            xhookleftarrow: "↩",
            xhookrightarrow: "↪",
            xmapsto: "↦",
            xrightharpoondown: "⇁",
            xleftharpoondown: "↽",
            xrightleftharpoons: "⇌",
            xleftrightharpoons: "⇋",
            xtwoheadleftarrow: "↞",
            xtwoheadrightarrow: "↠",
            xlongequal: "=",
            xtofrom: "⇄",
            xrightleftarrows: "⇄",
            xrightequilibrium: "⇌",
            // Not a perfect match.
            xleftequilibrium: "⇋",
            // None better available.
            "\\cdrightarrow": "→",
            "\\cdleftarrow": "←",
            "\\cdlongequal": "="
          };
          const mathMLnode = function(label) {
            const node = new mathMLTree.MathNode("mo", [new mathMLTree.TextNode(stretchyCodePoint[label.replace(/^\\/, "")])]);
            node.setAttribute("stretchy", "true");
            return node;
          };
          const katexImagesData = {
            //   path(s), minWidth, height, align
            overrightarrow: [["rightarrow"], 0.888, 522, "xMaxYMin"],
            overleftarrow: [["leftarrow"], 0.888, 522, "xMinYMin"],
            underrightarrow: [["rightarrow"], 0.888, 522, "xMaxYMin"],
            underleftarrow: [["leftarrow"], 0.888, 522, "xMinYMin"],
            xrightarrow: [["rightarrow"], 1.469, 522, "xMaxYMin"],
            "\\cdrightarrow": [["rightarrow"], 3, 522, "xMaxYMin"],
            // CD minwwidth2.5pc
            xleftarrow: [["leftarrow"], 1.469, 522, "xMinYMin"],
            "\\cdleftarrow": [["leftarrow"], 3, 522, "xMinYMin"],
            Overrightarrow: [["doublerightarrow"], 0.888, 560, "xMaxYMin"],
            xRightarrow: [["doublerightarrow"], 1.526, 560, "xMaxYMin"],
            xLeftarrow: [["doubleleftarrow"], 1.526, 560, "xMinYMin"],
            overleftharpoon: [["leftharpoon"], 0.888, 522, "xMinYMin"],
            xleftharpoonup: [["leftharpoon"], 0.888, 522, "xMinYMin"],
            xleftharpoondown: [["leftharpoondown"], 0.888, 522, "xMinYMin"],
            overrightharpoon: [["rightharpoon"], 0.888, 522, "xMaxYMin"],
            xrightharpoonup: [["rightharpoon"], 0.888, 522, "xMaxYMin"],
            xrightharpoondown: [["rightharpoondown"], 0.888, 522, "xMaxYMin"],
            xlongequal: [["longequal"], 0.888, 334, "xMinYMin"],
            "\\cdlongequal": [["longequal"], 3, 334, "xMinYMin"],
            xtwoheadleftarrow: [["twoheadleftarrow"], 0.888, 334, "xMinYMin"],
            xtwoheadrightarrow: [["twoheadrightarrow"], 0.888, 334, "xMaxYMin"],
            overleftrightarrow: [["leftarrow", "rightarrow"], 0.888, 522],
            overbrace: [["leftbrace", "midbrace", "rightbrace"], 1.6, 548],
            underbrace: [["leftbraceunder", "midbraceunder", "rightbraceunder"], 1.6, 548],
            underleftrightarrow: [["leftarrow", "rightarrow"], 0.888, 522],
            xleftrightarrow: [["leftarrow", "rightarrow"], 1.75, 522],
            xLeftrightarrow: [["doubleleftarrow", "doublerightarrow"], 1.75, 560],
            xrightleftharpoons: [["leftharpoondownplus", "rightharpoonplus"], 1.75, 716],
            xleftrightharpoons: [["leftharpoonplus", "rightharpoondownplus"], 1.75, 716],
            xhookleftarrow: [["leftarrow", "righthook"], 1.08, 522],
            xhookrightarrow: [["lefthook", "rightarrow"], 1.08, 522],
            overlinesegment: [["leftlinesegment", "rightlinesegment"], 0.888, 522],
            underlinesegment: [["leftlinesegment", "rightlinesegment"], 0.888, 522],
            overgroup: [["leftgroup", "rightgroup"], 0.888, 342],
            undergroup: [["leftgroupunder", "rightgroupunder"], 0.888, 342],
            xmapsto: [["leftmapsto", "rightarrow"], 1.5, 522],
            xtofrom: [["leftToFrom", "rightToFrom"], 1.75, 528],
            // The next three arrows are from the mhchem package.
            // In mhchem.sty, min-length is 2.0em. But these arrows might appear in the
            // document as \xrightarrow or \xrightleftharpoons. Those have
            // min-length = 1.75em, so we set min-length on these next three to match.
            xrightleftarrows: [["baraboveleftarrow", "rightarrowabovebar"], 1.75, 901],
            xrightequilibrium: [["baraboveshortleftharpoon", "rightharpoonaboveshortbar"], 1.75, 716],
            xleftequilibrium: [["shortbaraboveleftharpoon", "shortrightharpoonabovebar"], 1.75, 716]
          };
          const groupLength = function(arg) {
            if (arg.type === "ordgroup") {
              return arg.body.length;
            } else {
              return 1;
            }
          };
          const svgSpan = function(group, options) {
            function buildSvgSpan_() {
              let viewBoxWidth = 4e5;
              const label = group.label.slice(1);
              if (utils.contains(["widehat", "widecheck", "widetilde", "utilde"], label)) {
                const grp = group;
                const numChars = groupLength(grp.base);
                let viewBoxHeight;
                let pathName;
                let height2;
                if (numChars > 5) {
                  if (label === "widehat" || label === "widecheck") {
                    viewBoxHeight = 420;
                    viewBoxWidth = 2364;
                    height2 = 0.42;
                    pathName = label + "4";
                  } else {
                    viewBoxHeight = 312;
                    viewBoxWidth = 2340;
                    height2 = 0.34;
                    pathName = "tilde4";
                  }
                } else {
                  const imgIndex = [1, 1, 2, 2, 3, 3][numChars];
                  if (label === "widehat" || label === "widecheck") {
                    viewBoxWidth = [0, 1062, 2364, 2364, 2364][imgIndex];
                    viewBoxHeight = [0, 239, 300, 360, 420][imgIndex];
                    height2 = [0, 0.24, 0.3, 0.3, 0.36, 0.42][imgIndex];
                    pathName = label + imgIndex;
                  } else {
                    viewBoxWidth = [0, 600, 1033, 2339, 2340][imgIndex];
                    viewBoxHeight = [0, 260, 286, 306, 312][imgIndex];
                    height2 = [0, 0.26, 0.286, 0.3, 0.306, 0.34][imgIndex];
                    pathName = "tilde" + imgIndex;
                  }
                }
                const path2 = new PathNode(pathName);
                const svgNode = new SvgNode([path2], {
                  "width": "100%",
                  "height": makeEm(height2),
                  "viewBox": "0 0 " + viewBoxWidth + " " + viewBoxHeight,
                  "preserveAspectRatio": "none"
                });
                return {
                  span: buildCommon.makeSvgSpan([], [svgNode], options),
                  minWidth: 0,
                  height: height2
                };
              } else {
                const spans = [];
                const data = katexImagesData[label];
                const [paths, minWidth2, viewBoxHeight] = data;
                const height2 = viewBoxHeight / 1e3;
                const numSvgChildren = paths.length;
                let widthClasses;
                let aligns;
                if (numSvgChildren === 1) {
                  const align1 = data[3];
                  widthClasses = ["hide-tail"];
                  aligns = [align1];
                } else if (numSvgChildren === 2) {
                  widthClasses = ["halfarrow-left", "halfarrow-right"];
                  aligns = ["xMinYMin", "xMaxYMin"];
                } else if (numSvgChildren === 3) {
                  widthClasses = ["brace-left", "brace-center", "brace-right"];
                  aligns = ["xMinYMin", "xMidYMin", "xMaxYMin"];
                } else {
                  throw new Error("Correct katexImagesData or update code here to support\n                    " + numSvgChildren + " children.");
                }
                for (let i = 0; i < numSvgChildren; i++) {
                  const path2 = new PathNode(paths[i]);
                  const svgNode = new SvgNode([path2], {
                    "width": "400em",
                    "height": makeEm(height2),
                    "viewBox": "0 0 " + viewBoxWidth + " " + viewBoxHeight,
                    "preserveAspectRatio": aligns[i] + " slice"
                  });
                  const span2 = buildCommon.makeSvgSpan([widthClasses[i]], [svgNode], options);
                  if (numSvgChildren === 1) {
                    return {
                      span: span2,
                      minWidth: minWidth2,
                      height: height2
                    };
                  } else {
                    span2.style.height = makeEm(height2);
                    spans.push(span2);
                  }
                }
                return {
                  span: buildCommon.makeSpan(["stretchy"], spans, options),
                  minWidth: minWidth2,
                  height: height2
                };
              }
            }
            const {
              span,
              minWidth,
              height
            } = buildSvgSpan_();
            span.height = height;
            span.style.height = makeEm(height);
            if (minWidth > 0) {
              span.style.minWidth = makeEm(minWidth);
            }
            return span;
          };
          const encloseSpan = function(inner2, label, topPad, bottomPad, options) {
            let img;
            const totalHeight = inner2.height + inner2.depth + topPad + bottomPad;
            if (/fbox|color|angl/.test(label)) {
              img = buildCommon.makeSpan(["stretchy", label], [], options);
              if (label === "fbox") {
                const color = options.color && options.getColor();
                if (color) {
                  img.style.borderColor = color;
                }
              }
            } else {
              const lines = [];
              if (/^[bx]cancel$/.test(label)) {
                lines.push(new LineNode({
                  "x1": "0",
                  "y1": "0",
                  "x2": "100%",
                  "y2": "100%",
                  "stroke-width": "0.046em"
                }));
              }
              if (/^x?cancel$/.test(label)) {
                lines.push(new LineNode({
                  "x1": "0",
                  "y1": "100%",
                  "x2": "100%",
                  "y2": "0",
                  "stroke-width": "0.046em"
                }));
              }
              const svgNode = new SvgNode(lines, {
                "width": "100%",
                "height": makeEm(totalHeight)
              });
              img = buildCommon.makeSvgSpan([], [svgNode], options);
            }
            img.height = totalHeight;
            img.style.height = makeEm(totalHeight);
            return img;
          };
          var stretchy = {
            encloseSpan,
            mathMLnode,
            svgSpan
          };
          ;
          function assertNodeType(node, type) {
            if (!node || node.type !== type) {
              throw new Error("Expected node of type " + type + ", but got " + (node ? "node of type " + node.type : String(node)));
            }
            return node;
          }
          function assertSymbolNodeType(node) {
            const typedNode = checkSymbolNodeType(node);
            if (!typedNode) {
              throw new Error("Expected node of symbol group type, but got " + (node ? "node of type " + node.type : String(node)));
            }
            return typedNode;
          }
          function checkSymbolNodeType(node) {
            if (node && (node.type === "atom" || NON_ATOMS.hasOwnProperty(node.type))) {
              return node;
            }
            return null;
          }
          ;
          const htmlBuilder = (grp, options) => {
            let base;
            let group;
            let supSubGroup;
            if (grp && grp.type === "supsub") {
              group = assertNodeType(grp.base, "accent");
              base = group.base;
              grp.base = base;
              supSubGroup = assertSpan(buildGroup(grp, options));
              grp.base = group;
            } else {
              group = assertNodeType(grp, "accent");
              base = group.base;
            }
            const body = buildGroup(base, options.havingCrampedStyle());
            const mustShift = group.isShifty && utils.isCharacterBox(base);
            let skew = 0;
            if (mustShift) {
              const baseChar = utils.getBaseElem(base);
              const baseGroup = buildGroup(baseChar, options.havingCrampedStyle());
              skew = assertSymbolDomNode(baseGroup).skew;
            }
            const accentBelow = group.label === "\\c";
            let clearance = accentBelow ? body.height + body.depth : Math.min(body.height, options.fontMetrics().xHeight);
            let accentBody;
            if (!group.isStretchy) {
              let accent2;
              let width;
              if (group.label === "\\vec") {
                accent2 = buildCommon.staticSvg("vec", options);
                width = buildCommon.svgData.vec[1];
              } else {
                accent2 = buildCommon.makeOrd({
                  mode: group.mode,
                  text: group.label
                }, options, "textord");
                accent2 = assertSymbolDomNode(accent2);
                accent2.italic = 0;
                width = accent2.width;
                if (accentBelow) {
                  clearance += accent2.depth;
                }
              }
              accentBody = buildCommon.makeSpan(["accent-body"], [accent2]);
              const accentFull = group.label === "\\textcircled";
              if (accentFull) {
                accentBody.classes.push("accent-full");
                clearance = body.height;
              }
              let left = skew;
              if (!accentFull) {
                left -= width / 2;
              }
              accentBody.style.left = makeEm(left);
              if (group.label === "\\textcircled") {
                accentBody.style.top = ".2em";
              }
              accentBody = buildCommon.makeVList({
                positionType: "firstBaseline",
                children: [{
                  type: "elem",
                  elem: body
                }, {
                  type: "kern",
                  size: -clearance
                }, {
                  type: "elem",
                  elem: accentBody
                }]
              }, options);
            } else {
              accentBody = stretchy.svgSpan(group, options);
              accentBody = buildCommon.makeVList({
                positionType: "firstBaseline",
                children: [{
                  type: "elem",
                  elem: body
                }, {
                  type: "elem",
                  elem: accentBody,
                  wrapperClasses: ["svg-align"],
                  wrapperStyle: skew > 0 ? {
                    width: "calc(100% - " + makeEm(2 * skew) + ")",
                    marginLeft: makeEm(2 * skew)
                  } : void 0
                }]
              }, options);
            }
            const accentWrap = buildCommon.makeSpan(["mord", "accent"], [accentBody], options);
            if (supSubGroup) {
              supSubGroup.children[0] = accentWrap;
              supSubGroup.height = Math.max(accentWrap.height, supSubGroup.height);
              supSubGroup.classes[0] = "mord";
              return supSubGroup;
            } else {
              return accentWrap;
            }
          };
          const mathmlBuilder = (group, options) => {
            const accentNode = group.isStretchy ? stretchy.mathMLnode(group.label) : new mathMLTree.MathNode("mo", [makeText(group.label, group.mode)]);
            const node = new mathMLTree.MathNode("mover", [buildMathML_buildGroup(group.base, options), accentNode]);
            node.setAttribute("accent", "true");
            return node;
          };
          const NON_STRETCHY_ACCENT_REGEX = new RegExp(["\\acute", "\\grave", "\\ddot", "\\tilde", "\\bar", "\\breve", "\\check", "\\hat", "\\vec", "\\dot", "\\mathring"].map((accent2) => "\\" + accent2).join("|"));
          defineFunction({
            type: "accent",
            names: ["\\acute", "\\grave", "\\ddot", "\\tilde", "\\bar", "\\breve", "\\check", "\\hat", "\\vec", "\\dot", "\\mathring", "\\widecheck", "\\widehat", "\\widetilde", "\\overrightarrow", "\\overleftarrow", "\\Overrightarrow", "\\overleftrightarrow", "\\overgroup", "\\overlinesegment", "\\overleftharpoon", "\\overrightharpoon"],
            props: {
              numArgs: 1
            },
            handler: (context, args) => {
              const base = normalizeArgument(args[0]);
              const isStretchy = !NON_STRETCHY_ACCENT_REGEX.test(context.funcName);
              const isShifty = !isStretchy || context.funcName === "\\widehat" || context.funcName === "\\widetilde" || context.funcName === "\\widecheck";
              return {
                type: "accent",
                mode: context.parser.mode,
                label: context.funcName,
                isStretchy,
                isShifty,
                base
              };
            },
            htmlBuilder,
            mathmlBuilder
          });
          defineFunction({
            type: "accent",
            names: ["\\'", "\\`", "\\^", "\\~", "\\=", "\\u", "\\.", '\\"', "\\c", "\\r", "\\H", "\\v", "\\textcircled"],
            props: {
              numArgs: 1,
              allowedInText: true,
              allowedInMath: true,
              // unless in strict mode
              argTypes: ["primitive"]
            },
            handler: (context, args) => {
              const base = args[0];
              let mode = context.parser.mode;
              if (mode === "math") {
                context.parser.settings.reportNonstrict("mathVsTextAccents", "LaTeX's accent " + context.funcName + " works only in text mode");
                mode = "text";
              }
              return {
                type: "accent",
                mode,
                label: context.funcName,
                isStretchy: false,
                isShifty: true,
                base
              };
            },
            htmlBuilder,
            mathmlBuilder
          });
          ;
          defineFunction({
            type: "accentUnder",
            names: ["\\underleftarrow", "\\underrightarrow", "\\underleftrightarrow", "\\undergroup", "\\underlinesegment", "\\utilde"],
            props: {
              numArgs: 1
            },
            handler: (_ref, args) => {
              let {
                parser,
                funcName
              } = _ref;
              const base = args[0];
              return {
                type: "accentUnder",
                mode: parser.mode,
                label: funcName,
                base
              };
            },
            htmlBuilder: (group, options) => {
              const innerGroup = buildGroup(group.base, options);
              const accentBody = stretchy.svgSpan(group, options);
              const kern = group.label === "\\utilde" ? 0.12 : 0;
              const vlist = buildCommon.makeVList({
                positionType: "top",
                positionData: innerGroup.height,
                children: [{
                  type: "elem",
                  elem: accentBody,
                  wrapperClasses: ["svg-align"]
                }, {
                  type: "kern",
                  size: kern
                }, {
                  type: "elem",
                  elem: innerGroup
                }]
              }, options);
              return buildCommon.makeSpan(["mord", "accentunder"], [vlist], options);
            },
            mathmlBuilder: (group, options) => {
              const accentNode = stretchy.mathMLnode(group.label);
              const node = new mathMLTree.MathNode("munder", [buildMathML_buildGroup(group.base, options), accentNode]);
              node.setAttribute("accentunder", "true");
              return node;
            }
          });
          ;
          const paddedNode = (group) => {
            const node = new mathMLTree.MathNode("mpadded", group ? [group] : []);
            node.setAttribute("width", "+0.6em");
            node.setAttribute("lspace", "0.3em");
            return node;
          };
          defineFunction({
            type: "xArrow",
            names: [
              "\\xleftarrow",
              "\\xrightarrow",
              "\\xLeftarrow",
              "\\xRightarrow",
              "\\xleftrightarrow",
              "\\xLeftrightarrow",
              "\\xhookleftarrow",
              "\\xhookrightarrow",
              "\\xmapsto",
              "\\xrightharpoondown",
              "\\xrightharpoonup",
              "\\xleftharpoondown",
              "\\xleftharpoonup",
              "\\xrightleftharpoons",
              "\\xleftrightharpoons",
              "\\xlongequal",
              "\\xtwoheadrightarrow",
              "\\xtwoheadleftarrow",
              "\\xtofrom",
              // The next 3 functions are here to support the mhchem extension.
              // Direct use of these functions is discouraged and may break someday.
              "\\xrightleftarrows",
              "\\xrightequilibrium",
              "\\xleftequilibrium",
              // The next 3 functions are here only to support the {CD} environment.
              "\\\\cdrightarrow",
              "\\\\cdleftarrow",
              "\\\\cdlongequal"
            ],
            props: {
              numArgs: 1,
              numOptionalArgs: 1
            },
            handler(_ref, args, optArgs) {
              let {
                parser,
                funcName
              } = _ref;
              return {
                type: "xArrow",
                mode: parser.mode,
                label: funcName,
                body: args[0],
                below: optArgs[0]
              };
            },
            // Flow is unable to correctly infer the type of `group`, even though it's
            // unambiguously determined from the passed-in `type` above.
            htmlBuilder(group, options) {
              const style = options.style;
              let newOptions = options.havingStyle(style.sup());
              const upperGroup = buildCommon.wrapFragment(buildGroup(group.body, newOptions, options), options);
              const arrowPrefix = group.label.slice(0, 2) === "\\x" ? "x" : "cd";
              upperGroup.classes.push(arrowPrefix + "-arrow-pad");
              let lowerGroup;
              if (group.below) {
                newOptions = options.havingStyle(style.sub());
                lowerGroup = buildCommon.wrapFragment(buildGroup(group.below, newOptions, options), options);
                lowerGroup.classes.push(arrowPrefix + "-arrow-pad");
              }
              const arrowBody = stretchy.svgSpan(group, options);
              const arrowShift = -options.fontMetrics().axisHeight + 0.5 * arrowBody.height;
              let upperShift = -options.fontMetrics().axisHeight - 0.5 * arrowBody.height - 0.111;
              if (upperGroup.depth > 0.25 || group.label === "\\xleftequilibrium") {
                upperShift -= upperGroup.depth;
              }
              let vlist;
              if (lowerGroup) {
                const lowerShift = -options.fontMetrics().axisHeight + lowerGroup.height + 0.5 * arrowBody.height + 0.111;
                vlist = buildCommon.makeVList({
                  positionType: "individualShift",
                  children: [{
                    type: "elem",
                    elem: upperGroup,
                    shift: upperShift
                  }, {
                    type: "elem",
                    elem: arrowBody,
                    shift: arrowShift
                  }, {
                    type: "elem",
                    elem: lowerGroup,
                    shift: lowerShift
                  }]
                }, options);
              } else {
                vlist = buildCommon.makeVList({
                  positionType: "individualShift",
                  children: [{
                    type: "elem",
                    elem: upperGroup,
                    shift: upperShift
                  }, {
                    type: "elem",
                    elem: arrowBody,
                    shift: arrowShift
                  }]
                }, options);
              }
              vlist.children[0].children[0].children[1].classes.push("svg-align");
              return buildCommon.makeSpan(["mrel", "x-arrow"], [vlist], options);
            },
            mathmlBuilder(group, options) {
              const arrowNode = stretchy.mathMLnode(group.label);
              arrowNode.setAttribute("minsize", group.label.charAt(0) === "x" ? "1.75em" : "3.0em");
              let node;
              if (group.body) {
                const upperNode = paddedNode(buildMathML_buildGroup(group.body, options));
                if (group.below) {
                  const lowerNode = paddedNode(buildMathML_buildGroup(group.below, options));
                  node = new mathMLTree.MathNode("munderover", [arrowNode, lowerNode, upperNode]);
                } else {
                  node = new mathMLTree.MathNode("mover", [arrowNode, upperNode]);
                }
              } else if (group.below) {
                const lowerNode = paddedNode(buildMathML_buildGroup(group.below, options));
                node = new mathMLTree.MathNode("munder", [arrowNode, lowerNode]);
              } else {
                node = paddedNode();
                node = new mathMLTree.MathNode("mover", [arrowNode, node]);
              }
              return node;
            }
          });
          ;
          const mclass_makeSpan = buildCommon.makeSpan;
          function mclass_htmlBuilder(group, options) {
            const elements = buildExpression(group.body, options, true);
            return mclass_makeSpan([group.mclass], elements, options);
          }
          function mclass_mathmlBuilder(group, options) {
            let node;
            const inner2 = buildMathML_buildExpression(group.body, options);
            if (group.mclass === "minner") {
              node = new mathMLTree.MathNode("mpadded", inner2);
            } else if (group.mclass === "mord") {
              if (group.isCharacterBox) {
                node = inner2[0];
                node.type = "mi";
              } else {
                node = new mathMLTree.MathNode("mi", inner2);
              }
            } else {
              if (group.isCharacterBox) {
                node = inner2[0];
                node.type = "mo";
              } else {
                node = new mathMLTree.MathNode("mo", inner2);
              }
              if (group.mclass === "mbin") {
                node.attributes.lspace = "0.22em";
                node.attributes.rspace = "0.22em";
              } else if (group.mclass === "mpunct") {
                node.attributes.lspace = "0em";
                node.attributes.rspace = "0.17em";
              } else if (group.mclass === "mopen" || group.mclass === "mclose") {
                node.attributes.lspace = "0em";
                node.attributes.rspace = "0em";
              } else if (group.mclass === "minner") {
                node.attributes.lspace = "0.0556em";
                node.attributes.width = "+0.1111em";
              }
            }
            return node;
          }
          defineFunction({
            type: "mclass",
            names: ["\\mathord", "\\mathbin", "\\mathrel", "\\mathopen", "\\mathclose", "\\mathpunct", "\\mathinner"],
            props: {
              numArgs: 1,
              primitive: true
            },
            handler(_ref, args) {
              let {
                parser,
                funcName
              } = _ref;
              const body = args[0];
              return {
                type: "mclass",
                mode: parser.mode,
                mclass: "m" + funcName.slice(5),
                // TODO(kevinb): don't prefix with 'm'
                body: ordargument(body),
                isCharacterBox: utils.isCharacterBox(body)
              };
            },
            htmlBuilder: mclass_htmlBuilder,
            mathmlBuilder: mclass_mathmlBuilder
          });
          const binrelClass = (arg) => {
            const atom = arg.type === "ordgroup" && arg.body.length ? arg.body[0] : arg;
            if (atom.type === "atom" && (atom.family === "bin" || atom.family === "rel")) {
              return "m" + atom.family;
            } else {
              return "mord";
            }
          };
          defineFunction({
            type: "mclass",
            names: ["\\@binrel"],
            props: {
              numArgs: 2
            },
            handler(_ref2, args) {
              let {
                parser
              } = _ref2;
              return {
                type: "mclass",
                mode: parser.mode,
                mclass: binrelClass(args[0]),
                body: ordargument(args[1]),
                isCharacterBox: utils.isCharacterBox(args[1])
              };
            }
          });
          defineFunction({
            type: "mclass",
            names: ["\\stackrel", "\\overset", "\\underset"],
            props: {
              numArgs: 2
            },
            handler(_ref3, args) {
              let {
                parser,
                funcName
              } = _ref3;
              const baseArg = args[1];
              const shiftedArg = args[0];
              let mclass;
              if (funcName !== "\\stackrel") {
                mclass = binrelClass(baseArg);
              } else {
                mclass = "mrel";
              }
              const baseOp = {
                type: "op",
                mode: baseArg.mode,
                limits: true,
                alwaysHandleSupSub: true,
                parentIsSupSub: false,
                symbol: false,
                suppressBaseShift: funcName !== "\\stackrel",
                body: ordargument(baseArg)
              };
              const supsub = {
                type: "supsub",
                mode: shiftedArg.mode,
                base: baseOp,
                sup: funcName === "\\underset" ? null : shiftedArg,
                sub: funcName === "\\underset" ? shiftedArg : null
              };
              return {
                type: "mclass",
                mode: parser.mode,
                mclass,
                body: [supsub],
                isCharacterBox: utils.isCharacterBox(supsub)
              };
            },
            htmlBuilder: mclass_htmlBuilder,
            mathmlBuilder: mclass_mathmlBuilder
          });
          ;
          defineFunction({
            type: "pmb",
            names: ["\\pmb"],
            props: {
              numArgs: 1,
              allowedInText: true
            },
            handler(_ref, args) {
              let {
                parser
              } = _ref;
              return {
                type: "pmb",
                mode: parser.mode,
                mclass: binrelClass(args[0]),
                body: ordargument(args[0])
              };
            },
            htmlBuilder(group, options) {
              const elements = buildExpression(group.body, options, true);
              const node = buildCommon.makeSpan([group.mclass], elements, options);
              node.style.textShadow = "0.02em 0.01em 0.04px";
              return node;
            },
            mathmlBuilder(group, style) {
              const inner2 = buildMathML_buildExpression(group.body, style);
              const node = new mathMLTree.MathNode("mstyle", inner2);
              node.setAttribute("style", "text-shadow: 0.02em 0.01em 0.04px");
              return node;
            }
          });
          ;
          const cdArrowFunctionName = {
            ">": "\\\\cdrightarrow",
            "<": "\\\\cdleftarrow",
            "=": "\\\\cdlongequal",
            "A": "\\uparrow",
            "V": "\\downarrow",
            "|": "\\Vert",
            ".": "no arrow"
          };
          const newCell = () => {
            return {
              type: "styling",
              body: [],
              mode: "math",
              style: "display"
            };
          };
          const isStartOfArrow = (node) => {
            return node.type === "textord" && node.text === "@";
          };
          const isLabelEnd = (node, endChar) => {
            return (node.type === "mathord" || node.type === "atom") && node.text === endChar;
          };
          function cdArrow(arrowChar, labels, parser) {
            const funcName = cdArrowFunctionName[arrowChar];
            switch (funcName) {
              case "\\\\cdrightarrow":
              case "\\\\cdleftarrow":
                return parser.callFunction(funcName, [labels[0]], [labels[1]]);
              case "\\uparrow":
              case "\\downarrow": {
                const leftLabel = parser.callFunction("\\\\cdleft", [labels[0]], []);
                const bareArrow = {
                  type: "atom",
                  text: funcName,
                  mode: "math",
                  family: "rel"
                };
                const sizedArrow = parser.callFunction("\\Big", [bareArrow], []);
                const rightLabel = parser.callFunction("\\\\cdright", [labels[1]], []);
                const arrowGroup = {
                  type: "ordgroup",
                  mode: "math",
                  body: [leftLabel, sizedArrow, rightLabel]
                };
                return parser.callFunction("\\\\cdparent", [arrowGroup], []);
              }
              case "\\\\cdlongequal":
                return parser.callFunction("\\\\cdlongequal", [], []);
              case "\\Vert": {
                const arrow = {
                  type: "textord",
                  text: "\\Vert",
                  mode: "math"
                };
                return parser.callFunction("\\Big", [arrow], []);
              }
              default:
                return {
                  type: "textord",
                  text: " ",
                  mode: "math"
                };
            }
          }
          function parseCD(parser) {
            const parsedRows = [];
            parser.gullet.beginGroup();
            parser.gullet.macros.set("\\cr", "\\\\\\relax");
            parser.gullet.beginGroup();
            while (true) {
              parsedRows.push(parser.parseExpression(false, "\\\\"));
              parser.gullet.endGroup();
              parser.gullet.beginGroup();
              const next = parser.fetch().text;
              if (next === "&" || next === "\\\\") {
                parser.consume();
              } else if (next === "\\end") {
                if (parsedRows[parsedRows.length - 1].length === 0) {
                  parsedRows.pop();
                }
                break;
              } else {
                throw new src_ParseError("Expected \\\\ or \\cr or \\end", parser.nextToken);
              }
            }
            let row = [];
            const body = [row];
            for (let i = 0; i < parsedRows.length; i++) {
              const rowNodes = parsedRows[i];
              let cell = newCell();
              for (let j = 0; j < rowNodes.length; j++) {
                if (!isStartOfArrow(rowNodes[j])) {
                  cell.body.push(rowNodes[j]);
                } else {
                  row.push(cell);
                  j += 1;
                  const arrowChar = assertSymbolNodeType(rowNodes[j]).text;
                  const labels = new Array(2);
                  labels[0] = {
                    type: "ordgroup",
                    mode: "math",
                    body: []
                  };
                  labels[1] = {
                    type: "ordgroup",
                    mode: "math",
                    body: []
                  };
                  if ("=|.".indexOf(arrowChar) > -1) {
                  } else if ("<>AV".indexOf(arrowChar) > -1) {
                    for (let labelNum = 0; labelNum < 2; labelNum++) {
                      let inLabel = true;
                      for (let k = j + 1; k < rowNodes.length; k++) {
                        if (isLabelEnd(rowNodes[k], arrowChar)) {
                          inLabel = false;
                          j = k;
                          break;
                        }
                        if (isStartOfArrow(rowNodes[k])) {
                          throw new src_ParseError("Missing a " + arrowChar + " character to complete a CD arrow.", rowNodes[k]);
                        }
                        labels[labelNum].body.push(rowNodes[k]);
                      }
                      if (inLabel) {
                        throw new src_ParseError("Missing a " + arrowChar + " character to complete a CD arrow.", rowNodes[j]);
                      }
                    }
                  } else {
                    throw new src_ParseError('Expected one of "<>AV=|." after @', rowNodes[j]);
                  }
                  const arrow = cdArrow(arrowChar, labels, parser);
                  const wrappedArrow = {
                    type: "styling",
                    body: [arrow],
                    mode: "math",
                    style: "display"
                    // CD is always displaystyle.
                  };
                  row.push(wrappedArrow);
                  cell = newCell();
                }
              }
              if (i % 2 === 0) {
                row.push(cell);
              } else {
                row.shift();
              }
              row = [];
              body.push(row);
            }
            parser.gullet.endGroup();
            parser.gullet.endGroup();
            const cols = new Array(body[0].length).fill({
              type: "align",
              align: "c",
              pregap: 0.25,
              // CD package sets \enskip between columns.
              postgap: 0.25
              // So pre and post each get half an \enskip, i.e. 0.25em.
            });
            return {
              type: "array",
              mode: "math",
              body,
              arraystretch: 1,
              addJot: true,
              rowGaps: [null],
              cols,
              colSeparationType: "CD",
              hLinesBeforeRow: new Array(body.length + 1).fill([])
            };
          }
          defineFunction({
            type: "cdlabel",
            names: ["\\\\cdleft", "\\\\cdright"],
            props: {
              numArgs: 1
            },
            handler(_ref, args) {
              let {
                parser,
                funcName
              } = _ref;
              return {
                type: "cdlabel",
                mode: parser.mode,
                side: funcName.slice(4),
                label: args[0]
              };
            },
            htmlBuilder(group, options) {
              const newOptions = options.havingStyle(options.style.sup());
              const label = buildCommon.wrapFragment(buildGroup(group.label, newOptions, options), options);
              label.classes.push("cd-label-" + group.side);
              label.style.bottom = makeEm(0.8 - label.depth);
              label.height = 0;
              label.depth = 0;
              return label;
            },
            mathmlBuilder(group, options) {
              let label = new mathMLTree.MathNode("mrow", [buildMathML_buildGroup(group.label, options)]);
              label = new mathMLTree.MathNode("mpadded", [label]);
              label.setAttribute("width", "0");
              if (group.side === "left") {
                label.setAttribute("lspace", "-1width");
              }
              label.setAttribute("voffset", "0.7em");
              label = new mathMLTree.MathNode("mstyle", [label]);
              label.setAttribute("displaystyle", "false");
              label.setAttribute("scriptlevel", "1");
              return label;
            }
          });
          defineFunction({
            type: "cdlabelparent",
            names: ["\\\\cdparent"],
            props: {
              numArgs: 1
            },
            handler(_ref2, args) {
              let {
                parser
              } = _ref2;
              return {
                type: "cdlabelparent",
                mode: parser.mode,
                fragment: args[0]
              };
            },
            htmlBuilder(group, options) {
              const parent = buildCommon.wrapFragment(buildGroup(group.fragment, options), options);
              parent.classes.push("cd-vert-arrow");
              return parent;
            },
            mathmlBuilder(group, options) {
              return new mathMLTree.MathNode("mrow", [buildMathML_buildGroup(group.fragment, options)]);
            }
          });
          ;
          defineFunction({
            type: "textord",
            names: ["\\@char"],
            props: {
              numArgs: 1,
              allowedInText: true
            },
            handler(_ref, args) {
              let {
                parser
              } = _ref;
              const arg = assertNodeType(args[0], "ordgroup");
              const group = arg.body;
              let number = "";
              for (let i = 0; i < group.length; i++) {
                const node = assertNodeType(group[i], "textord");
                number += node.text;
              }
              let code = parseInt(number);
              let text;
              if (isNaN(code)) {
                throw new src_ParseError("\\@char has non-numeric argument " + number);
              } else if (code < 0 || code >= 1114111) {
                throw new src_ParseError("\\@char with invalid code point " + number);
              } else if (code <= 65535) {
                text = String.fromCharCode(code);
              } else {
                code -= 65536;
                text = String.fromCharCode((code >> 10) + 55296, (code & 1023) + 56320);
              }
              return {
                type: "textord",
                mode: parser.mode,
                text
              };
            }
          });
          ;
          const color_htmlBuilder = (group, options) => {
            const elements = buildExpression(group.body, options.withColor(group.color), false);
            return buildCommon.makeFragment(elements);
          };
          const color_mathmlBuilder = (group, options) => {
            const inner2 = buildMathML_buildExpression(group.body, options.withColor(group.color));
            const node = new mathMLTree.MathNode("mstyle", inner2);
            node.setAttribute("mathcolor", group.color);
            return node;
          };
          defineFunction({
            type: "color",
            names: ["\\textcolor"],
            props: {
              numArgs: 2,
              allowedInText: true,
              argTypes: ["color", "original"]
            },
            handler(_ref, args) {
              let {
                parser
              } = _ref;
              const color = assertNodeType(args[0], "color-token").color;
              const body = args[1];
              return {
                type: "color",
                mode: parser.mode,
                color,
                body: ordargument(body)
              };
            },
            htmlBuilder: color_htmlBuilder,
            mathmlBuilder: color_mathmlBuilder
          });
          defineFunction({
            type: "color",
            names: ["\\color"],
            props: {
              numArgs: 1,
              allowedInText: true,
              argTypes: ["color"]
            },
            handler(_ref2, args) {
              let {
                parser,
                breakOnTokenText
              } = _ref2;
              const color = assertNodeType(args[0], "color-token").color;
              parser.gullet.macros.set("\\current@color", color);
              const body = parser.parseExpression(true, breakOnTokenText);
              return {
                type: "color",
                mode: parser.mode,
                color,
                body
              };
            },
            htmlBuilder: color_htmlBuilder,
            mathmlBuilder: color_mathmlBuilder
          });
          ;
          defineFunction({
            type: "cr",
            names: ["\\\\"],
            props: {
              numArgs: 0,
              numOptionalArgs: 0,
              allowedInText: true
            },
            handler(_ref, args, optArgs) {
              let {
                parser
              } = _ref;
              const size = parser.gullet.future().text === "[" ? parser.parseSizeGroup(true) : null;
              const newLine = !parser.settings.displayMode || !parser.settings.useStrictBehavior("newLineInDisplayMode", "In LaTeX, \\\\ or \\newline does nothing in display mode");
              return {
                type: "cr",
                mode: parser.mode,
                newLine,
                size: size && assertNodeType(size, "size").value
              };
            },
            // The following builders are called only at the top level,
            // not within tabular/array environments.
            htmlBuilder(group, options) {
              const span = buildCommon.makeSpan(["mspace"], [], options);
              if (group.newLine) {
                span.classes.push("newline");
                if (group.size) {
                  span.style.marginTop = makeEm(calculateSize(group.size, options));
                }
              }
              return span;
            },
            mathmlBuilder(group, options) {
              const node = new mathMLTree.MathNode("mspace");
              if (group.newLine) {
                node.setAttribute("linebreak", "newline");
                if (group.size) {
                  node.setAttribute("height", makeEm(calculateSize(group.size, options)));
                }
              }
              return node;
            }
          });
          ;
          const globalMap = {
            "\\global": "\\global",
            "\\long": "\\\\globallong",
            "\\\\globallong": "\\\\globallong",
            "\\def": "\\gdef",
            "\\gdef": "\\gdef",
            "\\edef": "\\xdef",
            "\\xdef": "\\xdef",
            "\\let": "\\\\globallet",
            "\\futurelet": "\\\\globalfuture"
          };
          const checkControlSequence = (tok) => {
            const name = tok.text;
            if (/^(?:[\\{}$&#^_]|EOF)$/.test(name)) {
              throw new src_ParseError("Expected a control sequence", tok);
            }
            return name;
          };
          const getRHS = (parser) => {
            let tok = parser.gullet.popToken();
            if (tok.text === "=") {
              tok = parser.gullet.popToken();
              if (tok.text === " ") {
                tok = parser.gullet.popToken();
              }
            }
            return tok;
          };
          const letCommand = (parser, name, tok, global) => {
            let macro = parser.gullet.macros.get(tok.text);
            if (macro == null) {
              tok.noexpand = true;
              macro = {
                tokens: [tok],
                numArgs: 0,
                // reproduce the same behavior in expansion
                unexpandable: !parser.gullet.isExpandable(tok.text)
              };
            }
            parser.gullet.macros.set(name, macro, global);
          };
          defineFunction({
            type: "internal",
            names: [
              "\\global",
              "\\long",
              "\\\\globallong"
              // can’t be entered directly
            ],
            props: {
              numArgs: 0,
              allowedInText: true
            },
            handler(_ref) {
              let {
                parser,
                funcName
              } = _ref;
              parser.consumeSpaces();
              const token = parser.fetch();
              if (globalMap[token.text]) {
                if (funcName === "\\global" || funcName === "\\\\globallong") {
                  token.text = globalMap[token.text];
                }
                return assertNodeType(parser.parseFunction(), "internal");
              }
              throw new src_ParseError("Invalid token after macro prefix", token);
            }
          });
          defineFunction({
            type: "internal",
            names: ["\\def", "\\gdef", "\\edef", "\\xdef"],
            props: {
              numArgs: 0,
              allowedInText: true,
              primitive: true
            },
            handler(_ref2) {
              let {
                parser,
                funcName
              } = _ref2;
              let tok = parser.gullet.popToken();
              const name = tok.text;
              if (/^(?:[\\{}$&#^_]|EOF)$/.test(name)) {
                throw new src_ParseError("Expected a control sequence", tok);
              }
              let numArgs = 0;
              let insert;
              const delimiters2 = [[]];
              while (parser.gullet.future().text !== "{") {
                tok = parser.gullet.popToken();
                if (tok.text === "#") {
                  if (parser.gullet.future().text === "{") {
                    insert = parser.gullet.future();
                    delimiters2[numArgs].push("{");
                    break;
                  }
                  tok = parser.gullet.popToken();
                  if (!/^[1-9]$/.test(tok.text)) {
                    throw new src_ParseError('Invalid argument number "' + tok.text + '"');
                  }
                  if (parseInt(tok.text) !== numArgs + 1) {
                    throw new src_ParseError('Argument number "' + tok.text + '" out of order');
                  }
                  numArgs++;
                  delimiters2.push([]);
                } else if (tok.text === "EOF") {
                  throw new src_ParseError("Expected a macro definition");
                } else {
                  delimiters2[numArgs].push(tok.text);
                }
              }
              let {
                tokens
              } = parser.gullet.consumeArg();
              if (insert) {
                tokens.unshift(insert);
              }
              if (funcName === "\\edef" || funcName === "\\xdef") {
                tokens = parser.gullet.expandTokens(tokens);
                tokens.reverse();
              }
              parser.gullet.macros.set(name, {
                tokens,
                numArgs,
                delimiters: delimiters2
              }, funcName === globalMap[funcName]);
              return {
                type: "internal",
                mode: parser.mode
              };
            }
          });
          defineFunction({
            type: "internal",
            names: [
              "\\let",
              "\\\\globallet"
              // can’t be entered directly
            ],
            props: {
              numArgs: 0,
              allowedInText: true,
              primitive: true
            },
            handler(_ref3) {
              let {
                parser,
                funcName
              } = _ref3;
              const name = checkControlSequence(parser.gullet.popToken());
              parser.gullet.consumeSpaces();
              const tok = getRHS(parser);
              letCommand(parser, name, tok, funcName === "\\\\globallet");
              return {
                type: "internal",
                mode: parser.mode
              };
            }
          });
          defineFunction({
            type: "internal",
            names: [
              "\\futurelet",
              "\\\\globalfuture"
              // can’t be entered directly
            ],
            props: {
              numArgs: 0,
              allowedInText: true,
              primitive: true
            },
            handler(_ref4) {
              let {
                parser,
                funcName
              } = _ref4;
              const name = checkControlSequence(parser.gullet.popToken());
              const middle = parser.gullet.popToken();
              const tok = parser.gullet.popToken();
              letCommand(parser, name, tok, funcName === "\\\\globalfuture");
              parser.gullet.pushToken(tok);
              parser.gullet.pushToken(middle);
              return {
                type: "internal",
                mode: parser.mode
              };
            }
          });
          ;
          const getMetrics = function(symbol, font, mode) {
            const replace = src_symbols.math[symbol] && src_symbols.math[symbol].replace;
            const metrics = getCharacterMetrics(replace || symbol, font, mode);
            if (!metrics) {
              throw new Error("Unsupported symbol " + symbol + " and font size " + font + ".");
            }
            return metrics;
          };
          const styleWrap = function(delim, toStyle, options, classes) {
            const newOptions = options.havingBaseStyle(toStyle);
            const span = buildCommon.makeSpan(classes.concat(newOptions.sizingClasses(options)), [delim], options);
            const delimSizeMultiplier = newOptions.sizeMultiplier / options.sizeMultiplier;
            span.height *= delimSizeMultiplier;
            span.depth *= delimSizeMultiplier;
            span.maxFontSize = newOptions.sizeMultiplier;
            return span;
          };
          const centerSpan = function(span, options, style) {
            const newOptions = options.havingBaseStyle(style);
            const shift = (1 - options.sizeMultiplier / newOptions.sizeMultiplier) * options.fontMetrics().axisHeight;
            span.classes.push("delimcenter");
            span.style.top = makeEm(shift);
            span.height -= shift;
            span.depth += shift;
          };
          const makeSmallDelim = function(delim, style, center, options, mode, classes) {
            const text = buildCommon.makeSymbol(delim, "Main-Regular", mode, options);
            const span = styleWrap(text, style, options, classes);
            if (center) {
              centerSpan(span, options, style);
            }
            return span;
          };
          const mathrmSize = function(value, size, mode, options) {
            return buildCommon.makeSymbol(value, "Size" + size + "-Regular", mode, options);
          };
          const makeLargeDelim = function(delim, size, center, options, mode, classes) {
            const inner2 = mathrmSize(delim, size, mode, options);
            const span = styleWrap(buildCommon.makeSpan(["delimsizing", "size" + size], [inner2], options), src_Style.TEXT, options, classes);
            if (center) {
              centerSpan(span, options, src_Style.TEXT);
            }
            return span;
          };
          const makeGlyphSpan = function(symbol, font, mode) {
            let sizeClass;
            if (font === "Size1-Regular") {
              sizeClass = "delim-size1";
            } else {
              sizeClass = "delim-size4";
            }
            const corner = buildCommon.makeSpan(["delimsizinginner", sizeClass], [buildCommon.makeSpan([], [buildCommon.makeSymbol(symbol, font, mode)])]);
            return {
              type: "elem",
              elem: corner
            };
          };
          const makeInner = function(ch, height, options) {
            const width = fontMetricsData["Size4-Regular"][ch.charCodeAt(0)] ? fontMetricsData["Size4-Regular"][ch.charCodeAt(0)][4] : fontMetricsData["Size1-Regular"][ch.charCodeAt(0)][4];
            const path2 = new PathNode("inner", innerPath(ch, Math.round(1e3 * height)));
            const svgNode = new SvgNode([path2], {
              "width": makeEm(width),
              "height": makeEm(height),
              // Override CSS rule `.katex svg { width: 100% }`
              "style": "width:" + makeEm(width),
              "viewBox": "0 0 " + 1e3 * width + " " + Math.round(1e3 * height),
              "preserveAspectRatio": "xMinYMin"
            });
            const span = buildCommon.makeSvgSpan([], [svgNode], options);
            span.height = height;
            span.style.height = makeEm(height);
            span.style.width = makeEm(width);
            return {
              type: "elem",
              elem: span
            };
          };
          const lapInEms = 8e-3;
          const lap = {
            type: "kern",
            size: -1 * lapInEms
          };
          const verts = ["|", "\\lvert", "\\rvert", "\\vert"];
          const doubleVerts = ["\\|", "\\lVert", "\\rVert", "\\Vert"];
          const makeStackedDelim = function(delim, heightTotal, center, options, mode, classes) {
            let top;
            let middle;
            let repeat;
            let bottom;
            let svgLabel = "";
            let viewBoxWidth = 0;
            top = repeat = bottom = delim;
            middle = null;
            let font = "Size1-Regular";
            if (delim === "\\uparrow") {
              repeat = bottom = "⏐";
            } else if (delim === "\\Uparrow") {
              repeat = bottom = "‖";
            } else if (delim === "\\downarrow") {
              top = repeat = "⏐";
            } else if (delim === "\\Downarrow") {
              top = repeat = "‖";
            } else if (delim === "\\updownarrow") {
              top = "\\uparrow";
              repeat = "⏐";
              bottom = "\\downarrow";
            } else if (delim === "\\Updownarrow") {
              top = "\\Uparrow";
              repeat = "‖";
              bottom = "\\Downarrow";
            } else if (utils.contains(verts, delim)) {
              repeat = "∣";
              svgLabel = "vert";
              viewBoxWidth = 333;
            } else if (utils.contains(doubleVerts, delim)) {
              repeat = "∥";
              svgLabel = "doublevert";
              viewBoxWidth = 556;
            } else if (delim === "[" || delim === "\\lbrack") {
              top = "⎡";
              repeat = "⎢";
              bottom = "⎣";
              font = "Size4-Regular";
              svgLabel = "lbrack";
              viewBoxWidth = 667;
            } else if (delim === "]" || delim === "\\rbrack") {
              top = "⎤";
              repeat = "⎥";
              bottom = "⎦";
              font = "Size4-Regular";
              svgLabel = "rbrack";
              viewBoxWidth = 667;
            } else if (delim === "\\lfloor" || delim === "⌊") {
              repeat = top = "⎢";
              bottom = "⎣";
              font = "Size4-Regular";
              svgLabel = "lfloor";
              viewBoxWidth = 667;
            } else if (delim === "\\lceil" || delim === "⌈") {
              top = "⎡";
              repeat = bottom = "⎢";
              font = "Size4-Regular";
              svgLabel = "lceil";
              viewBoxWidth = 667;
            } else if (delim === "\\rfloor" || delim === "⌋") {
              repeat = top = "⎥";
              bottom = "⎦";
              font = "Size4-Regular";
              svgLabel = "rfloor";
              viewBoxWidth = 667;
            } else if (delim === "\\rceil" || delim === "⌉") {
              top = "⎤";
              repeat = bottom = "⎥";
              font = "Size4-Regular";
              svgLabel = "rceil";
              viewBoxWidth = 667;
            } else if (delim === "(" || delim === "\\lparen") {
              top = "⎛";
              repeat = "⎜";
              bottom = "⎝";
              font = "Size4-Regular";
              svgLabel = "lparen";
              viewBoxWidth = 875;
            } else if (delim === ")" || delim === "\\rparen") {
              top = "⎞";
              repeat = "⎟";
              bottom = "⎠";
              font = "Size4-Regular";
              svgLabel = "rparen";
              viewBoxWidth = 875;
            } else if (delim === "\\{" || delim === "\\lbrace") {
              top = "⎧";
              middle = "⎨";
              bottom = "⎩";
              repeat = "⎪";
              font = "Size4-Regular";
            } else if (delim === "\\}" || delim === "\\rbrace") {
              top = "⎫";
              middle = "⎬";
              bottom = "⎭";
              repeat = "⎪";
              font = "Size4-Regular";
            } else if (delim === "\\lgroup" || delim === "⟮") {
              top = "⎧";
              bottom = "⎩";
              repeat = "⎪";
              font = "Size4-Regular";
            } else if (delim === "\\rgroup" || delim === "⟯") {
              top = "⎫";
              bottom = "⎭";
              repeat = "⎪";
              font = "Size4-Regular";
            } else if (delim === "\\lmoustache" || delim === "⎰") {
              top = "⎧";
              bottom = "⎭";
              repeat = "⎪";
              font = "Size4-Regular";
            } else if (delim === "\\rmoustache" || delim === "⎱") {
              top = "⎫";
              bottom = "⎩";
              repeat = "⎪";
              font = "Size4-Regular";
            }
            const topMetrics = getMetrics(top, font, mode);
            const topHeightTotal = topMetrics.height + topMetrics.depth;
            const repeatMetrics = getMetrics(repeat, font, mode);
            const repeatHeightTotal = repeatMetrics.height + repeatMetrics.depth;
            const bottomMetrics = getMetrics(bottom, font, mode);
            const bottomHeightTotal = bottomMetrics.height + bottomMetrics.depth;
            let middleHeightTotal = 0;
            let middleFactor = 1;
            if (middle !== null) {
              const middleMetrics = getMetrics(middle, font, mode);
              middleHeightTotal = middleMetrics.height + middleMetrics.depth;
              middleFactor = 2;
            }
            const minHeight = topHeightTotal + bottomHeightTotal + middleHeightTotal;
            const repeatCount = Math.max(0, Math.ceil((heightTotal - minHeight) / (middleFactor * repeatHeightTotal)));
            const realHeightTotal = minHeight + repeatCount * middleFactor * repeatHeightTotal;
            let axisHeight = options.fontMetrics().axisHeight;
            if (center) {
              axisHeight *= options.sizeMultiplier;
            }
            const depth = realHeightTotal / 2 - axisHeight;
            const stack = [];
            if (svgLabel.length > 0) {
              const midHeight = realHeightTotal - topHeightTotal - bottomHeightTotal;
              const viewBoxHeight = Math.round(realHeightTotal * 1e3);
              const pathStr = tallDelim(svgLabel, Math.round(midHeight * 1e3));
              const path2 = new PathNode(svgLabel, pathStr);
              const width = (viewBoxWidth / 1e3).toFixed(3) + "em";
              const height = (viewBoxHeight / 1e3).toFixed(3) + "em";
              const svg = new SvgNode([path2], {
                "width": width,
                "height": height,
                "viewBox": "0 0 " + viewBoxWidth + " " + viewBoxHeight
              });
              const wrapper = buildCommon.makeSvgSpan([], [svg], options);
              wrapper.height = viewBoxHeight / 1e3;
              wrapper.style.width = width;
              wrapper.style.height = height;
              stack.push({
                type: "elem",
                elem: wrapper
              });
            } else {
              stack.push(makeGlyphSpan(bottom, font, mode));
              stack.push(lap);
              if (middle === null) {
                const innerHeight = realHeightTotal - topHeightTotal - bottomHeightTotal + 2 * lapInEms;
                stack.push(makeInner(repeat, innerHeight, options));
              } else {
                const innerHeight = (realHeightTotal - topHeightTotal - bottomHeightTotal - middleHeightTotal) / 2 + 2 * lapInEms;
                stack.push(makeInner(repeat, innerHeight, options));
                stack.push(lap);
                stack.push(makeGlyphSpan(middle, font, mode));
                stack.push(lap);
                stack.push(makeInner(repeat, innerHeight, options));
              }
              stack.push(lap);
              stack.push(makeGlyphSpan(top, font, mode));
            }
            const newOptions = options.havingBaseStyle(src_Style.TEXT);
            const inner2 = buildCommon.makeVList({
              positionType: "bottom",
              positionData: depth,
              children: stack
            }, newOptions);
            return styleWrap(buildCommon.makeSpan(["delimsizing", "mult"], [inner2], newOptions), src_Style.TEXT, options, classes);
          };
          const vbPad = 80;
          const emPad = 0.08;
          const sqrtSvg = function(sqrtName, height, viewBoxHeight, extraVinculum, options) {
            const path2 = sqrtPath(sqrtName, extraVinculum, viewBoxHeight);
            const pathNode = new PathNode(sqrtName, path2);
            const svg = new SvgNode([pathNode], {
              // Note: 1000:1 ratio of viewBox to document em width.
              "width": "400em",
              "height": makeEm(height),
              "viewBox": "0 0 400000 " + viewBoxHeight,
              "preserveAspectRatio": "xMinYMin slice"
            });
            return buildCommon.makeSvgSpan(["hide-tail"], [svg], options);
          };
          const makeSqrtImage = function(height, options) {
            const newOptions = options.havingBaseSizing();
            const delim = traverseSequence("\\surd", height * newOptions.sizeMultiplier, stackLargeDelimiterSequence, newOptions);
            let sizeMultiplier = newOptions.sizeMultiplier;
            const extraVinculum = Math.max(0, options.minRuleThickness - options.fontMetrics().sqrtRuleThickness);
            let span;
            let spanHeight = 0;
            let texHeight = 0;
            let viewBoxHeight = 0;
            let advanceWidth;
            if (delim.type === "small") {
              viewBoxHeight = 1e3 + 1e3 * extraVinculum + vbPad;
              if (height < 1) {
                sizeMultiplier = 1;
              } else if (height < 1.4) {
                sizeMultiplier = 0.7;
              }
              spanHeight = (1 + extraVinculum + emPad) / sizeMultiplier;
              texHeight = (1 + extraVinculum) / sizeMultiplier;
              span = sqrtSvg("sqrtMain", spanHeight, viewBoxHeight, extraVinculum, options);
              span.style.minWidth = "0.853em";
              advanceWidth = 0.833 / sizeMultiplier;
            } else if (delim.type === "large") {
              viewBoxHeight = (1e3 + vbPad) * sizeToMaxHeight[delim.size];
              texHeight = (sizeToMaxHeight[delim.size] + extraVinculum) / sizeMultiplier;
              spanHeight = (sizeToMaxHeight[delim.size] + extraVinculum + emPad) / sizeMultiplier;
              span = sqrtSvg("sqrtSize" + delim.size, spanHeight, viewBoxHeight, extraVinculum, options);
              span.style.minWidth = "1.02em";
              advanceWidth = 1 / sizeMultiplier;
            } else {
              spanHeight = height + extraVinculum + emPad;
              texHeight = height + extraVinculum;
              viewBoxHeight = Math.floor(1e3 * height + extraVinculum) + vbPad;
              span = sqrtSvg("sqrtTall", spanHeight, viewBoxHeight, extraVinculum, options);
              span.style.minWidth = "0.742em";
              advanceWidth = 1.056;
            }
            span.height = texHeight;
            span.style.height = makeEm(spanHeight);
            return {
              span,
              advanceWidth,
              // Calculate the actual line width.
              // This actually should depend on the chosen font -- e.g. \boldmath
              // should use the thicker surd symbols from e.g. KaTeX_Main-Bold, and
              // have thicker rules.
              ruleWidth: (options.fontMetrics().sqrtRuleThickness + extraVinculum) * sizeMultiplier
            };
          };
          const stackLargeDelimiters = ["(", "\\lparen", ")", "\\rparen", "[", "\\lbrack", "]", "\\rbrack", "\\{", "\\lbrace", "\\}", "\\rbrace", "\\lfloor", "\\rfloor", "⌊", "⌋", "\\lceil", "\\rceil", "⌈", "⌉", "\\surd"];
          const stackAlwaysDelimiters = ["\\uparrow", "\\downarrow", "\\updownarrow", "\\Uparrow", "\\Downarrow", "\\Updownarrow", "|", "\\|", "\\vert", "\\Vert", "\\lvert", "\\rvert", "\\lVert", "\\rVert", "\\lgroup", "\\rgroup", "⟮", "⟯", "\\lmoustache", "\\rmoustache", "⎰", "⎱"];
          const stackNeverDelimiters = ["<", ">", "\\langle", "\\rangle", "/", "\\backslash", "\\lt", "\\gt"];
          const sizeToMaxHeight = [0, 1.2, 1.8, 2.4, 3];
          const makeSizedDelim = function(delim, size, options, mode, classes) {
            if (delim === "<" || delim === "\\lt" || delim === "⟨") {
              delim = "\\langle";
            } else if (delim === ">" || delim === "\\gt" || delim === "⟩") {
              delim = "\\rangle";
            }
            if (utils.contains(stackLargeDelimiters, delim) || utils.contains(stackNeverDelimiters, delim)) {
              return makeLargeDelim(delim, size, false, options, mode, classes);
            } else if (utils.contains(stackAlwaysDelimiters, delim)) {
              return makeStackedDelim(delim, sizeToMaxHeight[size], false, options, mode, classes);
            } else {
              throw new src_ParseError("Illegal delimiter: '" + delim + "'");
            }
          };
          const stackNeverDelimiterSequence = [{
            type: "small",
            style: src_Style.SCRIPTSCRIPT
          }, {
            type: "small",
            style: src_Style.SCRIPT
          }, {
            type: "small",
            style: src_Style.TEXT
          }, {
            type: "large",
            size: 1
          }, {
            type: "large",
            size: 2
          }, {
            type: "large",
            size: 3
          }, {
            type: "large",
            size: 4
          }];
          const stackAlwaysDelimiterSequence = [{
            type: "small",
            style: src_Style.SCRIPTSCRIPT
          }, {
            type: "small",
            style: src_Style.SCRIPT
          }, {
            type: "small",
            style: src_Style.TEXT
          }, {
            type: "stack"
          }];
          const stackLargeDelimiterSequence = [{
            type: "small",
            style: src_Style.SCRIPTSCRIPT
          }, {
            type: "small",
            style: src_Style.SCRIPT
          }, {
            type: "small",
            style: src_Style.TEXT
          }, {
            type: "large",
            size: 1
          }, {
            type: "large",
            size: 2
          }, {
            type: "large",
            size: 3
          }, {
            type: "large",
            size: 4
          }, {
            type: "stack"
          }];
          const delimTypeToFont = function(type) {
            if (type.type === "small") {
              return "Main-Regular";
            } else if (type.type === "large") {
              return "Size" + type.size + "-Regular";
            } else if (type.type === "stack") {
              return "Size4-Regular";
            } else {
              throw new Error("Add support for delim type '" + type.type + "' here.");
            }
          };
          const traverseSequence = function(delim, height, sequence, options) {
            const start = Math.min(2, 3 - options.style.size);
            for (let i = start; i < sequence.length; i++) {
              if (sequence[i].type === "stack") {
                break;
              }
              const metrics = getMetrics(delim, delimTypeToFont(sequence[i]), "math");
              let heightDepth = metrics.height + metrics.depth;
              if (sequence[i].type === "small") {
                const newOptions = options.havingBaseStyle(sequence[i].style);
                heightDepth *= newOptions.sizeMultiplier;
              }
              if (heightDepth > height) {
                return sequence[i];
              }
            }
            return sequence[sequence.length - 1];
          };
          const makeCustomSizedDelim = function(delim, height, center, options, mode, classes) {
            if (delim === "<" || delim === "\\lt" || delim === "⟨") {
              delim = "\\langle";
            } else if (delim === ">" || delim === "\\gt" || delim === "⟩") {
              delim = "\\rangle";
            }
            let sequence;
            if (utils.contains(stackNeverDelimiters, delim)) {
              sequence = stackNeverDelimiterSequence;
            } else if (utils.contains(stackLargeDelimiters, delim)) {
              sequence = stackLargeDelimiterSequence;
            } else {
              sequence = stackAlwaysDelimiterSequence;
            }
            const delimType = traverseSequence(delim, height, sequence, options);
            if (delimType.type === "small") {
              return makeSmallDelim(delim, delimType.style, center, options, mode, classes);
            } else if (delimType.type === "large") {
              return makeLargeDelim(delim, delimType.size, center, options, mode, classes);
            } else {
              return makeStackedDelim(delim, height, center, options, mode, classes);
            }
          };
          const makeLeftRightDelim = function(delim, height, depth, options, mode, classes) {
            const axisHeight = options.fontMetrics().axisHeight * options.sizeMultiplier;
            const delimiterFactor = 901;
            const delimiterExtend = 5 / options.fontMetrics().ptPerEm;
            const maxDistFromAxis = Math.max(height - axisHeight, depth + axisHeight);
            const totalHeight = Math.max(
              // In real TeX, calculations are done using integral values which are
              // 65536 per pt, or 655360 per em. So, the division here truncates in
              // TeX but doesn't here, producing different results. If we wanted to
              // exactly match TeX's calculation, we could do
              //   Math.floor(655360 * maxDistFromAxis / 500) *
              //    delimiterFactor / 655360
              // (To see the difference, compare
              //    x^{x^{\left(\rule{0.1em}{0.68em}\right)}}
              // in TeX and KaTeX)
              maxDistFromAxis / 500 * delimiterFactor,
              2 * maxDistFromAxis - delimiterExtend
            );
            return makeCustomSizedDelim(delim, totalHeight, true, options, mode, classes);
          };
          var delimiter = {
            sqrtImage: makeSqrtImage,
            sizedDelim: makeSizedDelim,
            sizeToMaxHeight,
            customSizedDelim: makeCustomSizedDelim,
            leftRightDelim: makeLeftRightDelim
          };
          ;
          const delimiterSizes = {
            "\\bigl": {
              mclass: "mopen",
              size: 1
            },
            "\\Bigl": {
              mclass: "mopen",
              size: 2
            },
            "\\biggl": {
              mclass: "mopen",
              size: 3
            },
            "\\Biggl": {
              mclass: "mopen",
              size: 4
            },
            "\\bigr": {
              mclass: "mclose",
              size: 1
            },
            "\\Bigr": {
              mclass: "mclose",
              size: 2
            },
            "\\biggr": {
              mclass: "mclose",
              size: 3
            },
            "\\Biggr": {
              mclass: "mclose",
              size: 4
            },
            "\\bigm": {
              mclass: "mrel",
              size: 1
            },
            "\\Bigm": {
              mclass: "mrel",
              size: 2
            },
            "\\biggm": {
              mclass: "mrel",
              size: 3
            },
            "\\Biggm": {
              mclass: "mrel",
              size: 4
            },
            "\\big": {
              mclass: "mord",
              size: 1
            },
            "\\Big": {
              mclass: "mord",
              size: 2
            },
            "\\bigg": {
              mclass: "mord",
              size: 3
            },
            "\\Bigg": {
              mclass: "mord",
              size: 4
            }
          };
          const delimiters = ["(", "\\lparen", ")", "\\rparen", "[", "\\lbrack", "]", "\\rbrack", "\\{", "\\lbrace", "\\}", "\\rbrace", "\\lfloor", "\\rfloor", "⌊", "⌋", "\\lceil", "\\rceil", "⌈", "⌉", "<", ">", "\\langle", "⟨", "\\rangle", "⟩", "\\lt", "\\gt", "\\lvert", "\\rvert", "\\lVert", "\\rVert", "\\lgroup", "\\rgroup", "⟮", "⟯", "\\lmoustache", "\\rmoustache", "⎰", "⎱", "/", "\\backslash", "|", "\\vert", "\\|", "\\Vert", "\\uparrow", "\\Uparrow", "\\downarrow", "\\Downarrow", "\\updownarrow", "\\Updownarrow", "."];
          function checkDelimiter(delim, context) {
            const symDelim = checkSymbolNodeType(delim);
            if (symDelim && utils.contains(delimiters, symDelim.text)) {
              return symDelim;
            } else if (symDelim) {
              throw new src_ParseError("Invalid delimiter '" + symDelim.text + "' after '" + context.funcName + "'", delim);
            } else {
              throw new src_ParseError("Invalid delimiter type '" + delim.type + "'", delim);
            }
          }
          defineFunction({
            type: "delimsizing",
            names: ["\\bigl", "\\Bigl", "\\biggl", "\\Biggl", "\\bigr", "\\Bigr", "\\biggr", "\\Biggr", "\\bigm", "\\Bigm", "\\biggm", "\\Biggm", "\\big", "\\Big", "\\bigg", "\\Bigg"],
            props: {
              numArgs: 1,
              argTypes: ["primitive"]
            },
            handler: (context, args) => {
              const delim = checkDelimiter(args[0], context);
              return {
                type: "delimsizing",
                mode: context.parser.mode,
                size: delimiterSizes[context.funcName].size,
                mclass: delimiterSizes[context.funcName].mclass,
                delim: delim.text
              };
            },
            htmlBuilder: (group, options) => {
              if (group.delim === ".") {
                return buildCommon.makeSpan([group.mclass]);
              }
              return delimiter.sizedDelim(group.delim, group.size, options, group.mode, [group.mclass]);
            },
            mathmlBuilder: (group) => {
              const children = [];
              if (group.delim !== ".") {
                children.push(makeText(group.delim, group.mode));
              }
              const node = new mathMLTree.MathNode("mo", children);
              if (group.mclass === "mopen" || group.mclass === "mclose") {
                node.setAttribute("fence", "true");
              } else {
                node.setAttribute("fence", "false");
              }
              node.setAttribute("stretchy", "true");
              const size = makeEm(delimiter.sizeToMaxHeight[group.size]);
              node.setAttribute("minsize", size);
              node.setAttribute("maxsize", size);
              return node;
            }
          });
          function assertParsed(group) {
            if (!group.body) {
              throw new Error("Bug: The leftright ParseNode wasn't fully parsed.");
            }
          }
          defineFunction({
            type: "leftright-right",
            names: ["\\right"],
            props: {
              numArgs: 1,
              primitive: true
            },
            handler: (context, args) => {
              const color = context.parser.gullet.macros.get("\\current@color");
              if (color && typeof color !== "string") {
                throw new src_ParseError("\\current@color set to non-string in \\right");
              }
              return {
                type: "leftright-right",
                mode: context.parser.mode,
                delim: checkDelimiter(args[0], context).text,
                color
                // undefined if not set via \color
              };
            }
          });
          defineFunction({
            type: "leftright",
            names: ["\\left"],
            props: {
              numArgs: 1,
              primitive: true
            },
            handler: (context, args) => {
              const delim = checkDelimiter(args[0], context);
              const parser = context.parser;
              ++parser.leftrightDepth;
              const body = parser.parseExpression(false);
              --parser.leftrightDepth;
              parser.expect("\\right", false);
              const right = assertNodeType(parser.parseFunction(), "leftright-right");
              return {
                type: "leftright",
                mode: parser.mode,
                body,
                left: delim.text,
                right: right.delim,
                rightColor: right.color
              };
            },
            htmlBuilder: (group, options) => {
              assertParsed(group);
              const inner2 = buildExpression(group.body, options, true, ["mopen", "mclose"]);
              let innerHeight = 0;
              let innerDepth = 0;
              let hadMiddle = false;
              for (let i = 0; i < inner2.length; i++) {
                if (inner2[i].isMiddle) {
                  hadMiddle = true;
                } else {
                  innerHeight = Math.max(inner2[i].height, innerHeight);
                  innerDepth = Math.max(inner2[i].depth, innerDepth);
                }
              }
              innerHeight *= options.sizeMultiplier;
              innerDepth *= options.sizeMultiplier;
              let leftDelim;
              if (group.left === ".") {
                leftDelim = makeNullDelimiter(options, ["mopen"]);
              } else {
                leftDelim = delimiter.leftRightDelim(group.left, innerHeight, innerDepth, options, group.mode, ["mopen"]);
              }
              inner2.unshift(leftDelim);
              if (hadMiddle) {
                for (let i = 1; i < inner2.length; i++) {
                  const middleDelim = inner2[i];
                  const isMiddle = middleDelim.isMiddle;
                  if (isMiddle) {
                    inner2[i] = delimiter.leftRightDelim(isMiddle.delim, innerHeight, innerDepth, isMiddle.options, group.mode, []);
                  }
                }
              }
              let rightDelim;
              if (group.right === ".") {
                rightDelim = makeNullDelimiter(options, ["mclose"]);
              } else {
                const colorOptions = group.rightColor ? options.withColor(group.rightColor) : options;
                rightDelim = delimiter.leftRightDelim(group.right, innerHeight, innerDepth, colorOptions, group.mode, ["mclose"]);
              }
              inner2.push(rightDelim);
              return buildCommon.makeSpan(["minner"], inner2, options);
            },
            mathmlBuilder: (group, options) => {
              assertParsed(group);
              const inner2 = buildMathML_buildExpression(group.body, options);
              if (group.left !== ".") {
                const leftNode = new mathMLTree.MathNode("mo", [makeText(group.left, group.mode)]);
                leftNode.setAttribute("fence", "true");
                inner2.unshift(leftNode);
              }
              if (group.right !== ".") {
                const rightNode = new mathMLTree.MathNode("mo", [makeText(group.right, group.mode)]);
                rightNode.setAttribute("fence", "true");
                if (group.rightColor) {
                  rightNode.setAttribute("mathcolor", group.rightColor);
                }
                inner2.push(rightNode);
              }
              return makeRow(inner2);
            }
          });
          defineFunction({
            type: "middle",
            names: ["\\middle"],
            props: {
              numArgs: 1,
              primitive: true
            },
            handler: (context, args) => {
              const delim = checkDelimiter(args[0], context);
              if (!context.parser.leftrightDepth) {
                throw new src_ParseError("\\middle without preceding \\left", delim);
              }
              return {
                type: "middle",
                mode: context.parser.mode,
                delim: delim.text
              };
            },
            htmlBuilder: (group, options) => {
              let middleDelim;
              if (group.delim === ".") {
                middleDelim = makeNullDelimiter(options, []);
              } else {
                middleDelim = delimiter.sizedDelim(group.delim, 1, options, group.mode, []);
                const isMiddle = {
                  delim: group.delim,
                  options
                };
                middleDelim.isMiddle = isMiddle;
              }
              return middleDelim;
            },
            mathmlBuilder: (group, options) => {
              const textNode = group.delim === "\\vert" || group.delim === "|" ? makeText("|", "text") : makeText(group.delim, group.mode);
              const middleNode = new mathMLTree.MathNode("mo", [textNode]);
              middleNode.setAttribute("fence", "true");
              middleNode.setAttribute("lspace", "0.05em");
              middleNode.setAttribute("rspace", "0.05em");
              return middleNode;
            }
          });
          ;
          const enclose_htmlBuilder = (group, options) => {
            const inner2 = buildCommon.wrapFragment(buildGroup(group.body, options), options);
            const label = group.label.slice(1);
            let scale = options.sizeMultiplier;
            let img;
            let imgShift = 0;
            const isSingleChar = utils.isCharacterBox(group.body);
            if (label === "sout") {
              img = buildCommon.makeSpan(["stretchy", "sout"]);
              img.height = options.fontMetrics().defaultRuleThickness / scale;
              imgShift = -0.5 * options.fontMetrics().xHeight;
            } else if (label === "phase") {
              const lineWeight = calculateSize({
                number: 0.6,
                unit: "pt"
              }, options);
              const clearance = calculateSize({
                number: 0.35,
                unit: "ex"
              }, options);
              const newOptions = options.havingBaseSizing();
              scale = scale / newOptions.sizeMultiplier;
              const angleHeight = inner2.height + inner2.depth + lineWeight + clearance;
              inner2.style.paddingLeft = makeEm(angleHeight / 2 + lineWeight);
              const viewBoxHeight = Math.floor(1e3 * angleHeight * scale);
              const path2 = phasePath(viewBoxHeight);
              const svgNode = new SvgNode([new PathNode("phase", path2)], {
                "width": "400em",
                "height": makeEm(viewBoxHeight / 1e3),
                "viewBox": "0 0 400000 " + viewBoxHeight,
                "preserveAspectRatio": "xMinYMin slice"
              });
              img = buildCommon.makeSvgSpan(["hide-tail"], [svgNode], options);
              img.style.height = makeEm(angleHeight);
              imgShift = inner2.depth + lineWeight + clearance;
            } else {
              if (/cancel/.test(label)) {
                if (!isSingleChar) {
                  inner2.classes.push("cancel-pad");
                }
              } else if (label === "angl") {
                inner2.classes.push("anglpad");
              } else {
                inner2.classes.push("boxpad");
              }
              let topPad = 0;
              let bottomPad = 0;
              let ruleThickness = 0;
              if (/box/.test(label)) {
                ruleThickness = Math.max(
                  options.fontMetrics().fboxrule,
                  // default
                  options.minRuleThickness
                  // User override.
                );
                topPad = options.fontMetrics().fboxsep + (label === "colorbox" ? 0 : ruleThickness);
                bottomPad = topPad;
              } else if (label === "angl") {
                ruleThickness = Math.max(options.fontMetrics().defaultRuleThickness, options.minRuleThickness);
                topPad = 4 * ruleThickness;
                bottomPad = Math.max(0, 0.25 - inner2.depth);
              } else {
                topPad = isSingleChar ? 0.2 : 0;
                bottomPad = topPad;
              }
              img = stretchy.encloseSpan(inner2, label, topPad, bottomPad, options);
              if (/fbox|boxed|fcolorbox/.test(label)) {
                img.style.borderStyle = "solid";
                img.style.borderWidth = makeEm(ruleThickness);
              } else if (label === "angl" && ruleThickness !== 0.049) {
                img.style.borderTopWidth = makeEm(ruleThickness);
                img.style.borderRightWidth = makeEm(ruleThickness);
              }
              imgShift = inner2.depth + bottomPad;
              if (group.backgroundColor) {
                img.style.backgroundColor = group.backgroundColor;
                if (group.borderColor) {
                  img.style.borderColor = group.borderColor;
                }
              }
            }
            let vlist;
            if (group.backgroundColor) {
              vlist = buildCommon.makeVList({
                positionType: "individualShift",
                children: [
                  // Put the color background behind inner;
                  {
                    type: "elem",
                    elem: img,
                    shift: imgShift
                  },
                  {
                    type: "elem",
                    elem: inner2,
                    shift: 0
                  }
                ]
              }, options);
            } else {
              const classes = /cancel|phase/.test(label) ? ["svg-align"] : [];
              vlist = buildCommon.makeVList({
                positionType: "individualShift",
                children: [
                  // Write the \cancel stroke on top of inner.
                  {
                    type: "elem",
                    elem: inner2,
                    shift: 0
                  },
                  {
                    type: "elem",
                    elem: img,
                    shift: imgShift,
                    wrapperClasses: classes
                  }
                ]
              }, options);
            }
            if (/cancel/.test(label)) {
              vlist.height = inner2.height;
              vlist.depth = inner2.depth;
            }
            if (/cancel/.test(label) && !isSingleChar) {
              return buildCommon.makeSpan(["mord", "cancel-lap"], [vlist], options);
            } else {
              return buildCommon.makeSpan(["mord"], [vlist], options);
            }
          };
          const enclose_mathmlBuilder = (group, options) => {
            let fboxsep = 0;
            const node = new mathMLTree.MathNode(group.label.indexOf("colorbox") > -1 ? "mpadded" : "menclose", [buildMathML_buildGroup(group.body, options)]);
            switch (group.label) {
              case "\\cancel":
                node.setAttribute("notation", "updiagonalstrike");
                break;
              case "\\bcancel":
                node.setAttribute("notation", "downdiagonalstrike");
                break;
              case "\\phase":
                node.setAttribute("notation", "phasorangle");
                break;
              case "\\sout":
                node.setAttribute("notation", "horizontalstrike");
                break;
              case "\\fbox":
                node.setAttribute("notation", "box");
                break;
              case "\\angl":
                node.setAttribute("notation", "actuarial");
                break;
              case "\\fcolorbox":
              case "\\colorbox":
                fboxsep = options.fontMetrics().fboxsep * options.fontMetrics().ptPerEm;
                node.setAttribute("width", "+" + 2 * fboxsep + "pt");
                node.setAttribute("height", "+" + 2 * fboxsep + "pt");
                node.setAttribute("lspace", fboxsep + "pt");
                node.setAttribute("voffset", fboxsep + "pt");
                if (group.label === "\\fcolorbox") {
                  const thk = Math.max(
                    options.fontMetrics().fboxrule,
                    // default
                    options.minRuleThickness
                    // user override
                  );
                  node.setAttribute("style", "border: " + thk + "em solid " + String(group.borderColor));
                }
                break;
              case "\\xcancel":
                node.setAttribute("notation", "updiagonalstrike downdiagonalstrike");
                break;
            }
            if (group.backgroundColor) {
              node.setAttribute("mathbackground", group.backgroundColor);
            }
            return node;
          };
          defineFunction({
            type: "enclose",
            names: ["\\colorbox"],
            props: {
              numArgs: 2,
              allowedInText: true,
              argTypes: ["color", "text"]
            },
            handler(_ref, args, optArgs) {
              let {
                parser,
                funcName
              } = _ref;
              const color = assertNodeType(args[0], "color-token").color;
              const body = args[1];
              return {
                type: "enclose",
                mode: parser.mode,
                label: funcName,
                backgroundColor: color,
                body
              };
            },
            htmlBuilder: enclose_htmlBuilder,
            mathmlBuilder: enclose_mathmlBuilder
          });
          defineFunction({
            type: "enclose",
            names: ["\\fcolorbox"],
            props: {
              numArgs: 3,
              allowedInText: true,
              argTypes: ["color", "color", "text"]
            },
            handler(_ref2, args, optArgs) {
              let {
                parser,
                funcName
              } = _ref2;
              const borderColor = assertNodeType(args[0], "color-token").color;
              const backgroundColor = assertNodeType(args[1], "color-token").color;
              const body = args[2];
              return {
                type: "enclose",
                mode: parser.mode,
                label: funcName,
                backgroundColor,
                borderColor,
                body
              };
            },
            htmlBuilder: enclose_htmlBuilder,
            mathmlBuilder: enclose_mathmlBuilder
          });
          defineFunction({
            type: "enclose",
            names: ["\\fbox"],
            props: {
              numArgs: 1,
              argTypes: ["hbox"],
              allowedInText: true
            },
            handler(_ref3, args) {
              let {
                parser
              } = _ref3;
              return {
                type: "enclose",
                mode: parser.mode,
                label: "\\fbox",
                body: args[0]
              };
            }
          });
          defineFunction({
            type: "enclose",
            names: ["\\cancel", "\\bcancel", "\\xcancel", "\\sout", "\\phase"],
            props: {
              numArgs: 1
            },
            handler(_ref4, args) {
              let {
                parser,
                funcName
              } = _ref4;
              const body = args[0];
              return {
                type: "enclose",
                mode: parser.mode,
                label: funcName,
                body
              };
            },
            htmlBuilder: enclose_htmlBuilder,
            mathmlBuilder: enclose_mathmlBuilder
          });
          defineFunction({
            type: "enclose",
            names: ["\\angl"],
            props: {
              numArgs: 1,
              argTypes: ["hbox"],
              allowedInText: false
            },
            handler(_ref5, args) {
              let {
                parser
              } = _ref5;
              return {
                type: "enclose",
                mode: parser.mode,
                label: "\\angl",
                body: args[0]
              };
            }
          });
          ;
          const _environments = {};
          function defineEnvironment(_ref) {
            let {
              type,
              names,
              props,
              handler,
              htmlBuilder: htmlBuilder2,
              mathmlBuilder: mathmlBuilder2
            } = _ref;
            const data = {
              type,
              numArgs: props.numArgs || 0,
              allowedInText: false,
              numOptionalArgs: 0,
              handler
            };
            for (let i = 0; i < names.length; ++i) {
              _environments[names[i]] = data;
            }
            if (htmlBuilder2) {
              _htmlGroupBuilders[type] = htmlBuilder2;
            }
            if (mathmlBuilder2) {
              _mathmlGroupBuilders[type] = mathmlBuilder2;
            }
          }
          ;
          const _macros = {};
          function defineMacro(name, body) {
            _macros[name] = body;
          }
          ;
          class SourceLocation {
            // The + prefix indicates that these fields aren't writeable
            // Lexer holding the input string.
            // Start offset, zero-based inclusive.
            // End offset, zero-based exclusive.
            constructor(lexer, start, end) {
              this.lexer = void 0;
              this.start = void 0;
              this.end = void 0;
              this.lexer = lexer;
              this.start = start;
              this.end = end;
            }
            /**
             * Merges two `SourceLocation`s from location providers, given they are
             * provided in order of appearance.
             * - Returns the first one's location if only the first is provided.
             * - Returns a merged range of the first and the last if both are provided
             *   and their lexers match.
             * - Otherwise, returns null.
             */
            static range(first, second) {
              if (!second) {
                return first && first.loc;
              } else if (!first || !first.loc || !second.loc || first.loc.lexer !== second.loc.lexer) {
                return null;
              } else {
                return new SourceLocation(first.loc.lexer, first.loc.start, second.loc.end);
              }
            }
          }
          ;
          class Token {
            // don't expand the token
            // used in \noexpand
            constructor(text, loc) {
              this.text = void 0;
              this.loc = void 0;
              this.noexpand = void 0;
              this.treatAsRelax = void 0;
              this.text = text;
              this.loc = loc;
            }
            /**
             * Given a pair of tokens (this and endToken), compute a `Token` encompassing
             * the whole input range enclosed by these two.
             */
            range(endToken, text) {
              return new Token(text, SourceLocation.range(this, endToken));
            }
          }
          ;
          function getHLines(parser) {
            const hlineInfo = [];
            parser.consumeSpaces();
            let nxt = parser.fetch().text;
            if (nxt === "\\relax") {
              parser.consume();
              parser.consumeSpaces();
              nxt = parser.fetch().text;
            }
            while (nxt === "\\hline" || nxt === "\\hdashline") {
              parser.consume();
              hlineInfo.push(nxt === "\\hdashline");
              parser.consumeSpaces();
              nxt = parser.fetch().text;
            }
            return hlineInfo;
          }
          const validateAmsEnvironmentContext = (context) => {
            const settings = context.parser.settings;
            if (!settings.displayMode) {
              throw new src_ParseError("{" + context.envName + "} can be used only in display mode.");
            }
          };
          function getAutoTag(name) {
            if (name.indexOf("ed") === -1) {
              return name.indexOf("*") === -1;
            }
          }
          function parseArray(parser, _ref, style) {
            let {
              hskipBeforeAndAfter,
              addJot,
              cols,
              arraystretch,
              colSeparationType,
              autoTag,
              singleRow,
              emptySingleRow,
              maxNumCols,
              leqno
            } = _ref;
            parser.gullet.beginGroup();
            if (!singleRow) {
              parser.gullet.macros.set("\\cr", "\\\\\\relax");
            }
            if (!arraystretch) {
              const stretch = parser.gullet.expandMacroAsText("\\arraystretch");
              if (stretch == null) {
                arraystretch = 1;
              } else {
                arraystretch = parseFloat(stretch);
                if (!arraystretch || arraystretch < 0) {
                  throw new src_ParseError("Invalid \\arraystretch: " + stretch);
                }
              }
            }
            parser.gullet.beginGroup();
            let row = [];
            const body = [row];
            const rowGaps = [];
            const hLinesBeforeRow = [];
            const tags = autoTag != null ? [] : void 0;
            function beginRow() {
              if (autoTag) {
                parser.gullet.macros.set("\\@eqnsw", "1", true);
              }
            }
            function endRow() {
              if (tags) {
                if (parser.gullet.macros.get("\\df@tag")) {
                  tags.push(parser.subparse([new Token("\\df@tag")]));
                  parser.gullet.macros.set("\\df@tag", void 0, true);
                } else {
                  tags.push(Boolean(autoTag) && parser.gullet.macros.get("\\@eqnsw") === "1");
                }
              }
            }
            beginRow();
            hLinesBeforeRow.push(getHLines(parser));
            while (true) {
              let cell = parser.parseExpression(false, singleRow ? "\\end" : "\\\\");
              parser.gullet.endGroup();
              parser.gullet.beginGroup();
              cell = {
                type: "ordgroup",
                mode: parser.mode,
                body: cell
              };
              if (style) {
                cell = {
                  type: "styling",
                  mode: parser.mode,
                  style,
                  body: [cell]
                };
              }
              row.push(cell);
              const next = parser.fetch().text;
              if (next === "&") {
                if (maxNumCols && row.length === maxNumCols) {
                  if (singleRow || colSeparationType) {
                    throw new src_ParseError("Too many tab characters: &", parser.nextToken);
                  } else {
                    parser.settings.reportNonstrict("textEnv", "Too few columns specified in the {array} column argument.");
                  }
                }
                parser.consume();
              } else if (next === "\\end") {
                endRow();
                if (row.length === 1 && cell.type === "styling" && cell.body[0].body.length === 0 && (body.length > 1 || !emptySingleRow)) {
                  body.pop();
                }
                if (hLinesBeforeRow.length < body.length + 1) {
                  hLinesBeforeRow.push([]);
                }
                break;
              } else if (next === "\\\\") {
                parser.consume();
                let size;
                if (parser.gullet.future().text !== " ") {
                  size = parser.parseSizeGroup(true);
                }
                rowGaps.push(size ? size.value : null);
                endRow();
                hLinesBeforeRow.push(getHLines(parser));
                row = [];
                body.push(row);
                beginRow();
              } else {
                throw new src_ParseError("Expected & or \\\\ or \\cr or \\end", parser.nextToken);
              }
            }
            parser.gullet.endGroup();
            parser.gullet.endGroup();
            return {
              type: "array",
              mode: parser.mode,
              addJot,
              arraystretch,
              body,
              cols,
              rowGaps,
              hskipBeforeAndAfter,
              hLinesBeforeRow,
              colSeparationType,
              tags,
              leqno
            };
          }
          function dCellStyle(envName) {
            if (envName.slice(0, 1) === "d") {
              return "display";
            } else {
              return "text";
            }
          }
          const array_htmlBuilder = function(group, options) {
            let r;
            let c;
            const nr = group.body.length;
            const hLinesBeforeRow = group.hLinesBeforeRow;
            let nc = 0;
            let body = new Array(nr);
            const hlines = [];
            const ruleThickness = Math.max(
              // From LaTeX \showthe\arrayrulewidth. Equals 0.04 em.
              options.fontMetrics().arrayRuleWidth,
              options.minRuleThickness
              // User override.
            );
            const pt = 1 / options.fontMetrics().ptPerEm;
            let arraycolsep = 5 * pt;
            if (group.colSeparationType && group.colSeparationType === "small") {
              const localMultiplier = options.havingStyle(src_Style.SCRIPT).sizeMultiplier;
              arraycolsep = 0.2778 * (localMultiplier / options.sizeMultiplier);
            }
            const baselineskip = group.colSeparationType === "CD" ? calculateSize({
              number: 3,
              unit: "ex"
            }, options) : 12 * pt;
            const jot = 3 * pt;
            const arrayskip = group.arraystretch * baselineskip;
            const arstrutHeight = 0.7 * arrayskip;
            const arstrutDepth = 0.3 * arrayskip;
            let totalHeight = 0;
            function setHLinePos(hlinesInGap) {
              for (let i = 0; i < hlinesInGap.length; ++i) {
                if (i > 0) {
                  totalHeight += 0.25;
                }
                hlines.push({
                  pos: totalHeight,
                  isDashed: hlinesInGap[i]
                });
              }
            }
            setHLinePos(hLinesBeforeRow[0]);
            for (r = 0; r < group.body.length; ++r) {
              const inrow = group.body[r];
              let height = arstrutHeight;
              let depth = arstrutDepth;
              if (nc < inrow.length) {
                nc = inrow.length;
              }
              const outrow = new Array(inrow.length);
              for (c = 0; c < inrow.length; ++c) {
                const elt = buildGroup(inrow[c], options);
                if (depth < elt.depth) {
                  depth = elt.depth;
                }
                if (height < elt.height) {
                  height = elt.height;
                }
                outrow[c] = elt;
              }
              const rowGap = group.rowGaps[r];
              let gap = 0;
              if (rowGap) {
                gap = calculateSize(rowGap, options);
                if (gap > 0) {
                  gap += arstrutDepth;
                  if (depth < gap) {
                    depth = gap;
                  }
                  gap = 0;
                }
              }
              if (group.addJot) {
                depth += jot;
              }
              outrow.height = height;
              outrow.depth = depth;
              totalHeight += height;
              outrow.pos = totalHeight;
              totalHeight += depth + gap;
              body[r] = outrow;
              setHLinePos(hLinesBeforeRow[r + 1]);
            }
            const offset = totalHeight / 2 + options.fontMetrics().axisHeight;
            const colDescriptions = group.cols || [];
            const cols = [];
            let colSep;
            let colDescrNum;
            const tagSpans = [];
            if (group.tags && group.tags.some((tag) => tag)) {
              for (r = 0; r < nr; ++r) {
                const rw = body[r];
                const shift = rw.pos - offset;
                const tag = group.tags[r];
                let tagSpan;
                if (tag === true) {
                  tagSpan = buildCommon.makeSpan(["eqn-num"], [], options);
                } else if (tag === false) {
                  tagSpan = buildCommon.makeSpan([], [], options);
                } else {
                  tagSpan = buildCommon.makeSpan([], buildExpression(tag, options, true), options);
                }
                tagSpan.depth = rw.depth;
                tagSpan.height = rw.height;
                tagSpans.push({
                  type: "elem",
                  elem: tagSpan,
                  shift
                });
              }
            }
            for (
              c = 0, colDescrNum = 0;
              // Continue while either there are more columns or more column
              // descriptions, so trailing separators don't get lost.
              c < nc || colDescrNum < colDescriptions.length;
              ++c, ++colDescrNum
            ) {
              let colDescr = colDescriptions[colDescrNum] || {};
              let firstSeparator = true;
              while (colDescr.type === "separator") {
                if (!firstSeparator) {
                  colSep = buildCommon.makeSpan(["arraycolsep"], []);
                  colSep.style.width = makeEm(options.fontMetrics().doubleRuleSep);
                  cols.push(colSep);
                }
                if (colDescr.separator === "|" || colDescr.separator === ":") {
                  const lineType = colDescr.separator === "|" ? "solid" : "dashed";
                  const separator = buildCommon.makeSpan(["vertical-separator"], [], options);
                  separator.style.height = makeEm(totalHeight);
                  separator.style.borderRightWidth = makeEm(ruleThickness);
                  separator.style.borderRightStyle = lineType;
                  separator.style.margin = "0 " + makeEm(-ruleThickness / 2);
                  const shift = totalHeight - offset;
                  if (shift) {
                    separator.style.verticalAlign = makeEm(-shift);
                  }
                  cols.push(separator);
                } else {
                  throw new src_ParseError("Invalid separator type: " + colDescr.separator);
                }
                colDescrNum++;
                colDescr = colDescriptions[colDescrNum] || {};
                firstSeparator = false;
              }
              if (c >= nc) {
                continue;
              }
              let sepwidth;
              if (c > 0 || group.hskipBeforeAndAfter) {
                sepwidth = utils.deflt(colDescr.pregap, arraycolsep);
                if (sepwidth !== 0) {
                  colSep = buildCommon.makeSpan(["arraycolsep"], []);
                  colSep.style.width = makeEm(sepwidth);
                  cols.push(colSep);
                }
              }
              let col = [];
              for (r = 0; r < nr; ++r) {
                const row = body[r];
                const elem = row[c];
                if (!elem) {
                  continue;
                }
                const shift = row.pos - offset;
                elem.depth = row.depth;
                elem.height = row.height;
                col.push({
                  type: "elem",
                  elem,
                  shift
                });
              }
              col = buildCommon.makeVList({
                positionType: "individualShift",
                children: col
              }, options);
              col = buildCommon.makeSpan(["col-align-" + (colDescr.align || "c")], [col]);
              cols.push(col);
              if (c < nc - 1 || group.hskipBeforeAndAfter) {
                sepwidth = utils.deflt(colDescr.postgap, arraycolsep);
                if (sepwidth !== 0) {
                  colSep = buildCommon.makeSpan(["arraycolsep"], []);
                  colSep.style.width = makeEm(sepwidth);
                  cols.push(colSep);
                }
              }
            }
            body = buildCommon.makeSpan(["mtable"], cols);
            if (hlines.length > 0) {
              const line = buildCommon.makeLineSpan("hline", options, ruleThickness);
              const dashes = buildCommon.makeLineSpan("hdashline", options, ruleThickness);
              const vListElems = [{
                type: "elem",
                elem: body,
                shift: 0
              }];
              while (hlines.length > 0) {
                const hline = hlines.pop();
                const lineShift = hline.pos - offset;
                if (hline.isDashed) {
                  vListElems.push({
                    type: "elem",
                    elem: dashes,
                    shift: lineShift
                  });
                } else {
                  vListElems.push({
                    type: "elem",
                    elem: line,
                    shift: lineShift
                  });
                }
              }
              body = buildCommon.makeVList({
                positionType: "individualShift",
                children: vListElems
              }, options);
            }
            if (tagSpans.length === 0) {
              return buildCommon.makeSpan(["mord"], [body], options);
            } else {
              let eqnNumCol = buildCommon.makeVList({
                positionType: "individualShift",
                children: tagSpans
              }, options);
              eqnNumCol = buildCommon.makeSpan(["tag"], [eqnNumCol], options);
              return buildCommon.makeFragment([body, eqnNumCol]);
            }
          };
          const alignMap = {
            c: "center ",
            l: "left ",
            r: "right "
          };
          const array_mathmlBuilder = function(group, options) {
            const tbl = [];
            const glue = new mathMLTree.MathNode("mtd", [], ["mtr-glue"]);
            const tag = new mathMLTree.MathNode("mtd", [], ["mml-eqn-num"]);
            for (let i = 0; i < group.body.length; i++) {
              const rw = group.body[i];
              const row = [];
              for (let j = 0; j < rw.length; j++) {
                row.push(new mathMLTree.MathNode("mtd", [buildMathML_buildGroup(rw[j], options)]));
              }
              if (group.tags && group.tags[i]) {
                row.unshift(glue);
                row.push(glue);
                if (group.leqno) {
                  row.unshift(tag);
                } else {
                  row.push(tag);
                }
              }
              tbl.push(new mathMLTree.MathNode("mtr", row));
            }
            let table = new mathMLTree.MathNode("mtable", tbl);
            const gap = group.arraystretch === 0.5 ? 0.1 : 0.16 + group.arraystretch - 1 + (group.addJot ? 0.09 : 0);
            table.setAttribute("rowspacing", makeEm(gap));
            let menclose = "";
            let align = "";
            if (group.cols && group.cols.length > 0) {
              const cols = group.cols;
              let columnLines = "";
              let prevTypeWasAlign = false;
              let iStart = 0;
              let iEnd = cols.length;
              if (cols[0].type === "separator") {
                menclose += "top ";
                iStart = 1;
              }
              if (cols[cols.length - 1].type === "separator") {
                menclose += "bottom ";
                iEnd -= 1;
              }
              for (let i = iStart; i < iEnd; i++) {
                if (cols[i].type === "align") {
                  align += alignMap[cols[i].align];
                  if (prevTypeWasAlign) {
                    columnLines += "none ";
                  }
                  prevTypeWasAlign = true;
                } else if (cols[i].type === "separator") {
                  if (prevTypeWasAlign) {
                    columnLines += cols[i].separator === "|" ? "solid " : "dashed ";
                    prevTypeWasAlign = false;
                  }
                }
              }
              table.setAttribute("columnalign", align.trim());
              if (/[sd]/.test(columnLines)) {
                table.setAttribute("columnlines", columnLines.trim());
              }
            }
            if (group.colSeparationType === "align") {
              const cols = group.cols || [];
              let spacing2 = "";
              for (let i = 1; i < cols.length; i++) {
                spacing2 += i % 2 ? "0em " : "1em ";
              }
              table.setAttribute("columnspacing", spacing2.trim());
            } else if (group.colSeparationType === "alignat" || group.colSeparationType === "gather") {
              table.setAttribute("columnspacing", "0em");
            } else if (group.colSeparationType === "small") {
              table.setAttribute("columnspacing", "0.2778em");
            } else if (group.colSeparationType === "CD") {
              table.setAttribute("columnspacing", "0.5em");
            } else {
              table.setAttribute("columnspacing", "1em");
            }
            let rowLines = "";
            const hlines = group.hLinesBeforeRow;
            menclose += hlines[0].length > 0 ? "left " : "";
            menclose += hlines[hlines.length - 1].length > 0 ? "right " : "";
            for (let i = 1; i < hlines.length - 1; i++) {
              rowLines += hlines[i].length === 0 ? "none " : hlines[i][0] ? "dashed " : "solid ";
            }
            if (/[sd]/.test(rowLines)) {
              table.setAttribute("rowlines", rowLines.trim());
            }
            if (menclose !== "") {
              table = new mathMLTree.MathNode("menclose", [table]);
              table.setAttribute("notation", menclose.trim());
            }
            if (group.arraystretch && group.arraystretch < 1) {
              table = new mathMLTree.MathNode("mstyle", [table]);
              table.setAttribute("scriptlevel", "1");
            }
            return table;
          };
          const alignedHandler = function(context, args) {
            if (context.envName.indexOf("ed") === -1) {
              validateAmsEnvironmentContext(context);
            }
            const cols = [];
            const separationType = context.envName.indexOf("at") > -1 ? "alignat" : "align";
            const isSplit = context.envName === "split";
            const res = parseArray(context.parser, {
              cols,
              addJot: true,
              autoTag: isSplit ? void 0 : getAutoTag(context.envName),
              emptySingleRow: true,
              colSeparationType: separationType,
              maxNumCols: isSplit ? 2 : void 0,
              leqno: context.parser.settings.leqno
            }, "display");
            let numMaths;
            let numCols = 0;
            const emptyGroup = {
              type: "ordgroup",
              mode: context.mode,
              body: []
            };
            if (args[0] && args[0].type === "ordgroup") {
              let arg0 = "";
              for (let i = 0; i < args[0].body.length; i++) {
                const textord2 = assertNodeType(args[0].body[i], "textord");
                arg0 += textord2.text;
              }
              numMaths = Number(arg0);
              numCols = numMaths * 2;
            }
            const isAligned = !numCols;
            res.body.forEach(function(row) {
              for (let i = 1; i < row.length; i += 2) {
                const styling = assertNodeType(row[i], "styling");
                const ordgroup = assertNodeType(styling.body[0], "ordgroup");
                ordgroup.body.unshift(emptyGroup);
              }
              if (!isAligned) {
                const curMaths = row.length / 2;
                if (numMaths < curMaths) {
                  throw new src_ParseError("Too many math in a row: " + ("expected " + numMaths + ", but got " + curMaths), row[0]);
                }
              } else if (numCols < row.length) {
                numCols = row.length;
              }
            });
            for (let i = 0; i < numCols; ++i) {
              let align = "r";
              let pregap = 0;
              if (i % 2 === 1) {
                align = "l";
              } else if (i > 0 && isAligned) {
                pregap = 1;
              }
              cols[i] = {
                type: "align",
                align,
                pregap,
                postgap: 0
              };
            }
            res.colSeparationType = isAligned ? "align" : "alignat";
            return res;
          };
          defineEnvironment({
            type: "array",
            names: ["array", "darray"],
            props: {
              numArgs: 1
            },
            handler(context, args) {
              const symNode = checkSymbolNodeType(args[0]);
              const colalign = symNode ? [args[0]] : assertNodeType(args[0], "ordgroup").body;
              const cols = colalign.map(function(nde) {
                const node = assertSymbolNodeType(nde);
                const ca = node.text;
                if ("lcr".indexOf(ca) !== -1) {
                  return {
                    type: "align",
                    align: ca
                  };
                } else if (ca === "|") {
                  return {
                    type: "separator",
                    separator: "|"
                  };
                } else if (ca === ":") {
                  return {
                    type: "separator",
                    separator: ":"
                  };
                }
                throw new src_ParseError("Unknown column alignment: " + ca, nde);
              });
              const res = {
                cols,
                hskipBeforeAndAfter: true,
                // \@preamble in lttab.dtx
                maxNumCols: cols.length
              };
              return parseArray(context.parser, res, dCellStyle(context.envName));
            },
            htmlBuilder: array_htmlBuilder,
            mathmlBuilder: array_mathmlBuilder
          });
          defineEnvironment({
            type: "array",
            names: ["matrix", "pmatrix", "bmatrix", "Bmatrix", "vmatrix", "Vmatrix", "matrix*", "pmatrix*", "bmatrix*", "Bmatrix*", "vmatrix*", "Vmatrix*"],
            props: {
              numArgs: 0
            },
            handler(context) {
              const delimiters2 = {
                "matrix": null,
                "pmatrix": ["(", ")"],
                "bmatrix": ["[", "]"],
                "Bmatrix": ["\\{", "\\}"],
                "vmatrix": ["|", "|"],
                "Vmatrix": ["\\Vert", "\\Vert"]
              }[context.envName.replace("*", "")];
              let colAlign = "c";
              const payload = {
                hskipBeforeAndAfter: false,
                cols: [{
                  type: "align",
                  align: colAlign
                }]
              };
              if (context.envName.charAt(context.envName.length - 1) === "*") {
                const parser = context.parser;
                parser.consumeSpaces();
                if (parser.fetch().text === "[") {
                  parser.consume();
                  parser.consumeSpaces();
                  colAlign = parser.fetch().text;
                  if ("lcr".indexOf(colAlign) === -1) {
                    throw new src_ParseError("Expected l or c or r", parser.nextToken);
                  }
                  parser.consume();
                  parser.consumeSpaces();
                  parser.expect("]");
                  parser.consume();
                  payload.cols = [{
                    type: "align",
                    align: colAlign
                  }];
                }
              }
              const res = parseArray(context.parser, payload, dCellStyle(context.envName));
              const numCols = Math.max(0, ...res.body.map((row) => row.length));
              res.cols = new Array(numCols).fill({
                type: "align",
                align: colAlign
              });
              return delimiters2 ? {
                type: "leftright",
                mode: context.mode,
                body: [res],
                left: delimiters2[0],
                right: delimiters2[1],
                rightColor: void 0
                // \right uninfluenced by \color in array
              } : res;
            },
            htmlBuilder: array_htmlBuilder,
            mathmlBuilder: array_mathmlBuilder
          });
          defineEnvironment({
            type: "array",
            names: ["smallmatrix"],
            props: {
              numArgs: 0
            },
            handler(context) {
              const payload = {
                arraystretch: 0.5
              };
              const res = parseArray(context.parser, payload, "script");
              res.colSeparationType = "small";
              return res;
            },
            htmlBuilder: array_htmlBuilder,
            mathmlBuilder: array_mathmlBuilder
          });
          defineEnvironment({
            type: "array",
            names: ["subarray"],
            props: {
              numArgs: 1
            },
            handler(context, args) {
              const symNode = checkSymbolNodeType(args[0]);
              const colalign = symNode ? [args[0]] : assertNodeType(args[0], "ordgroup").body;
              const cols = colalign.map(function(nde) {
                const node = assertSymbolNodeType(nde);
                const ca = node.text;
                if ("lc".indexOf(ca) !== -1) {
                  return {
                    type: "align",
                    align: ca
                  };
                }
                throw new src_ParseError("Unknown column alignment: " + ca, nde);
              });
              if (cols.length > 1) {
                throw new src_ParseError("{subarray} can contain only one column");
              }
              let res = {
                cols,
                hskipBeforeAndAfter: false,
                arraystretch: 0.5
              };
              res = parseArray(context.parser, res, "script");
              if (res.body.length > 0 && res.body[0].length > 1) {
                throw new src_ParseError("{subarray} can contain only one column");
              }
              return res;
            },
            htmlBuilder: array_htmlBuilder,
            mathmlBuilder: array_mathmlBuilder
          });
          defineEnvironment({
            type: "array",
            names: ["cases", "dcases", "rcases", "drcases"],
            props: {
              numArgs: 0
            },
            handler(context) {
              const payload = {
                arraystretch: 1.2,
                cols: [{
                  type: "align",
                  align: "l",
                  pregap: 0,
                  // TODO(kevinb) get the current style.
                  // For now we use the metrics for TEXT style which is what we were
                  // doing before.  Before attempting to get the current style we
                  // should look at TeX's behavior especially for \over and matrices.
                  postgap: 1
                  /* 1em quad */
                }, {
                  type: "align",
                  align: "l",
                  pregap: 0,
                  postgap: 0
                }]
              };
              const res = parseArray(context.parser, payload, dCellStyle(context.envName));
              return {
                type: "leftright",
                mode: context.mode,
                body: [res],
                left: context.envName.indexOf("r") > -1 ? "." : "\\{",
                right: context.envName.indexOf("r") > -1 ? "\\}" : ".",
                rightColor: void 0
              };
            },
            htmlBuilder: array_htmlBuilder,
            mathmlBuilder: array_mathmlBuilder
          });
          defineEnvironment({
            type: "array",
            names: ["align", "align*", "aligned", "split"],
            props: {
              numArgs: 0
            },
            handler: alignedHandler,
            htmlBuilder: array_htmlBuilder,
            mathmlBuilder: array_mathmlBuilder
          });
          defineEnvironment({
            type: "array",
            names: ["gathered", "gather", "gather*"],
            props: {
              numArgs: 0
            },
            handler(context) {
              if (utils.contains(["gather", "gather*"], context.envName)) {
                validateAmsEnvironmentContext(context);
              }
              const res = {
                cols: [{
                  type: "align",
                  align: "c"
                }],
                addJot: true,
                colSeparationType: "gather",
                autoTag: getAutoTag(context.envName),
                emptySingleRow: true,
                leqno: context.parser.settings.leqno
              };
              return parseArray(context.parser, res, "display");
            },
            htmlBuilder: array_htmlBuilder,
            mathmlBuilder: array_mathmlBuilder
          });
          defineEnvironment({
            type: "array",
            names: ["alignat", "alignat*", "alignedat"],
            props: {
              numArgs: 1
            },
            handler: alignedHandler,
            htmlBuilder: array_htmlBuilder,
            mathmlBuilder: array_mathmlBuilder
          });
          defineEnvironment({
            type: "array",
            names: ["equation", "equation*"],
            props: {
              numArgs: 0
            },
            handler(context) {
              validateAmsEnvironmentContext(context);
              const res = {
                autoTag: getAutoTag(context.envName),
                emptySingleRow: true,
                singleRow: true,
                maxNumCols: 1,
                leqno: context.parser.settings.leqno
              };
              return parseArray(context.parser, res, "display");
            },
            htmlBuilder: array_htmlBuilder,
            mathmlBuilder: array_mathmlBuilder
          });
          defineEnvironment({
            type: "array",
            names: ["CD"],
            props: {
              numArgs: 0
            },
            handler(context) {
              validateAmsEnvironmentContext(context);
              return parseCD(context.parser);
            },
            htmlBuilder: array_htmlBuilder,
            mathmlBuilder: array_mathmlBuilder
          });
          defineMacro("\\nonumber", "\\gdef\\@eqnsw{0}");
          defineMacro("\\notag", "\\nonumber");
          defineFunction({
            type: "text",
            // Doesn't matter what this is.
            names: ["\\hline", "\\hdashline"],
            props: {
              numArgs: 0,
              allowedInText: true,
              allowedInMath: true
            },
            handler(context, args) {
              throw new src_ParseError(context.funcName + " valid only within array environment");
            }
          });
          ;
          const environments = _environments;
          var src_environments = environments;
          ;
          defineFunction({
            type: "environment",
            names: ["\\begin", "\\end"],
            props: {
              numArgs: 1,
              argTypes: ["text"]
            },
            handler(_ref, args) {
              let {
                parser,
                funcName
              } = _ref;
              const nameGroup = args[0];
              if (nameGroup.type !== "ordgroup") {
                throw new src_ParseError("Invalid environment name", nameGroup);
              }
              let envName = "";
              for (let i = 0; i < nameGroup.body.length; ++i) {
                envName += assertNodeType(nameGroup.body[i], "textord").text;
              }
              if (funcName === "\\begin") {
                if (!src_environments.hasOwnProperty(envName)) {
                  throw new src_ParseError("No such environment: " + envName, nameGroup);
                }
                const env = src_environments[envName];
                const {
                  args: args2,
                  optArgs
                } = parser.parseArguments("\\begin{" + envName + "}", env);
                const context = {
                  mode: parser.mode,
                  envName,
                  parser
                };
                const result = env.handler(context, args2, optArgs);
                parser.expect("\\end", false);
                const endNameToken = parser.nextToken;
                const end = assertNodeType(parser.parseFunction(), "environment");
                if (end.name !== envName) {
                  throw new src_ParseError("Mismatch: \\begin{" + envName + "} matched by \\end{" + end.name + "}", endNameToken);
                }
                return result;
              }
              return {
                type: "environment",
                mode: parser.mode,
                name: envName,
                nameGroup
              };
            }
          });
          ;
          const font_htmlBuilder = (group, options) => {
            const font = group.font;
            const newOptions = options.withFont(font);
            return buildGroup(group.body, newOptions);
          };
          const font_mathmlBuilder = (group, options) => {
            const font = group.font;
            const newOptions = options.withFont(font);
            return buildMathML_buildGroup(group.body, newOptions);
          };
          const fontAliases = {
            "\\Bbb": "\\mathbb",
            "\\bold": "\\mathbf",
            "\\frak": "\\mathfrak",
            "\\bm": "\\boldsymbol"
          };
          defineFunction({
            type: "font",
            names: [
              // styles, except \boldsymbol defined below
              "\\mathrm",
              "\\mathit",
              "\\mathbf",
              "\\mathnormal",
              "\\mathsfit",
              // families
              "\\mathbb",
              "\\mathcal",
              "\\mathfrak",
              "\\mathscr",
              "\\mathsf",
              "\\mathtt",
              // aliases, except \bm defined below
              "\\Bbb",
              "\\bold",
              "\\frak"
            ],
            props: {
              numArgs: 1,
              allowedInArgument: true
            },
            handler: (_ref, args) => {
              let {
                parser,
                funcName
              } = _ref;
              const body = normalizeArgument(args[0]);
              let func = funcName;
              if (func in fontAliases) {
                func = fontAliases[func];
              }
              return {
                type: "font",
                mode: parser.mode,
                font: func.slice(1),
                body
              };
            },
            htmlBuilder: font_htmlBuilder,
            mathmlBuilder: font_mathmlBuilder
          });
          defineFunction({
            type: "mclass",
            names: ["\\boldsymbol", "\\bm"],
            props: {
              numArgs: 1
            },
            handler: (_ref2, args) => {
              let {
                parser
              } = _ref2;
              const body = args[0];
              const isCharacterBox2 = utils.isCharacterBox(body);
              return {
                type: "mclass",
                mode: parser.mode,
                mclass: binrelClass(body),
                body: [{
                  type: "font",
                  mode: parser.mode,
                  font: "boldsymbol",
                  body
                }],
                isCharacterBox: isCharacterBox2
              };
            }
          });
          defineFunction({
            type: "font",
            names: ["\\rm", "\\sf", "\\tt", "\\bf", "\\it", "\\cal"],
            props: {
              numArgs: 0,
              allowedInText: true
            },
            handler: (_ref3, args) => {
              let {
                parser,
                funcName,
                breakOnTokenText
              } = _ref3;
              const {
                mode
              } = parser;
              const body = parser.parseExpression(true, breakOnTokenText);
              const style = "math" + funcName.slice(1);
              return {
                type: "font",
                mode,
                font: style,
                body: {
                  type: "ordgroup",
                  mode: parser.mode,
                  body
                }
              };
            },
            htmlBuilder: font_htmlBuilder,
            mathmlBuilder: font_mathmlBuilder
          });
          ;
          const adjustStyle = (size, originalStyle) => {
            let style = originalStyle;
            if (size === "display") {
              style = style.id >= src_Style.SCRIPT.id ? style.text() : src_Style.DISPLAY;
            } else if (size === "text" && style.size === src_Style.DISPLAY.size) {
              style = src_Style.TEXT;
            } else if (size === "script") {
              style = src_Style.SCRIPT;
            } else if (size === "scriptscript") {
              style = src_Style.SCRIPTSCRIPT;
            }
            return style;
          };
          const genfrac_htmlBuilder = (group, options) => {
            const style = adjustStyle(group.size, options.style);
            const nstyle = style.fracNum();
            const dstyle = style.fracDen();
            let newOptions;
            newOptions = options.havingStyle(nstyle);
            const numerm = buildGroup(group.numer, newOptions, options);
            if (group.continued) {
              const hStrut = 8.5 / options.fontMetrics().ptPerEm;
              const dStrut = 3.5 / options.fontMetrics().ptPerEm;
              numerm.height = numerm.height < hStrut ? hStrut : numerm.height;
              numerm.depth = numerm.depth < dStrut ? dStrut : numerm.depth;
            }
            newOptions = options.havingStyle(dstyle);
            const denomm = buildGroup(group.denom, newOptions, options);
            let rule;
            let ruleWidth;
            let ruleSpacing;
            if (group.hasBarLine) {
              if (group.barSize) {
                ruleWidth = calculateSize(group.barSize, options);
                rule = buildCommon.makeLineSpan("frac-line", options, ruleWidth);
              } else {
                rule = buildCommon.makeLineSpan("frac-line", options);
              }
              ruleWidth = rule.height;
              ruleSpacing = rule.height;
            } else {
              rule = null;
              ruleWidth = 0;
              ruleSpacing = options.fontMetrics().defaultRuleThickness;
            }
            let numShift;
            let clearance;
            let denomShift;
            if (style.size === src_Style.DISPLAY.size || group.size === "display") {
              numShift = options.fontMetrics().num1;
              if (ruleWidth > 0) {
                clearance = 3 * ruleSpacing;
              } else {
                clearance = 7 * ruleSpacing;
              }
              denomShift = options.fontMetrics().denom1;
            } else {
              if (ruleWidth > 0) {
                numShift = options.fontMetrics().num2;
                clearance = ruleSpacing;
              } else {
                numShift = options.fontMetrics().num3;
                clearance = 3 * ruleSpacing;
              }
              denomShift = options.fontMetrics().denom2;
            }
            let frac;
            if (!rule) {
              const candidateClearance = numShift - numerm.depth - (denomm.height - denomShift);
              if (candidateClearance < clearance) {
                numShift += 0.5 * (clearance - candidateClearance);
                denomShift += 0.5 * (clearance - candidateClearance);
              }
              frac = buildCommon.makeVList({
                positionType: "individualShift",
                children: [{
                  type: "elem",
                  elem: denomm,
                  shift: denomShift
                }, {
                  type: "elem",
                  elem: numerm,
                  shift: -numShift
                }]
              }, options);
            } else {
              const axisHeight = options.fontMetrics().axisHeight;
              if (numShift - numerm.depth - (axisHeight + 0.5 * ruleWidth) < clearance) {
                numShift += clearance - (numShift - numerm.depth - (axisHeight + 0.5 * ruleWidth));
              }
              if (axisHeight - 0.5 * ruleWidth - (denomm.height - denomShift) < clearance) {
                denomShift += clearance - (axisHeight - 0.5 * ruleWidth - (denomm.height - denomShift));
              }
              const midShift = -(axisHeight - 0.5 * ruleWidth);
              frac = buildCommon.makeVList({
                positionType: "individualShift",
                children: [{
                  type: "elem",
                  elem: denomm,
                  shift: denomShift
                }, {
                  type: "elem",
                  elem: rule,
                  shift: midShift
                }, {
                  type: "elem",
                  elem: numerm,
                  shift: -numShift
                }]
              }, options);
            }
            newOptions = options.havingStyle(style);
            frac.height *= newOptions.sizeMultiplier / options.sizeMultiplier;
            frac.depth *= newOptions.sizeMultiplier / options.sizeMultiplier;
            let delimSize;
            if (style.size === src_Style.DISPLAY.size) {
              delimSize = options.fontMetrics().delim1;
            } else if (style.size === src_Style.SCRIPTSCRIPT.size) {
              delimSize = options.havingStyle(src_Style.SCRIPT).fontMetrics().delim2;
            } else {
              delimSize = options.fontMetrics().delim2;
            }
            let leftDelim;
            let rightDelim;
            if (group.leftDelim == null) {
              leftDelim = makeNullDelimiter(options, ["mopen"]);
            } else {
              leftDelim = delimiter.customSizedDelim(group.leftDelim, delimSize, true, options.havingStyle(style), group.mode, ["mopen"]);
            }
            if (group.continued) {
              rightDelim = buildCommon.makeSpan([]);
            } else if (group.rightDelim == null) {
              rightDelim = makeNullDelimiter(options, ["mclose"]);
            } else {
              rightDelim = delimiter.customSizedDelim(group.rightDelim, delimSize, true, options.havingStyle(style), group.mode, ["mclose"]);
            }
            return buildCommon.makeSpan(["mord"].concat(newOptions.sizingClasses(options)), [leftDelim, buildCommon.makeSpan(["mfrac"], [frac]), rightDelim], options);
          };
          const genfrac_mathmlBuilder = (group, options) => {
            let node = new mathMLTree.MathNode("mfrac", [buildMathML_buildGroup(group.numer, options), buildMathML_buildGroup(group.denom, options)]);
            if (!group.hasBarLine) {
              node.setAttribute("linethickness", "0px");
            } else if (group.barSize) {
              const ruleWidth = calculateSize(group.barSize, options);
              node.setAttribute("linethickness", makeEm(ruleWidth));
            }
            const style = adjustStyle(group.size, options.style);
            if (style.size !== options.style.size) {
              node = new mathMLTree.MathNode("mstyle", [node]);
              const isDisplay = style.size === src_Style.DISPLAY.size ? "true" : "false";
              node.setAttribute("displaystyle", isDisplay);
              node.setAttribute("scriptlevel", "0");
            }
            if (group.leftDelim != null || group.rightDelim != null) {
              const withDelims = [];
              if (group.leftDelim != null) {
                const leftOp = new mathMLTree.MathNode("mo", [new mathMLTree.TextNode(group.leftDelim.replace("\\", ""))]);
                leftOp.setAttribute("fence", "true");
                withDelims.push(leftOp);
              }
              withDelims.push(node);
              if (group.rightDelim != null) {
                const rightOp = new mathMLTree.MathNode("mo", [new mathMLTree.TextNode(group.rightDelim.replace("\\", ""))]);
                rightOp.setAttribute("fence", "true");
                withDelims.push(rightOp);
              }
              return makeRow(withDelims);
            }
            return node;
          };
          defineFunction({
            type: "genfrac",
            names: [
              "\\dfrac",
              "\\frac",
              "\\tfrac",
              "\\dbinom",
              "\\binom",
              "\\tbinom",
              "\\\\atopfrac",
              // can’t be entered directly
              "\\\\bracefrac",
              "\\\\brackfrac"
              // ditto
            ],
            props: {
              numArgs: 2,
              allowedInArgument: true
            },
            handler: (_ref, args) => {
              let {
                parser,
                funcName
              } = _ref;
              const numer = args[0];
              const denom = args[1];
              let hasBarLine;
              let leftDelim = null;
              let rightDelim = null;
              let size = "auto";
              switch (funcName) {
                case "\\dfrac":
                case "\\frac":
                case "\\tfrac":
                  hasBarLine = true;
                  break;
                case "\\\\atopfrac":
                  hasBarLine = false;
                  break;
                case "\\dbinom":
                case "\\binom":
                case "\\tbinom":
                  hasBarLine = false;
                  leftDelim = "(";
                  rightDelim = ")";
                  break;
                case "\\\\bracefrac":
                  hasBarLine = false;
                  leftDelim = "\\{";
                  rightDelim = "\\}";
                  break;
                case "\\\\brackfrac":
                  hasBarLine = false;
                  leftDelim = "[";
                  rightDelim = "]";
                  break;
                default:
                  throw new Error("Unrecognized genfrac command");
              }
              switch (funcName) {
                case "\\dfrac":
                case "\\dbinom":
                  size = "display";
                  break;
                case "\\tfrac":
                case "\\tbinom":
                  size = "text";
                  break;
              }
              return {
                type: "genfrac",
                mode: parser.mode,
                continued: false,
                numer,
                denom,
                hasBarLine,
                leftDelim,
                rightDelim,
                size,
                barSize: null
              };
            },
            htmlBuilder: genfrac_htmlBuilder,
            mathmlBuilder: genfrac_mathmlBuilder
          });
          defineFunction({
            type: "genfrac",
            names: ["\\cfrac"],
            props: {
              numArgs: 2
            },
            handler: (_ref2, args) => {
              let {
                parser,
                funcName
              } = _ref2;
              const numer = args[0];
              const denom = args[1];
              return {
                type: "genfrac",
                mode: parser.mode,
                continued: true,
                numer,
                denom,
                hasBarLine: true,
                leftDelim: null,
                rightDelim: null,
                size: "display",
                barSize: null
              };
            }
          });
          defineFunction({
            type: "infix",
            names: ["\\over", "\\choose", "\\atop", "\\brace", "\\brack"],
            props: {
              numArgs: 0,
              infix: true
            },
            handler(_ref3) {
              let {
                parser,
                funcName,
                token
              } = _ref3;
              let replaceWith;
              switch (funcName) {
                case "\\over":
                  replaceWith = "\\frac";
                  break;
                case "\\choose":
                  replaceWith = "\\binom";
                  break;
                case "\\atop":
                  replaceWith = "\\\\atopfrac";
                  break;
                case "\\brace":
                  replaceWith = "\\\\bracefrac";
                  break;
                case "\\brack":
                  replaceWith = "\\\\brackfrac";
                  break;
                default:
                  throw new Error("Unrecognized infix genfrac command");
              }
              return {
                type: "infix",
                mode: parser.mode,
                replaceWith,
                token
              };
            }
          });
          const stylArray = ["display", "text", "script", "scriptscript"];
          const delimFromValue = function(delimString) {
            let delim = null;
            if (delimString.length > 0) {
              delim = delimString;
              delim = delim === "." ? null : delim;
            }
            return delim;
          };
          defineFunction({
            type: "genfrac",
            names: ["\\genfrac"],
            props: {
              numArgs: 6,
              allowedInArgument: true,
              argTypes: ["math", "math", "size", "text", "math", "math"]
            },
            handler(_ref4, args) {
              let {
                parser
              } = _ref4;
              const numer = args[4];
              const denom = args[5];
              const leftNode = normalizeArgument(args[0]);
              const leftDelim = leftNode.type === "atom" && leftNode.family === "open" ? delimFromValue(leftNode.text) : null;
              const rightNode = normalizeArgument(args[1]);
              const rightDelim = rightNode.type === "atom" && rightNode.family === "close" ? delimFromValue(rightNode.text) : null;
              const barNode = assertNodeType(args[2], "size");
              let hasBarLine;
              let barSize = null;
              if (barNode.isBlank) {
                hasBarLine = true;
              } else {
                barSize = barNode.value;
                hasBarLine = barSize.number > 0;
              }
              let size = "auto";
              let styl = args[3];
              if (styl.type === "ordgroup") {
                if (styl.body.length > 0) {
                  const textOrd = assertNodeType(styl.body[0], "textord");
                  size = stylArray[Number(textOrd.text)];
                }
              } else {
                styl = assertNodeType(styl, "textord");
                size = stylArray[Number(styl.text)];
              }
              return {
                type: "genfrac",
                mode: parser.mode,
                numer,
                denom,
                continued: false,
                hasBarLine,
                barSize,
                leftDelim,
                rightDelim,
                size
              };
            },
            htmlBuilder: genfrac_htmlBuilder,
            mathmlBuilder: genfrac_mathmlBuilder
          });
          defineFunction({
            type: "infix",
            names: ["\\above"],
            props: {
              numArgs: 1,
              argTypes: ["size"],
              infix: true
            },
            handler(_ref5, args) {
              let {
                parser,
                funcName,
                token
              } = _ref5;
              return {
                type: "infix",
                mode: parser.mode,
                replaceWith: "\\\\abovefrac",
                size: assertNodeType(args[0], "size").value,
                token
              };
            }
          });
          defineFunction({
            type: "genfrac",
            names: ["\\\\abovefrac"],
            props: {
              numArgs: 3,
              argTypes: ["math", "size", "math"]
            },
            handler: (_ref6, args) => {
              let {
                parser,
                funcName
              } = _ref6;
              const numer = args[0];
              const barSize = assert(assertNodeType(args[1], "infix").size);
              const denom = args[2];
              const hasBarLine = barSize.number > 0;
              return {
                type: "genfrac",
                mode: parser.mode,
                numer,
                denom,
                continued: false,
                hasBarLine,
                barSize,
                leftDelim: null,
                rightDelim: null,
                size: "auto"
              };
            },
            htmlBuilder: genfrac_htmlBuilder,
            mathmlBuilder: genfrac_mathmlBuilder
          });
          ;
          const horizBrace_htmlBuilder = (grp, options) => {
            const style = options.style;
            let supSubGroup;
            let group;
            if (grp.type === "supsub") {
              supSubGroup = grp.sup ? buildGroup(grp.sup, options.havingStyle(style.sup()), options) : buildGroup(grp.sub, options.havingStyle(style.sub()), options);
              group = assertNodeType(grp.base, "horizBrace");
            } else {
              group = assertNodeType(grp, "horizBrace");
            }
            const body = buildGroup(group.base, options.havingBaseStyle(src_Style.DISPLAY));
            const braceBody = stretchy.svgSpan(group, options);
            let vlist;
            if (group.isOver) {
              vlist = buildCommon.makeVList({
                positionType: "firstBaseline",
                children: [{
                  type: "elem",
                  elem: body
                }, {
                  type: "kern",
                  size: 0.1
                }, {
                  type: "elem",
                  elem: braceBody
                }]
              }, options);
              vlist.children[0].children[0].children[1].classes.push("svg-align");
            } else {
              vlist = buildCommon.makeVList({
                positionType: "bottom",
                positionData: body.depth + 0.1 + braceBody.height,
                children: [{
                  type: "elem",
                  elem: braceBody
                }, {
                  type: "kern",
                  size: 0.1
                }, {
                  type: "elem",
                  elem: body
                }]
              }, options);
              vlist.children[0].children[0].children[0].classes.push("svg-align");
            }
            if (supSubGroup) {
              const vSpan = buildCommon.makeSpan(["mord", group.isOver ? "mover" : "munder"], [vlist], options);
              if (group.isOver) {
                vlist = buildCommon.makeVList({
                  positionType: "firstBaseline",
                  children: [{
                    type: "elem",
                    elem: vSpan
                  }, {
                    type: "kern",
                    size: 0.2
                  }, {
                    type: "elem",
                    elem: supSubGroup
                  }]
                }, options);
              } else {
                vlist = buildCommon.makeVList({
                  positionType: "bottom",
                  positionData: vSpan.depth + 0.2 + supSubGroup.height + supSubGroup.depth,
                  children: [{
                    type: "elem",
                    elem: supSubGroup
                  }, {
                    type: "kern",
                    size: 0.2
                  }, {
                    type: "elem",
                    elem: vSpan
                  }]
                }, options);
              }
            }
            return buildCommon.makeSpan(["mord", group.isOver ? "mover" : "munder"], [vlist], options);
          };
          const horizBrace_mathmlBuilder = (group, options) => {
            const accentNode = stretchy.mathMLnode(group.label);
            return new mathMLTree.MathNode(group.isOver ? "mover" : "munder", [buildMathML_buildGroup(group.base, options), accentNode]);
          };
          defineFunction({
            type: "horizBrace",
            names: ["\\overbrace", "\\underbrace"],
            props: {
              numArgs: 1
            },
            handler(_ref, args) {
              let {
                parser,
                funcName
              } = _ref;
              return {
                type: "horizBrace",
                mode: parser.mode,
                label: funcName,
                isOver: /^\\over/.test(funcName),
                base: args[0]
              };
            },
            htmlBuilder: horizBrace_htmlBuilder,
            mathmlBuilder: horizBrace_mathmlBuilder
          });
          ;
          defineFunction({
            type: "href",
            names: ["\\href"],
            props: {
              numArgs: 2,
              argTypes: ["url", "original"],
              allowedInText: true
            },
            handler: (_ref, args) => {
              let {
                parser
              } = _ref;
              const body = args[1];
              const href = assertNodeType(args[0], "url").url;
              if (!parser.settings.isTrusted({
                command: "\\href",
                url: href
              })) {
                return parser.formatUnsupportedCmd("\\href");
              }
              return {
                type: "href",
                mode: parser.mode,
                href,
                body: ordargument(body)
              };
            },
            htmlBuilder: (group, options) => {
              const elements = buildExpression(group.body, options, false);
              return buildCommon.makeAnchor(group.href, [], elements, options);
            },
            mathmlBuilder: (group, options) => {
              let math2 = buildExpressionRow(group.body, options);
              if (!(math2 instanceof MathNode)) {
                math2 = new MathNode("mrow", [math2]);
              }
              math2.setAttribute("href", group.href);
              return math2;
            }
          });
          defineFunction({
            type: "href",
            names: ["\\url"],
            props: {
              numArgs: 1,
              argTypes: ["url"],
              allowedInText: true
            },
            handler: (_ref2, args) => {
              let {
                parser
              } = _ref2;
              const href = assertNodeType(args[0], "url").url;
              if (!parser.settings.isTrusted({
                command: "\\url",
                url: href
              })) {
                return parser.formatUnsupportedCmd("\\url");
              }
              const chars = [];
              for (let i = 0; i < href.length; i++) {
                let c = href[i];
                if (c === "~") {
                  c = "\\textasciitilde";
                }
                chars.push({
                  type: "textord",
                  mode: "text",
                  text: c
                });
              }
              const body = {
                type: "text",
                mode: parser.mode,
                font: "\\texttt",
                body: chars
              };
              return {
                type: "href",
                mode: parser.mode,
                href,
                body: ordargument(body)
              };
            }
          });
          ;
          defineFunction({
            type: "hbox",
            names: ["\\hbox"],
            props: {
              numArgs: 1,
              argTypes: ["text"],
              allowedInText: true,
              primitive: true
            },
            handler(_ref, args) {
              let {
                parser
              } = _ref;
              return {
                type: "hbox",
                mode: parser.mode,
                body: ordargument(args[0])
              };
            },
            htmlBuilder(group, options) {
              const elements = buildExpression(group.body, options, false);
              return buildCommon.makeFragment(elements);
            },
            mathmlBuilder(group, options) {
              return new mathMLTree.MathNode("mrow", buildMathML_buildExpression(group.body, options));
            }
          });
          ;
          defineFunction({
            type: "html",
            names: ["\\htmlClass", "\\htmlId", "\\htmlStyle", "\\htmlData"],
            props: {
              numArgs: 2,
              argTypes: ["raw", "original"],
              allowedInText: true
            },
            handler: (_ref, args) => {
              let {
                parser,
                funcName,
                token
              } = _ref;
              const value = assertNodeType(args[0], "raw").string;
              const body = args[1];
              if (parser.settings.strict) {
                parser.settings.reportNonstrict("htmlExtension", "HTML extension is disabled on strict mode");
              }
              let trustContext;
              const attributes = {};
              switch (funcName) {
                case "\\htmlClass":
                  attributes.class = value;
                  trustContext = {
                    command: "\\htmlClass",
                    class: value
                  };
                  break;
                case "\\htmlId":
                  attributes.id = value;
                  trustContext = {
                    command: "\\htmlId",
                    id: value
                  };
                  break;
                case "\\htmlStyle":
                  attributes.style = value;
                  trustContext = {
                    command: "\\htmlStyle",
                    style: value
                  };
                  break;
                case "\\htmlData": {
                  const data = value.split(",");
                  for (let i = 0; i < data.length; i++) {
                    const keyVal = data[i].split("=");
                    if (keyVal.length !== 2) {
                      throw new src_ParseError("Error parsing key-value for \\htmlData");
                    }
                    attributes["data-" + keyVal[0].trim()] = keyVal[1].trim();
                  }
                  trustContext = {
                    command: "\\htmlData",
                    attributes
                  };
                  break;
                }
                default:
                  throw new Error("Unrecognized html command");
              }
              if (!parser.settings.isTrusted(trustContext)) {
                return parser.formatUnsupportedCmd(funcName);
              }
              return {
                type: "html",
                mode: parser.mode,
                attributes,
                body: ordargument(body)
              };
            },
            htmlBuilder: (group, options) => {
              const elements = buildExpression(group.body, options, false);
              const classes = ["enclosing"];
              if (group.attributes.class) {
                classes.push(...group.attributes.class.trim().split(/\s+/));
              }
              const span = buildCommon.makeSpan(classes, elements, options);
              for (const attr in group.attributes) {
                if (attr !== "class" && group.attributes.hasOwnProperty(attr)) {
                  span.setAttribute(attr, group.attributes[attr]);
                }
              }
              return span;
            },
            mathmlBuilder: (group, options) => {
              return buildExpressionRow(group.body, options);
            }
          });
          ;
          defineFunction({
            type: "htmlmathml",
            names: ["\\html@mathml"],
            props: {
              numArgs: 2,
              allowedInText: true
            },
            handler: (_ref, args) => {
              let {
                parser
              } = _ref;
              return {
                type: "htmlmathml",
                mode: parser.mode,
                html: ordargument(args[0]),
                mathml: ordargument(args[1])
              };
            },
            htmlBuilder: (group, options) => {
              const elements = buildExpression(group.html, options, false);
              return buildCommon.makeFragment(elements);
            },
            mathmlBuilder: (group, options) => {
              return buildExpressionRow(group.mathml, options);
            }
          });
          ;
          const sizeData = function(str) {
            if (/^[-+]? *(\d+(\.\d*)?|\.\d+)$/.test(str)) {
              return {
                number: +str,
                unit: "bp"
              };
            } else {
              const match = /([-+]?) *(\d+(?:\.\d*)?|\.\d+) *([a-z]{2})/.exec(str);
              if (!match) {
                throw new src_ParseError("Invalid size: '" + str + "' in \\includegraphics");
              }
              const data = {
                number: +(match[1] + match[2]),
                // sign + magnitude, cast to number
                unit: match[3]
              };
              if (!validUnit(data)) {
                throw new src_ParseError("Invalid unit: '" + data.unit + "' in \\includegraphics.");
              }
              return data;
            }
          };
          defineFunction({
            type: "includegraphics",
            names: ["\\includegraphics"],
            props: {
              numArgs: 1,
              numOptionalArgs: 1,
              argTypes: ["raw", "url"],
              allowedInText: false
            },
            handler: (_ref, args, optArgs) => {
              let {
                parser
              } = _ref;
              let width = {
                number: 0,
                unit: "em"
              };
              let height = {
                number: 0.9,
                unit: "em"
              };
              let totalheight = {
                number: 0,
                unit: "em"
              };
              let alt = "";
              if (optArgs[0]) {
                const attributeStr = assertNodeType(optArgs[0], "raw").string;
                const attributes = attributeStr.split(",");
                for (let i = 0; i < attributes.length; i++) {
                  const keyVal = attributes[i].split("=");
                  if (keyVal.length === 2) {
                    const str = keyVal[1].trim();
                    switch (keyVal[0].trim()) {
                      case "alt":
                        alt = str;
                        break;
                      case "width":
                        width = sizeData(str);
                        break;
                      case "height":
                        height = sizeData(str);
                        break;
                      case "totalheight":
                        totalheight = sizeData(str);
                        break;
                      default:
                        throw new src_ParseError("Invalid key: '" + keyVal[0] + "' in \\includegraphics.");
                    }
                  }
                }
              }
              const src = assertNodeType(args[0], "url").url;
              if (alt === "") {
                alt = src;
                alt = alt.replace(/^.*[\\/]/, "");
                alt = alt.substring(0, alt.lastIndexOf("."));
              }
              if (!parser.settings.isTrusted({
                command: "\\includegraphics",
                url: src
              })) {
                return parser.formatUnsupportedCmd("\\includegraphics");
              }
              return {
                type: "includegraphics",
                mode: parser.mode,
                alt,
                width,
                height,
                totalheight,
                src
              };
            },
            htmlBuilder: (group, options) => {
              const height = calculateSize(group.height, options);
              let depth = 0;
              if (group.totalheight.number > 0) {
                depth = calculateSize(group.totalheight, options) - height;
              }
              let width = 0;
              if (group.width.number > 0) {
                width = calculateSize(group.width, options);
              }
              const style = {
                height: makeEm(height + depth)
              };
              if (width > 0) {
                style.width = makeEm(width);
              }
              if (depth > 0) {
                style.verticalAlign = makeEm(-depth);
              }
              const node = new Img(group.src, group.alt, style);
              node.height = height;
              node.depth = depth;
              return node;
            },
            mathmlBuilder: (group, options) => {
              const node = new mathMLTree.MathNode("mglyph", []);
              node.setAttribute("alt", group.alt);
              const height = calculateSize(group.height, options);
              let depth = 0;
              if (group.totalheight.number > 0) {
                depth = calculateSize(group.totalheight, options) - height;
                node.setAttribute("valign", makeEm(-depth));
              }
              node.setAttribute("height", makeEm(height + depth));
              if (group.width.number > 0) {
                const width = calculateSize(group.width, options);
                node.setAttribute("width", makeEm(width));
              }
              node.setAttribute("src", group.src);
              return node;
            }
          });
          ;
          defineFunction({
            type: "kern",
            names: ["\\kern", "\\mkern", "\\hskip", "\\mskip"],
            props: {
              numArgs: 1,
              argTypes: ["size"],
              primitive: true,
              allowedInText: true
            },
            handler(_ref, args) {
              let {
                parser,
                funcName
              } = _ref;
              const size = assertNodeType(args[0], "size");
              if (parser.settings.strict) {
                const mathFunction = funcName[1] === "m";
                const muUnit = size.value.unit === "mu";
                if (mathFunction) {
                  if (!muUnit) {
                    parser.settings.reportNonstrict("mathVsTextUnits", "LaTeX's " + funcName + " supports only mu units, " + ("not " + size.value.unit + " units"));
                  }
                  if (parser.mode !== "math") {
                    parser.settings.reportNonstrict("mathVsTextUnits", "LaTeX's " + funcName + " works only in math mode");
                  }
                } else {
                  if (muUnit) {
                    parser.settings.reportNonstrict("mathVsTextUnits", "LaTeX's " + funcName + " doesn't support mu units");
                  }
                }
              }
              return {
                type: "kern",
                mode: parser.mode,
                dimension: size.value
              };
            },
            htmlBuilder(group, options) {
              return buildCommon.makeGlue(group.dimension, options);
            },
            mathmlBuilder(group, options) {
              const dimension = calculateSize(group.dimension, options);
              return new mathMLTree.SpaceNode(dimension);
            }
          });
          ;
          defineFunction({
            type: "lap",
            names: ["\\mathllap", "\\mathrlap", "\\mathclap"],
            props: {
              numArgs: 1,
              allowedInText: true
            },
            handler: (_ref, args) => {
              let {
                parser,
                funcName
              } = _ref;
              const body = args[0];
              return {
                type: "lap",
                mode: parser.mode,
                alignment: funcName.slice(5),
                body
              };
            },
            htmlBuilder: (group, options) => {
              let inner2;
              if (group.alignment === "clap") {
                inner2 = buildCommon.makeSpan([], [buildGroup(group.body, options)]);
                inner2 = buildCommon.makeSpan(["inner"], [inner2], options);
              } else {
                inner2 = buildCommon.makeSpan(["inner"], [buildGroup(group.body, options)]);
              }
              const fix = buildCommon.makeSpan(["fix"], []);
              let node = buildCommon.makeSpan([group.alignment], [inner2, fix], options);
              const strut = buildCommon.makeSpan(["strut"]);
              strut.style.height = makeEm(node.height + node.depth);
              if (node.depth) {
                strut.style.verticalAlign = makeEm(-node.depth);
              }
              node.children.unshift(strut);
              node = buildCommon.makeSpan(["thinbox"], [node], options);
              return buildCommon.makeSpan(["mord", "vbox"], [node], options);
            },
            mathmlBuilder: (group, options) => {
              const node = new mathMLTree.MathNode("mpadded", [buildMathML_buildGroup(group.body, options)]);
              if (group.alignment !== "rlap") {
                const offset = group.alignment === "llap" ? "-1" : "-0.5";
                node.setAttribute("lspace", offset + "width");
              }
              node.setAttribute("width", "0px");
              return node;
            }
          });
          ;
          defineFunction({
            type: "styling",
            names: ["\\(", "$"],
            props: {
              numArgs: 0,
              allowedInText: true,
              allowedInMath: false
            },
            handler(_ref, args) {
              let {
                funcName,
                parser
              } = _ref;
              const outerMode = parser.mode;
              parser.switchMode("math");
              const close = funcName === "\\(" ? "\\)" : "$";
              const body = parser.parseExpression(false, close);
              parser.expect(close);
              parser.switchMode(outerMode);
              return {
                type: "styling",
                mode: parser.mode,
                style: "text",
                body
              };
            }
          });
          defineFunction({
            type: "text",
            // Doesn't matter what this is.
            names: ["\\)", "\\]"],
            props: {
              numArgs: 0,
              allowedInText: true,
              allowedInMath: false
            },
            handler(context, args) {
              throw new src_ParseError("Mismatched " + context.funcName);
            }
          });
          ;
          const chooseMathStyle = (group, options) => {
            switch (options.style.size) {
              case src_Style.DISPLAY.size:
                return group.display;
              case src_Style.TEXT.size:
                return group.text;
              case src_Style.SCRIPT.size:
                return group.script;
              case src_Style.SCRIPTSCRIPT.size:
                return group.scriptscript;
              default:
                return group.text;
            }
          };
          defineFunction({
            type: "mathchoice",
            names: ["\\mathchoice"],
            props: {
              numArgs: 4,
              primitive: true
            },
            handler: (_ref, args) => {
              let {
                parser
              } = _ref;
              return {
                type: "mathchoice",
                mode: parser.mode,
                display: ordargument(args[0]),
                text: ordargument(args[1]),
                script: ordargument(args[2]),
                scriptscript: ordargument(args[3])
              };
            },
            htmlBuilder: (group, options) => {
              const body = chooseMathStyle(group, options);
              const elements = buildExpression(body, options, false);
              return buildCommon.makeFragment(elements);
            },
            mathmlBuilder: (group, options) => {
              const body = chooseMathStyle(group, options);
              return buildExpressionRow(body, options);
            }
          });
          ;
          const assembleSupSub = (base, supGroup, subGroup, options, style, slant, baseShift) => {
            base = buildCommon.makeSpan([], [base]);
            const subIsSingleCharacter = subGroup && utils.isCharacterBox(subGroup);
            let sub2;
            let sup2;
            if (supGroup) {
              const elem = buildGroup(supGroup, options.havingStyle(style.sup()), options);
              sup2 = {
                elem,
                kern: Math.max(options.fontMetrics().bigOpSpacing1, options.fontMetrics().bigOpSpacing3 - elem.depth)
              };
            }
            if (subGroup) {
              const elem = buildGroup(subGroup, options.havingStyle(style.sub()), options);
              sub2 = {
                elem,
                kern: Math.max(options.fontMetrics().bigOpSpacing2, options.fontMetrics().bigOpSpacing4 - elem.height)
              };
            }
            let finalGroup;
            if (sup2 && sub2) {
              const bottom = options.fontMetrics().bigOpSpacing5 + sub2.elem.height + sub2.elem.depth + sub2.kern + base.depth + baseShift;
              finalGroup = buildCommon.makeVList({
                positionType: "bottom",
                positionData: bottom,
                children: [{
                  type: "kern",
                  size: options.fontMetrics().bigOpSpacing5
                }, {
                  type: "elem",
                  elem: sub2.elem,
                  marginLeft: makeEm(-slant)
                }, {
                  type: "kern",
                  size: sub2.kern
                }, {
                  type: "elem",
                  elem: base
                }, {
                  type: "kern",
                  size: sup2.kern
                }, {
                  type: "elem",
                  elem: sup2.elem,
                  marginLeft: makeEm(slant)
                }, {
                  type: "kern",
                  size: options.fontMetrics().bigOpSpacing5
                }]
              }, options);
            } else if (sub2) {
              const top = base.height - baseShift;
              finalGroup = buildCommon.makeVList({
                positionType: "top",
                positionData: top,
                children: [{
                  type: "kern",
                  size: options.fontMetrics().bigOpSpacing5
                }, {
                  type: "elem",
                  elem: sub2.elem,
                  marginLeft: makeEm(-slant)
                }, {
                  type: "kern",
                  size: sub2.kern
                }, {
                  type: "elem",
                  elem: base
                }]
              }, options);
            } else if (sup2) {
              const bottom = base.depth + baseShift;
              finalGroup = buildCommon.makeVList({
                positionType: "bottom",
                positionData: bottom,
                children: [{
                  type: "elem",
                  elem: base
                }, {
                  type: "kern",
                  size: sup2.kern
                }, {
                  type: "elem",
                  elem: sup2.elem,
                  marginLeft: makeEm(slant)
                }, {
                  type: "kern",
                  size: options.fontMetrics().bigOpSpacing5
                }]
              }, options);
            } else {
              return base;
            }
            const parts = [finalGroup];
            if (sub2 && slant !== 0 && !subIsSingleCharacter) {
              const spacer = buildCommon.makeSpan(["mspace"], [], options);
              spacer.style.marginRight = makeEm(slant);
              parts.unshift(spacer);
            }
            return buildCommon.makeSpan(["mop", "op-limits"], parts, options);
          };
          ;
          const noSuccessor = ["\\smallint"];
          const op_htmlBuilder = (grp, options) => {
            let supGroup;
            let subGroup;
            let hasLimits = false;
            let group;
            if (grp.type === "supsub") {
              supGroup = grp.sup;
              subGroup = grp.sub;
              group = assertNodeType(grp.base, "op");
              hasLimits = true;
            } else {
              group = assertNodeType(grp, "op");
            }
            const style = options.style;
            let large = false;
            if (style.size === src_Style.DISPLAY.size && group.symbol && !utils.contains(noSuccessor, group.name)) {
              large = true;
            }
            let base;
            if (group.symbol) {
              const fontName = large ? "Size2-Regular" : "Size1-Regular";
              let stash = "";
              if (group.name === "\\oiint" || group.name === "\\oiiint") {
                stash = group.name.slice(1);
                group.name = stash === "oiint" ? "\\iint" : "\\iiint";
              }
              base = buildCommon.makeSymbol(group.name, fontName, "math", options, ["mop", "op-symbol", large ? "large-op" : "small-op"]);
              if (stash.length > 0) {
                const italic = base.italic;
                const oval = buildCommon.staticSvg(stash + "Size" + (large ? "2" : "1"), options);
                base = buildCommon.makeVList({
                  positionType: "individualShift",
                  children: [{
                    type: "elem",
                    elem: base,
                    shift: 0
                  }, {
                    type: "elem",
                    elem: oval,
                    shift: large ? 0.08 : 0
                  }]
                }, options);
                group.name = "\\" + stash;
                base.classes.unshift("mop");
                base.italic = italic;
              }
            } else if (group.body) {
              const inner2 = buildExpression(group.body, options, true);
              if (inner2.length === 1 && inner2[0] instanceof SymbolNode) {
                base = inner2[0];
                base.classes[0] = "mop";
              } else {
                base = buildCommon.makeSpan(["mop"], inner2, options);
              }
            } else {
              const output = [];
              for (let i = 1; i < group.name.length; i++) {
                output.push(buildCommon.mathsym(group.name[i], group.mode, options));
              }
              base = buildCommon.makeSpan(["mop"], output, options);
            }
            let baseShift = 0;
            let slant = 0;
            if ((base instanceof SymbolNode || group.name === "\\oiint" || group.name === "\\oiiint") && !group.suppressBaseShift) {
              baseShift = (base.height - base.depth) / 2 - options.fontMetrics().axisHeight;
              slant = base.italic;
            }
            if (hasLimits) {
              return assembleSupSub(base, supGroup, subGroup, options, style, slant, baseShift);
            } else {
              if (baseShift) {
                base.style.position = "relative";
                base.style.top = makeEm(baseShift);
              }
              return base;
            }
          };
          const op_mathmlBuilder = (group, options) => {
            let node;
            if (group.symbol) {
              node = new MathNode("mo", [makeText(group.name, group.mode)]);
              if (utils.contains(noSuccessor, group.name)) {
                node.setAttribute("largeop", "false");
              }
            } else if (group.body) {
              node = new MathNode("mo", buildMathML_buildExpression(group.body, options));
            } else {
              node = new MathNode("mi", [new TextNode(group.name.slice(1))]);
              const operator = new MathNode("mo", [makeText("⁡", "text")]);
              if (group.parentIsSupSub) {
                node = new MathNode("mrow", [node, operator]);
              } else {
                node = newDocumentFragment([node, operator]);
              }
            }
            return node;
          };
          const singleCharBigOps = {
            "∏": "\\prod",
            "∐": "\\coprod",
            "∑": "\\sum",
            "⋀": "\\bigwedge",
            "⋁": "\\bigvee",
            "⋂": "\\bigcap",
            "⋃": "\\bigcup",
            "⨀": "\\bigodot",
            "⨁": "\\bigoplus",
            "⨂": "\\bigotimes",
            "⨄": "\\biguplus",
            "⨆": "\\bigsqcup"
          };
          defineFunction({
            type: "op",
            names: ["\\coprod", "\\bigvee", "\\bigwedge", "\\biguplus", "\\bigcap", "\\bigcup", "\\intop", "\\prod", "\\sum", "\\bigotimes", "\\bigoplus", "\\bigodot", "\\bigsqcup", "\\smallint", "∏", "∐", "∑", "⋀", "⋁", "⋂", "⋃", "⨀", "⨁", "⨂", "⨄", "⨆"],
            props: {
              numArgs: 0
            },
            handler: (_ref, args) => {
              let {
                parser,
                funcName
              } = _ref;
              let fName = funcName;
              if (fName.length === 1) {
                fName = singleCharBigOps[fName];
              }
              return {
                type: "op",
                mode: parser.mode,
                limits: true,
                parentIsSupSub: false,
                symbol: true,
                name: fName
              };
            },
            htmlBuilder: op_htmlBuilder,
            mathmlBuilder: op_mathmlBuilder
          });
          defineFunction({
            type: "op",
            names: ["\\mathop"],
            props: {
              numArgs: 1,
              primitive: true
            },
            handler: (_ref2, args) => {
              let {
                parser
              } = _ref2;
              const body = args[0];
              return {
                type: "op",
                mode: parser.mode,
                limits: false,
                parentIsSupSub: false,
                symbol: false,
                body: ordargument(body)
              };
            },
            htmlBuilder: op_htmlBuilder,
            mathmlBuilder: op_mathmlBuilder
          });
          const singleCharIntegrals = {
            "∫": "\\int",
            "∬": "\\iint",
            "∭": "\\iiint",
            "∮": "\\oint",
            "∯": "\\oiint",
            "∰": "\\oiiint"
          };
          defineFunction({
            type: "op",
            names: ["\\arcsin", "\\arccos", "\\arctan", "\\arctg", "\\arcctg", "\\arg", "\\ch", "\\cos", "\\cosec", "\\cosh", "\\cot", "\\cotg", "\\coth", "\\csc", "\\ctg", "\\cth", "\\deg", "\\dim", "\\exp", "\\hom", "\\ker", "\\lg", "\\ln", "\\log", "\\sec", "\\sin", "\\sinh", "\\sh", "\\tan", "\\tanh", "\\tg", "\\th"],
            props: {
              numArgs: 0
            },
            handler(_ref3) {
              let {
                parser,
                funcName
              } = _ref3;
              return {
                type: "op",
                mode: parser.mode,
                limits: false,
                parentIsSupSub: false,
                symbol: false,
                name: funcName
              };
            },
            htmlBuilder: op_htmlBuilder,
            mathmlBuilder: op_mathmlBuilder
          });
          defineFunction({
            type: "op",
            names: ["\\det", "\\gcd", "\\inf", "\\lim", "\\max", "\\min", "\\Pr", "\\sup"],
            props: {
              numArgs: 0
            },
            handler(_ref4) {
              let {
                parser,
                funcName
              } = _ref4;
              return {
                type: "op",
                mode: parser.mode,
                limits: true,
                parentIsSupSub: false,
                symbol: false,
                name: funcName
              };
            },
            htmlBuilder: op_htmlBuilder,
            mathmlBuilder: op_mathmlBuilder
          });
          defineFunction({
            type: "op",
            names: ["\\int", "\\iint", "\\iiint", "\\oint", "\\oiint", "\\oiiint", "∫", "∬", "∭", "∮", "∯", "∰"],
            props: {
              numArgs: 0
            },
            handler(_ref5) {
              let {
                parser,
                funcName
              } = _ref5;
              let fName = funcName;
              if (fName.length === 1) {
                fName = singleCharIntegrals[fName];
              }
              return {
                type: "op",
                mode: parser.mode,
                limits: false,
                parentIsSupSub: false,
                symbol: true,
                name: fName
              };
            },
            htmlBuilder: op_htmlBuilder,
            mathmlBuilder: op_mathmlBuilder
          });
          ;
          const operatorname_htmlBuilder = (grp, options) => {
            let supGroup;
            let subGroup;
            let hasLimits = false;
            let group;
            if (grp.type === "supsub") {
              supGroup = grp.sup;
              subGroup = grp.sub;
              group = assertNodeType(grp.base, "operatorname");
              hasLimits = true;
            } else {
              group = assertNodeType(grp, "operatorname");
            }
            let base;
            if (group.body.length > 0) {
              const body = group.body.map((child) => {
                const childText = child.text;
                if (typeof childText === "string") {
                  return {
                    type: "textord",
                    mode: child.mode,
                    text: childText
                  };
                } else {
                  return child;
                }
              });
              const expression = buildExpression(body, options.withFont("mathrm"), true);
              for (let i = 0; i < expression.length; i++) {
                const child = expression[i];
                if (child instanceof SymbolNode) {
                  child.text = child.text.replace(/\u2212/, "-").replace(/\u2217/, "*");
                }
              }
              base = buildCommon.makeSpan(["mop"], expression, options);
            } else {
              base = buildCommon.makeSpan(["mop"], [], options);
            }
            if (hasLimits) {
              return assembleSupSub(base, supGroup, subGroup, options, options.style, 0, 0);
            } else {
              return base;
            }
          };
          const operatorname_mathmlBuilder = (group, options) => {
            let expression = buildMathML_buildExpression(group.body, options.withFont("mathrm"));
            let isAllString = true;
            for (let i = 0; i < expression.length; i++) {
              const node = expression[i];
              if (node instanceof mathMLTree.SpaceNode) {
              } else if (node instanceof mathMLTree.MathNode) {
                switch (node.type) {
                  case "mi":
                  case "mn":
                  case "ms":
                  case "mspace":
                  case "mtext":
                    break;
                  case "mo": {
                    const child = node.children[0];
                    if (node.children.length === 1 && child instanceof mathMLTree.TextNode) {
                      child.text = child.text.replace(/\u2212/, "-").replace(/\u2217/, "*");
                    } else {
                      isAllString = false;
                    }
                    break;
                  }
                  default:
                    isAllString = false;
                }
              } else {
                isAllString = false;
              }
            }
            if (isAllString) {
              const word = expression.map((node) => node.toText()).join("");
              expression = [new mathMLTree.TextNode(word)];
            }
            const identifier = new mathMLTree.MathNode("mi", expression);
            identifier.setAttribute("mathvariant", "normal");
            const operator = new mathMLTree.MathNode("mo", [makeText("⁡", "text")]);
            if (group.parentIsSupSub) {
              return new mathMLTree.MathNode("mrow", [identifier, operator]);
            } else {
              return mathMLTree.newDocumentFragment([identifier, operator]);
            }
          };
          defineFunction({
            type: "operatorname",
            names: ["\\operatorname@", "\\operatornamewithlimits"],
            props: {
              numArgs: 1
            },
            handler: (_ref, args) => {
              let {
                parser,
                funcName
              } = _ref;
              const body = args[0];
              return {
                type: "operatorname",
                mode: parser.mode,
                body: ordargument(body),
                alwaysHandleSupSub: funcName === "\\operatornamewithlimits",
                limits: false,
                parentIsSupSub: false
              };
            },
            htmlBuilder: operatorname_htmlBuilder,
            mathmlBuilder: operatorname_mathmlBuilder
          });
          defineMacro("\\operatorname", "\\@ifstar\\operatornamewithlimits\\operatorname@");
          ;
          defineFunctionBuilders({
            type: "ordgroup",
            htmlBuilder(group, options) {
              if (group.semisimple) {
                return buildCommon.makeFragment(buildExpression(group.body, options, false));
              }
              return buildCommon.makeSpan(["mord"], buildExpression(group.body, options, true), options);
            },
            mathmlBuilder(group, options) {
              return buildExpressionRow(group.body, options, true);
            }
          });
          ;
          defineFunction({
            type: "overline",
            names: ["\\overline"],
            props: {
              numArgs: 1
            },
            handler(_ref, args) {
              let {
                parser
              } = _ref;
              const body = args[0];
              return {
                type: "overline",
                mode: parser.mode,
                body
              };
            },
            htmlBuilder(group, options) {
              const innerGroup = buildGroup(group.body, options.havingCrampedStyle());
              const line = buildCommon.makeLineSpan("overline-line", options);
              const defaultRuleThickness = options.fontMetrics().defaultRuleThickness;
              const vlist = buildCommon.makeVList({
                positionType: "firstBaseline",
                children: [{
                  type: "elem",
                  elem: innerGroup
                }, {
                  type: "kern",
                  size: 3 * defaultRuleThickness
                }, {
                  type: "elem",
                  elem: line
                }, {
                  type: "kern",
                  size: defaultRuleThickness
                }]
              }, options);
              return buildCommon.makeSpan(["mord", "overline"], [vlist], options);
            },
            mathmlBuilder(group, options) {
              const operator = new mathMLTree.MathNode("mo", [new mathMLTree.TextNode("‾")]);
              operator.setAttribute("stretchy", "true");
              const node = new mathMLTree.MathNode("mover", [buildMathML_buildGroup(group.body, options), operator]);
              node.setAttribute("accent", "true");
              return node;
            }
          });
          ;
          defineFunction({
            type: "phantom",
            names: ["\\phantom"],
            props: {
              numArgs: 1,
              allowedInText: true
            },
            handler: (_ref, args) => {
              let {
                parser
              } = _ref;
              const body = args[0];
              return {
                type: "phantom",
                mode: parser.mode,
                body: ordargument(body)
              };
            },
            htmlBuilder: (group, options) => {
              const elements = buildExpression(group.body, options.withPhantom(), false);
              return buildCommon.makeFragment(elements);
            },
            mathmlBuilder: (group, options) => {
              const inner2 = buildMathML_buildExpression(group.body, options);
              return new mathMLTree.MathNode("mphantom", inner2);
            }
          });
          defineFunction({
            type: "hphantom",
            names: ["\\hphantom"],
            props: {
              numArgs: 1,
              allowedInText: true
            },
            handler: (_ref2, args) => {
              let {
                parser
              } = _ref2;
              const body = args[0];
              return {
                type: "hphantom",
                mode: parser.mode,
                body
              };
            },
            htmlBuilder: (group, options) => {
              let node = buildCommon.makeSpan([], [buildGroup(group.body, options.withPhantom())]);
              node.height = 0;
              node.depth = 0;
              if (node.children) {
                for (let i = 0; i < node.children.length; i++) {
                  node.children[i].height = 0;
                  node.children[i].depth = 0;
                }
              }
              node = buildCommon.makeVList({
                positionType: "firstBaseline",
                children: [{
                  type: "elem",
                  elem: node
                }]
              }, options);
              return buildCommon.makeSpan(["mord"], [node], options);
            },
            mathmlBuilder: (group, options) => {
              const inner2 = buildMathML_buildExpression(ordargument(group.body), options);
              const phantom = new mathMLTree.MathNode("mphantom", inner2);
              const node = new mathMLTree.MathNode("mpadded", [phantom]);
              node.setAttribute("height", "0px");
              node.setAttribute("depth", "0px");
              return node;
            }
          });
          defineFunction({
            type: "vphantom",
            names: ["\\vphantom"],
            props: {
              numArgs: 1,
              allowedInText: true
            },
            handler: (_ref3, args) => {
              let {
                parser
              } = _ref3;
              const body = args[0];
              return {
                type: "vphantom",
                mode: parser.mode,
                body
              };
            },
            htmlBuilder: (group, options) => {
              const inner2 = buildCommon.makeSpan(["inner"], [buildGroup(group.body, options.withPhantom())]);
              const fix = buildCommon.makeSpan(["fix"], []);
              return buildCommon.makeSpan(["mord", "rlap"], [inner2, fix], options);
            },
            mathmlBuilder: (group, options) => {
              const inner2 = buildMathML_buildExpression(ordargument(group.body), options);
              const phantom = new mathMLTree.MathNode("mphantom", inner2);
              const node = new mathMLTree.MathNode("mpadded", [phantom]);
              node.setAttribute("width", "0px");
              return node;
            }
          });
          ;
          defineFunction({
            type: "raisebox",
            names: ["\\raisebox"],
            props: {
              numArgs: 2,
              argTypes: ["size", "hbox"],
              allowedInText: true
            },
            handler(_ref, args) {
              let {
                parser
              } = _ref;
              const amount = assertNodeType(args[0], "size").value;
              const body = args[1];
              return {
                type: "raisebox",
                mode: parser.mode,
                dy: amount,
                body
              };
            },
            htmlBuilder(group, options) {
              const body = buildGroup(group.body, options);
              const dy = calculateSize(group.dy, options);
              return buildCommon.makeVList({
                positionType: "shift",
                positionData: -dy,
                children: [{
                  type: "elem",
                  elem: body
                }]
              }, options);
            },
            mathmlBuilder(group, options) {
              const node = new mathMLTree.MathNode("mpadded", [buildMathML_buildGroup(group.body, options)]);
              const dy = group.dy.number + group.dy.unit;
              node.setAttribute("voffset", dy);
              return node;
            }
          });
          ;
          defineFunction({
            type: "internal",
            names: ["\\relax"],
            props: {
              numArgs: 0,
              allowedInText: true,
              allowedInArgument: true
            },
            handler(_ref) {
              let {
                parser
              } = _ref;
              return {
                type: "internal",
                mode: parser.mode
              };
            }
          });
          ;
          defineFunction({
            type: "rule",
            names: ["\\rule"],
            props: {
              numArgs: 2,
              numOptionalArgs: 1,
              allowedInText: true,
              allowedInMath: true,
              argTypes: ["size", "size", "size"]
            },
            handler(_ref, args, optArgs) {
              let {
                parser
              } = _ref;
              const shift = optArgs[0];
              const width = assertNodeType(args[0], "size");
              const height = assertNodeType(args[1], "size");
              return {
                type: "rule",
                mode: parser.mode,
                shift: shift && assertNodeType(shift, "size").value,
                width: width.value,
                height: height.value
              };
            },
            htmlBuilder(group, options) {
              const rule = buildCommon.makeSpan(["mord", "rule"], [], options);
              const width = calculateSize(group.width, options);
              const height = calculateSize(group.height, options);
              const shift = group.shift ? calculateSize(group.shift, options) : 0;
              rule.style.borderRightWidth = makeEm(width);
              rule.style.borderTopWidth = makeEm(height);
              rule.style.bottom = makeEm(shift);
              rule.width = width;
              rule.height = height + shift;
              rule.depth = -shift;
              rule.maxFontSize = height * 1.125 * options.sizeMultiplier;
              return rule;
            },
            mathmlBuilder(group, options) {
              const width = calculateSize(group.width, options);
              const height = calculateSize(group.height, options);
              const shift = group.shift ? calculateSize(group.shift, options) : 0;
              const color = options.color && options.getColor() || "black";
              const rule = new mathMLTree.MathNode("mspace");
              rule.setAttribute("mathbackground", color);
              rule.setAttribute("width", makeEm(width));
              rule.setAttribute("height", makeEm(height));
              const wrapper = new mathMLTree.MathNode("mpadded", [rule]);
              if (shift >= 0) {
                wrapper.setAttribute("height", makeEm(shift));
              } else {
                wrapper.setAttribute("height", makeEm(shift));
                wrapper.setAttribute("depth", makeEm(-shift));
              }
              wrapper.setAttribute("voffset", makeEm(shift));
              return wrapper;
            }
          });
          ;
          function sizingGroup(value, options, baseOptions) {
            const inner2 = buildExpression(value, options, false);
            const multiplier = options.sizeMultiplier / baseOptions.sizeMultiplier;
            for (let i = 0; i < inner2.length; i++) {
              const pos = inner2[i].classes.indexOf("sizing");
              if (pos < 0) {
                Array.prototype.push.apply(inner2[i].classes, options.sizingClasses(baseOptions));
              } else if (inner2[i].classes[pos + 1] === "reset-size" + options.size) {
                inner2[i].classes[pos + 1] = "reset-size" + baseOptions.size;
              }
              inner2[i].height *= multiplier;
              inner2[i].depth *= multiplier;
            }
            return buildCommon.makeFragment(inner2);
          }
          const sizeFuncs = ["\\tiny", "\\sixptsize", "\\scriptsize", "\\footnotesize", "\\small", "\\normalsize", "\\large", "\\Large", "\\LARGE", "\\huge", "\\Huge"];
          const sizing_htmlBuilder = (group, options) => {
            const newOptions = options.havingSize(group.size);
            return sizingGroup(group.body, newOptions, options);
          };
          defineFunction({
            type: "sizing",
            names: sizeFuncs,
            props: {
              numArgs: 0,
              allowedInText: true
            },
            handler: (_ref, args) => {
              let {
                breakOnTokenText,
                funcName,
                parser
              } = _ref;
              const body = parser.parseExpression(false, breakOnTokenText);
              return {
                type: "sizing",
                mode: parser.mode,
                // Figure out what size to use based on the list of functions above
                size: sizeFuncs.indexOf(funcName) + 1,
                body
              };
            },
            htmlBuilder: sizing_htmlBuilder,
            mathmlBuilder: (group, options) => {
              const newOptions = options.havingSize(group.size);
              const inner2 = buildMathML_buildExpression(group.body, newOptions);
              const node = new mathMLTree.MathNode("mstyle", inner2);
              node.setAttribute("mathsize", makeEm(newOptions.sizeMultiplier));
              return node;
            }
          });
          ;
          defineFunction({
            type: "smash",
            names: ["\\smash"],
            props: {
              numArgs: 1,
              numOptionalArgs: 1,
              allowedInText: true
            },
            handler: (_ref, args, optArgs) => {
              let {
                parser
              } = _ref;
              let smashHeight = false;
              let smashDepth = false;
              const tbArg = optArgs[0] && assertNodeType(optArgs[0], "ordgroup");
              if (tbArg) {
                let letter = "";
                for (let i = 0; i < tbArg.body.length; ++i) {
                  const node = tbArg.body[i];
                  letter = node.text;
                  if (letter === "t") {
                    smashHeight = true;
                  } else if (letter === "b") {
                    smashDepth = true;
                  } else {
                    smashHeight = false;
                    smashDepth = false;
                    break;
                  }
                }
              } else {
                smashHeight = true;
                smashDepth = true;
              }
              const body = args[0];
              return {
                type: "smash",
                mode: parser.mode,
                body,
                smashHeight,
                smashDepth
              };
            },
            htmlBuilder: (group, options) => {
              const node = buildCommon.makeSpan([], [buildGroup(group.body, options)]);
              if (!group.smashHeight && !group.smashDepth) {
                return node;
              }
              if (group.smashHeight) {
                node.height = 0;
                if (node.children) {
                  for (let i = 0; i < node.children.length; i++) {
                    node.children[i].height = 0;
                  }
                }
              }
              if (group.smashDepth) {
                node.depth = 0;
                if (node.children) {
                  for (let i = 0; i < node.children.length; i++) {
                    node.children[i].depth = 0;
                  }
                }
              }
              const smashedNode = buildCommon.makeVList({
                positionType: "firstBaseline",
                children: [{
                  type: "elem",
                  elem: node
                }]
              }, options);
              return buildCommon.makeSpan(["mord"], [smashedNode], options);
            },
            mathmlBuilder: (group, options) => {
              const node = new mathMLTree.MathNode("mpadded", [buildMathML_buildGroup(group.body, options)]);
              if (group.smashHeight) {
                node.setAttribute("height", "0px");
              }
              if (group.smashDepth) {
                node.setAttribute("depth", "0px");
              }
              return node;
            }
          });
          ;
          defineFunction({
            type: "sqrt",
            names: ["\\sqrt"],
            props: {
              numArgs: 1,
              numOptionalArgs: 1
            },
            handler(_ref, args, optArgs) {
              let {
                parser
              } = _ref;
              const index = optArgs[0];
              const body = args[0];
              return {
                type: "sqrt",
                mode: parser.mode,
                body,
                index
              };
            },
            htmlBuilder(group, options) {
              let inner2 = buildGroup(group.body, options.havingCrampedStyle());
              if (inner2.height === 0) {
                inner2.height = options.fontMetrics().xHeight;
              }
              inner2 = buildCommon.wrapFragment(inner2, options);
              const metrics = options.fontMetrics();
              const theta = metrics.defaultRuleThickness;
              let phi = theta;
              if (options.style.id < src_Style.TEXT.id) {
                phi = options.fontMetrics().xHeight;
              }
              let lineClearance = theta + phi / 4;
              const minDelimiterHeight = inner2.height + inner2.depth + lineClearance + theta;
              const {
                span: img,
                ruleWidth,
                advanceWidth
              } = delimiter.sqrtImage(minDelimiterHeight, options);
              const delimDepth = img.height - ruleWidth;
              if (delimDepth > inner2.height + inner2.depth + lineClearance) {
                lineClearance = (lineClearance + delimDepth - inner2.height - inner2.depth) / 2;
              }
              const imgShift = img.height - inner2.height - lineClearance - ruleWidth;
              inner2.style.paddingLeft = makeEm(advanceWidth);
              const body = buildCommon.makeVList({
                positionType: "firstBaseline",
                children: [{
                  type: "elem",
                  elem: inner2,
                  wrapperClasses: ["svg-align"]
                }, {
                  type: "kern",
                  size: -(inner2.height + imgShift)
                }, {
                  type: "elem",
                  elem: img
                }, {
                  type: "kern",
                  size: ruleWidth
                }]
              }, options);
              if (!group.index) {
                return buildCommon.makeSpan(["mord", "sqrt"], [body], options);
              } else {
                const newOptions = options.havingStyle(src_Style.SCRIPTSCRIPT);
                const rootm = buildGroup(group.index, newOptions, options);
                const toShift = 0.6 * (body.height - body.depth);
                const rootVList = buildCommon.makeVList({
                  positionType: "shift",
                  positionData: -toShift,
                  children: [{
                    type: "elem",
                    elem: rootm
                  }]
                }, options);
                const rootVListWrap = buildCommon.makeSpan(["root"], [rootVList]);
                return buildCommon.makeSpan(["mord", "sqrt"], [rootVListWrap, body], options);
              }
            },
            mathmlBuilder(group, options) {
              const {
                body,
                index
              } = group;
              return index ? new mathMLTree.MathNode("mroot", [buildMathML_buildGroup(body, options), buildMathML_buildGroup(index, options)]) : new mathMLTree.MathNode("msqrt", [buildMathML_buildGroup(body, options)]);
            }
          });
          ;
          const styling_styleMap = {
            "display": src_Style.DISPLAY,
            "text": src_Style.TEXT,
            "script": src_Style.SCRIPT,
            "scriptscript": src_Style.SCRIPTSCRIPT
          };
          defineFunction({
            type: "styling",
            names: ["\\displaystyle", "\\textstyle", "\\scriptstyle", "\\scriptscriptstyle"],
            props: {
              numArgs: 0,
              allowedInText: true,
              primitive: true
            },
            handler(_ref, args) {
              let {
                breakOnTokenText,
                funcName,
                parser
              } = _ref;
              const body = parser.parseExpression(true, breakOnTokenText);
              const style = funcName.slice(1, funcName.length - 5);
              return {
                type: "styling",
                mode: parser.mode,
                // Figure out what style to use by pulling out the style from
                // the function name
                style,
                body
              };
            },
            htmlBuilder(group, options) {
              const newStyle = styling_styleMap[group.style];
              const newOptions = options.havingStyle(newStyle).withFont("");
              return sizingGroup(group.body, newOptions, options);
            },
            mathmlBuilder(group, options) {
              const newStyle = styling_styleMap[group.style];
              const newOptions = options.havingStyle(newStyle);
              const inner2 = buildMathML_buildExpression(group.body, newOptions);
              const node = new mathMLTree.MathNode("mstyle", inner2);
              const styleAttributes = {
                "display": ["0", "true"],
                "text": ["0", "false"],
                "script": ["1", "false"],
                "scriptscript": ["2", "false"]
              };
              const attr = styleAttributes[group.style];
              node.setAttribute("scriptlevel", attr[0]);
              node.setAttribute("displaystyle", attr[1]);
              return node;
            }
          });
          ;
          const htmlBuilderDelegate = function(group, options) {
            const base = group.base;
            if (!base) {
              return null;
            } else if (base.type === "op") {
              const delegate = base.limits && (options.style.size === src_Style.DISPLAY.size || base.alwaysHandleSupSub);
              return delegate ? op_htmlBuilder : null;
            } else if (base.type === "operatorname") {
              const delegate = base.alwaysHandleSupSub && (options.style.size === src_Style.DISPLAY.size || base.limits);
              return delegate ? operatorname_htmlBuilder : null;
            } else if (base.type === "accent") {
              return utils.isCharacterBox(base.base) ? htmlBuilder : null;
            } else if (base.type === "horizBrace") {
              const isSup = !group.sub;
              return isSup === base.isOver ? horizBrace_htmlBuilder : null;
            } else {
              return null;
            }
          };
          defineFunctionBuilders({
            type: "supsub",
            htmlBuilder(group, options) {
              const builderDelegate = htmlBuilderDelegate(group, options);
              if (builderDelegate) {
                return builderDelegate(group, options);
              }
              const {
                base: valueBase,
                sup: valueSup,
                sub: valueSub
              } = group;
              const base = buildGroup(valueBase, options);
              let supm;
              let subm;
              const metrics = options.fontMetrics();
              let supShift = 0;
              let subShift = 0;
              const isCharacterBox2 = valueBase && utils.isCharacterBox(valueBase);
              if (valueSup) {
                const newOptions = options.havingStyle(options.style.sup());
                supm = buildGroup(valueSup, newOptions, options);
                if (!isCharacterBox2) {
                  supShift = base.height - newOptions.fontMetrics().supDrop * newOptions.sizeMultiplier / options.sizeMultiplier;
                }
              }
              if (valueSub) {
                const newOptions = options.havingStyle(options.style.sub());
                subm = buildGroup(valueSub, newOptions, options);
                if (!isCharacterBox2) {
                  subShift = base.depth + newOptions.fontMetrics().subDrop * newOptions.sizeMultiplier / options.sizeMultiplier;
                }
              }
              let minSupShift;
              if (options.style === src_Style.DISPLAY) {
                minSupShift = metrics.sup1;
              } else if (options.style.cramped) {
                minSupShift = metrics.sup3;
              } else {
                minSupShift = metrics.sup2;
              }
              const multiplier = options.sizeMultiplier;
              const marginRight = makeEm(0.5 / metrics.ptPerEm / multiplier);
              let marginLeft = null;
              if (subm) {
                const isOiint = group.base && group.base.type === "op" && group.base.name && (group.base.name === "\\oiint" || group.base.name === "\\oiiint");
                if (base instanceof SymbolNode || isOiint) {
                  marginLeft = makeEm(-base.italic);
                }
              }
              let supsub;
              if (supm && subm) {
                supShift = Math.max(supShift, minSupShift, supm.depth + 0.25 * metrics.xHeight);
                subShift = Math.max(subShift, metrics.sub2);
                const ruleWidth = metrics.defaultRuleThickness;
                const maxWidth = 4 * ruleWidth;
                if (supShift - supm.depth - (subm.height - subShift) < maxWidth) {
                  subShift = maxWidth - (supShift - supm.depth) + subm.height;
                  const psi = 0.8 * metrics.xHeight - (supShift - supm.depth);
                  if (psi > 0) {
                    supShift += psi;
                    subShift -= psi;
                  }
                }
                const vlistElem = [{
                  type: "elem",
                  elem: subm,
                  shift: subShift,
                  marginRight,
                  marginLeft
                }, {
                  type: "elem",
                  elem: supm,
                  shift: -supShift,
                  marginRight
                }];
                supsub = buildCommon.makeVList({
                  positionType: "individualShift",
                  children: vlistElem
                }, options);
              } else if (subm) {
                subShift = Math.max(subShift, metrics.sub1, subm.height - 0.8 * metrics.xHeight);
                const vlistElem = [{
                  type: "elem",
                  elem: subm,
                  marginLeft,
                  marginRight
                }];
                supsub = buildCommon.makeVList({
                  positionType: "shift",
                  positionData: subShift,
                  children: vlistElem
                }, options);
              } else if (supm) {
                supShift = Math.max(supShift, minSupShift, supm.depth + 0.25 * metrics.xHeight);
                supsub = buildCommon.makeVList({
                  positionType: "shift",
                  positionData: -supShift,
                  children: [{
                    type: "elem",
                    elem: supm,
                    marginRight
                  }]
                }, options);
              } else {
                throw new Error("supsub must have either sup or sub.");
              }
              const mclass = getTypeOfDomTree(base, "right") || "mord";
              return buildCommon.makeSpan([mclass], [base, buildCommon.makeSpan(["msupsub"], [supsub])], options);
            },
            mathmlBuilder(group, options) {
              let isBrace = false;
              let isOver;
              let isSup;
              if (group.base && group.base.type === "horizBrace") {
                isSup = !!group.sup;
                if (isSup === group.base.isOver) {
                  isBrace = true;
                  isOver = group.base.isOver;
                }
              }
              if (group.base && (group.base.type === "op" || group.base.type === "operatorname")) {
                group.base.parentIsSupSub = true;
              }
              const children = [buildMathML_buildGroup(group.base, options)];
              if (group.sub) {
                children.push(buildMathML_buildGroup(group.sub, options));
              }
              if (group.sup) {
                children.push(buildMathML_buildGroup(group.sup, options));
              }
              let nodeType;
              if (isBrace) {
                nodeType = isOver ? "mover" : "munder";
              } else if (!group.sub) {
                const base = group.base;
                if (base && base.type === "op" && base.limits && (options.style === src_Style.DISPLAY || base.alwaysHandleSupSub)) {
                  nodeType = "mover";
                } else if (base && base.type === "operatorname" && base.alwaysHandleSupSub && (base.limits || options.style === src_Style.DISPLAY)) {
                  nodeType = "mover";
                } else {
                  nodeType = "msup";
                }
              } else if (!group.sup) {
                const base = group.base;
                if (base && base.type === "op" && base.limits && (options.style === src_Style.DISPLAY || base.alwaysHandleSupSub)) {
                  nodeType = "munder";
                } else if (base && base.type === "operatorname" && base.alwaysHandleSupSub && (base.limits || options.style === src_Style.DISPLAY)) {
                  nodeType = "munder";
                } else {
                  nodeType = "msub";
                }
              } else {
                const base = group.base;
                if (base && base.type === "op" && base.limits && options.style === src_Style.DISPLAY) {
                  nodeType = "munderover";
                } else if (base && base.type === "operatorname" && base.alwaysHandleSupSub && (options.style === src_Style.DISPLAY || base.limits)) {
                  nodeType = "munderover";
                } else {
                  nodeType = "msubsup";
                }
              }
              return new mathMLTree.MathNode(nodeType, children);
            }
          });
          ;
          defineFunctionBuilders({
            type: "atom",
            htmlBuilder(group, options) {
              return buildCommon.mathsym(group.text, group.mode, options, ["m" + group.family]);
            },
            mathmlBuilder(group, options) {
              const node = new mathMLTree.MathNode("mo", [makeText(group.text, group.mode)]);
              if (group.family === "bin") {
                const variant = getVariant(group, options);
                if (variant === "bold-italic") {
                  node.setAttribute("mathvariant", variant);
                }
              } else if (group.family === "punct") {
                node.setAttribute("separator", "true");
              } else if (group.family === "open" || group.family === "close") {
                node.setAttribute("stretchy", "false");
              }
              return node;
            }
          });
          ;
          const defaultVariant = {
            "mi": "italic",
            "mn": "normal",
            "mtext": "normal"
          };
          defineFunctionBuilders({
            type: "mathord",
            htmlBuilder(group, options) {
              return buildCommon.makeOrd(group, options, "mathord");
            },
            mathmlBuilder(group, options) {
              const node = new mathMLTree.MathNode("mi", [makeText(group.text, group.mode, options)]);
              const variant = getVariant(group, options) || "italic";
              if (variant !== defaultVariant[node.type]) {
                node.setAttribute("mathvariant", variant);
              }
              return node;
            }
          });
          defineFunctionBuilders({
            type: "textord",
            htmlBuilder(group, options) {
              return buildCommon.makeOrd(group, options, "textord");
            },
            mathmlBuilder(group, options) {
              const text = makeText(group.text, group.mode, options);
              const variant = getVariant(group, options) || "normal";
              let node;
              if (group.mode === "text") {
                node = new mathMLTree.MathNode("mtext", [text]);
              } else if (/[0-9]/.test(group.text)) {
                node = new mathMLTree.MathNode("mn", [text]);
              } else if (group.text === "\\prime") {
                node = new mathMLTree.MathNode("mo", [text]);
              } else {
                node = new mathMLTree.MathNode("mi", [text]);
              }
              if (variant !== defaultVariant[node.type]) {
                node.setAttribute("mathvariant", variant);
              }
              return node;
            }
          });
          ;
          const cssSpace = {
            "\\nobreak": "nobreak",
            "\\allowbreak": "allowbreak"
          };
          const regularSpace = {
            " ": {},
            "\\ ": {},
            "~": {
              className: "nobreak"
            },
            "\\space": {},
            "\\nobreakspace": {
              className: "nobreak"
            }
          };
          defineFunctionBuilders({
            type: "spacing",
            htmlBuilder(group, options) {
              if (regularSpace.hasOwnProperty(group.text)) {
                const className = regularSpace[group.text].className || "";
                if (group.mode === "text") {
                  const ord = buildCommon.makeOrd(group, options, "textord");
                  ord.classes.push(className);
                  return ord;
                } else {
                  return buildCommon.makeSpan(["mspace", className], [buildCommon.mathsym(group.text, group.mode, options)], options);
                }
              } else if (cssSpace.hasOwnProperty(group.text)) {
                return buildCommon.makeSpan(["mspace", cssSpace[group.text]], [], options);
              } else {
                throw new src_ParseError('Unknown type of space "' + group.text + '"');
              }
            },
            mathmlBuilder(group, options) {
              let node;
              if (regularSpace.hasOwnProperty(group.text)) {
                node = new mathMLTree.MathNode("mtext", [new mathMLTree.TextNode(" ")]);
              } else if (cssSpace.hasOwnProperty(group.text)) {
                return new mathMLTree.MathNode("mspace");
              } else {
                throw new src_ParseError('Unknown type of space "' + group.text + '"');
              }
              return node;
            }
          });
          ;
          const pad = () => {
            const padNode = new mathMLTree.MathNode("mtd", []);
            padNode.setAttribute("width", "50%");
            return padNode;
          };
          defineFunctionBuilders({
            type: "tag",
            mathmlBuilder(group, options) {
              const table = new mathMLTree.MathNode("mtable", [new mathMLTree.MathNode("mtr", [pad(), new mathMLTree.MathNode("mtd", [buildExpressionRow(group.body, options)]), pad(), new mathMLTree.MathNode("mtd", [buildExpressionRow(group.tag, options)])])]);
              table.setAttribute("width", "100%");
              return table;
            }
          });
          ;
          const textFontFamilies = {
            "\\text": void 0,
            "\\textrm": "textrm",
            "\\textsf": "textsf",
            "\\texttt": "texttt",
            "\\textnormal": "textrm"
          };
          const textFontWeights = {
            "\\textbf": "textbf",
            "\\textmd": "textmd"
          };
          const textFontShapes = {
            "\\textit": "textit",
            "\\textup": "textup"
          };
          const optionsWithFont = (group, options) => {
            const font = group.font;
            if (!font) {
              return options;
            } else if (textFontFamilies[font]) {
              return options.withTextFontFamily(textFontFamilies[font]);
            } else if (textFontWeights[font]) {
              return options.withTextFontWeight(textFontWeights[font]);
            } else if (font === "\\emph") {
              return options.fontShape === "textit" ? options.withTextFontShape("textup") : options.withTextFontShape("textit");
            }
            return options.withTextFontShape(textFontShapes[font]);
          };
          defineFunction({
            type: "text",
            names: [
              // Font families
              "\\text",
              "\\textrm",
              "\\textsf",
              "\\texttt",
              "\\textnormal",
              // Font weights
              "\\textbf",
              "\\textmd",
              // Font Shapes
              "\\textit",
              "\\textup",
              "\\emph"
            ],
            props: {
              numArgs: 1,
              argTypes: ["text"],
              allowedInArgument: true,
              allowedInText: true
            },
            handler(_ref, args) {
              let {
                parser,
                funcName
              } = _ref;
              const body = args[0];
              return {
                type: "text",
                mode: parser.mode,
                body: ordargument(body),
                font: funcName
              };
            },
            htmlBuilder(group, options) {
              const newOptions = optionsWithFont(group, options);
              const inner2 = buildExpression(group.body, newOptions, true);
              return buildCommon.makeSpan(["mord", "text"], inner2, newOptions);
            },
            mathmlBuilder(group, options) {
              const newOptions = optionsWithFont(group, options);
              return buildExpressionRow(group.body, newOptions);
            }
          });
          ;
          defineFunction({
            type: "underline",
            names: ["\\underline"],
            props: {
              numArgs: 1,
              allowedInText: true
            },
            handler(_ref, args) {
              let {
                parser
              } = _ref;
              return {
                type: "underline",
                mode: parser.mode,
                body: args[0]
              };
            },
            htmlBuilder(group, options) {
              const innerGroup = buildGroup(group.body, options);
              const line = buildCommon.makeLineSpan("underline-line", options);
              const defaultRuleThickness = options.fontMetrics().defaultRuleThickness;
              const vlist = buildCommon.makeVList({
                positionType: "top",
                positionData: innerGroup.height,
                children: [{
                  type: "kern",
                  size: defaultRuleThickness
                }, {
                  type: "elem",
                  elem: line
                }, {
                  type: "kern",
                  size: 3 * defaultRuleThickness
                }, {
                  type: "elem",
                  elem: innerGroup
                }]
              }, options);
              return buildCommon.makeSpan(["mord", "underline"], [vlist], options);
            },
            mathmlBuilder(group, options) {
              const operator = new mathMLTree.MathNode("mo", [new mathMLTree.TextNode("‾")]);
              operator.setAttribute("stretchy", "true");
              const node = new mathMLTree.MathNode("munder", [buildMathML_buildGroup(group.body, options), operator]);
              node.setAttribute("accentunder", "true");
              return node;
            }
          });
          ;
          defineFunction({
            type: "vcenter",
            names: ["\\vcenter"],
            props: {
              numArgs: 1,
              argTypes: ["original"],
              // In LaTeX, \vcenter can act only on a box.
              allowedInText: false
            },
            handler(_ref, args) {
              let {
                parser
              } = _ref;
              return {
                type: "vcenter",
                mode: parser.mode,
                body: args[0]
              };
            },
            htmlBuilder(group, options) {
              const body = buildGroup(group.body, options);
              const axisHeight = options.fontMetrics().axisHeight;
              const dy = 0.5 * (body.height - axisHeight - (body.depth + axisHeight));
              return buildCommon.makeVList({
                positionType: "shift",
                positionData: dy,
                children: [{
                  type: "elem",
                  elem: body
                }]
              }, options);
            },
            mathmlBuilder(group, options) {
              return new mathMLTree.MathNode("mpadded", [buildMathML_buildGroup(group.body, options)], ["vcenter"]);
            }
          });
          ;
          defineFunction({
            type: "verb",
            names: ["\\verb"],
            props: {
              numArgs: 0,
              allowedInText: true
            },
            handler(context, args, optArgs) {
              throw new src_ParseError("\\verb ended by end of line instead of matching delimiter");
            },
            htmlBuilder(group, options) {
              const text = makeVerb(group);
              const body = [];
              const newOptions = options.havingStyle(options.style.text());
              for (let i = 0; i < text.length; i++) {
                let c = text[i];
                if (c === "~") {
                  c = "\\textasciitilde";
                }
                body.push(buildCommon.makeSymbol(c, "Typewriter-Regular", group.mode, newOptions, ["mord", "texttt"]));
              }
              return buildCommon.makeSpan(["mord", "text"].concat(newOptions.sizingClasses(options)), buildCommon.tryCombineChars(body), newOptions);
            },
            mathmlBuilder(group, options) {
              const text = new mathMLTree.TextNode(makeVerb(group));
              const node = new mathMLTree.MathNode("mtext", [text]);
              node.setAttribute("mathvariant", "monospace");
              return node;
            }
          });
          const makeVerb = (group) => group.body.replace(/ /g, group.star ? "␣" : " ");
          ;
          const functions = _functions;
          var src_functions = functions;
          ;
          const spaceRegexString = "[ \r\n	]";
          const controlWordRegexString = "\\\\[a-zA-Z@]+";
          const controlSymbolRegexString = "\\\\[^\uD800-\uDFFF]";
          const controlWordWhitespaceRegexString = "(" + controlWordRegexString + ")" + spaceRegexString + "*";
          const controlSpaceRegexString = "\\\\(\n|[ \r	]+\n?)[ \r	]*";
          const combiningDiacriticalMarkString = "[̀-ͯ]";
          const combiningDiacriticalMarksEndRegex = new RegExp(combiningDiacriticalMarkString + "+$");
          const tokenRegexString = "(" + spaceRegexString + "+)|" + // whitespace
          (controlSpaceRegexString + "|") + // \whitespace
          "([!-\\[\\]-‧‪-퟿豈-￿]" + // single codepoint
          (combiningDiacriticalMarkString + "*") + // ...plus accents
          "|[\uD800-\uDBFF][\uDC00-\uDFFF]" + // surrogate pair
          (combiningDiacriticalMarkString + "*") + // ...plus accents
          "|\\\\verb\\*([^]).*?\\4|\\\\verb([^*a-zA-Z]).*?\\5" + // \verb unstarred
          ("|" + controlWordWhitespaceRegexString) + // \macroName + spaces
          ("|" + controlSymbolRegexString + ")");
          class Lexer2 {
            // Category codes. The lexer only supports comment characters (14) for now.
            // MacroExpander additionally distinguishes active (13).
            constructor(input, settings) {
              this.input = void 0;
              this.settings = void 0;
              this.tokenRegex = void 0;
              this.catcodes = void 0;
              this.input = input;
              this.settings = settings;
              this.tokenRegex = new RegExp(tokenRegexString, "g");
              this.catcodes = {
                "%": 14,
                // comment character
                "~": 13
                // active character
              };
            }
            setCatcode(char, code) {
              this.catcodes[char] = code;
            }
            /**
             * This function lexes a single token.
             */
            lex() {
              const input = this.input;
              const pos = this.tokenRegex.lastIndex;
              if (pos === input.length) {
                return new Token("EOF", new SourceLocation(this, pos, pos));
              }
              const match = this.tokenRegex.exec(input);
              if (match === null || match.index !== pos) {
                throw new src_ParseError("Unexpected character: '" + input[pos] + "'", new Token(input[pos], new SourceLocation(this, pos, pos + 1)));
              }
              const text = match[6] || match[3] || (match[2] ? "\\ " : " ");
              if (this.catcodes[text] === 14) {
                const nlIndex = input.indexOf("\n", this.tokenRegex.lastIndex);
                if (nlIndex === -1) {
                  this.tokenRegex.lastIndex = input.length;
                  this.settings.reportNonstrict("commentAtEnd", "% comment has no terminating newline; LaTeX would fail because of commenting the end of math mode (e.g. $)");
                } else {
                  this.tokenRegex.lastIndex = nlIndex + 1;
                }
                return this.lex();
              }
              return new Token(text, new SourceLocation(this, pos, this.tokenRegex.lastIndex));
            }
          }
          ;
          class Namespace {
            /**
             * Both arguments are optional.  The first argument is an object of
             * built-in mappings which never change.  The second argument is an object
             * of initial (global-level) mappings, which will constantly change
             * according to any global/top-level `set`s done.
             */
            constructor(builtins, globalMacros) {
              if (builtins === void 0) {
                builtins = {};
              }
              if (globalMacros === void 0) {
                globalMacros = {};
              }
              this.current = void 0;
              this.builtins = void 0;
              this.undefStack = void 0;
              this.current = globalMacros;
              this.builtins = builtins;
              this.undefStack = [];
            }
            /**
             * Start a new nested group, affecting future local `set`s.
             */
            beginGroup() {
              this.undefStack.push({});
            }
            /**
             * End current nested group, restoring values before the group began.
             */
            endGroup() {
              if (this.undefStack.length === 0) {
                throw new src_ParseError("Unbalanced namespace destruction: attempt to pop global namespace; please report this as a bug");
              }
              const undefs = this.undefStack.pop();
              for (const undef in undefs) {
                if (undefs.hasOwnProperty(undef)) {
                  if (undefs[undef] == null) {
                    delete this.current[undef];
                  } else {
                    this.current[undef] = undefs[undef];
                  }
                }
              }
            }
            /**
             * Ends all currently nested groups (if any), restoring values before the
             * groups began.  Useful in case of an error in the middle of parsing.
             */
            endGroups() {
              while (this.undefStack.length > 0) {
                this.endGroup();
              }
            }
            /**
             * Detect whether `name` has a definition.  Equivalent to
             * `get(name) != null`.
             */
            has(name) {
              return this.current.hasOwnProperty(name) || this.builtins.hasOwnProperty(name);
            }
            /**
             * Get the current value of a name, or `undefined` if there is no value.
             *
             * Note: Do not use `if (namespace.get(...))` to detect whether a macro
             * is defined, as the definition may be the empty string which evaluates
             * to `false` in JavaScript.  Use `if (namespace.get(...) != null)` or
             * `if (namespace.has(...))`.
             */
            get(name) {
              if (this.current.hasOwnProperty(name)) {
                return this.current[name];
              } else {
                return this.builtins[name];
              }
            }
            /**
             * Set the current value of a name, and optionally set it globally too.
             * Local set() sets the current value and (when appropriate) adds an undo
             * operation to the undo stack.  Global set() may change the undo
             * operation at every level, so takes time linear in their number.
             * A value of undefined means to delete existing definitions.
             */
            set(name, value, global) {
              if (global === void 0) {
                global = false;
              }
              if (global) {
                for (let i = 0; i < this.undefStack.length; i++) {
                  delete this.undefStack[i][name];
                }
                if (this.undefStack.length > 0) {
                  this.undefStack[this.undefStack.length - 1][name] = value;
                }
              } else {
                const top = this.undefStack[this.undefStack.length - 1];
                if (top && !top.hasOwnProperty(name)) {
                  top[name] = this.current[name];
                }
              }
              if (value == null) {
                delete this.current[name];
              } else {
                this.current[name] = value;
              }
            }
          }
          ;
          const macros = _macros;
          var src_macros = macros;
          defineMacro("\\noexpand", function(context) {
            const t = context.popToken();
            if (context.isExpandable(t.text)) {
              t.noexpand = true;
              t.treatAsRelax = true;
            }
            return {
              tokens: [t],
              numArgs: 0
            };
          });
          defineMacro("\\expandafter", function(context) {
            const t = context.popToken();
            context.expandOnce(true);
            return {
              tokens: [t],
              numArgs: 0
            };
          });
          defineMacro("\\@firstoftwo", function(context) {
            const args = context.consumeArgs(2);
            return {
              tokens: args[0],
              numArgs: 0
            };
          });
          defineMacro("\\@secondoftwo", function(context) {
            const args = context.consumeArgs(2);
            return {
              tokens: args[1],
              numArgs: 0
            };
          });
          defineMacro("\\@ifnextchar", function(context) {
            const args = context.consumeArgs(3);
            context.consumeSpaces();
            const nextToken = context.future();
            if (args[0].length === 1 && args[0][0].text === nextToken.text) {
              return {
                tokens: args[1],
                numArgs: 0
              };
            } else {
              return {
                tokens: args[2],
                numArgs: 0
              };
            }
          });
          defineMacro("\\@ifstar", "\\@ifnextchar *{\\@firstoftwo{#1}}");
          defineMacro("\\TextOrMath", function(context) {
            const args = context.consumeArgs(2);
            if (context.mode === "text") {
              return {
                tokens: args[0],
                numArgs: 0
              };
            } else {
              return {
                tokens: args[1],
                numArgs: 0
              };
            }
          });
          const digitToNumber = {
            "0": 0,
            "1": 1,
            "2": 2,
            "3": 3,
            "4": 4,
            "5": 5,
            "6": 6,
            "7": 7,
            "8": 8,
            "9": 9,
            "a": 10,
            "A": 10,
            "b": 11,
            "B": 11,
            "c": 12,
            "C": 12,
            "d": 13,
            "D": 13,
            "e": 14,
            "E": 14,
            "f": 15,
            "F": 15
          };
          defineMacro("\\char", function(context) {
            let token = context.popToken();
            let base;
            let number = "";
            if (token.text === "'") {
              base = 8;
              token = context.popToken();
            } else if (token.text === '"') {
              base = 16;
              token = context.popToken();
            } else if (token.text === "`") {
              token = context.popToken();
              if (token.text[0] === "\\") {
                number = token.text.charCodeAt(1);
              } else if (token.text === "EOF") {
                throw new src_ParseError("\\char` missing argument");
              } else {
                number = token.text.charCodeAt(0);
              }
            } else {
              base = 10;
            }
            if (base) {
              number = digitToNumber[token.text];
              if (number == null || number >= base) {
                throw new src_ParseError("Invalid base-" + base + " digit " + token.text);
              }
              let digit;
              while ((digit = digitToNumber[context.future().text]) != null && digit < base) {
                number *= base;
                number += digit;
                context.popToken();
              }
            }
            return "\\@char{" + number + "}";
          });
          const newcommand = (context, existsOK, nonexistsOK, skipIfExists) => {
            let arg = context.consumeArg().tokens;
            if (arg.length !== 1) {
              throw new src_ParseError("\\newcommand's first argument must be a macro name");
            }
            const name = arg[0].text;
            const exists = context.isDefined(name);
            if (exists && !existsOK) {
              throw new src_ParseError("\\newcommand{" + name + "} attempting to redefine " + (name + "; use \\renewcommand"));
            }
            if (!exists && !nonexistsOK) {
              throw new src_ParseError("\\renewcommand{" + name + "} when command " + name + " does not yet exist; use \\newcommand");
            }
            let numArgs = 0;
            arg = context.consumeArg().tokens;
            if (arg.length === 1 && arg[0].text === "[") {
              let argText = "";
              let token = context.expandNextToken();
              while (token.text !== "]" && token.text !== "EOF") {
                argText += token.text;
                token = context.expandNextToken();
              }
              if (!argText.match(/^\s*[0-9]+\s*$/)) {
                throw new src_ParseError("Invalid number of arguments: " + argText);
              }
              numArgs = parseInt(argText);
              arg = context.consumeArg().tokens;
            }
            if (!(exists && skipIfExists)) {
              context.macros.set(name, {
                tokens: arg,
                numArgs
              });
            }
            return "";
          };
          defineMacro("\\newcommand", (context) => newcommand(context, false, true, false));
          defineMacro("\\renewcommand", (context) => newcommand(context, true, false, false));
          defineMacro("\\providecommand", (context) => newcommand(context, true, true, true));
          defineMacro("\\message", (context) => {
            const arg = context.consumeArgs(1)[0];
            console.log(arg.reverse().map((token) => token.text).join(""));
            return "";
          });
          defineMacro("\\errmessage", (context) => {
            const arg = context.consumeArgs(1)[0];
            console.error(arg.reverse().map((token) => token.text).join(""));
            return "";
          });
          defineMacro("\\show", (context) => {
            const tok = context.popToken();
            const name = tok.text;
            console.log(tok, context.macros.get(name), src_functions[name], src_symbols.math[name], src_symbols.text[name]);
            return "";
          });
          defineMacro("\\bgroup", "{");
          defineMacro("\\egroup", "}");
          defineMacro("~", "\\nobreakspace");
          defineMacro("\\lq", "`");
          defineMacro("\\rq", "'");
          defineMacro("\\aa", "\\r a");
          defineMacro("\\AA", "\\r A");
          defineMacro("\\textcopyright", "\\html@mathml{\\textcircled{c}}{\\char`©}");
          defineMacro("\\copyright", "\\TextOrMath{\\textcopyright}{\\text{\\textcopyright}}");
          defineMacro("\\textregistered", "\\html@mathml{\\textcircled{\\scriptsize R}}{\\char`®}");
          defineMacro("ℬ", "\\mathscr{B}");
          defineMacro("ℰ", "\\mathscr{E}");
          defineMacro("ℱ", "\\mathscr{F}");
          defineMacro("ℋ", "\\mathscr{H}");
          defineMacro("ℐ", "\\mathscr{I}");
          defineMacro("ℒ", "\\mathscr{L}");
          defineMacro("ℳ", "\\mathscr{M}");
          defineMacro("ℛ", "\\mathscr{R}");
          defineMacro("ℭ", "\\mathfrak{C}");
          defineMacro("ℌ", "\\mathfrak{H}");
          defineMacro("ℨ", "\\mathfrak{Z}");
          defineMacro("\\Bbbk", "\\Bbb{k}");
          defineMacro("·", "\\cdotp");
          defineMacro("\\llap", "\\mathllap{\\textrm{#1}}");
          defineMacro("\\rlap", "\\mathrlap{\\textrm{#1}}");
          defineMacro("\\clap", "\\mathclap{\\textrm{#1}}");
          defineMacro("\\mathstrut", "\\vphantom{(}");
          defineMacro("\\underbar", "\\underline{\\text{#1}}");
          defineMacro("\\not", '\\html@mathml{\\mathrel{\\mathrlap\\@not}}{\\char"338}');
          defineMacro("\\neq", "\\html@mathml{\\mathrel{\\not=}}{\\mathrel{\\char`≠}}");
          defineMacro("\\ne", "\\neq");
          defineMacro("≠", "\\neq");
          defineMacro("\\notin", "\\html@mathml{\\mathrel{{\\in}\\mathllap{/\\mskip1mu}}}{\\mathrel{\\char`∉}}");
          defineMacro("∉", "\\notin");
          defineMacro("≘", "\\html@mathml{\\mathrel{=\\kern{-1em}\\raisebox{0.4em}{$\\scriptsize\\frown$}}}{\\mathrel{\\char`≘}}");
          defineMacro("≙", "\\html@mathml{\\stackrel{\\tiny\\wedge}{=}}{\\mathrel{\\char`≘}}");
          defineMacro("≚", "\\html@mathml{\\stackrel{\\tiny\\vee}{=}}{\\mathrel{\\char`≚}}");
          defineMacro("≛", "\\html@mathml{\\stackrel{\\scriptsize\\star}{=}}{\\mathrel{\\char`≛}}");
          defineMacro("≝", "\\html@mathml{\\stackrel{\\tiny\\mathrm{def}}{=}}{\\mathrel{\\char`≝}}");
          defineMacro("≞", "\\html@mathml{\\stackrel{\\tiny\\mathrm{m}}{=}}{\\mathrel{\\char`≞}}");
          defineMacro("≟", "\\html@mathml{\\stackrel{\\tiny?}{=}}{\\mathrel{\\char`≟}}");
          defineMacro("⟂", "\\perp");
          defineMacro("‼", "\\mathclose{!\\mkern-0.8mu!}");
          defineMacro("∌", "\\notni");
          defineMacro("⌜", "\\ulcorner");
          defineMacro("⌝", "\\urcorner");
          defineMacro("⌞", "\\llcorner");
          defineMacro("⌟", "\\lrcorner");
          defineMacro("©", "\\copyright");
          defineMacro("®", "\\textregistered");
          defineMacro("️", "\\textregistered");
          defineMacro("\\ulcorner", '\\html@mathml{\\@ulcorner}{\\mathop{\\char"231c}}');
          defineMacro("\\urcorner", '\\html@mathml{\\@urcorner}{\\mathop{\\char"231d}}');
          defineMacro("\\llcorner", '\\html@mathml{\\@llcorner}{\\mathop{\\char"231e}}');
          defineMacro("\\lrcorner", '\\html@mathml{\\@lrcorner}{\\mathop{\\char"231f}}');
          defineMacro("\\vdots", "{\\varvdots\\rule{0pt}{15pt}}");
          defineMacro("⋮", "\\vdots");
          defineMacro("\\varGamma", "\\mathit{\\Gamma}");
          defineMacro("\\varDelta", "\\mathit{\\Delta}");
          defineMacro("\\varTheta", "\\mathit{\\Theta}");
          defineMacro("\\varLambda", "\\mathit{\\Lambda}");
          defineMacro("\\varXi", "\\mathit{\\Xi}");
          defineMacro("\\varPi", "\\mathit{\\Pi}");
          defineMacro("\\varSigma", "\\mathit{\\Sigma}");
          defineMacro("\\varUpsilon", "\\mathit{\\Upsilon}");
          defineMacro("\\varPhi", "\\mathit{\\Phi}");
          defineMacro("\\varPsi", "\\mathit{\\Psi}");
          defineMacro("\\varOmega", "\\mathit{\\Omega}");
          defineMacro("\\substack", "\\begin{subarray}{c}#1\\end{subarray}");
          defineMacro("\\colon", "\\nobreak\\mskip2mu\\mathpunct{}\\mathchoice{\\mkern-3mu}{\\mkern-3mu}{}{}{:}\\mskip6mu\\relax");
          defineMacro("\\boxed", "\\fbox{$\\displaystyle{#1}$}");
          defineMacro("\\iff", "\\DOTSB\\;\\Longleftrightarrow\\;");
          defineMacro("\\implies", "\\DOTSB\\;\\Longrightarrow\\;");
          defineMacro("\\impliedby", "\\DOTSB\\;\\Longleftarrow\\;");
          defineMacro("\\dddot", "{\\overset{\\raisebox{-0.1ex}{\\normalsize ...}}{#1}}");
          defineMacro("\\ddddot", "{\\overset{\\raisebox{-0.1ex}{\\normalsize ....}}{#1}}");
          const dotsByToken = {
            ",": "\\dotsc",
            "\\not": "\\dotsb",
            // \keybin@ checks for the following:
            "+": "\\dotsb",
            "=": "\\dotsb",
            "<": "\\dotsb",
            ">": "\\dotsb",
            "-": "\\dotsb",
            "*": "\\dotsb",
            ":": "\\dotsb",
            // Symbols whose definition starts with \DOTSB:
            "\\DOTSB": "\\dotsb",
            "\\coprod": "\\dotsb",
            "\\bigvee": "\\dotsb",
            "\\bigwedge": "\\dotsb",
            "\\biguplus": "\\dotsb",
            "\\bigcap": "\\dotsb",
            "\\bigcup": "\\dotsb",
            "\\prod": "\\dotsb",
            "\\sum": "\\dotsb",
            "\\bigotimes": "\\dotsb",
            "\\bigoplus": "\\dotsb",
            "\\bigodot": "\\dotsb",
            "\\bigsqcup": "\\dotsb",
            "\\And": "\\dotsb",
            "\\longrightarrow": "\\dotsb",
            "\\Longrightarrow": "\\dotsb",
            "\\longleftarrow": "\\dotsb",
            "\\Longleftarrow": "\\dotsb",
            "\\longleftrightarrow": "\\dotsb",
            "\\Longleftrightarrow": "\\dotsb",
            "\\mapsto": "\\dotsb",
            "\\longmapsto": "\\dotsb",
            "\\hookrightarrow": "\\dotsb",
            "\\doteq": "\\dotsb",
            // Symbols whose definition starts with \mathbin:
            "\\mathbin": "\\dotsb",
            // Symbols whose definition starts with \mathrel:
            "\\mathrel": "\\dotsb",
            "\\relbar": "\\dotsb",
            "\\Relbar": "\\dotsb",
            "\\xrightarrow": "\\dotsb",
            "\\xleftarrow": "\\dotsb",
            // Symbols whose definition starts with \DOTSI:
            "\\DOTSI": "\\dotsi",
            "\\int": "\\dotsi",
            "\\oint": "\\dotsi",
            "\\iint": "\\dotsi",
            "\\iiint": "\\dotsi",
            "\\iiiint": "\\dotsi",
            "\\idotsint": "\\dotsi",
            // Symbols whose definition starts with \DOTSX:
            "\\DOTSX": "\\dotsx"
          };
          defineMacro("\\dots", function(context) {
            let thedots = "\\dotso";
            const next = context.expandAfterFuture().text;
            if (next in dotsByToken) {
              thedots = dotsByToken[next];
            } else if (next.slice(0, 4) === "\\not") {
              thedots = "\\dotsb";
            } else if (next in src_symbols.math) {
              if (utils.contains(["bin", "rel"], src_symbols.math[next].group)) {
                thedots = "\\dotsb";
              }
            }
            return thedots;
          });
          const spaceAfterDots = {
            // \rightdelim@ checks for the following:
            ")": true,
            "]": true,
            "\\rbrack": true,
            "\\}": true,
            "\\rbrace": true,
            "\\rangle": true,
            "\\rceil": true,
            "\\rfloor": true,
            "\\rgroup": true,
            "\\rmoustache": true,
            "\\right": true,
            "\\bigr": true,
            "\\biggr": true,
            "\\Bigr": true,
            "\\Biggr": true,
            // \extra@ also tests for the following:
            "$": true,
            // \extrap@ checks for the following:
            ";": true,
            ".": true,
            ",": true
          };
          defineMacro("\\dotso", function(context) {
            const next = context.future().text;
            if (next in spaceAfterDots) {
              return "\\ldots\\,";
            } else {
              return "\\ldots";
            }
          });
          defineMacro("\\dotsc", function(context) {
            const next = context.future().text;
            if (next in spaceAfterDots && next !== ",") {
              return "\\ldots\\,";
            } else {
              return "\\ldots";
            }
          });
          defineMacro("\\cdots", function(context) {
            const next = context.future().text;
            if (next in spaceAfterDots) {
              return "\\@cdots\\,";
            } else {
              return "\\@cdots";
            }
          });
          defineMacro("\\dotsb", "\\cdots");
          defineMacro("\\dotsm", "\\cdots");
          defineMacro("\\dotsi", "\\!\\cdots");
          defineMacro("\\dotsx", "\\ldots\\,");
          defineMacro("\\DOTSI", "\\relax");
          defineMacro("\\DOTSB", "\\relax");
          defineMacro("\\DOTSX", "\\relax");
          defineMacro("\\tmspace", "\\TextOrMath{\\kern#1#3}{\\mskip#1#2}\\relax");
          defineMacro("\\,", "\\tmspace+{3mu}{.1667em}");
          defineMacro("\\thinspace", "\\,");
          defineMacro("\\>", "\\mskip{4mu}");
          defineMacro("\\:", "\\tmspace+{4mu}{.2222em}");
          defineMacro("\\medspace", "\\:");
          defineMacro("\\;", "\\tmspace+{5mu}{.2777em}");
          defineMacro("\\thickspace", "\\;");
          defineMacro("\\!", "\\tmspace-{3mu}{.1667em}");
          defineMacro("\\negthinspace", "\\!");
          defineMacro("\\negmedspace", "\\tmspace-{4mu}{.2222em}");
          defineMacro("\\negthickspace", "\\tmspace-{5mu}{.277em}");
          defineMacro("\\enspace", "\\kern.5em ");
          defineMacro("\\enskip", "\\hskip.5em\\relax");
          defineMacro("\\quad", "\\hskip1em\\relax");
          defineMacro("\\qquad", "\\hskip2em\\relax");
          defineMacro("\\tag", "\\@ifstar\\tag@literal\\tag@paren");
          defineMacro("\\tag@paren", "\\tag@literal{({#1})}");
          defineMacro("\\tag@literal", (context) => {
            if (context.macros.get("\\df@tag")) {
              throw new src_ParseError("Multiple \\tag");
            }
            return "\\gdef\\df@tag{\\text{#1}}";
          });
          defineMacro("\\bmod", "\\mathchoice{\\mskip1mu}{\\mskip1mu}{\\mskip5mu}{\\mskip5mu}\\mathbin{\\rm mod}\\mathchoice{\\mskip1mu}{\\mskip1mu}{\\mskip5mu}{\\mskip5mu}");
          defineMacro("\\pod", "\\allowbreak\\mathchoice{\\mkern18mu}{\\mkern8mu}{\\mkern8mu}{\\mkern8mu}(#1)");
          defineMacro("\\pmod", "\\pod{{\\rm mod}\\mkern6mu#1}");
          defineMacro("\\mod", "\\allowbreak\\mathchoice{\\mkern18mu}{\\mkern12mu}{\\mkern12mu}{\\mkern12mu}{\\rm mod}\\,\\,#1");
          defineMacro("\\newline", "\\\\\\relax");
          defineMacro("\\TeX", "\\textrm{\\html@mathml{T\\kern-.1667em\\raisebox{-.5ex}{E}\\kern-.125emX}{TeX}}");
          const latexRaiseA = makeEm(fontMetricsData["Main-Regular"]["T".charCodeAt(0)][1] - 0.7 * fontMetricsData["Main-Regular"]["A".charCodeAt(0)][1]);
          defineMacro("\\LaTeX", "\\textrm{\\html@mathml{" + ("L\\kern-.36em\\raisebox{" + latexRaiseA + "}{\\scriptstyle A}") + "\\kern-.15em\\TeX}{LaTeX}}");
          defineMacro("\\KaTeX", "\\textrm{\\html@mathml{" + ("K\\kern-.17em\\raisebox{" + latexRaiseA + "}{\\scriptstyle A}") + "\\kern-.15em\\TeX}{KaTeX}}");
          defineMacro("\\hspace", "\\@ifstar\\@hspacer\\@hspace");
          defineMacro("\\@hspace", "\\hskip #1\\relax");
          defineMacro("\\@hspacer", "\\rule{0pt}{0pt}\\hskip #1\\relax");
          defineMacro("\\ordinarycolon", ":");
          defineMacro("\\vcentcolon", "\\mathrel{\\mathop\\ordinarycolon}");
          defineMacro("\\dblcolon", '\\html@mathml{\\mathrel{\\vcentcolon\\mathrel{\\mkern-.9mu}\\vcentcolon}}{\\mathop{\\char"2237}}');
          defineMacro("\\coloneqq", '\\html@mathml{\\mathrel{\\vcentcolon\\mathrel{\\mkern-1.2mu}=}}{\\mathop{\\char"2254}}');
          defineMacro("\\Coloneqq", '\\html@mathml{\\mathrel{\\dblcolon\\mathrel{\\mkern-1.2mu}=}}{\\mathop{\\char"2237\\char"3d}}');
          defineMacro("\\coloneq", '\\html@mathml{\\mathrel{\\vcentcolon\\mathrel{\\mkern-1.2mu}\\mathrel{-}}}{\\mathop{\\char"3a\\char"2212}}');
          defineMacro("\\Coloneq", '\\html@mathml{\\mathrel{\\dblcolon\\mathrel{\\mkern-1.2mu}\\mathrel{-}}}{\\mathop{\\char"2237\\char"2212}}');
          defineMacro("\\eqqcolon", '\\html@mathml{\\mathrel{=\\mathrel{\\mkern-1.2mu}\\vcentcolon}}{\\mathop{\\char"2255}}');
          defineMacro("\\Eqqcolon", '\\html@mathml{\\mathrel{=\\mathrel{\\mkern-1.2mu}\\dblcolon}}{\\mathop{\\char"3d\\char"2237}}');
          defineMacro("\\eqcolon", '\\html@mathml{\\mathrel{\\mathrel{-}\\mathrel{\\mkern-1.2mu}\\vcentcolon}}{\\mathop{\\char"2239}}');
          defineMacro("\\Eqcolon", '\\html@mathml{\\mathrel{\\mathrel{-}\\mathrel{\\mkern-1.2mu}\\dblcolon}}{\\mathop{\\char"2212\\char"2237}}');
          defineMacro("\\colonapprox", '\\html@mathml{\\mathrel{\\vcentcolon\\mathrel{\\mkern-1.2mu}\\approx}}{\\mathop{\\char"3a\\char"2248}}');
          defineMacro("\\Colonapprox", '\\html@mathml{\\mathrel{\\dblcolon\\mathrel{\\mkern-1.2mu}\\approx}}{\\mathop{\\char"2237\\char"2248}}');
          defineMacro("\\colonsim", '\\html@mathml{\\mathrel{\\vcentcolon\\mathrel{\\mkern-1.2mu}\\sim}}{\\mathop{\\char"3a\\char"223c}}');
          defineMacro("\\Colonsim", '\\html@mathml{\\mathrel{\\dblcolon\\mathrel{\\mkern-1.2mu}\\sim}}{\\mathop{\\char"2237\\char"223c}}');
          defineMacro("∷", "\\dblcolon");
          defineMacro("∹", "\\eqcolon");
          defineMacro("≔", "\\coloneqq");
          defineMacro("≕", "\\eqqcolon");
          defineMacro("⩴", "\\Coloneqq");
          defineMacro("\\ratio", "\\vcentcolon");
          defineMacro("\\coloncolon", "\\dblcolon");
          defineMacro("\\colonequals", "\\coloneqq");
          defineMacro("\\coloncolonequals", "\\Coloneqq");
          defineMacro("\\equalscolon", "\\eqqcolon");
          defineMacro("\\equalscoloncolon", "\\Eqqcolon");
          defineMacro("\\colonminus", "\\coloneq");
          defineMacro("\\coloncolonminus", "\\Coloneq");
          defineMacro("\\minuscolon", "\\eqcolon");
          defineMacro("\\minuscoloncolon", "\\Eqcolon");
          defineMacro("\\coloncolonapprox", "\\Colonapprox");
          defineMacro("\\coloncolonsim", "\\Colonsim");
          defineMacro("\\simcolon", "\\mathrel{\\sim\\mathrel{\\mkern-1.2mu}\\vcentcolon}");
          defineMacro("\\simcoloncolon", "\\mathrel{\\sim\\mathrel{\\mkern-1.2mu}\\dblcolon}");
          defineMacro("\\approxcolon", "\\mathrel{\\approx\\mathrel{\\mkern-1.2mu}\\vcentcolon}");
          defineMacro("\\approxcoloncolon", "\\mathrel{\\approx\\mathrel{\\mkern-1.2mu}\\dblcolon}");
          defineMacro("\\notni", "\\html@mathml{\\not\\ni}{\\mathrel{\\char`∌}}");
          defineMacro("\\limsup", "\\DOTSB\\operatorname*{lim\\,sup}");
          defineMacro("\\liminf", "\\DOTSB\\operatorname*{lim\\,inf}");
          defineMacro("\\injlim", "\\DOTSB\\operatorname*{inj\\,lim}");
          defineMacro("\\projlim", "\\DOTSB\\operatorname*{proj\\,lim}");
          defineMacro("\\varlimsup", "\\DOTSB\\operatorname*{\\overline{lim}}");
          defineMacro("\\varliminf", "\\DOTSB\\operatorname*{\\underline{lim}}");
          defineMacro("\\varinjlim", "\\DOTSB\\operatorname*{\\underrightarrow{lim}}");
          defineMacro("\\varprojlim", "\\DOTSB\\operatorname*{\\underleftarrow{lim}}");
          defineMacro("\\gvertneqq", "\\html@mathml{\\@gvertneqq}{≩}");
          defineMacro("\\lvertneqq", "\\html@mathml{\\@lvertneqq}{≨}");
          defineMacro("\\ngeqq", "\\html@mathml{\\@ngeqq}{≱}");
          defineMacro("\\ngeqslant", "\\html@mathml{\\@ngeqslant}{≱}");
          defineMacro("\\nleqq", "\\html@mathml{\\@nleqq}{≰}");
          defineMacro("\\nleqslant", "\\html@mathml{\\@nleqslant}{≰}");
          defineMacro("\\nshortmid", "\\html@mathml{\\@nshortmid}{∤}");
          defineMacro("\\nshortparallel", "\\html@mathml{\\@nshortparallel}{∦}");
          defineMacro("\\nsubseteqq", "\\html@mathml{\\@nsubseteqq}{⊈}");
          defineMacro("\\nsupseteqq", "\\html@mathml{\\@nsupseteqq}{⊉}");
          defineMacro("\\varsubsetneq", "\\html@mathml{\\@varsubsetneq}{⊊}");
          defineMacro("\\varsubsetneqq", "\\html@mathml{\\@varsubsetneqq}{⫋}");
          defineMacro("\\varsupsetneq", "\\html@mathml{\\@varsupsetneq}{⊋}");
          defineMacro("\\varsupsetneqq", "\\html@mathml{\\@varsupsetneqq}{⫌}");
          defineMacro("\\imath", "\\html@mathml{\\@imath}{ı}");
          defineMacro("\\jmath", "\\html@mathml{\\@jmath}{ȷ}");
          defineMacro("\\llbracket", "\\html@mathml{\\mathopen{[\\mkern-3.2mu[}}{\\mathopen{\\char`⟦}}");
          defineMacro("\\rrbracket", "\\html@mathml{\\mathclose{]\\mkern-3.2mu]}}{\\mathclose{\\char`⟧}}");
          defineMacro("⟦", "\\llbracket");
          defineMacro("⟧", "\\rrbracket");
          defineMacro("\\lBrace", "\\html@mathml{\\mathopen{\\{\\mkern-3.2mu[}}{\\mathopen{\\char`⦃}}");
          defineMacro("\\rBrace", "\\html@mathml{\\mathclose{]\\mkern-3.2mu\\}}}{\\mathclose{\\char`⦄}}");
          defineMacro("⦃", "\\lBrace");
          defineMacro("⦄", "\\rBrace");
          defineMacro("\\minuso", "\\mathbin{\\html@mathml{{\\mathrlap{\\mathchoice{\\kern{0.145em}}{\\kern{0.145em}}{\\kern{0.1015em}}{\\kern{0.0725em}}\\circ}{-}}}{\\char`⦵}}");
          defineMacro("⦵", "\\minuso");
          defineMacro("\\darr", "\\downarrow");
          defineMacro("\\dArr", "\\Downarrow");
          defineMacro("\\Darr", "\\Downarrow");
          defineMacro("\\lang", "\\langle");
          defineMacro("\\rang", "\\rangle");
          defineMacro("\\uarr", "\\uparrow");
          defineMacro("\\uArr", "\\Uparrow");
          defineMacro("\\Uarr", "\\Uparrow");
          defineMacro("\\N", "\\mathbb{N}");
          defineMacro("\\R", "\\mathbb{R}");
          defineMacro("\\Z", "\\mathbb{Z}");
          defineMacro("\\alef", "\\aleph");
          defineMacro("\\alefsym", "\\aleph");
          defineMacro("\\Alpha", "\\mathrm{A}");
          defineMacro("\\Beta", "\\mathrm{B}");
          defineMacro("\\bull", "\\bullet");
          defineMacro("\\Chi", "\\mathrm{X}");
          defineMacro("\\clubs", "\\clubsuit");
          defineMacro("\\cnums", "\\mathbb{C}");
          defineMacro("\\Complex", "\\mathbb{C}");
          defineMacro("\\Dagger", "\\ddagger");
          defineMacro("\\diamonds", "\\diamondsuit");
          defineMacro("\\empty", "\\emptyset");
          defineMacro("\\Epsilon", "\\mathrm{E}");
          defineMacro("\\Eta", "\\mathrm{H}");
          defineMacro("\\exist", "\\exists");
          defineMacro("\\harr", "\\leftrightarrow");
          defineMacro("\\hArr", "\\Leftrightarrow");
          defineMacro("\\Harr", "\\Leftrightarrow");
          defineMacro("\\hearts", "\\heartsuit");
          defineMacro("\\image", "\\Im");
          defineMacro("\\infin", "\\infty");
          defineMacro("\\Iota", "\\mathrm{I}");
          defineMacro("\\isin", "\\in");
          defineMacro("\\Kappa", "\\mathrm{K}");
          defineMacro("\\larr", "\\leftarrow");
          defineMacro("\\lArr", "\\Leftarrow");
          defineMacro("\\Larr", "\\Leftarrow");
          defineMacro("\\lrarr", "\\leftrightarrow");
          defineMacro("\\lrArr", "\\Leftrightarrow");
          defineMacro("\\Lrarr", "\\Leftrightarrow");
          defineMacro("\\Mu", "\\mathrm{M}");
          defineMacro("\\natnums", "\\mathbb{N}");
          defineMacro("\\Nu", "\\mathrm{N}");
          defineMacro("\\Omicron", "\\mathrm{O}");
          defineMacro("\\plusmn", "\\pm");
          defineMacro("\\rarr", "\\rightarrow");
          defineMacro("\\rArr", "\\Rightarrow");
          defineMacro("\\Rarr", "\\Rightarrow");
          defineMacro("\\real", "\\Re");
          defineMacro("\\reals", "\\mathbb{R}");
          defineMacro("\\Reals", "\\mathbb{R}");
          defineMacro("\\Rho", "\\mathrm{P}");
          defineMacro("\\sdot", "\\cdot");
          defineMacro("\\sect", "\\S");
          defineMacro("\\spades", "\\spadesuit");
          defineMacro("\\sub", "\\subset");
          defineMacro("\\sube", "\\subseteq");
          defineMacro("\\supe", "\\supseteq");
          defineMacro("\\Tau", "\\mathrm{T}");
          defineMacro("\\thetasym", "\\vartheta");
          defineMacro("\\weierp", "\\wp");
          defineMacro("\\Zeta", "\\mathrm{Z}");
          defineMacro("\\argmin", "\\DOTSB\\operatorname*{arg\\,min}");
          defineMacro("\\argmax", "\\DOTSB\\operatorname*{arg\\,max}");
          defineMacro("\\plim", "\\DOTSB\\mathop{\\operatorname{plim}}\\limits");
          defineMacro("\\bra", "\\mathinner{\\langle{#1}|}");
          defineMacro("\\ket", "\\mathinner{|{#1}\\rangle}");
          defineMacro("\\braket", "\\mathinner{\\langle{#1}\\rangle}");
          defineMacro("\\Bra", "\\left\\langle#1\\right|");
          defineMacro("\\Ket", "\\left|#1\\right\\rangle");
          const braketHelper = (one) => (context) => {
            const left = context.consumeArg().tokens;
            const middle = context.consumeArg().tokens;
            const middleDouble = context.consumeArg().tokens;
            const right = context.consumeArg().tokens;
            const oldMiddle = context.macros.get("|");
            const oldMiddleDouble = context.macros.get("\\|");
            context.macros.beginGroup();
            const midMacro = (double) => (context2) => {
              if (one) {
                context2.macros.set("|", oldMiddle);
                if (middleDouble.length) {
                  context2.macros.set("\\|", oldMiddleDouble);
                }
              }
              let doubled = double;
              if (!double && middleDouble.length) {
                const nextToken = context2.future();
                if (nextToken.text === "|") {
                  context2.popToken();
                  doubled = true;
                }
              }
              return {
                tokens: doubled ? middleDouble : middle,
                numArgs: 0
              };
            };
            context.macros.set("|", midMacro(false));
            if (middleDouble.length) {
              context.macros.set("\\|", midMacro(true));
            }
            const arg = context.consumeArg().tokens;
            const expanded = context.expandTokens([
              ...right,
              ...arg,
              ...left
              // reversed
            ]);
            context.macros.endGroup();
            return {
              tokens: expanded.reverse(),
              numArgs: 0
            };
          };
          defineMacro("\\bra@ket", braketHelper(false));
          defineMacro("\\bra@set", braketHelper(true));
          defineMacro("\\Braket", "\\bra@ket{\\left\\langle}{\\,\\middle\\vert\\,}{\\,\\middle\\vert\\,}{\\right\\rangle}");
          defineMacro("\\Set", "\\bra@set{\\left\\{\\:}{\\;\\middle\\vert\\;}{\\;\\middle\\Vert\\;}{\\:\\right\\}}");
          defineMacro("\\set", "\\bra@set{\\{\\,}{\\mid}{}{\\,\\}}");
          defineMacro("\\angln", "{\\angl n}");
          defineMacro("\\blue", "\\textcolor{##6495ed}{#1}");
          defineMacro("\\orange", "\\textcolor{##ffa500}{#1}");
          defineMacro("\\pink", "\\textcolor{##ff00af}{#1}");
          defineMacro("\\red", "\\textcolor{##df0030}{#1}");
          defineMacro("\\green", "\\textcolor{##28ae7b}{#1}");
          defineMacro("\\gray", "\\textcolor{gray}{#1}");
          defineMacro("\\purple", "\\textcolor{##9d38bd}{#1}");
          defineMacro("\\blueA", "\\textcolor{##ccfaff}{#1}");
          defineMacro("\\blueB", "\\textcolor{##80f6ff}{#1}");
          defineMacro("\\blueC", "\\textcolor{##63d9ea}{#1}");
          defineMacro("\\blueD", "\\textcolor{##11accd}{#1}");
          defineMacro("\\blueE", "\\textcolor{##0c7f99}{#1}");
          defineMacro("\\tealA", "\\textcolor{##94fff5}{#1}");
          defineMacro("\\tealB", "\\textcolor{##26edd5}{#1}");
          defineMacro("\\tealC", "\\textcolor{##01d1c1}{#1}");
          defineMacro("\\tealD", "\\textcolor{##01a995}{#1}");
          defineMacro("\\tealE", "\\textcolor{##208170}{#1}");
          defineMacro("\\greenA", "\\textcolor{##b6ffb0}{#1}");
          defineMacro("\\greenB", "\\textcolor{##8af281}{#1}");
          defineMacro("\\greenC", "\\textcolor{##74cf70}{#1}");
          defineMacro("\\greenD", "\\textcolor{##1fab54}{#1}");
          defineMacro("\\greenE", "\\textcolor{##0d923f}{#1}");
          defineMacro("\\goldA", "\\textcolor{##ffd0a9}{#1}");
          defineMacro("\\goldB", "\\textcolor{##ffbb71}{#1}");
          defineMacro("\\goldC", "\\textcolor{##ff9c39}{#1}");
          defineMacro("\\goldD", "\\textcolor{##e07d10}{#1}");
          defineMacro("\\goldE", "\\textcolor{##a75a05}{#1}");
          defineMacro("\\redA", "\\textcolor{##fca9a9}{#1}");
          defineMacro("\\redB", "\\textcolor{##ff8482}{#1}");
          defineMacro("\\redC", "\\textcolor{##f9685d}{#1}");
          defineMacro("\\redD", "\\textcolor{##e84d39}{#1}");
          defineMacro("\\redE", "\\textcolor{##bc2612}{#1}");
          defineMacro("\\maroonA", "\\textcolor{##ffbde0}{#1}");
          defineMacro("\\maroonB", "\\textcolor{##ff92c6}{#1}");
          defineMacro("\\maroonC", "\\textcolor{##ed5fa6}{#1}");
          defineMacro("\\maroonD", "\\textcolor{##ca337c}{#1}");
          defineMacro("\\maroonE", "\\textcolor{##9e034e}{#1}");
          defineMacro("\\purpleA", "\\textcolor{##ddd7ff}{#1}");
          defineMacro("\\purpleB", "\\textcolor{##c6b9fc}{#1}");
          defineMacro("\\purpleC", "\\textcolor{##aa87ff}{#1}");
          defineMacro("\\purpleD", "\\textcolor{##7854ab}{#1}");
          defineMacro("\\purpleE", "\\textcolor{##543b78}{#1}");
          defineMacro("\\mintA", "\\textcolor{##f5f9e8}{#1}");
          defineMacro("\\mintB", "\\textcolor{##edf2df}{#1}");
          defineMacro("\\mintC", "\\textcolor{##e0e5cc}{#1}");
          defineMacro("\\grayA", "\\textcolor{##f6f7f7}{#1}");
          defineMacro("\\grayB", "\\textcolor{##f0f1f2}{#1}");
          defineMacro("\\grayC", "\\textcolor{##e3e5e6}{#1}");
          defineMacro("\\grayD", "\\textcolor{##d6d8da}{#1}");
          defineMacro("\\grayE", "\\textcolor{##babec2}{#1}");
          defineMacro("\\grayF", "\\textcolor{##888d93}{#1}");
          defineMacro("\\grayG", "\\textcolor{##626569}{#1}");
          defineMacro("\\grayH", "\\textcolor{##3b3e40}{#1}");
          defineMacro("\\grayI", "\\textcolor{##21242c}{#1}");
          defineMacro("\\kaBlue", "\\textcolor{##314453}{#1}");
          defineMacro("\\kaGreen", "\\textcolor{##71B307}{#1}");
          ;
          const implicitCommands = {
            "^": true,
            // Parser.js
            "_": true,
            // Parser.js
            "\\limits": true,
            // Parser.js
            "\\nolimits": true
            // Parser.js
          };
          class MacroExpander {
            constructor(input, settings, mode) {
              this.settings = void 0;
              this.expansionCount = void 0;
              this.lexer = void 0;
              this.macros = void 0;
              this.stack = void 0;
              this.mode = void 0;
              this.settings = settings;
              this.expansionCount = 0;
              this.feed(input);
              this.macros = new Namespace(src_macros, settings.macros);
              this.mode = mode;
              this.stack = [];
            }
            /**
             * Feed a new input string to the same MacroExpander
             * (with existing macros etc.).
             */
            feed(input) {
              this.lexer = new Lexer2(input, this.settings);
            }
            /**
             * Switches between "text" and "math" modes.
             */
            switchMode(newMode) {
              this.mode = newMode;
            }
            /**
             * Start a new group nesting within all namespaces.
             */
            beginGroup() {
              this.macros.beginGroup();
            }
            /**
             * End current group nesting within all namespaces.
             */
            endGroup() {
              this.macros.endGroup();
            }
            /**
             * Ends all currently nested groups (if any), restoring values before the
             * groups began.  Useful in case of an error in the middle of parsing.
             */
            endGroups() {
              this.macros.endGroups();
            }
            /**
             * Returns the topmost token on the stack, without expanding it.
             * Similar in behavior to TeX's `\futurelet`.
             */
            future() {
              if (this.stack.length === 0) {
                this.pushToken(this.lexer.lex());
              }
              return this.stack[this.stack.length - 1];
            }
            /**
             * Remove and return the next unexpanded token.
             */
            popToken() {
              this.future();
              return this.stack.pop();
            }
            /**
             * Add a given token to the token stack.  In particular, this get be used
             * to put back a token returned from one of the other methods.
             */
            pushToken(token) {
              this.stack.push(token);
            }
            /**
             * Append an array of tokens to the token stack.
             */
            pushTokens(tokens) {
              this.stack.push(...tokens);
            }
            /**
             * Find an macro argument without expanding tokens and append the array of
             * tokens to the token stack. Uses Token as a container for the result.
             */
            scanArgument(isOptional) {
              let start;
              let end;
              let tokens;
              if (isOptional) {
                this.consumeSpaces();
                if (this.future().text !== "[") {
                  return null;
                }
                start = this.popToken();
                ({
                  tokens,
                  end
                } = this.consumeArg(["]"]));
              } else {
                ({
                  tokens,
                  start,
                  end
                } = this.consumeArg());
              }
              this.pushToken(new Token("EOF", end.loc));
              this.pushTokens(tokens);
              return start.range(end, "");
            }
            /**
             * Consume all following space tokens, without expansion.
             */
            consumeSpaces() {
              for (; ; ) {
                const token = this.future();
                if (token.text === " ") {
                  this.stack.pop();
                } else {
                  break;
                }
              }
            }
            /**
             * Consume an argument from the token stream, and return the resulting array
             * of tokens and start/end token.
             */
            consumeArg(delims) {
              const tokens = [];
              const isDelimited = delims && delims.length > 0;
              if (!isDelimited) {
                this.consumeSpaces();
              }
              const start = this.future();
              let tok;
              let depth = 0;
              let match = 0;
              do {
                tok = this.popToken();
                tokens.push(tok);
                if (tok.text === "{") {
                  ++depth;
                } else if (tok.text === "}") {
                  --depth;
                  if (depth === -1) {
                    throw new src_ParseError("Extra }", tok);
                  }
                } else if (tok.text === "EOF") {
                  throw new src_ParseError("Unexpected end of input in a macro argument, expected '" + (delims && isDelimited ? delims[match] : "}") + "'", tok);
                }
                if (delims && isDelimited) {
                  if ((depth === 0 || depth === 1 && delims[match] === "{") && tok.text === delims[match]) {
                    ++match;
                    if (match === delims.length) {
                      tokens.splice(-match, match);
                      break;
                    }
                  } else {
                    match = 0;
                  }
                }
              } while (depth !== 0 || isDelimited);
              if (start.text === "{" && tokens[tokens.length - 1].text === "}") {
                tokens.pop();
                tokens.shift();
              }
              tokens.reverse();
              return {
                tokens,
                start,
                end: tok
              };
            }
            /**
             * Consume the specified number of (delimited) arguments from the token
             * stream and return the resulting array of arguments.
             */
            consumeArgs(numArgs, delimiters2) {
              if (delimiters2) {
                if (delimiters2.length !== numArgs + 1) {
                  throw new src_ParseError("The length of delimiters doesn't match the number of args!");
                }
                const delims = delimiters2[0];
                for (let i = 0; i < delims.length; i++) {
                  const tok = this.popToken();
                  if (delims[i] !== tok.text) {
                    throw new src_ParseError("Use of the macro doesn't match its definition", tok);
                  }
                }
              }
              const args = [];
              for (let i = 0; i < numArgs; i++) {
                args.push(this.consumeArg(delimiters2 && delimiters2[i + 1]).tokens);
              }
              return args;
            }
            /**
             * Increment `expansionCount` by the specified amount.
             * Throw an error if it exceeds `maxExpand`.
             */
            countExpansion(amount) {
              this.expansionCount += amount;
              if (this.expansionCount > this.settings.maxExpand) {
                throw new src_ParseError("Too many expansions: infinite loop or need to increase maxExpand setting");
              }
            }
            /**
             * Expand the next token only once if possible.
             *
             * If the token is expanded, the resulting tokens will be pushed onto
             * the stack in reverse order, and the number of such tokens will be
             * returned.  This number might be zero or positive.
             *
             * If not, the return value is `false`, and the next token remains at the
             * top of the stack.
             *
             * In either case, the next token will be on the top of the stack,
             * or the stack will be empty (in case of empty expansion
             * and no other tokens).
             *
             * Used to implement `expandAfterFuture` and `expandNextToken`.
             *
             * If expandableOnly, only expandable tokens are expanded and
             * an undefined control sequence results in an error.
             */
            expandOnce(expandableOnly) {
              const topToken = this.popToken();
              const name = topToken.text;
              const expansion = !topToken.noexpand ? this._getExpansion(name) : null;
              if (expansion == null || expandableOnly && expansion.unexpandable) {
                if (expandableOnly && expansion == null && name[0] === "\\" && !this.isDefined(name)) {
                  throw new src_ParseError("Undefined control sequence: " + name);
                }
                this.pushToken(topToken);
                return false;
              }
              this.countExpansion(1);
              let tokens = expansion.tokens;
              const args = this.consumeArgs(expansion.numArgs, expansion.delimiters);
              if (expansion.numArgs) {
                tokens = tokens.slice();
                for (let i = tokens.length - 1; i >= 0; --i) {
                  let tok = tokens[i];
                  if (tok.text === "#") {
                    if (i === 0) {
                      throw new src_ParseError("Incomplete placeholder at end of macro body", tok);
                    }
                    tok = tokens[--i];
                    if (tok.text === "#") {
                      tokens.splice(i + 1, 1);
                    } else if (/^[1-9]$/.test(tok.text)) {
                      tokens.splice(i, 2, ...args[+tok.text - 1]);
                    } else {
                      throw new src_ParseError("Not a valid argument number", tok);
                    }
                  }
                }
              }
              this.pushTokens(tokens);
              return tokens.length;
            }
            /**
             * Expand the next token only once (if possible), and return the resulting
             * top token on the stack (without removing anything from the stack).
             * Similar in behavior to TeX's `\expandafter\futurelet`.
             * Equivalent to expandOnce() followed by future().
             */
            expandAfterFuture() {
              this.expandOnce();
              return this.future();
            }
            /**
             * Recursively expand first token, then return first non-expandable token.
             */
            expandNextToken() {
              for (; ; ) {
                if (this.expandOnce() === false) {
                  const token = this.stack.pop();
                  if (token.treatAsRelax) {
                    token.text = "\\relax";
                  }
                  return token;
                }
              }
              throw new Error();
            }
            /**
             * Fully expand the given macro name and return the resulting list of
             * tokens, or return `undefined` if no such macro is defined.
             */
            expandMacro(name) {
              return this.macros.has(name) ? this.expandTokens([new Token(name)]) : void 0;
            }
            /**
             * Fully expand the given token stream and return the resulting list of
             * tokens.  Note that the input tokens are in reverse order, but the
             * output tokens are in forward order.
             */
            expandTokens(tokens) {
              const output = [];
              const oldStackLength = this.stack.length;
              this.pushTokens(tokens);
              while (this.stack.length > oldStackLength) {
                if (this.expandOnce(true) === false) {
                  const token = this.stack.pop();
                  if (token.treatAsRelax) {
                    token.noexpand = false;
                    token.treatAsRelax = false;
                  }
                  output.push(token);
                }
              }
              this.countExpansion(output.length);
              return output;
            }
            /**
             * Fully expand the given macro name and return the result as a string,
             * or return `undefined` if no such macro is defined.
             */
            expandMacroAsText(name) {
              const tokens = this.expandMacro(name);
              if (tokens) {
                return tokens.map((token) => token.text).join("");
              } else {
                return tokens;
              }
            }
            /**
             * Returns the expanded macro as a reversed array of tokens and a macro
             * argument count.  Or returns `null` if no such macro.
             */
            _getExpansion(name) {
              const definition = this.macros.get(name);
              if (definition == null) {
                return definition;
              }
              if (name.length === 1) {
                const catcode = this.lexer.catcodes[name];
                if (catcode != null && catcode !== 13) {
                  return;
                }
              }
              const expansion = typeof definition === "function" ? definition(this) : definition;
              if (typeof expansion === "string") {
                let numArgs = 0;
                if (expansion.indexOf("#") !== -1) {
                  const stripped = expansion.replace(/##/g, "");
                  while (stripped.indexOf("#" + (numArgs + 1)) !== -1) {
                    ++numArgs;
                  }
                }
                const bodyLexer = new Lexer2(expansion, this.settings);
                const tokens = [];
                let tok = bodyLexer.lex();
                while (tok.text !== "EOF") {
                  tokens.push(tok);
                  tok = bodyLexer.lex();
                }
                tokens.reverse();
                const expanded = {
                  tokens,
                  numArgs
                };
                return expanded;
              }
              return expansion;
            }
            /**
             * Determine whether a command is currently "defined" (has some
             * functionality), meaning that it's a macro (in the current group),
             * a function, a symbol, or one of the special commands listed in
             * `implicitCommands`.
             */
            isDefined(name) {
              return this.macros.has(name) || src_functions.hasOwnProperty(name) || src_symbols.math.hasOwnProperty(name) || src_symbols.text.hasOwnProperty(name) || implicitCommands.hasOwnProperty(name);
            }
            /**
             * Determine whether a command is expandable.
             */
            isExpandable(name) {
              const macro = this.macros.get(name);
              return macro != null ? typeof macro === "string" || typeof macro === "function" || !macro.unexpandable : src_functions.hasOwnProperty(name) && !src_functions[name].primitive;
            }
          }
          ;
          const unicodeSubRegEx = /^[₊₋₌₍₎₀₁₂₃₄₅₆₇₈₉ₐₑₕᵢⱼₖₗₘₙₒₚᵣₛₜᵤᵥₓᵦᵧᵨᵩᵪ]/;
          const uSubsAndSups = Object.freeze({
            "₊": "+",
            "₋": "-",
            "₌": "=",
            "₍": "(",
            "₎": ")",
            "₀": "0",
            "₁": "1",
            "₂": "2",
            "₃": "3",
            "₄": "4",
            "₅": "5",
            "₆": "6",
            "₇": "7",
            "₈": "8",
            "₉": "9",
            "ₐ": "a",
            "ₑ": "e",
            "ₕ": "h",
            "ᵢ": "i",
            "ⱼ": "j",
            "ₖ": "k",
            "ₗ": "l",
            "ₘ": "m",
            "ₙ": "n",
            "ₒ": "o",
            "ₚ": "p",
            "ᵣ": "r",
            "ₛ": "s",
            "ₜ": "t",
            "ᵤ": "u",
            "ᵥ": "v",
            "ₓ": "x",
            "ᵦ": "β",
            "ᵧ": "γ",
            "ᵨ": "ρ",
            "ᵩ": "ϕ",
            "ᵪ": "χ",
            "⁺": "+",
            "⁻": "-",
            "⁼": "=",
            "⁽": "(",
            "⁾": ")",
            "⁰": "0",
            "¹": "1",
            "²": "2",
            "³": "3",
            "⁴": "4",
            "⁵": "5",
            "⁶": "6",
            "⁷": "7",
            "⁸": "8",
            "⁹": "9",
            "ᴬ": "A",
            "ᴮ": "B",
            "ᴰ": "D",
            "ᴱ": "E",
            "ᴳ": "G",
            "ᴴ": "H",
            "ᴵ": "I",
            "ᴶ": "J",
            "ᴷ": "K",
            "ᴸ": "L",
            "ᴹ": "M",
            "ᴺ": "N",
            "ᴼ": "O",
            "ᴾ": "P",
            "ᴿ": "R",
            "ᵀ": "T",
            "ᵁ": "U",
            "ⱽ": "V",
            "ᵂ": "W",
            "ᵃ": "a",
            "ᵇ": "b",
            "ᶜ": "c",
            "ᵈ": "d",
            "ᵉ": "e",
            "ᶠ": "f",
            "ᵍ": "g",
            "ʰ": "h",
            "ⁱ": "i",
            "ʲ": "j",
            "ᵏ": "k",
            "ˡ": "l",
            "ᵐ": "m",
            "ⁿ": "n",
            "ᵒ": "o",
            "ᵖ": "p",
            "ʳ": "r",
            "ˢ": "s",
            "ᵗ": "t",
            "ᵘ": "u",
            "ᵛ": "v",
            "ʷ": "w",
            "ˣ": "x",
            "ʸ": "y",
            "ᶻ": "z",
            "ᵝ": "β",
            "ᵞ": "γ",
            "ᵟ": "δ",
            "ᵠ": "ϕ",
            "ᵡ": "χ",
            "ᶿ": "θ"
          });
          ;
          const unicodeAccents = {
            "́": {
              "text": "\\'",
              "math": "\\acute"
            },
            "̀": {
              "text": "\\`",
              "math": "\\grave"
            },
            "̈": {
              "text": '\\"',
              "math": "\\ddot"
            },
            "̃": {
              "text": "\\~",
              "math": "\\tilde"
            },
            "̄": {
              "text": "\\=",
              "math": "\\bar"
            },
            "̆": {
              "text": "\\u",
              "math": "\\breve"
            },
            "̌": {
              "text": "\\v",
              "math": "\\check"
            },
            "̂": {
              "text": "\\^",
              "math": "\\hat"
            },
            "̇": {
              "text": "\\.",
              "math": "\\dot"
            },
            "̊": {
              "text": "\\r",
              "math": "\\mathring"
            },
            "̋": {
              "text": "\\H"
            },
            "̧": {
              "text": "\\c"
            }
          };
          const unicodeSymbols = {
            "á": "á",
            "à": "à",
            "ä": "ä",
            "ǟ": "ǟ",
            "ã": "ã",
            "ā": "ā",
            "ă": "ă",
            "ắ": "ắ",
            "ằ": "ằ",
            "ẵ": "ẵ",
            "ǎ": "ǎ",
            "â": "â",
            "ấ": "ấ",
            "ầ": "ầ",
            "ẫ": "ẫ",
            "ȧ": "ȧ",
            "ǡ": "ǡ",
            "å": "å",
            "ǻ": "ǻ",
            "ḃ": "ḃ",
            "ć": "ć",
            "ḉ": "ḉ",
            "č": "č",
            "ĉ": "ĉ",
            "ċ": "ċ",
            "ç": "ç",
            "ď": "ď",
            "ḋ": "ḋ",
            "ḑ": "ḑ",
            "é": "é",
            "è": "è",
            "ë": "ë",
            "ẽ": "ẽ",
            "ē": "ē",
            "ḗ": "ḗ",
            "ḕ": "ḕ",
            "ĕ": "ĕ",
            "ḝ": "ḝ",
            "ě": "ě",
            "ê": "ê",
            "ế": "ế",
            "ề": "ề",
            "ễ": "ễ",
            "ė": "ė",
            "ȩ": "ȩ",
            "ḟ": "ḟ",
            "ǵ": "ǵ",
            "ḡ": "ḡ",
            "ğ": "ğ",
            "ǧ": "ǧ",
            "ĝ": "ĝ",
            "ġ": "ġ",
            "ģ": "ģ",
            "ḧ": "ḧ",
            "ȟ": "ȟ",
            "ĥ": "ĥ",
            "ḣ": "ḣ",
            "ḩ": "ḩ",
            "í": "í",
            "ì": "ì",
            "ï": "ï",
            "ḯ": "ḯ",
            "ĩ": "ĩ",
            "ī": "ī",
            "ĭ": "ĭ",
            "ǐ": "ǐ",
            "î": "î",
            "ǰ": "ǰ",
            "ĵ": "ĵ",
            "ḱ": "ḱ",
            "ǩ": "ǩ",
            "ķ": "ķ",
            "ĺ": "ĺ",
            "ľ": "ľ",
            "ļ": "ļ",
            "ḿ": "ḿ",
            "ṁ": "ṁ",
            "ń": "ń",
            "ǹ": "ǹ",
            "ñ": "ñ",
            "ň": "ň",
            "ṅ": "ṅ",
            "ņ": "ņ",
            "ó": "ó",
            "ò": "ò",
            "ö": "ö",
            "ȫ": "ȫ",
            "õ": "õ",
            "ṍ": "ṍ",
            "ṏ": "ṏ",
            "ȭ": "ȭ",
            "ō": "ō",
            "ṓ": "ṓ",
            "ṑ": "ṑ",
            "ŏ": "ŏ",
            "ǒ": "ǒ",
            "ô": "ô",
            "ố": "ố",
            "ồ": "ồ",
            "ỗ": "ỗ",
            "ȯ": "ȯ",
            "ȱ": "ȱ",
            "ő": "ő",
            "ṕ": "ṕ",
            "ṗ": "ṗ",
            "ŕ": "ŕ",
            "ř": "ř",
            "ṙ": "ṙ",
            "ŗ": "ŗ",
            "ś": "ś",
            "ṥ": "ṥ",
            "š": "š",
            "ṧ": "ṧ",
            "ŝ": "ŝ",
            "ṡ": "ṡ",
            "ş": "ş",
            "ẗ": "ẗ",
            "ť": "ť",
            "ṫ": "ṫ",
            "ţ": "ţ",
            "ú": "ú",
            "ù": "ù",
            "ü": "ü",
            "ǘ": "ǘ",
            "ǜ": "ǜ",
            "ǖ": "ǖ",
            "ǚ": "ǚ",
            "ũ": "ũ",
            "ṹ": "ṹ",
            "ū": "ū",
            "ṻ": "ṻ",
            "ŭ": "ŭ",
            "ǔ": "ǔ",
            "û": "û",
            "ů": "ů",
            "ű": "ű",
            "ṽ": "ṽ",
            "ẃ": "ẃ",
            "ẁ": "ẁ",
            "ẅ": "ẅ",
            "ŵ": "ŵ",
            "ẇ": "ẇ",
            "ẘ": "ẘ",
            "ẍ": "ẍ",
            "ẋ": "ẋ",
            "ý": "ý",
            "ỳ": "ỳ",
            "ÿ": "ÿ",
            "ỹ": "ỹ",
            "ȳ": "ȳ",
            "ŷ": "ŷ",
            "ẏ": "ẏ",
            "ẙ": "ẙ",
            "ź": "ź",
            "ž": "ž",
            "ẑ": "ẑ",
            "ż": "ż",
            "Á": "Á",
            "À": "À",
            "Ä": "Ä",
            "Ǟ": "Ǟ",
            "Ã": "Ã",
            "Ā": "Ā",
            "Ă": "Ă",
            "Ắ": "Ắ",
            "Ằ": "Ằ",
            "Ẵ": "Ẵ",
            "Ǎ": "Ǎ",
            "Â": "Â",
            "Ấ": "Ấ",
            "Ầ": "Ầ",
            "Ẫ": "Ẫ",
            "Ȧ": "Ȧ",
            "Ǡ": "Ǡ",
            "Å": "Å",
            "Ǻ": "Ǻ",
            "Ḃ": "Ḃ",
            "Ć": "Ć",
            "Ḉ": "Ḉ",
            "Č": "Č",
            "Ĉ": "Ĉ",
            "Ċ": "Ċ",
            "Ç": "Ç",
            "Ď": "Ď",
            "Ḋ": "Ḋ",
            "Ḑ": "Ḑ",
            "É": "É",
            "È": "È",
            "Ë": "Ë",
            "Ẽ": "Ẽ",
            "Ē": "Ē",
            "Ḗ": "Ḗ",
            "Ḕ": "Ḕ",
            "Ĕ": "Ĕ",
            "Ḝ": "Ḝ",
            "Ě": "Ě",
            "Ê": "Ê",
            "Ế": "Ế",
            "Ề": "Ề",
            "Ễ": "Ễ",
            "Ė": "Ė",
            "Ȩ": "Ȩ",
            "Ḟ": "Ḟ",
            "Ǵ": "Ǵ",
            "Ḡ": "Ḡ",
            "Ğ": "Ğ",
            "Ǧ": "Ǧ",
            "Ĝ": "Ĝ",
            "Ġ": "Ġ",
            "Ģ": "Ģ",
            "Ḧ": "Ḧ",
            "Ȟ": "Ȟ",
            "Ĥ": "Ĥ",
            "Ḣ": "Ḣ",
            "Ḩ": "Ḩ",
            "Í": "Í",
            "Ì": "Ì",
            "Ï": "Ï",
            "Ḯ": "Ḯ",
            "Ĩ": "Ĩ",
            "Ī": "Ī",
            "Ĭ": "Ĭ",
            "Ǐ": "Ǐ",
            "Î": "Î",
            "İ": "İ",
            "Ĵ": "Ĵ",
            "Ḱ": "Ḱ",
            "Ǩ": "Ǩ",
            "Ķ": "Ķ",
            "Ĺ": "Ĺ",
            "Ľ": "Ľ",
            "Ļ": "Ļ",
            "Ḿ": "Ḿ",
            "Ṁ": "Ṁ",
            "Ń": "Ń",
            "Ǹ": "Ǹ",
            "Ñ": "Ñ",
            "Ň": "Ň",
            "Ṅ": "Ṅ",
            "Ņ": "Ņ",
            "Ó": "Ó",
            "Ò": "Ò",
            "Ö": "Ö",
            "Ȫ": "Ȫ",
            "Õ": "Õ",
            "Ṍ": "Ṍ",
            "Ṏ": "Ṏ",
            "Ȭ": "Ȭ",
            "Ō": "Ō",
            "Ṓ": "Ṓ",
            "Ṑ": "Ṑ",
            "Ŏ": "Ŏ",
            "Ǒ": "Ǒ",
            "Ô": "Ô",
            "Ố": "Ố",
            "Ồ": "Ồ",
            "Ỗ": "Ỗ",
            "Ȯ": "Ȯ",
            "Ȱ": "Ȱ",
            "Ő": "Ő",
            "Ṕ": "Ṕ",
            "Ṗ": "Ṗ",
            "Ŕ": "Ŕ",
            "Ř": "Ř",
            "Ṙ": "Ṙ",
            "Ŗ": "Ŗ",
            "Ś": "Ś",
            "Ṥ": "Ṥ",
            "Š": "Š",
            "Ṧ": "Ṧ",
            "Ŝ": "Ŝ",
            "Ṡ": "Ṡ",
            "Ş": "Ş",
            "Ť": "Ť",
            "Ṫ": "Ṫ",
            "Ţ": "Ţ",
            "Ú": "Ú",
            "Ù": "Ù",
            "Ü": "Ü",
            "Ǘ": "Ǘ",
            "Ǜ": "Ǜ",
            "Ǖ": "Ǖ",
            "Ǚ": "Ǚ",
            "Ũ": "Ũ",
            "Ṹ": "Ṹ",
            "Ū": "Ū",
            "Ṻ": "Ṻ",
            "Ŭ": "Ŭ",
            "Ǔ": "Ǔ",
            "Û": "Û",
            "Ů": "Ů",
            "Ű": "Ű",
            "Ṽ": "Ṽ",
            "Ẃ": "Ẃ",
            "Ẁ": "Ẁ",
            "Ẅ": "Ẅ",
            "Ŵ": "Ŵ",
            "Ẇ": "Ẇ",
            "Ẍ": "Ẍ",
            "Ẋ": "Ẋ",
            "Ý": "Ý",
            "Ỳ": "Ỳ",
            "Ÿ": "Ÿ",
            "Ỹ": "Ỹ",
            "Ȳ": "Ȳ",
            "Ŷ": "Ŷ",
            "Ẏ": "Ẏ",
            "Ź": "Ź",
            "Ž": "Ž",
            "Ẑ": "Ẑ",
            "Ż": "Ż",
            "ά": "ά",
            "ὰ": "ὰ",
            "ᾱ": "ᾱ",
            "ᾰ": "ᾰ",
            "έ": "έ",
            "ὲ": "ὲ",
            "ή": "ή",
            "ὴ": "ὴ",
            "ί": "ί",
            "ὶ": "ὶ",
            "ϊ": "ϊ",
            "ΐ": "ΐ",
            "ῒ": "ῒ",
            "ῑ": "ῑ",
            "ῐ": "ῐ",
            "ό": "ό",
            "ὸ": "ὸ",
            "ύ": "ύ",
            "ὺ": "ὺ",
            "ϋ": "ϋ",
            "ΰ": "ΰ",
            "ῢ": "ῢ",
            "ῡ": "ῡ",
            "ῠ": "ῠ",
            "ώ": "ώ",
            "ὼ": "ὼ",
            "Ύ": "Ύ",
            "Ὺ": "Ὺ",
            "Ϋ": "Ϋ",
            "Ῡ": "Ῡ",
            "Ῠ": "Ῠ",
            "Ώ": "Ώ",
            "Ὼ": "Ὼ"
          };
          class Parser2 {
            constructor(input, settings) {
              this.mode = void 0;
              this.gullet = void 0;
              this.settings = void 0;
              this.leftrightDepth = void 0;
              this.nextToken = void 0;
              this.mode = "math";
              this.gullet = new MacroExpander(input, settings, this.mode);
              this.settings = settings;
              this.leftrightDepth = 0;
            }
            /**
             * Checks a result to make sure it has the right type, and throws an
             * appropriate error otherwise.
             */
            expect(text, consume) {
              if (consume === void 0) {
                consume = true;
              }
              if (this.fetch().text !== text) {
                throw new src_ParseError("Expected '" + text + "', got '" + this.fetch().text + "'", this.fetch());
              }
              if (consume) {
                this.consume();
              }
            }
            /**
             * Discards the current lookahead token, considering it consumed.
             */
            consume() {
              this.nextToken = null;
            }
            /**
             * Return the current lookahead token, or if there isn't one (at the
             * beginning, or if the previous lookahead token was consume()d),
             * fetch the next token as the new lookahead token and return it.
             */
            fetch() {
              if (this.nextToken == null) {
                this.nextToken = this.gullet.expandNextToken();
              }
              return this.nextToken;
            }
            /**
             * Switches between "text" and "math" modes.
             */
            switchMode(newMode) {
              this.mode = newMode;
              this.gullet.switchMode(newMode);
            }
            /**
             * Main parsing function, which parses an entire input.
             */
            parse() {
              if (!this.settings.globalGroup) {
                this.gullet.beginGroup();
              }
              if (this.settings.colorIsTextColor) {
                this.gullet.macros.set("\\color", "\\textcolor");
              }
              try {
                const parse2 = this.parseExpression(false);
                this.expect("EOF");
                if (!this.settings.globalGroup) {
                  this.gullet.endGroup();
                }
                return parse2;
              } finally {
                this.gullet.endGroups();
              }
            }
            /**
             * Fully parse a separate sequence of tokens as a separate job.
             * Tokens should be specified in reverse order, as in a MacroDefinition.
             */
            subparse(tokens) {
              const oldToken = this.nextToken;
              this.consume();
              this.gullet.pushToken(new Token("}"));
              this.gullet.pushTokens(tokens);
              const parse2 = this.parseExpression(false);
              this.expect("}");
              this.nextToken = oldToken;
              return parse2;
            }
            /**
             * Parses an "expression", which is a list of atoms.
             *
             * `breakOnInfix`: Should the parsing stop when we hit infix nodes? This
             *                 happens when functions have higher precedence han infix
             *                 nodes in implicit parses.
             *
             * `breakOnTokenText`: The text of the token that the expression should end
             *                     with, or `null` if something else should end the
             *                     expression.
             */
            parseExpression(breakOnInfix, breakOnTokenText) {
              const body = [];
              while (true) {
                if (this.mode === "math") {
                  this.consumeSpaces();
                }
                const lex = this.fetch();
                if (Parser2.endOfExpression.indexOf(lex.text) !== -1) {
                  break;
                }
                if (breakOnTokenText && lex.text === breakOnTokenText) {
                  break;
                }
                if (breakOnInfix && src_functions[lex.text] && src_functions[lex.text].infix) {
                  break;
                }
                const atom = this.parseAtom(breakOnTokenText);
                if (!atom) {
                  break;
                } else if (atom.type === "internal") {
                  continue;
                }
                body.push(atom);
              }
              if (this.mode === "text") {
                this.formLigatures(body);
              }
              return this.handleInfixNodes(body);
            }
            /**
             * Rewrites infix operators such as \over with corresponding commands such
             * as \frac.
             *
             * There can only be one infix operator per group.  If there's more than one
             * then the expression is ambiguous.  This can be resolved by adding {}.
             */
            handleInfixNodes(body) {
              let overIndex = -1;
              let funcName;
              for (let i = 0; i < body.length; i++) {
                if (body[i].type === "infix") {
                  if (overIndex !== -1) {
                    throw new src_ParseError("only one infix operator per group", body[i].token);
                  }
                  overIndex = i;
                  funcName = body[i].replaceWith;
                }
              }
              if (overIndex !== -1 && funcName) {
                let numerNode;
                let denomNode;
                const numerBody = body.slice(0, overIndex);
                const denomBody = body.slice(overIndex + 1);
                if (numerBody.length === 1 && numerBody[0].type === "ordgroup") {
                  numerNode = numerBody[0];
                } else {
                  numerNode = {
                    type: "ordgroup",
                    mode: this.mode,
                    body: numerBody
                  };
                }
                if (denomBody.length === 1 && denomBody[0].type === "ordgroup") {
                  denomNode = denomBody[0];
                } else {
                  denomNode = {
                    type: "ordgroup",
                    mode: this.mode,
                    body: denomBody
                  };
                }
                let node;
                if (funcName === "\\\\abovefrac") {
                  node = this.callFunction(funcName, [numerNode, body[overIndex], denomNode], []);
                } else {
                  node = this.callFunction(funcName, [numerNode, denomNode], []);
                }
                return [node];
              } else {
                return body;
              }
            }
            /**
             * Handle a subscript or superscript with nice errors.
             */
            handleSupSubscript(name) {
              const symbolToken = this.fetch();
              const symbol = symbolToken.text;
              this.consume();
              this.consumeSpaces();
              let group;
              do {
                var _group;
                group = this.parseGroup(name);
              } while (((_group = group) == null ? void 0 : _group.type) === "internal");
              if (!group) {
                throw new src_ParseError("Expected group after '" + symbol + "'", symbolToken);
              }
              return group;
            }
            /**
             * Converts the textual input of an unsupported command into a text node
             * contained within a color node whose color is determined by errorColor
             */
            formatUnsupportedCmd(text) {
              const textordArray = [];
              for (let i = 0; i < text.length; i++) {
                textordArray.push({
                  type: "textord",
                  mode: "text",
                  text: text[i]
                });
              }
              const textNode = {
                type: "text",
                mode: this.mode,
                body: textordArray
              };
              const colorNode = {
                type: "color",
                mode: this.mode,
                color: this.settings.errorColor,
                body: [textNode]
              };
              return colorNode;
            }
            /**
             * Parses a group with optional super/subscripts.
             */
            parseAtom(breakOnTokenText) {
              const base = this.parseGroup("atom", breakOnTokenText);
              if ((base == null ? void 0 : base.type) === "internal") {
                return base;
              }
              if (this.mode === "text") {
                return base;
              }
              let superscript;
              let subscript;
              while (true) {
                this.consumeSpaces();
                const lex = this.fetch();
                if (lex.text === "\\limits" || lex.text === "\\nolimits") {
                  if (base && base.type === "op") {
                    const limits = lex.text === "\\limits";
                    base.limits = limits;
                    base.alwaysHandleSupSub = true;
                  } else if (base && base.type === "operatorname") {
                    if (base.alwaysHandleSupSub) {
                      base.limits = lex.text === "\\limits";
                    }
                  } else {
                    throw new src_ParseError("Limit controls must follow a math operator", lex);
                  }
                  this.consume();
                } else if (lex.text === "^") {
                  if (superscript) {
                    throw new src_ParseError("Double superscript", lex);
                  }
                  superscript = this.handleSupSubscript("superscript");
                } else if (lex.text === "_") {
                  if (subscript) {
                    throw new src_ParseError("Double subscript", lex);
                  }
                  subscript = this.handleSupSubscript("subscript");
                } else if (lex.text === "'") {
                  if (superscript) {
                    throw new src_ParseError("Double superscript", lex);
                  }
                  const prime = {
                    type: "textord",
                    mode: this.mode,
                    text: "\\prime"
                  };
                  const primes = [prime];
                  this.consume();
                  while (this.fetch().text === "'") {
                    primes.push(prime);
                    this.consume();
                  }
                  if (this.fetch().text === "^") {
                    primes.push(this.handleSupSubscript("superscript"));
                  }
                  superscript = {
                    type: "ordgroup",
                    mode: this.mode,
                    body: primes
                  };
                } else if (uSubsAndSups[lex.text]) {
                  const isSub = unicodeSubRegEx.test(lex.text);
                  const subsupTokens = [];
                  subsupTokens.push(new Token(uSubsAndSups[lex.text]));
                  this.consume();
                  while (true) {
                    const token = this.fetch().text;
                    if (!uSubsAndSups[token]) {
                      break;
                    }
                    if (unicodeSubRegEx.test(token) !== isSub) {
                      break;
                    }
                    subsupTokens.unshift(new Token(uSubsAndSups[token]));
                    this.consume();
                  }
                  const body = this.subparse(subsupTokens);
                  if (isSub) {
                    subscript = {
                      type: "ordgroup",
                      mode: "math",
                      body
                    };
                  } else {
                    superscript = {
                      type: "ordgroup",
                      mode: "math",
                      body
                    };
                  }
                } else {
                  break;
                }
              }
              if (superscript || subscript) {
                return {
                  type: "supsub",
                  mode: this.mode,
                  base,
                  sup: superscript,
                  sub: subscript
                };
              } else {
                return base;
              }
            }
            /**
             * Parses an entire function, including its base and all of its arguments.
             */
            parseFunction(breakOnTokenText, name) {
              const token = this.fetch();
              const func = token.text;
              const funcData = src_functions[func];
              if (!funcData) {
                return null;
              }
              this.consume();
              if (name && name !== "atom" && !funcData.allowedInArgument) {
                throw new src_ParseError("Got function '" + func + "' with no arguments" + (name ? " as " + name : ""), token);
              } else if (this.mode === "text" && !funcData.allowedInText) {
                throw new src_ParseError("Can't use function '" + func + "' in text mode", token);
              } else if (this.mode === "math" && funcData.allowedInMath === false) {
                throw new src_ParseError("Can't use function '" + func + "' in math mode", token);
              }
              const {
                args,
                optArgs
              } = this.parseArguments(func, funcData);
              return this.callFunction(func, args, optArgs, token, breakOnTokenText);
            }
            /**
             * Call a function handler with a suitable context and arguments.
             */
            callFunction(name, args, optArgs, token, breakOnTokenText) {
              const context = {
                funcName: name,
                parser: this,
                token,
                breakOnTokenText
              };
              const func = src_functions[name];
              if (func && func.handler) {
                return func.handler(context, args, optArgs);
              } else {
                throw new src_ParseError("No function handler for " + name);
              }
            }
            /**
             * Parses the arguments of a function or environment
             */
            parseArguments(func, funcData) {
              const totalArgs = funcData.numArgs + funcData.numOptionalArgs;
              if (totalArgs === 0) {
                return {
                  args: [],
                  optArgs: []
                };
              }
              const args = [];
              const optArgs = [];
              for (let i = 0; i < totalArgs; i++) {
                let argType = funcData.argTypes && funcData.argTypes[i];
                const isOptional = i < funcData.numOptionalArgs;
                if (funcData.primitive && argType == null || // \sqrt expands into primitive if optional argument doesn't exist
                funcData.type === "sqrt" && i === 1 && optArgs[0] == null) {
                  argType = "primitive";
                }
                const arg = this.parseGroupOfType("argument to '" + func + "'", argType, isOptional);
                if (isOptional) {
                  optArgs.push(arg);
                } else if (arg != null) {
                  args.push(arg);
                } else {
                  throw new src_ParseError("Null argument, please report this as a bug");
                }
              }
              return {
                args,
                optArgs
              };
            }
            /**
             * Parses a group when the mode is changing.
             */
            parseGroupOfType(name, type, optional) {
              switch (type) {
                case "color":
                  return this.parseColorGroup(optional);
                case "size":
                  return this.parseSizeGroup(optional);
                case "url":
                  return this.parseUrlGroup(optional);
                case "math":
                case "text":
                  return this.parseArgumentGroup(optional, type);
                case "hbox": {
                  const group = this.parseArgumentGroup(optional, "text");
                  return group != null ? {
                    type: "styling",
                    mode: group.mode,
                    body: [group],
                    style: "text"
                    // simulate \textstyle
                  } : null;
                }
                case "raw": {
                  const token = this.parseStringGroup("raw", optional);
                  return token != null ? {
                    type: "raw",
                    mode: "text",
                    string: token.text
                  } : null;
                }
                case "primitive": {
                  if (optional) {
                    throw new src_ParseError("A primitive argument cannot be optional");
                  }
                  const group = this.parseGroup(name);
                  if (group == null) {
                    throw new src_ParseError("Expected group as " + name, this.fetch());
                  }
                  return group;
                }
                case "original":
                case null:
                case void 0:
                  return this.parseArgumentGroup(optional);
                default:
                  throw new src_ParseError("Unknown group type as " + name, this.fetch());
              }
            }
            /**
             * Discard any space tokens, fetching the next non-space token.
             */
            consumeSpaces() {
              while (this.fetch().text === " ") {
                this.consume();
              }
            }
            /**
             * Parses a group, essentially returning the string formed by the
             * brace-enclosed tokens plus some position information.
             */
            parseStringGroup(modeName, optional) {
              const argToken = this.gullet.scanArgument(optional);
              if (argToken == null) {
                return null;
              }
              let str = "";
              let nextToken;
              while ((nextToken = this.fetch()).text !== "EOF") {
                str += nextToken.text;
                this.consume();
              }
              this.consume();
              argToken.text = str;
              return argToken;
            }
            /**
             * Parses a regex-delimited group: the largest sequence of tokens
             * whose concatenated strings match `regex`. Returns the string
             * formed by the tokens plus some position information.
             */
            parseRegexGroup(regex, modeName) {
              const firstToken = this.fetch();
              let lastToken = firstToken;
              let str = "";
              let nextToken;
              while ((nextToken = this.fetch()).text !== "EOF" && regex.test(str + nextToken.text)) {
                lastToken = nextToken;
                str += lastToken.text;
                this.consume();
              }
              if (str === "") {
                throw new src_ParseError("Invalid " + modeName + ": '" + firstToken.text + "'", firstToken);
              }
              return firstToken.range(lastToken, str);
            }
            /**
             * Parses a color description.
             */
            parseColorGroup(optional) {
              const res = this.parseStringGroup("color", optional);
              if (res == null) {
                return null;
              }
              const match = /^(#[a-f0-9]{3}|#?[a-f0-9]{6}|[a-z]+)$/i.exec(res.text);
              if (!match) {
                throw new src_ParseError("Invalid color: '" + res.text + "'", res);
              }
              let color = match[0];
              if (/^[0-9a-f]{6}$/i.test(color)) {
                color = "#" + color;
              }
              return {
                type: "color-token",
                mode: this.mode,
                color
              };
            }
            /**
             * Parses a size specification, consisting of magnitude and unit.
             */
            parseSizeGroup(optional) {
              let res;
              let isBlank = false;
              this.gullet.consumeSpaces();
              if (!optional && this.gullet.future().text !== "{") {
                res = this.parseRegexGroup(/^[-+]? *(?:$|\d+|\d+\.\d*|\.\d*) *[a-z]{0,2} *$/, "size");
              } else {
                res = this.parseStringGroup("size", optional);
              }
              if (!res) {
                return null;
              }
              if (!optional && res.text.length === 0) {
                res.text = "0pt";
                isBlank = true;
              }
              const match = /([-+]?) *(\d+(?:\.\d*)?|\.\d+) *([a-z]{2})/.exec(res.text);
              if (!match) {
                throw new src_ParseError("Invalid size: '" + res.text + "'", res);
              }
              const data = {
                number: +(match[1] + match[2]),
                // sign + magnitude, cast to number
                unit: match[3]
              };
              if (!validUnit(data)) {
                throw new src_ParseError("Invalid unit: '" + data.unit + "'", res);
              }
              return {
                type: "size",
                mode: this.mode,
                value: data,
                isBlank
              };
            }
            /**
             * Parses an URL, checking escaped letters and allowed protocols,
             * and setting the catcode of % as an active character (as in \hyperref).
             */
            parseUrlGroup(optional) {
              this.gullet.lexer.setCatcode("%", 13);
              this.gullet.lexer.setCatcode("~", 12);
              const res = this.parseStringGroup("url", optional);
              this.gullet.lexer.setCatcode("%", 14);
              this.gullet.lexer.setCatcode("~", 13);
              if (res == null) {
                return null;
              }
              const url = res.text.replace(/\\([#$%&~_^{}])/g, "$1");
              return {
                type: "url",
                mode: this.mode,
                url
              };
            }
            /**
             * Parses an argument with the mode specified.
             */
            parseArgumentGroup(optional, mode) {
              const argToken = this.gullet.scanArgument(optional);
              if (argToken == null) {
                return null;
              }
              const outerMode = this.mode;
              if (mode) {
                this.switchMode(mode);
              }
              this.gullet.beginGroup();
              const expression = this.parseExpression(false, "EOF");
              this.expect("EOF");
              this.gullet.endGroup();
              const result = {
                type: "ordgroup",
                mode: this.mode,
                loc: argToken.loc,
                body: expression
              };
              if (mode) {
                this.switchMode(outerMode);
              }
              return result;
            }
            /**
             * Parses an ordinary group, which is either a single nucleus (like "x")
             * or an expression in braces (like "{x+y}") or an implicit group, a group
             * that starts at the current position, and ends right before a higher explicit
             * group ends, or at EOF.
             */
            parseGroup(name, breakOnTokenText) {
              const firstToken = this.fetch();
              const text = firstToken.text;
              let result;
              if (text === "{" || text === "\\begingroup") {
                this.consume();
                const groupEnd = text === "{" ? "}" : "\\endgroup";
                this.gullet.beginGroup();
                const expression = this.parseExpression(false, groupEnd);
                const lastToken = this.fetch();
                this.expect(groupEnd);
                this.gullet.endGroup();
                result = {
                  type: "ordgroup",
                  mode: this.mode,
                  loc: SourceLocation.range(firstToken, lastToken),
                  body: expression,
                  // A group formed by \begingroup...\endgroup is a semi-simple group
                  // which doesn't affect spacing in math mode, i.e., is transparent.
                  // https://tex.stackexchange.com/questions/1930/when-should-one-
                  // use-begingroup-instead-of-bgroup
                  semisimple: text === "\\begingroup" || void 0
                };
              } else {
                result = this.parseFunction(breakOnTokenText, name) || this.parseSymbol();
                if (result == null && text[0] === "\\" && !implicitCommands.hasOwnProperty(text)) {
                  if (this.settings.throwOnError) {
                    throw new src_ParseError("Undefined control sequence: " + text, firstToken);
                  }
                  result = this.formatUnsupportedCmd(text);
                  this.consume();
                }
              }
              return result;
            }
            /**
             * Form ligature-like combinations of characters for text mode.
             * This includes inputs like "--", "---", "``" and "''".
             * The result will simply replace multiple textord nodes with a single
             * character in each value by a single textord node having multiple
             * characters in its value.  The representation is still ASCII source.
             * The group will be modified in place.
             */
            formLigatures(group) {
              let n = group.length - 1;
              for (let i = 0; i < n; ++i) {
                const a = group[i];
                const v = a.text;
                if (v === "-" && group[i + 1].text === "-") {
                  if (i + 1 < n && group[i + 2].text === "-") {
                    group.splice(i, 3, {
                      type: "textord",
                      mode: "text",
                      loc: SourceLocation.range(a, group[i + 2]),
                      text: "---"
                    });
                    n -= 2;
                  } else {
                    group.splice(i, 2, {
                      type: "textord",
                      mode: "text",
                      loc: SourceLocation.range(a, group[i + 1]),
                      text: "--"
                    });
                    n -= 1;
                  }
                }
                if ((v === "'" || v === "`") && group[i + 1].text === v) {
                  group.splice(i, 2, {
                    type: "textord",
                    mode: "text",
                    loc: SourceLocation.range(a, group[i + 1]),
                    text: v + v
                  });
                  n -= 1;
                }
              }
            }
            /**
             * Parse a single symbol out of the string. Here, we handle single character
             * symbols and special functions like \verb.
             */
            parseSymbol() {
              const nucleus = this.fetch();
              let text = nucleus.text;
              if (/^\\verb[^a-zA-Z]/.test(text)) {
                this.consume();
                let arg = text.slice(5);
                const star = arg.charAt(0) === "*";
                if (star) {
                  arg = arg.slice(1);
                }
                if (arg.length < 2 || arg.charAt(0) !== arg.slice(-1)) {
                  throw new src_ParseError("\\verb assertion failed --\n                    please report what input caused this bug");
                }
                arg = arg.slice(1, -1);
                return {
                  type: "verb",
                  mode: "text",
                  body: arg,
                  star
                };
              }
              if (unicodeSymbols.hasOwnProperty(text[0]) && !src_symbols[this.mode][text[0]]) {
                if (this.settings.strict && this.mode === "math") {
                  this.settings.reportNonstrict("unicodeTextInMathMode", 'Accented Unicode text character "' + text[0] + '" used in math mode', nucleus);
                }
                text = unicodeSymbols[text[0]] + text.slice(1);
              }
              const match = combiningDiacriticalMarksEndRegex.exec(text);
              if (match) {
                text = text.substring(0, match.index);
                if (text === "i") {
                  text = "ı";
                } else if (text === "j") {
                  text = "ȷ";
                }
              }
              let symbol;
              if (src_symbols[this.mode][text]) {
                if (this.settings.strict && this.mode === "math" && extraLatin.indexOf(text) >= 0) {
                  this.settings.reportNonstrict("unicodeTextInMathMode", 'Latin-1/Unicode text character "' + text[0] + '" used in math mode', nucleus);
                }
                const group = src_symbols[this.mode][text].group;
                const loc = SourceLocation.range(nucleus);
                let s;
                if (ATOMS.hasOwnProperty(group)) {
                  const family = group;
                  s = {
                    type: "atom",
                    mode: this.mode,
                    family,
                    loc,
                    text
                  };
                } else {
                  s = {
                    type: group,
                    mode: this.mode,
                    loc,
                    text
                  };
                }
                symbol = s;
              } else if (text.charCodeAt(0) >= 128) {
                if (this.settings.strict) {
                  if (!supportedCodepoint(text.charCodeAt(0))) {
                    this.settings.reportNonstrict("unknownSymbol", 'Unrecognized Unicode character "' + text[0] + '"' + (" (" + text.charCodeAt(0) + ")"), nucleus);
                  } else if (this.mode === "math") {
                    this.settings.reportNonstrict("unicodeTextInMathMode", 'Unicode text character "' + text[0] + '" used in math mode', nucleus);
                  }
                }
                symbol = {
                  type: "textord",
                  mode: "text",
                  loc: SourceLocation.range(nucleus),
                  text
                };
              } else {
                return null;
              }
              this.consume();
              if (match) {
                for (let i = 0; i < match[0].length; i++) {
                  const accent2 = match[0][i];
                  if (!unicodeAccents[accent2]) {
                    throw new src_ParseError("Unknown accent ' " + accent2 + "'", nucleus);
                  }
                  const command = unicodeAccents[accent2][this.mode] || unicodeAccents[accent2].text;
                  if (!command) {
                    throw new src_ParseError("Accent " + accent2 + " unsupported in " + this.mode + " mode", nucleus);
                  }
                  symbol = {
                    type: "accent",
                    mode: this.mode,
                    loc: SourceLocation.range(nucleus),
                    label: command,
                    isStretchy: false,
                    isShifty: true,
                    // $FlowFixMe
                    base: symbol
                  };
                }
              }
              return symbol;
            }
          }
          Parser2.endOfExpression = ["}", "\\endgroup", "\\end", "\\right", "&"];
          ;
          const parseTree = function(toParse, settings) {
            if (!(typeof toParse === "string" || toParse instanceof String)) {
              throw new TypeError("KaTeX can only parse string typed expression");
            }
            const parser = new Parser2(toParse, settings);
            delete parser.gullet.macros.current["\\df@tag"];
            let tree = parser.parse();
            delete parser.gullet.macros.current["\\current@color"];
            delete parser.gullet.macros.current["\\color"];
            if (parser.gullet.macros.get("\\df@tag")) {
              if (!settings.displayMode) {
                throw new src_ParseError("\\tag works only in display equations");
              }
              tree = [{
                type: "tag",
                mode: "text",
                body: tree,
                tag: parser.subparse([new Token("\\df@tag")])
              }];
            }
            return tree;
          };
          var src_parseTree = parseTree;
          ;
          let render = function(expression, baseNode, options) {
            baseNode.textContent = "";
            const node = renderToDomTree(expression, options).toNode();
            baseNode.appendChild(node);
          };
          if (typeof document !== "undefined") {
            if (document.compatMode !== "CSS1Compat") {
              typeof console !== "undefined" && console.warn("Warning: KaTeX doesn't work in quirks mode. Make sure your website has a suitable doctype.");
              render = function() {
                throw new src_ParseError("KaTeX doesn't work in quirks mode.");
              };
            }
          }
          const renderToString = function(expression, options) {
            const markup = renderToDomTree(expression, options).toMarkup();
            return markup;
          };
          const generateParseTree = function(expression, options) {
            const settings = new Settings(options);
            return src_parseTree(expression, settings);
          };
          const renderError = function(error, expression, options) {
            if (options.throwOnError || !(error instanceof src_ParseError)) {
              throw error;
            }
            const node = buildCommon.makeSpan(["katex-error"], [new SymbolNode(expression)]);
            node.setAttribute("title", error.toString());
            node.setAttribute("style", "color:" + options.errorColor);
            return node;
          };
          const renderToDomTree = function(expression, options) {
            const settings = new Settings(options);
            try {
              const tree = src_parseTree(expression, settings);
              return buildTree(tree, expression, settings);
            } catch (error) {
              return renderError(error, expression, settings);
            }
          };
          const renderToHTMLTree = function(expression, options) {
            const settings = new Settings(options);
            try {
              const tree = src_parseTree(expression, settings);
              return buildHTMLTree(tree, expression, settings);
            } catch (error) {
              return renderError(error, expression, settings);
            }
          };
          const version = "0.16.22";
          const __domTree = {
            Span,
            Anchor,
            SymbolNode,
            SvgNode,
            PathNode,
            LineNode
          };
          var katex = {
            /**
             * Current KaTeX version
             */
            version,
            /**
             * Renders the given LaTeX into an HTML+MathML combination, and adds
             * it as a child to the specified DOM node.
             */
            render,
            /**
             * Renders the given LaTeX into an HTML+MathML combination string,
             * for sending to the client.
             */
            renderToString,
            /**
             * KaTeX error, usually during parsing.
             */
            ParseError: src_ParseError,
            /**
             * The schema of Settings
             */
            SETTINGS_SCHEMA,
            /**
             * Parses the given LaTeX into KaTeX's internal parse tree structure,
             * without rendering to HTML or MathML.
             *
             * NOTE: This method is not currently recommended for public use.
             * The internal tree representation is unstable and is very likely
             * to change. Use at your own risk.
             */
            __parse: generateParseTree,
            /**
             * Renders the given LaTeX into an HTML+MathML internal DOM tree
             * representation, without flattening that representation to a string.
             *
             * NOTE: This method is not currently recommended for public use.
             * The internal tree representation is unstable and is very likely
             * to change. Use at your own risk.
             */
            __renderToDomTree: renderToDomTree,
            /**
             * Renders the given LaTeX into an HTML internal DOM tree representation,
             * without MathML and without flattening that representation to a string.
             *
             * NOTE: This method is not currently recommended for public use.
             * The internal tree representation is unstable and is very likely
             * to change. Use at your own risk.
             */
            __renderToHTMLTree: renderToHTMLTree,
            /**
             * extends internal font metrics object with a new object
             * each key in the new object represents a font name
            */
            __setFontMetrics: setFontMetrics,
            /**
             * adds a new symbol to builtin symbols table
             */
            __defineSymbol: defineSymbol,
            /**
             * adds a new function to builtin function list,
             * which directly produce parse tree elements
             * and have their own html/mathml builders
             */
            __defineFunction: defineFunction,
            /**
             * adds a new macro to builtin macro list
             */
            __defineMacro: defineMacro,
            /**
             * Expose the dom tree node types, which can be useful for type checking nodes.
             *
             * NOTE: These methods are not currently recommended for public use.
             * The internal tree representation is unstable and is very likely
             * to change. Use at your own risk.
             */
            __domTree
          };
          ;
          var katex_webpack = katex;
          __webpack_exports__ = __webpack_exports__["default"];
          return __webpack_exports__;
        }()
      );
    });
  }
});

// node_modules/@vscode/markdown-it-katex/dist/index.js
var require_dist = __commonJS({
  "node_modules/@vscode/markdown-it-katex/dist/index.js"(exports) {
    "use strict";
    var __importDefault = exports && exports.__importDefault || function(mod) {
      return mod && mod.__esModule ? mod : { "default": mod };
    };
    Object.defineProperty(exports, "__esModule", { value: true });
    var katex_1 = __importDefault(require_katex());
    function isValidInlineDelim(state, pos) {
      const prevChar = state.src[pos - 1];
      const char = state.src[pos];
      const nextChar = state.src[pos + 1];
      if (char !== "$") {
        return { can_open: false, can_close: false };
      }
      let canOpen = false;
      let canClose = false;
      if (prevChar !== "$" && prevChar !== "\\" && (prevChar === void 0 || isWhitespace(prevChar) || !isWordCharacterOrNumber(prevChar))) {
        canOpen = true;
      }
      if (nextChar !== "$" && (nextChar == void 0 || isWhitespace(nextChar) || !isWordCharacterOrNumber(nextChar))) {
        canClose = true;
      }
      return { can_open: canOpen, can_close: canClose };
    }
    function isWhitespace(char) {
      return /^\s$/u.test(char);
    }
    function isWordCharacterOrNumber(char) {
      return /^[\w\d]$/u.test(char);
    }
    function isValidBlockDelim(state, pos) {
      const prevChar = state.src[pos - 1];
      const char = state.src[pos];
      const nextChar = state.src[pos + 1];
      const nextCharPlus1 = state.src[pos + 2];
      if (char === "$" && prevChar !== "$" && prevChar !== "\\" && nextChar === "$" && nextCharPlus1 !== "$") {
        return { can_open: true, can_close: true };
      }
      return { can_open: false, can_close: false };
    }
    function inlineMath(state, silent) {
      if (state.src[state.pos] !== "$") {
        return false;
      }
      const lastToken = state.tokens.at(-1);
      if ((lastToken == null ? void 0 : lastToken.type) === "html_inline") {
        if (/^<\w+.+[^/]>$/.test(lastToken.content)) {
          return false;
        }
      }
      let res = isValidInlineDelim(state, state.pos);
      if (!res.can_open) {
        if (!silent) {
          state.pending += "$";
        }
        state.pos += 1;
        return true;
      }
      let start = state.pos + 1;
      let match = start;
      let pos;
      while ((match = state.src.indexOf("$", match)) !== -1) {
        pos = match - 1;
        while (state.src[pos] === "\\") {
          pos -= 1;
        }
        if ((match - pos) % 2 == 1) {
          break;
        }
        match += 1;
      }
      if (match === -1) {
        if (!silent) {
          state.pending += "$";
        }
        state.pos = start;
        return true;
      }
      if (match - start === 0) {
        if (!silent) {
          state.pending += "$$";
        }
        state.pos = start + 1;
        return true;
      }
      res = isValidInlineDelim(state, match);
      if (!res.can_close) {
        if (!silent) {
          state.pending += "$";
        }
        state.pos = start;
        return true;
      }
      if (!silent) {
        const token = state.push("math_inline", "math", 0);
        token.markup = "$";
        token.content = state.src.slice(start, match);
      }
      state.pos = match + 1;
      return true;
    }
    function blockMath(state, start, end, silent) {
      let found = false;
      let pos = state.bMarks[start] + state.tShift[start];
      let max = state.eMarks[start];
      if (pos + 2 > max) {
        return false;
      }
      if (state.src.slice(pos, pos + 2) !== "$$") {
        return false;
      }
      pos += 2;
      let firstLine = state.src.slice(pos, max);
      const endIndexes = [...firstLine.matchAll(/\$\$/g)];
      if (endIndexes.length === 1 && endIndexes[0].index === firstLine.length - 2) {
        firstLine = firstLine.trim().slice(0, -2);
        found = true;
      } else if (endIndexes.length > 1) {
        return false;
      }
      if (silent) {
        return true;
      }
      let lastLine;
      let next;
      let lastPos;
      for (next = start; !found; ) {
        next++;
        if (next >= end) {
          break;
        }
        pos = state.bMarks[next] + state.tShift[next];
        max = state.eMarks[next];
        if (pos < max && state.tShift[next] < state.blkIndent) {
          break;
        }
        if (state.src.slice(pos, max).trim().slice(-2) === "$$") {
          lastPos = state.src.slice(0, max).lastIndexOf("$$");
          lastLine = state.src.slice(pos, lastPos);
          found = true;
        } else if (state.src.slice(pos, max).trim().includes("$$")) {
          lastPos = state.src.slice(0, max).trim().indexOf("$$");
          lastLine = state.src.slice(pos, lastPos);
          found = true;
        }
      }
      state.line = next + 1;
      const token = state.push("math_block", "math", 0);
      token.block = true;
      token.content = (firstLine && firstLine.trim() ? firstLine + "\n" : "") + state.getLines(start + 1, next, state.tShift[start], true) + (lastLine && lastLine.trim() ? lastLine : "");
      token.map = [start, state.line];
      token.markup = "$$";
      return true;
    }
    function blockBareMath(state, start, end, silent) {
      const startPos = state.bMarks[start] + state.tShift[start];
      const startMax = state.eMarks[start];
      const firstLine = state.src.slice(startPos, startMax);
      const beginMatch = firstLine.match(/^\s*\\begin\s*\{([^{}]+)\}/);
      if (!beginMatch) {
        return false;
      }
      if (start > 0) {
        const previousStart = state.bMarks[start - 1] + state.tShift[start - 1];
        const previousEnd = state.eMarks[start - 1];
        const previousLine = state.src.slice(previousStart, previousEnd);
        if (!/^\s*$/.test(previousLine)) {
          return false;
        }
      }
      if (silent) {
        return true;
      }
      const beginEndStack = [];
      let next = start;
      let lastLine;
      let found = false;
      outer: for (; !found; next++) {
        if (next >= end) {
          break;
        }
        const pos = state.bMarks[next] + state.tShift[next];
        const max = state.eMarks[next];
        if (pos < max && state.tShift[next] < state.blkIndent) {
          break;
        }
        const line = state.src.slice(pos, max);
        for (const match of line.matchAll(/(\\begin|\\end)\s*\{([^{}]+)\}/g)) {
          if (match[1] === "\\begin") {
            beginEndStack.push(match[2].trim());
          } else if (match[1] === "\\end") {
            beginEndStack.pop();
            if (!beginEndStack.length) {
              lastLine = state.src.slice(pos, max);
              found = true;
              break outer;
            }
          }
        }
      }
      state.line = next + 1;
      const token = state.push("math_block", "math", 0);
      token.block = true;
      token.content = (state.getLines(start, next, state.tShift[start], true) + (lastLine ?? "")).trim();
      token.map = [start, state.line];
      token.markup = "$$";
      return true;
    }
    function inlineMathBlock(state, silent) {
      var start, match, token, res, pos;
      if (state.src.slice(state.pos, state.pos + 2) !== "$$") {
        return false;
      }
      res = isValidBlockDelim(state, state.pos);
      if (!res.can_open) {
        if (!silent) {
          state.pending += "$$";
        }
        state.pos += 2;
        return true;
      }
      start = state.pos + 2;
      match = start;
      while ((match = state.src.indexOf("$$", match)) !== -1) {
        pos = match - 1;
        while (state.src[pos] === "\\") {
          pos -= 1;
        }
        if ((match - pos) % 2 == 1) {
          break;
        }
        match += 2;
      }
      if (match === -1) {
        if (!silent) {
          state.pending += "$$";
        }
        state.pos = start;
        return true;
      }
      if (match - start === 0) {
        if (!silent) {
          state.pending += "$$$$";
        }
        state.pos = start + 2;
        return true;
      }
      res = isValidBlockDelim(state, match);
      if (!res.can_close) {
        if (!silent) {
          state.pending += "$$";
        }
        state.pos = start;
        return true;
      }
      if (!silent) {
        token = state.push("math_block", "math", 0);
        token.block = true;
        token.markup = "$$";
        token.content = state.src.slice(start, match);
      }
      state.pos = match + 2;
      return true;
    }
    function inlineBareBlock(state, silent) {
      const text = state.src.slice(state.pos);
      if (!/^\n\\begin/.test(text)) {
        return false;
      }
      state.pos += 1;
      if (silent) {
        return true;
      }
      const lines = text.split(/\n/g).slice(1);
      let foundLine;
      const beginEndStack = [];
      outer: for (var i = 0; i < lines.length; ++i) {
        const line = lines[i];
        for (const match of line.matchAll(/(\\begin|\\end)\s*\{([^{}]+)\}/g)) {
          if (match[1] === "\\begin") {
            beginEndStack.push(match[2].trim());
          } else if (match[1] === "\\end") {
            beginEndStack.pop();
            if (!beginEndStack.length) {
              foundLine = i;
              break outer;
            }
          }
        }
      }
      if (typeof foundLine === "undefined") {
        return false;
      }
      const endIndex = lines.slice(0, foundLine + 1).reduce((p, c) => p + c.length, 0) + foundLine + 1;
      const token = state.push("math_inline_bare_block", "math", 0);
      token.block = true;
      token.markup = "$$";
      token.content = text.slice(1, endIndex);
      state.pos = state.pos + endIndex;
      return true;
    }
    function handleMathInHtml(state, mathType, mathMarkup, mathRegex) {
      const tokens = state.tokens;
      for (let index = tokens.length - 1; index >= 0; index--) {
        const currentToken = tokens[index];
        const newTokens = [];
        if (currentToken.type !== "html_block") {
          continue;
        }
        const content = currentToken.content;
        for (const match of content.matchAll(mathRegex)) {
          if (!match.groups) {
            continue;
          }
          const html_before_math = match.groups.html_before_math;
          const math = match.groups.math;
          const html_after_math = match.groups.html_after_math;
          if (html_before_math) {
            newTokens.push({ ...currentToken, type: "html_block", map: null, content: html_before_math });
          }
          if (math) {
            newTokens.push({
              ...currentToken,
              type: mathType,
              map: null,
              content: math,
              markup: mathMarkup,
              block: true,
              tag: "math"
            });
          }
          if (html_after_math) {
            newTokens.push({ ...currentToken, type: "html_block", map: null, content: html_after_math });
          }
        }
        if (newTokens.length > 0) {
          tokens.splice(index, 1, ...newTokens);
        }
      }
      return true;
    }
    function escapeHtml(unsafe) {
      return unsafe.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#039;");
    }
    function default_1(md, options) {
      const katex = (options == null ? void 0 : options.katex) ?? katex_1.default;
      const enableBareBlocks = options == null ? void 0 : options.enableBareBlocks;
      const enableMathBlockInHtml = options == null ? void 0 : options.enableMathBlockInHtml;
      const enableMathInlineInHtml = options == null ? void 0 : options.enableMathInlineInHtml;
      const enableFencedBlocks = options == null ? void 0 : options.enableFencedBlocks;
      md.inline.ruler.after("escape", "math_inline", inlineMath);
      md.inline.ruler.after("escape", "math_inline_block", inlineMathBlock);
      if (enableBareBlocks) {
        md.inline.ruler.before("text", "math_inline_bare_block", inlineBareBlock);
      }
      md.block.ruler.after("blockquote", "math_block", (state, start, end, silent) => {
        if (enableBareBlocks && blockBareMath(state, start, end, silent)) {
          return true;
        }
        return blockMath(state, start, end, silent);
      }, {
        alt: ["paragraph", "reference", "blockquote", "list"]
      });
      const math_block_within_html_regex = /(?<html_before_math>[\s\S]*?)\$\$(?<math>[\s\S]+?)\$\$(?<html_after_math>(?:(?!\$\$[\s\S]+?\$\$)[\s\S])*)/gm;
      const math_inline_within_html_regex = /(?<html_before_math>[\s\S]*?)\$(?<math>.*?)\$(?<html_after_math>(?:(?!\$.*?\$)[\s\S])*)/gm;
      if (enableMathBlockInHtml) {
        md.core.ruler.push("math_block_in_html_block", (state) => {
          return handleMathInHtml(state, "math_block", "$$", math_block_within_html_regex);
        });
      }
      if (enableMathInlineInHtml) {
        md.core.ruler.push("math_inline_in_html_block", (state) => {
          return handleMathInHtml(state, "math_inline", "$", math_inline_within_html_regex);
        });
      }
      const katexInline = (latex) => {
        const displayMode = /\\begin\{(align|equation|gather|cd|alignat)\}/ig.test(latex);
        try {
          return katex.renderToString(latex, { ...options, displayMode });
        } catch (error) {
          if (options == null ? void 0 : options.throwOnError) {
            console.log(error);
          }
          return `<span class="katex-error" title="${escapeHtml(latex)}">${escapeHtml(error + "")}</span>`;
        }
      };
      const inlineRenderer = (tokens, idx) => {
        const content = tokens[idx].content;
        const hasBacktick = content.length > 2 && content[0] === "`" && content[content.length - 1] === "`";
        const sanitized = hasBacktick ? content.slice(1, -1) : content;
        return katexInline(sanitized);
      };
      const katexBlockRenderer = (latex) => {
        try {
          return `<p class="katex-block">${katex.renderToString(latex, { ...options, displayMode: true })}</p>`;
        } catch (error) {
          if (options == null ? void 0 : options.throwOnError) {
            console.log(error);
          }
          return `<p class="katex-block katex-error" title="${escapeHtml(latex)}">${escapeHtml(error + "")}</p>`;
        }
      };
      const blockRenderer = (tokens, idx) => {
        return katexBlockRenderer(tokens[idx].content) + "\n";
      };
      md.renderer.rules.math_inline = inlineRenderer;
      md.renderer.rules.math_inline_block = blockRenderer;
      md.renderer.rules.math_inline_bare_block = blockRenderer;
      md.renderer.rules.math_block = blockRenderer;
      if (enableFencedBlocks) {
        const mathLanguageId = "math";
        const originalFenceRenderer = md.renderer.rules.fence;
        md.renderer.rules.fence = function(tokens, idx, options2, env, self2) {
          const token = tokens[idx];
          if (token.info.trim().toLowerCase() === mathLanguageId && enableFencedBlocks) {
            return katexBlockRenderer(token.content) + "\n";
          } else {
            return (originalFenceRenderer == null ? void 0 : originalFenceRenderer.call(this, tokens, idx, options2, env, self2)) || "";
          }
        };
      }
    }
    exports.default = default_1;
  }
});

// node_modules/yaml/browser/dist/nodes/identity.js
var ALIAS = Symbol.for("yaml.alias");
var DOC = Symbol.for("yaml.document");
var MAP = Symbol.for("yaml.map");
var PAIR = Symbol.for("yaml.pair");
var SCALAR = Symbol.for("yaml.scalar");
var SEQ = Symbol.for("yaml.seq");
var NODE_TYPE = Symbol.for("yaml.node.type");
var isAlias = (node) => !!node && typeof node === "object" && node[NODE_TYPE] === ALIAS;
var isDocument = (node) => !!node && typeof node === "object" && node[NODE_TYPE] === DOC;
var isMap = (node) => !!node && typeof node === "object" && node[NODE_TYPE] === MAP;
var isPair = (node) => !!node && typeof node === "object" && node[NODE_TYPE] === PAIR;
var isScalar = (node) => !!node && typeof node === "object" && node[NODE_TYPE] === SCALAR;
var isSeq = (node) => !!node && typeof node === "object" && node[NODE_TYPE] === SEQ;
function isCollection(node) {
  if (node && typeof node === "object")
    switch (node[NODE_TYPE]) {
      case MAP:
      case SEQ:
        return true;
    }
  return false;
}
function isNode(node) {
  if (node && typeof node === "object")
    switch (node[NODE_TYPE]) {
      case ALIAS:
      case MAP:
      case SCALAR:
      case SEQ:
        return true;
    }
  return false;
}
var hasAnchor = (node) => (isScalar(node) || isCollection(node)) && !!node.anchor;

// node_modules/yaml/browser/dist/visit.js
var BREAK = Symbol("break visit");
var SKIP = Symbol("skip children");
var REMOVE = Symbol("remove node");
function visit(node, visitor) {
  const visitor_ = initVisitor(visitor);
  if (isDocument(node)) {
    const cd = visit_(null, node.contents, visitor_, Object.freeze([node]));
    if (cd === REMOVE)
      node.contents = null;
  } else
    visit_(null, node, visitor_, Object.freeze([]));
}
visit.BREAK = BREAK;
visit.SKIP = SKIP;
visit.REMOVE = REMOVE;
function visit_(key, node, visitor, path) {
  const ctrl = callVisitor(key, node, visitor, path);
  if (isNode(ctrl) || isPair(ctrl)) {
    replaceNode(key, path, ctrl);
    return visit_(key, ctrl, visitor, path);
  }
  if (typeof ctrl !== "symbol") {
    if (isCollection(node)) {
      path = Object.freeze(path.concat(node));
      for (let i = 0; i < node.items.length; ++i) {
        const ci = visit_(i, node.items[i], visitor, path);
        if (typeof ci === "number")
          i = ci - 1;
        else if (ci === BREAK)
          return BREAK;
        else if (ci === REMOVE) {
          node.items.splice(i, 1);
          i -= 1;
        }
      }
    } else if (isPair(node)) {
      path = Object.freeze(path.concat(node));
      const ck = visit_("key", node.key, visitor, path);
      if (ck === BREAK)
        return BREAK;
      else if (ck === REMOVE)
        node.key = null;
      const cv = visit_("value", node.value, visitor, path);
      if (cv === BREAK)
        return BREAK;
      else if (cv === REMOVE)
        node.value = null;
    }
  }
  return ctrl;
}
async function visitAsync(node, visitor) {
  const visitor_ = initVisitor(visitor);
  if (isDocument(node)) {
    const cd = await visitAsync_(null, node.contents, visitor_, Object.freeze([node]));
    if (cd === REMOVE)
      node.contents = null;
  } else
    await visitAsync_(null, node, visitor_, Object.freeze([]));
}
visitAsync.BREAK = BREAK;
visitAsync.SKIP = SKIP;
visitAsync.REMOVE = REMOVE;
async function visitAsync_(key, node, visitor, path) {
  const ctrl = await callVisitor(key, node, visitor, path);
  if (isNode(ctrl) || isPair(ctrl)) {
    replaceNode(key, path, ctrl);
    return visitAsync_(key, ctrl, visitor, path);
  }
  if (typeof ctrl !== "symbol") {
    if (isCollection(node)) {
      path = Object.freeze(path.concat(node));
      for (let i = 0; i < node.items.length; ++i) {
        const ci = await visitAsync_(i, node.items[i], visitor, path);
        if (typeof ci === "number")
          i = ci - 1;
        else if (ci === BREAK)
          return BREAK;
        else if (ci === REMOVE) {
          node.items.splice(i, 1);
          i -= 1;
        }
      }
    } else if (isPair(node)) {
      path = Object.freeze(path.concat(node));
      const ck = await visitAsync_("key", node.key, visitor, path);
      if (ck === BREAK)
        return BREAK;
      else if (ck === REMOVE)
        node.key = null;
      const cv = await visitAsync_("value", node.value, visitor, path);
      if (cv === BREAK)
        return BREAK;
      else if (cv === REMOVE)
        node.value = null;
    }
  }
  return ctrl;
}
function initVisitor(visitor) {
  if (typeof visitor === "object" && (visitor.Collection || visitor.Node || visitor.Value)) {
    return Object.assign({
      Alias: visitor.Node,
      Map: visitor.Node,
      Scalar: visitor.Node,
      Seq: visitor.Node
    }, visitor.Value && {
      Map: visitor.Value,
      Scalar: visitor.Value,
      Seq: visitor.Value
    }, visitor.Collection && {
      Map: visitor.Collection,
      Seq: visitor.Collection
    }, visitor);
  }
  return visitor;
}
function callVisitor(key, node, visitor, path) {
  var _a, _b, _c, _d, _e;
  if (typeof visitor === "function")
    return visitor(key, node, path);
  if (isMap(node))
    return (_a = visitor.Map) == null ? void 0 : _a.call(visitor, key, node, path);
  if (isSeq(node))
    return (_b = visitor.Seq) == null ? void 0 : _b.call(visitor, key, node, path);
  if (isPair(node))
    return (_c = visitor.Pair) == null ? void 0 : _c.call(visitor, key, node, path);
  if (isScalar(node))
    return (_d = visitor.Scalar) == null ? void 0 : _d.call(visitor, key, node, path);
  if (isAlias(node))
    return (_e = visitor.Alias) == null ? void 0 : _e.call(visitor, key, node, path);
  return void 0;
}
function replaceNode(key, path, node) {
  const parent = path[path.length - 1];
  if (isCollection(parent)) {
    parent.items[key] = node;
  } else if (isPair(parent)) {
    if (key === "key")
      parent.key = node;
    else
      parent.value = node;
  } else if (isDocument(parent)) {
    parent.contents = node;
  } else {
    const pt = isAlias(parent) ? "alias" : "scalar";
    throw new Error(`Cannot replace node with ${pt} parent`);
  }
}

// node_modules/yaml/browser/dist/doc/directives.js
var escapeChars = {
  "!": "%21",
  ",": "%2C",
  "[": "%5B",
  "]": "%5D",
  "{": "%7B",
  "}": "%7D"
};
var escapeTagName = (tn) => tn.replace(/[!,[\]{}]/g, (ch) => escapeChars[ch]);
var Directives = class _Directives {
  constructor(yaml, tags) {
    this.docStart = null;
    this.docEnd = false;
    this.yaml = Object.assign({}, _Directives.defaultYaml, yaml);
    this.tags = Object.assign({}, _Directives.defaultTags, tags);
  }
  clone() {
    const copy = new _Directives(this.yaml, this.tags);
    copy.docStart = this.docStart;
    return copy;
  }
  /**
   * During parsing, get a Directives instance for the current document and
   * update the stream state according to the current version's spec.
   */
  atDocument() {
    const res = new _Directives(this.yaml, this.tags);
    switch (this.yaml.version) {
      case "1.1":
        this.atNextDocument = true;
        break;
      case "1.2":
        this.atNextDocument = false;
        this.yaml = {
          explicit: _Directives.defaultYaml.explicit,
          version: "1.2"
        };
        this.tags = Object.assign({}, _Directives.defaultTags);
        break;
    }
    return res;
  }
  /**
   * @param onError - May be called even if the action was successful
   * @returns `true` on success
   */
  add(line, onError) {
    if (this.atNextDocument) {
      this.yaml = { explicit: _Directives.defaultYaml.explicit, version: "1.1" };
      this.tags = Object.assign({}, _Directives.defaultTags);
      this.atNextDocument = false;
    }
    const parts = line.trim().split(/[ \t]+/);
    const name = parts.shift();
    switch (name) {
      case "%TAG": {
        if (parts.length !== 2) {
          onError(0, "%TAG directive should contain exactly two parts");
          if (parts.length < 2)
            return false;
        }
        const [handle, prefix] = parts;
        this.tags[handle] = prefix;
        return true;
      }
      case "%YAML": {
        this.yaml.explicit = true;
        if (parts.length !== 1) {
          onError(0, "%YAML directive should contain exactly one part");
          return false;
        }
        const [version] = parts;
        if (version === "1.1" || version === "1.2") {
          this.yaml.version = version;
          return true;
        } else {
          const isValid = /^\d+\.\d+$/.test(version);
          onError(6, `Unsupported YAML version ${version}`, isValid);
          return false;
        }
      }
      default:
        onError(0, `Unknown directive ${name}`, true);
        return false;
    }
  }
  /**
   * Resolves a tag, matching handles to those defined in %TAG directives.
   *
   * @returns Resolved tag, which may also be the non-specific tag `'!'` or a
   *   `'!local'` tag, or `null` if unresolvable.
   */
  tagName(source, onError) {
    if (source === "!")
      return "!";
    if (source[0] !== "!") {
      onError(`Not a valid tag: ${source}`);
      return null;
    }
    if (source[1] === "<") {
      const verbatim = source.slice(2, -1);
      if (verbatim === "!" || verbatim === "!!") {
        onError(`Verbatim tags aren't resolved, so ${source} is invalid.`);
        return null;
      }
      if (source[source.length - 1] !== ">")
        onError("Verbatim tags must end with a >");
      return verbatim;
    }
    const [, handle, suffix] = source.match(/^(.*!)([^!]*)$/s);
    if (!suffix)
      onError(`The ${source} tag has no suffix`);
    const prefix = this.tags[handle];
    if (prefix) {
      try {
        return prefix + decodeURIComponent(suffix);
      } catch (error) {
        onError(String(error));
        return null;
      }
    }
    if (handle === "!")
      return source;
    onError(`Could not resolve tag: ${source}`);
    return null;
  }
  /**
   * Given a fully resolved tag, returns its printable string form,
   * taking into account current tag prefixes and defaults.
   */
  tagString(tag) {
    for (const [handle, prefix] of Object.entries(this.tags)) {
      if (tag.startsWith(prefix))
        return handle + escapeTagName(tag.substring(prefix.length));
    }
    return tag[0] === "!" ? tag : `!<${tag}>`;
  }
  toString(doc) {
    const lines = this.yaml.explicit ? [`%YAML ${this.yaml.version || "1.2"}`] : [];
    const tagEntries = Object.entries(this.tags);
    let tagNames;
    if (doc && tagEntries.length > 0 && isNode(doc.contents)) {
      const tags = {};
      visit(doc.contents, (_key, node) => {
        if (isNode(node) && node.tag)
          tags[node.tag] = true;
      });
      tagNames = Object.keys(tags);
    } else
      tagNames = [];
    for (const [handle, prefix] of tagEntries) {
      if (handle === "!!" && prefix === "tag:yaml.org,2002:")
        continue;
      if (!doc || tagNames.some((tn) => tn.startsWith(prefix)))
        lines.push(`%TAG ${handle} ${prefix}`);
    }
    return lines.join("\n");
  }
};
Directives.defaultYaml = { explicit: false, version: "1.2" };
Directives.defaultTags = { "!!": "tag:yaml.org,2002:" };

// node_modules/yaml/browser/dist/doc/anchors.js
function anchorIsValid(anchor) {
  if (/[\x00-\x19\s,[\]{}]/.test(anchor)) {
    const sa = JSON.stringify(anchor);
    const msg = `Anchor must not contain whitespace or control characters: ${sa}`;
    throw new Error(msg);
  }
  return true;
}
function anchorNames(root) {
  const anchors = /* @__PURE__ */ new Set();
  visit(root, {
    Value(_key, node) {
      if (node.anchor)
        anchors.add(node.anchor);
    }
  });
  return anchors;
}
function findNewAnchor(prefix, exclude) {
  for (let i = 1; true; ++i) {
    const name = `${prefix}${i}`;
    if (!exclude.has(name))
      return name;
  }
}
function createNodeAnchors(doc, prefix) {
  const aliasObjects = [];
  const sourceObjects = /* @__PURE__ */ new Map();
  let prevAnchors = null;
  return {
    onAnchor: (source) => {
      aliasObjects.push(source);
      prevAnchors ?? (prevAnchors = anchorNames(doc));
      const anchor = findNewAnchor(prefix, prevAnchors);
      prevAnchors.add(anchor);
      return anchor;
    },
    /**
     * With circular references, the source node is only resolved after all
     * of its child nodes are. This is why anchors are set only after all of
     * the nodes have been created.
     */
    setAnchors: () => {
      for (const source of aliasObjects) {
        const ref = sourceObjects.get(source);
        if (typeof ref === "object" && ref.anchor && (isScalar(ref.node) || isCollection(ref.node))) {
          ref.node.anchor = ref.anchor;
        } else {
          const error = new Error("Failed to resolve repeated object (this should not happen)");
          error.source = source;
          throw error;
        }
      }
    },
    sourceObjects
  };
}

// node_modules/yaml/browser/dist/doc/applyReviver.js
function applyReviver(reviver, obj, key, val) {
  if (val && typeof val === "object") {
    if (Array.isArray(val)) {
      for (let i = 0, len = val.length; i < len; ++i) {
        const v0 = val[i];
        const v1 = applyReviver(reviver, val, String(i), v0);
        if (v1 === void 0)
          delete val[i];
        else if (v1 !== v0)
          val[i] = v1;
      }
    } else if (val instanceof Map) {
      for (const k of Array.from(val.keys())) {
        const v0 = val.get(k);
        const v1 = applyReviver(reviver, val, k, v0);
        if (v1 === void 0)
          val.delete(k);
        else if (v1 !== v0)
          val.set(k, v1);
      }
    } else if (val instanceof Set) {
      for (const v0 of Array.from(val)) {
        const v1 = applyReviver(reviver, val, v0, v0);
        if (v1 === void 0)
          val.delete(v0);
        else if (v1 !== v0) {
          val.delete(v0);
          val.add(v1);
        }
      }
    } else {
      for (const [k, v0] of Object.entries(val)) {
        const v1 = applyReviver(reviver, val, k, v0);
        if (v1 === void 0)
          delete val[k];
        else if (v1 !== v0)
          val[k] = v1;
      }
    }
  }
  return reviver.call(obj, key, val);
}

// node_modules/yaml/browser/dist/nodes/toJS.js
function toJS(value, arg, ctx) {
  if (Array.isArray(value))
    return value.map((v, i) => toJS(v, String(i), ctx));
  if (value && typeof value.toJSON === "function") {
    if (!ctx || !hasAnchor(value))
      return value.toJSON(arg, ctx);
    const data = { aliasCount: 0, count: 1, res: void 0 };
    ctx.anchors.set(value, data);
    ctx.onCreate = (res2) => {
      data.res = res2;
      delete ctx.onCreate;
    };
    const res = value.toJSON(arg, ctx);
    if (ctx.onCreate)
      ctx.onCreate(res);
    return res;
  }
  if (typeof value === "bigint" && !(ctx == null ? void 0 : ctx.keep))
    return Number(value);
  return value;
}

// node_modules/yaml/browser/dist/nodes/Node.js
var NodeBase = class {
  constructor(type) {
    Object.defineProperty(this, NODE_TYPE, { value: type });
  }
  /** Create a copy of this node.  */
  clone() {
    const copy = Object.create(Object.getPrototypeOf(this), Object.getOwnPropertyDescriptors(this));
    if (this.range)
      copy.range = this.range.slice();
    return copy;
  }
  /** A plain JavaScript representation of this node. */
  toJS(doc, { mapAsMap, maxAliasCount, onAnchor, reviver } = {}) {
    if (!isDocument(doc))
      throw new TypeError("A document argument is required");
    const ctx = {
      anchors: /* @__PURE__ */ new Map(),
      doc,
      keep: true,
      mapAsMap: mapAsMap === true,
      mapKeyWarned: false,
      maxAliasCount: typeof maxAliasCount === "number" ? maxAliasCount : 100
    };
    const res = toJS(this, "", ctx);
    if (typeof onAnchor === "function")
      for (const { count, res: res2 } of ctx.anchors.values())
        onAnchor(res2, count);
    return typeof reviver === "function" ? applyReviver(reviver, { "": res }, "", res) : res;
  }
};

// node_modules/yaml/browser/dist/nodes/Alias.js
var Alias = class extends NodeBase {
  constructor(source) {
    super(ALIAS);
    this.source = source;
    Object.defineProperty(this, "tag", {
      set() {
        throw new Error("Alias nodes cannot have tags");
      }
    });
  }
  /**
   * Resolve the value of this alias within `doc`, finding the last
   * instance of the `source` anchor before this node.
   */
  resolve(doc, ctx) {
    let nodes;
    if (ctx == null ? void 0 : ctx.aliasResolveCache) {
      nodes = ctx.aliasResolveCache;
    } else {
      nodes = [];
      visit(doc, {
        Node: (_key, node) => {
          if (isAlias(node) || hasAnchor(node))
            nodes.push(node);
        }
      });
      if (ctx)
        ctx.aliasResolveCache = nodes;
    }
    let found = void 0;
    for (const node of nodes) {
      if (node === this)
        break;
      if (node.anchor === this.source)
        found = node;
    }
    return found;
  }
  toJSON(_arg, ctx) {
    if (!ctx)
      return { source: this.source };
    const { anchors, doc, maxAliasCount } = ctx;
    const source = this.resolve(doc, ctx);
    if (!source) {
      const msg = `Unresolved alias (the anchor must be set before the alias): ${this.source}`;
      throw new ReferenceError(msg);
    }
    let data = anchors.get(source);
    if (!data) {
      toJS(source, null, ctx);
      data = anchors.get(source);
    }
    if (!data || data.res === void 0) {
      const msg = "This should not happen: Alias anchor was not resolved?";
      throw new ReferenceError(msg);
    }
    if (maxAliasCount >= 0) {
      data.count += 1;
      if (data.aliasCount === 0)
        data.aliasCount = getAliasCount(doc, source, anchors);
      if (data.count * data.aliasCount > maxAliasCount) {
        const msg = "Excessive alias count indicates a resource exhaustion attack";
        throw new ReferenceError(msg);
      }
    }
    return data.res;
  }
  toString(ctx, _onComment, _onChompKeep) {
    const src = `*${this.source}`;
    if (ctx) {
      anchorIsValid(this.source);
      if (ctx.options.verifyAliasOrder && !ctx.anchors.has(this.source)) {
        const msg = `Unresolved alias (the anchor must be set before the alias): ${this.source}`;
        throw new Error(msg);
      }
      if (ctx.implicitKey)
        return `${src} `;
    }
    return src;
  }
};
function getAliasCount(doc, node, anchors) {
  if (isAlias(node)) {
    const source = node.resolve(doc);
    const anchor = anchors && source && anchors.get(source);
    return anchor ? anchor.count * anchor.aliasCount : 0;
  } else if (isCollection(node)) {
    let count = 0;
    for (const item of node.items) {
      const c = getAliasCount(doc, item, anchors);
      if (c > count)
        count = c;
    }
    return count;
  } else if (isPair(node)) {
    const kc = getAliasCount(doc, node.key, anchors);
    const vc = getAliasCount(doc, node.value, anchors);
    return Math.max(kc, vc);
  }
  return 1;
}

// node_modules/yaml/browser/dist/nodes/Scalar.js
var isScalarValue = (value) => !value || typeof value !== "function" && typeof value !== "object";
var Scalar = class extends NodeBase {
  constructor(value) {
    super(SCALAR);
    this.value = value;
  }
  toJSON(arg, ctx) {
    return (ctx == null ? void 0 : ctx.keep) ? this.value : toJS(this.value, arg, ctx);
  }
  toString() {
    return String(this.value);
  }
};
Scalar.BLOCK_FOLDED = "BLOCK_FOLDED";
Scalar.BLOCK_LITERAL = "BLOCK_LITERAL";
Scalar.PLAIN = "PLAIN";
Scalar.QUOTE_DOUBLE = "QUOTE_DOUBLE";
Scalar.QUOTE_SINGLE = "QUOTE_SINGLE";

// node_modules/yaml/browser/dist/doc/createNode.js
var defaultTagPrefix = "tag:yaml.org,2002:";
function findTagObject(value, tagName, tags) {
  if (tagName) {
    const match = tags.filter((t) => t.tag === tagName);
    const tagObj = match.find((t) => !t.format) ?? match[0];
    if (!tagObj)
      throw new Error(`Tag ${tagName} not found`);
    return tagObj;
  }
  return tags.find((t) => {
    var _a;
    return ((_a = t.identify) == null ? void 0 : _a.call(t, value)) && !t.format;
  });
}
function createNode(value, tagName, ctx) {
  var _a, _b, _c;
  if (isDocument(value))
    value = value.contents;
  if (isNode(value))
    return value;
  if (isPair(value)) {
    const map2 = (_b = (_a = ctx.schema[MAP]).createNode) == null ? void 0 : _b.call(_a, ctx.schema, null, ctx);
    map2.items.push(value);
    return map2;
  }
  if (value instanceof String || value instanceof Number || value instanceof Boolean || typeof BigInt !== "undefined" && value instanceof BigInt) {
    value = value.valueOf();
  }
  const { aliasDuplicateObjects, onAnchor, onTagObj, schema: schema4, sourceObjects } = ctx;
  let ref = void 0;
  if (aliasDuplicateObjects && value && typeof value === "object") {
    ref = sourceObjects.get(value);
    if (ref) {
      ref.anchor ?? (ref.anchor = onAnchor(value));
      return new Alias(ref.anchor);
    } else {
      ref = { anchor: null, node: null };
      sourceObjects.set(value, ref);
    }
  }
  if (tagName == null ? void 0 : tagName.startsWith("!!"))
    tagName = defaultTagPrefix + tagName.slice(2);
  let tagObj = findTagObject(value, tagName, schema4.tags);
  if (!tagObj) {
    if (value && typeof value.toJSON === "function") {
      value = value.toJSON();
    }
    if (!value || typeof value !== "object") {
      const node2 = new Scalar(value);
      if (ref)
        ref.node = node2;
      return node2;
    }
    tagObj = value instanceof Map ? schema4[MAP] : Symbol.iterator in Object(value) ? schema4[SEQ] : schema4[MAP];
  }
  if (onTagObj) {
    onTagObj(tagObj);
    delete ctx.onTagObj;
  }
  const node = (tagObj == null ? void 0 : tagObj.createNode) ? tagObj.createNode(ctx.schema, value, ctx) : typeof ((_c = tagObj == null ? void 0 : tagObj.nodeClass) == null ? void 0 : _c.from) === "function" ? tagObj.nodeClass.from(ctx.schema, value, ctx) : new Scalar(value);
  if (tagName)
    node.tag = tagName;
  else if (!tagObj.default)
    node.tag = tagObj.tag;
  if (ref)
    ref.node = node;
  return node;
}

// node_modules/yaml/browser/dist/nodes/Collection.js
function collectionFromPath(schema4, path, value) {
  let v = value;
  for (let i = path.length - 1; i >= 0; --i) {
    const k = path[i];
    if (typeof k === "number" && Number.isInteger(k) && k >= 0) {
      const a = [];
      a[k] = v;
      v = a;
    } else {
      v = /* @__PURE__ */ new Map([[k, v]]);
    }
  }
  return createNode(v, void 0, {
    aliasDuplicateObjects: false,
    keepUndefined: false,
    onAnchor: () => {
      throw new Error("This should not happen, please report a bug.");
    },
    schema: schema4,
    sourceObjects: /* @__PURE__ */ new Map()
  });
}
var isEmptyPath = (path) => path == null || typeof path === "object" && !!path[Symbol.iterator]().next().done;
var Collection = class extends NodeBase {
  constructor(type, schema4) {
    super(type);
    Object.defineProperty(this, "schema", {
      value: schema4,
      configurable: true,
      enumerable: false,
      writable: true
    });
  }
  /**
   * Create a copy of this collection.
   *
   * @param schema - If defined, overwrites the original's schema
   */
  clone(schema4) {
    const copy = Object.create(Object.getPrototypeOf(this), Object.getOwnPropertyDescriptors(this));
    if (schema4)
      copy.schema = schema4;
    copy.items = copy.items.map((it) => isNode(it) || isPair(it) ? it.clone(schema4) : it);
    if (this.range)
      copy.range = this.range.slice();
    return copy;
  }
  /**
   * Adds a value to the collection. For `!!map` and `!!omap` the value must
   * be a Pair instance or a `{ key, value }` object, which may not have a key
   * that already exists in the map.
   */
  addIn(path, value) {
    if (isEmptyPath(path))
      this.add(value);
    else {
      const [key, ...rest] = path;
      const node = this.get(key, true);
      if (isCollection(node))
        node.addIn(rest, value);
      else if (node === void 0 && this.schema)
        this.set(key, collectionFromPath(this.schema, rest, value));
      else
        throw new Error(`Expected YAML collection at ${key}. Remaining path: ${rest}`);
    }
  }
  /**
   * Removes a value from the collection.
   * @returns `true` if the item was found and removed.
   */
  deleteIn(path) {
    const [key, ...rest] = path;
    if (rest.length === 0)
      return this.delete(key);
    const node = this.get(key, true);
    if (isCollection(node))
      return node.deleteIn(rest);
    else
      throw new Error(`Expected YAML collection at ${key}. Remaining path: ${rest}`);
  }
  /**
   * Returns item at `key`, or `undefined` if not found. By default unwraps
   * scalar values from their surrounding node; to disable set `keepScalar` to
   * `true` (collections are always returned intact).
   */
  getIn(path, keepScalar) {
    const [key, ...rest] = path;
    const node = this.get(key, true);
    if (rest.length === 0)
      return !keepScalar && isScalar(node) ? node.value : node;
    else
      return isCollection(node) ? node.getIn(rest, keepScalar) : void 0;
  }
  hasAllNullValues(allowScalar) {
    return this.items.every((node) => {
      if (!isPair(node))
        return false;
      const n = node.value;
      return n == null || allowScalar && isScalar(n) && n.value == null && !n.commentBefore && !n.comment && !n.tag;
    });
  }
  /**
   * Checks if the collection includes a value with the key `key`.
   */
  hasIn(path) {
    const [key, ...rest] = path;
    if (rest.length === 0)
      return this.has(key);
    const node = this.get(key, true);
    return isCollection(node) ? node.hasIn(rest) : false;
  }
  /**
   * Sets a value in this collection. For `!!set`, `value` needs to be a
   * boolean to add/remove the item from the set.
   */
  setIn(path, value) {
    const [key, ...rest] = path;
    if (rest.length === 0) {
      this.set(key, value);
    } else {
      const node = this.get(key, true);
      if (isCollection(node))
        node.setIn(rest, value);
      else if (node === void 0 && this.schema)
        this.set(key, collectionFromPath(this.schema, rest, value));
      else
        throw new Error(`Expected YAML collection at ${key}. Remaining path: ${rest}`);
    }
  }
};

// node_modules/yaml/browser/dist/stringify/stringifyComment.js
var stringifyComment = (str) => str.replace(/^(?!$)(?: $)?/gm, "#");
function indentComment(comment, indent) {
  if (/^\n+$/.test(comment))
    return comment.substring(1);
  return indent ? comment.replace(/^(?! *$)/gm, indent) : comment;
}
var lineComment = (str, indent, comment) => str.endsWith("\n") ? indentComment(comment, indent) : comment.includes("\n") ? "\n" + indentComment(comment, indent) : (str.endsWith(" ") ? "" : " ") + comment;

// node_modules/yaml/browser/dist/stringify/foldFlowLines.js
var FOLD_FLOW = "flow";
var FOLD_BLOCK = "block";
var FOLD_QUOTED = "quoted";
function foldFlowLines(text, indent, mode = "flow", { indentAtStart, lineWidth = 80, minContentWidth = 20, onFold, onOverflow } = {}) {
  if (!lineWidth || lineWidth < 0)
    return text;
  if (lineWidth < minContentWidth)
    minContentWidth = 0;
  const endStep = Math.max(1 + minContentWidth, 1 + lineWidth - indent.length);
  if (text.length <= endStep)
    return text;
  const folds = [];
  const escapedFolds = {};
  let end = lineWidth - indent.length;
  if (typeof indentAtStart === "number") {
    if (indentAtStart > lineWidth - Math.max(2, minContentWidth))
      folds.push(0);
    else
      end = lineWidth - indentAtStart;
  }
  let split = void 0;
  let prev = void 0;
  let overflow = false;
  let i = -1;
  let escStart = -1;
  let escEnd = -1;
  if (mode === FOLD_BLOCK) {
    i = consumeMoreIndentedLines(text, i, indent.length);
    if (i !== -1)
      end = i + endStep;
  }
  for (let ch; ch = text[i += 1]; ) {
    if (mode === FOLD_QUOTED && ch === "\\") {
      escStart = i;
      switch (text[i + 1]) {
        case "x":
          i += 3;
          break;
        case "u":
          i += 5;
          break;
        case "U":
          i += 9;
          break;
        default:
          i += 1;
      }
      escEnd = i;
    }
    if (ch === "\n") {
      if (mode === FOLD_BLOCK)
        i = consumeMoreIndentedLines(text, i, indent.length);
      end = i + indent.length + endStep;
      split = void 0;
    } else {
      if (ch === " " && prev && prev !== " " && prev !== "\n" && prev !== "	") {
        const next = text[i + 1];
        if (next && next !== " " && next !== "\n" && next !== "	")
          split = i;
      }
      if (i >= end) {
        if (split) {
          folds.push(split);
          end = split + endStep;
          split = void 0;
        } else if (mode === FOLD_QUOTED) {
          while (prev === " " || prev === "	") {
            prev = ch;
            ch = text[i += 1];
            overflow = true;
          }
          const j = i > escEnd + 1 ? i - 2 : escStart - 1;
          if (escapedFolds[j])
            return text;
          folds.push(j);
          escapedFolds[j] = true;
          end = j + endStep;
          split = void 0;
        } else {
          overflow = true;
        }
      }
    }
    prev = ch;
  }
  if (overflow && onOverflow)
    onOverflow();
  if (folds.length === 0)
    return text;
  if (onFold)
    onFold();
  let res = text.slice(0, folds[0]);
  for (let i2 = 0; i2 < folds.length; ++i2) {
    const fold = folds[i2];
    const end2 = folds[i2 + 1] || text.length;
    if (fold === 0)
      res = `
${indent}${text.slice(0, end2)}`;
    else {
      if (mode === FOLD_QUOTED && escapedFolds[fold])
        res += `${text[fold]}\\`;
      res += `
${indent}${text.slice(fold + 1, end2)}`;
    }
  }
  return res;
}
function consumeMoreIndentedLines(text, i, indent) {
  let end = i;
  let start = i + 1;
  let ch = text[start];
  while (ch === " " || ch === "	") {
    if (i < start + indent) {
      ch = text[++i];
    } else {
      do {
        ch = text[++i];
      } while (ch && ch !== "\n");
      end = i;
      start = i + 1;
      ch = text[start];
    }
  }
  return end;
}

// node_modules/yaml/browser/dist/stringify/stringifyString.js
var getFoldOptions = (ctx, isBlock2) => ({
  indentAtStart: isBlock2 ? ctx.indent.length : ctx.indentAtStart,
  lineWidth: ctx.options.lineWidth,
  minContentWidth: ctx.options.minContentWidth
});
var containsDocumentMarker = (str) => /^(%|---|\.\.\.)/m.test(str);
function lineLengthOverLimit(str, lineWidth, indentLength) {
  if (!lineWidth || lineWidth < 0)
    return false;
  const limit = lineWidth - indentLength;
  const strLen = str.length;
  if (strLen <= limit)
    return false;
  for (let i = 0, start = 0; i < strLen; ++i) {
    if (str[i] === "\n") {
      if (i - start > limit)
        return true;
      start = i + 1;
      if (strLen - start <= limit)
        return false;
    }
  }
  return true;
}
function doubleQuotedString(value, ctx) {
  const json = JSON.stringify(value);
  if (ctx.options.doubleQuotedAsJSON)
    return json;
  const { implicitKey } = ctx;
  const minMultiLineLength = ctx.options.doubleQuotedMinMultiLineLength;
  const indent = ctx.indent || (containsDocumentMarker(value) ? "  " : "");
  let str = "";
  let start = 0;
  for (let i = 0, ch = json[i]; ch; ch = json[++i]) {
    if (ch === " " && json[i + 1] === "\\" && json[i + 2] === "n") {
      str += json.slice(start, i) + "\\ ";
      i += 1;
      start = i;
      ch = "\\";
    }
    if (ch === "\\")
      switch (json[i + 1]) {
        case "u":
          {
            str += json.slice(start, i);
            const code = json.substr(i + 2, 4);
            switch (code) {
              case "0000":
                str += "\\0";
                break;
              case "0007":
                str += "\\a";
                break;
              case "000b":
                str += "\\v";
                break;
              case "001b":
                str += "\\e";
                break;
              case "0085":
                str += "\\N";
                break;
              case "00a0":
                str += "\\_";
                break;
              case "2028":
                str += "\\L";
                break;
              case "2029":
                str += "\\P";
                break;
              default:
                if (code.substr(0, 2) === "00")
                  str += "\\x" + code.substr(2);
                else
                  str += json.substr(i, 6);
            }
            i += 5;
            start = i + 1;
          }
          break;
        case "n":
          if (implicitKey || json[i + 2] === '"' || json.length < minMultiLineLength) {
            i += 1;
          } else {
            str += json.slice(start, i) + "\n\n";
            while (json[i + 2] === "\\" && json[i + 3] === "n" && json[i + 4] !== '"') {
              str += "\n";
              i += 2;
            }
            str += indent;
            if (json[i + 2] === " ")
              str += "\\";
            i += 1;
            start = i + 1;
          }
          break;
        default:
          i += 1;
      }
  }
  str = start ? str + json.slice(start) : json;
  return implicitKey ? str : foldFlowLines(str, indent, FOLD_QUOTED, getFoldOptions(ctx, false));
}
function singleQuotedString(value, ctx) {
  if (ctx.options.singleQuote === false || ctx.implicitKey && value.includes("\n") || /[ \t]\n|\n[ \t]/.test(value))
    return doubleQuotedString(value, ctx);
  const indent = ctx.indent || (containsDocumentMarker(value) ? "  " : "");
  const res = "'" + value.replace(/'/g, "''").replace(/\n+/g, `$&
${indent}`) + "'";
  return ctx.implicitKey ? res : foldFlowLines(res, indent, FOLD_FLOW, getFoldOptions(ctx, false));
}
function quotedString(value, ctx) {
  const { singleQuote } = ctx.options;
  let qs;
  if (singleQuote === false)
    qs = doubleQuotedString;
  else {
    const hasDouble = value.includes('"');
    const hasSingle = value.includes("'");
    if (hasDouble && !hasSingle)
      qs = singleQuotedString;
    else if (hasSingle && !hasDouble)
      qs = doubleQuotedString;
    else
      qs = singleQuote ? singleQuotedString : doubleQuotedString;
  }
  return qs(value, ctx);
}
var blockEndNewlines;
try {
  blockEndNewlines = new RegExp("(^|(?<!\n))\n+(?!\n|$)", "g");
} catch {
  blockEndNewlines = /\n+(?!\n|$)/g;
}
function blockString({ comment, type, value }, ctx, onComment, onChompKeep) {
  const { blockQuote, commentString, lineWidth } = ctx.options;
  if (!blockQuote || /\n[\t ]+$/.test(value)) {
    return quotedString(value, ctx);
  }
  const indent = ctx.indent || (ctx.forceBlockIndent || containsDocumentMarker(value) ? "  " : "");
  const literal = blockQuote === "literal" ? true : blockQuote === "folded" || type === Scalar.BLOCK_FOLDED ? false : type === Scalar.BLOCK_LITERAL ? true : !lineLengthOverLimit(value, lineWidth, indent.length);
  if (!value)
    return literal ? "|\n" : ">\n";
  let chomp;
  let endStart;
  for (endStart = value.length; endStart > 0; --endStart) {
    const ch = value[endStart - 1];
    if (ch !== "\n" && ch !== "	" && ch !== " ")
      break;
  }
  let end = value.substring(endStart);
  const endNlPos = end.indexOf("\n");
  if (endNlPos === -1) {
    chomp = "-";
  } else if (value === end || endNlPos !== end.length - 1) {
    chomp = "+";
    if (onChompKeep)
      onChompKeep();
  } else {
    chomp = "";
  }
  if (end) {
    value = value.slice(0, -end.length);
    if (end[end.length - 1] === "\n")
      end = end.slice(0, -1);
    end = end.replace(blockEndNewlines, `$&${indent}`);
  }
  let startWithSpace = false;
  let startEnd;
  let startNlPos = -1;
  for (startEnd = 0; startEnd < value.length; ++startEnd) {
    const ch = value[startEnd];
    if (ch === " ")
      startWithSpace = true;
    else if (ch === "\n")
      startNlPos = startEnd;
    else
      break;
  }
  let start = value.substring(0, startNlPos < startEnd ? startNlPos + 1 : startEnd);
  if (start) {
    value = value.substring(start.length);
    start = start.replace(/\n+/g, `$&${indent}`);
  }
  const indentSize = indent ? "2" : "1";
  let header = (startWithSpace ? indentSize : "") + chomp;
  if (comment) {
    header += " " + commentString(comment.replace(/ ?[\r\n]+/g, " "));
    if (onComment)
      onComment();
  }
  if (!literal) {
    const foldedValue = value.replace(/\n+/g, "\n$&").replace(/(?:^|\n)([\t ].*)(?:([\n\t ]*)\n(?![\n\t ]))?/g, "$1$2").replace(/\n+/g, `$&${indent}`);
    let literalFallback = false;
    const foldOptions = getFoldOptions(ctx, true);
    if (blockQuote !== "folded" && type !== Scalar.BLOCK_FOLDED) {
      foldOptions.onOverflow = () => {
        literalFallback = true;
      };
    }
    const body = foldFlowLines(`${start}${foldedValue}${end}`, indent, FOLD_BLOCK, foldOptions);
    if (!literalFallback)
      return `>${header}
${indent}${body}`;
  }
  value = value.replace(/\n+/g, `$&${indent}`);
  return `|${header}
${indent}${start}${value}${end}`;
}
function plainString(item, ctx, onComment, onChompKeep) {
  const { type, value } = item;
  const { actualString, implicitKey, indent, indentStep, inFlow } = ctx;
  if (implicitKey && value.includes("\n") || inFlow && /[[\]{},]/.test(value)) {
    return quotedString(value, ctx);
  }
  if (/^[\n\t ,[\]{}#&*!|>'"%@`]|^[?-]$|^[?-][ \t]|[\n:][ \t]|[ \t]\n|[\n\t ]#|[\n\t :]$/.test(value)) {
    return implicitKey || inFlow || !value.includes("\n") ? quotedString(value, ctx) : blockString(item, ctx, onComment, onChompKeep);
  }
  if (!implicitKey && !inFlow && type !== Scalar.PLAIN && value.includes("\n")) {
    return blockString(item, ctx, onComment, onChompKeep);
  }
  if (containsDocumentMarker(value)) {
    if (indent === "") {
      ctx.forceBlockIndent = true;
      return blockString(item, ctx, onComment, onChompKeep);
    } else if (implicitKey && indent === indentStep) {
      return quotedString(value, ctx);
    }
  }
  const str = value.replace(/\n+/g, `$&
${indent}`);
  if (actualString) {
    const test = (tag) => {
      var _a;
      return tag.default && tag.tag !== "tag:yaml.org,2002:str" && ((_a = tag.test) == null ? void 0 : _a.test(str));
    };
    const { compat, tags } = ctx.doc.schema;
    if (tags.some(test) || (compat == null ? void 0 : compat.some(test)))
      return quotedString(value, ctx);
  }
  return implicitKey ? str : foldFlowLines(str, indent, FOLD_FLOW, getFoldOptions(ctx, false));
}
function stringifyString(item, ctx, onComment, onChompKeep) {
  const { implicitKey, inFlow } = ctx;
  const ss = typeof item.value === "string" ? item : Object.assign({}, item, { value: String(item.value) });
  let { type } = item;
  if (type !== Scalar.QUOTE_DOUBLE) {
    if (/[\x00-\x08\x0b-\x1f\x7f-\x9f\u{D800}-\u{DFFF}]/u.test(ss.value))
      type = Scalar.QUOTE_DOUBLE;
  }
  const _stringify = (_type) => {
    switch (_type) {
      case Scalar.BLOCK_FOLDED:
      case Scalar.BLOCK_LITERAL:
        return implicitKey || inFlow ? quotedString(ss.value, ctx) : blockString(ss, ctx, onComment, onChompKeep);
      case Scalar.QUOTE_DOUBLE:
        return doubleQuotedString(ss.value, ctx);
      case Scalar.QUOTE_SINGLE:
        return singleQuotedString(ss.value, ctx);
      case Scalar.PLAIN:
        return plainString(ss, ctx, onComment, onChompKeep);
      default:
        return null;
    }
  };
  let res = _stringify(type);
  if (res === null) {
    const { defaultKeyType, defaultStringType } = ctx.options;
    const t = implicitKey && defaultKeyType || defaultStringType;
    res = _stringify(t);
    if (res === null)
      throw new Error(`Unsupported default string type ${t}`);
  }
  return res;
}

// node_modules/yaml/browser/dist/stringify/stringify.js
function createStringifyContext(doc, options) {
  const opt = Object.assign({
    blockQuote: true,
    commentString: stringifyComment,
    defaultKeyType: null,
    defaultStringType: "PLAIN",
    directives: null,
    doubleQuotedAsJSON: false,
    doubleQuotedMinMultiLineLength: 40,
    falseStr: "false",
    flowCollectionPadding: true,
    indentSeq: true,
    lineWidth: 80,
    minContentWidth: 20,
    nullStr: "null",
    simpleKeys: false,
    singleQuote: null,
    trueStr: "true",
    verifyAliasOrder: true
  }, doc.schema.toStringOptions, options);
  let inFlow;
  switch (opt.collectionStyle) {
    case "block":
      inFlow = false;
      break;
    case "flow":
      inFlow = true;
      break;
    default:
      inFlow = null;
  }
  return {
    anchors: /* @__PURE__ */ new Set(),
    doc,
    flowCollectionPadding: opt.flowCollectionPadding ? " " : "",
    indent: "",
    indentStep: typeof opt.indent === "number" ? " ".repeat(opt.indent) : "  ",
    inFlow,
    options: opt
  };
}
function getTagObject(tags, item) {
  var _a;
  if (item.tag) {
    const match = tags.filter((t) => t.tag === item.tag);
    if (match.length > 0)
      return match.find((t) => t.format === item.format) ?? match[0];
  }
  let tagObj = void 0;
  let obj;
  if (isScalar(item)) {
    obj = item.value;
    let match = tags.filter((t) => {
      var _a2;
      return (_a2 = t.identify) == null ? void 0 : _a2.call(t, obj);
    });
    if (match.length > 1) {
      const testMatch = match.filter((t) => t.test);
      if (testMatch.length > 0)
        match = testMatch;
    }
    tagObj = match.find((t) => t.format === item.format) ?? match.find((t) => !t.format);
  } else {
    obj = item;
    tagObj = tags.find((t) => t.nodeClass && obj instanceof t.nodeClass);
  }
  if (!tagObj) {
    const name = ((_a = obj == null ? void 0 : obj.constructor) == null ? void 0 : _a.name) ?? (obj === null ? "null" : typeof obj);
    throw new Error(`Tag not resolved for ${name} value`);
  }
  return tagObj;
}
function stringifyProps(node, tagObj, { anchors, doc }) {
  if (!doc.directives)
    return "";
  const props = [];
  const anchor = (isScalar(node) || isCollection(node)) && node.anchor;
  if (anchor && anchorIsValid(anchor)) {
    anchors.add(anchor);
    props.push(`&${anchor}`);
  }
  const tag = node.tag ?? (tagObj.default ? null : tagObj.tag);
  if (tag)
    props.push(doc.directives.tagString(tag));
  return props.join(" ");
}
function stringify(item, ctx, onComment, onChompKeep) {
  var _a;
  if (isPair(item))
    return item.toString(ctx, onComment, onChompKeep);
  if (isAlias(item)) {
    if (ctx.doc.directives)
      return item.toString(ctx);
    if ((_a = ctx.resolvedAliases) == null ? void 0 : _a.has(item)) {
      throw new TypeError(`Cannot stringify circular structure without alias nodes`);
    } else {
      if (ctx.resolvedAliases)
        ctx.resolvedAliases.add(item);
      else
        ctx.resolvedAliases = /* @__PURE__ */ new Set([item]);
      item = item.resolve(ctx.doc);
    }
  }
  let tagObj = void 0;
  const node = isNode(item) ? item : ctx.doc.createNode(item, { onTagObj: (o) => tagObj = o });
  tagObj ?? (tagObj = getTagObject(ctx.doc.schema.tags, node));
  const props = stringifyProps(node, tagObj, ctx);
  if (props.length > 0)
    ctx.indentAtStart = (ctx.indentAtStart ?? 0) + props.length + 1;
  const str = typeof tagObj.stringify === "function" ? tagObj.stringify(node, ctx, onComment, onChompKeep) : isScalar(node) ? stringifyString(node, ctx, onComment, onChompKeep) : node.toString(ctx, onComment, onChompKeep);
  if (!props)
    return str;
  return isScalar(node) || str[0] === "{" || str[0] === "[" ? `${props} ${str}` : `${props}
${ctx.indent}${str}`;
}

// node_modules/yaml/browser/dist/stringify/stringifyPair.js
function stringifyPair({ key, value }, ctx, onComment, onChompKeep) {
  const { allNullValues, doc, indent, indentStep, options: { commentString, indentSeq, simpleKeys } } = ctx;
  let keyComment = isNode(key) && key.comment || null;
  if (simpleKeys) {
    if (keyComment) {
      throw new Error("With simple keys, key nodes cannot have comments");
    }
    if (isCollection(key) || !isNode(key) && typeof key === "object") {
      const msg = "With simple keys, collection cannot be used as a key value";
      throw new Error(msg);
    }
  }
  let explicitKey = !simpleKeys && (!key || keyComment && value == null && !ctx.inFlow || isCollection(key) || (isScalar(key) ? key.type === Scalar.BLOCK_FOLDED || key.type === Scalar.BLOCK_LITERAL : typeof key === "object"));
  ctx = Object.assign({}, ctx, {
    allNullValues: false,
    implicitKey: !explicitKey && (simpleKeys || !allNullValues),
    indent: indent + indentStep
  });
  let keyCommentDone = false;
  let chompKeep = false;
  let str = stringify(key, ctx, () => keyCommentDone = true, () => chompKeep = true);
  if (!explicitKey && !ctx.inFlow && str.length > 1024) {
    if (simpleKeys)
      throw new Error("With simple keys, single line scalar must not span more than 1024 characters");
    explicitKey = true;
  }
  if (ctx.inFlow) {
    if (allNullValues || value == null) {
      if (keyCommentDone && onComment)
        onComment();
      return str === "" ? "?" : explicitKey ? `? ${str}` : str;
    }
  } else if (allNullValues && !simpleKeys || value == null && explicitKey) {
    str = `? ${str}`;
    if (keyComment && !keyCommentDone) {
      str += lineComment(str, ctx.indent, commentString(keyComment));
    } else if (chompKeep && onChompKeep)
      onChompKeep();
    return str;
  }
  if (keyCommentDone)
    keyComment = null;
  if (explicitKey) {
    if (keyComment)
      str += lineComment(str, ctx.indent, commentString(keyComment));
    str = `? ${str}
${indent}:`;
  } else {
    str = `${str}:`;
    if (keyComment)
      str += lineComment(str, ctx.indent, commentString(keyComment));
  }
  let vsb, vcb, valueComment;
  if (isNode(value)) {
    vsb = !!value.spaceBefore;
    vcb = value.commentBefore;
    valueComment = value.comment;
  } else {
    vsb = false;
    vcb = null;
    valueComment = null;
    if (value && typeof value === "object")
      value = doc.createNode(value);
  }
  ctx.implicitKey = false;
  if (!explicitKey && !keyComment && isScalar(value))
    ctx.indentAtStart = str.length + 1;
  chompKeep = false;
  if (!indentSeq && indentStep.length >= 2 && !ctx.inFlow && !explicitKey && isSeq(value) && !value.flow && !value.tag && !value.anchor) {
    ctx.indent = ctx.indent.substring(2);
  }
  let valueCommentDone = false;
  const valueStr = stringify(value, ctx, () => valueCommentDone = true, () => chompKeep = true);
  let ws = " ";
  if (keyComment || vsb || vcb) {
    ws = vsb ? "\n" : "";
    if (vcb) {
      const cs = commentString(vcb);
      ws += `
${indentComment(cs, ctx.indent)}`;
    }
    if (valueStr === "" && !ctx.inFlow) {
      if (ws === "\n")
        ws = "\n\n";
    } else {
      ws += `
${ctx.indent}`;
    }
  } else if (!explicitKey && isCollection(value)) {
    const vs0 = valueStr[0];
    const nl0 = valueStr.indexOf("\n");
    const hasNewline = nl0 !== -1;
    const flow = ctx.inFlow ?? value.flow ?? value.items.length === 0;
    if (hasNewline || !flow) {
      let hasPropsLine = false;
      if (hasNewline && (vs0 === "&" || vs0 === "!")) {
        let sp0 = valueStr.indexOf(" ");
        if (vs0 === "&" && sp0 !== -1 && sp0 < nl0 && valueStr[sp0 + 1] === "!") {
          sp0 = valueStr.indexOf(" ", sp0 + 1);
        }
        if (sp0 === -1 || nl0 < sp0)
          hasPropsLine = true;
      }
      if (!hasPropsLine)
        ws = `
${ctx.indent}`;
    }
  } else if (valueStr === "" || valueStr[0] === "\n") {
    ws = "";
  }
  str += ws + valueStr;
  if (ctx.inFlow) {
    if (valueCommentDone && onComment)
      onComment();
  } else if (valueComment && !valueCommentDone) {
    str += lineComment(str, ctx.indent, commentString(valueComment));
  } else if (chompKeep && onChompKeep) {
    onChompKeep();
  }
  return str;
}

// node_modules/yaml/browser/dist/log.js
function warn(logLevel, warning) {
  if (logLevel === "debug" || logLevel === "warn") {
    console.warn(warning);
  }
}

// node_modules/yaml/browser/dist/schema/yaml-1.1/merge.js
var MERGE_KEY = "<<";
var merge = {
  identify: (value) => value === MERGE_KEY || typeof value === "symbol" && value.description === MERGE_KEY,
  default: "key",
  tag: "tag:yaml.org,2002:merge",
  test: /^<<$/,
  resolve: () => Object.assign(new Scalar(Symbol(MERGE_KEY)), {
    addToJSMap: addMergeToJSMap
  }),
  stringify: () => MERGE_KEY
};
var isMergeKey = (ctx, key) => (merge.identify(key) || isScalar(key) && (!key.type || key.type === Scalar.PLAIN) && merge.identify(key.value)) && (ctx == null ? void 0 : ctx.doc.schema.tags.some((tag) => tag.tag === merge.tag && tag.default));
function addMergeToJSMap(ctx, map2, value) {
  value = ctx && isAlias(value) ? value.resolve(ctx.doc) : value;
  if (isSeq(value))
    for (const it of value.items)
      mergeValue(ctx, map2, it);
  else if (Array.isArray(value))
    for (const it of value)
      mergeValue(ctx, map2, it);
  else
    mergeValue(ctx, map2, value);
}
function mergeValue(ctx, map2, value) {
  const source = ctx && isAlias(value) ? value.resolve(ctx.doc) : value;
  if (!isMap(source))
    throw new Error("Merge sources must be maps or map aliases");
  const srcMap = source.toJSON(null, ctx, Map);
  for (const [key, value2] of srcMap) {
    if (map2 instanceof Map) {
      if (!map2.has(key))
        map2.set(key, value2);
    } else if (map2 instanceof Set) {
      map2.add(key);
    } else if (!Object.prototype.hasOwnProperty.call(map2, key)) {
      Object.defineProperty(map2, key, {
        value: value2,
        writable: true,
        enumerable: true,
        configurable: true
      });
    }
  }
  return map2;
}

// node_modules/yaml/browser/dist/nodes/addPairToJSMap.js
function addPairToJSMap(ctx, map2, { key, value }) {
  if (isNode(key) && key.addToJSMap)
    key.addToJSMap(ctx, map2, value);
  else if (isMergeKey(ctx, key))
    addMergeToJSMap(ctx, map2, value);
  else {
    const jsKey = toJS(key, "", ctx);
    if (map2 instanceof Map) {
      map2.set(jsKey, toJS(value, jsKey, ctx));
    } else if (map2 instanceof Set) {
      map2.add(jsKey);
    } else {
      const stringKey = stringifyKey(key, jsKey, ctx);
      const jsValue = toJS(value, stringKey, ctx);
      if (stringKey in map2)
        Object.defineProperty(map2, stringKey, {
          value: jsValue,
          writable: true,
          enumerable: true,
          configurable: true
        });
      else
        map2[stringKey] = jsValue;
    }
  }
  return map2;
}
function stringifyKey(key, jsKey, ctx) {
  if (jsKey === null)
    return "";
  if (typeof jsKey !== "object")
    return String(jsKey);
  if (isNode(key) && (ctx == null ? void 0 : ctx.doc)) {
    const strCtx = createStringifyContext(ctx.doc, {});
    strCtx.anchors = /* @__PURE__ */ new Set();
    for (const node of ctx.anchors.keys())
      strCtx.anchors.add(node.anchor);
    strCtx.inFlow = true;
    strCtx.inStringifyKey = true;
    const strKey = key.toString(strCtx);
    if (!ctx.mapKeyWarned) {
      let jsonStr = JSON.stringify(strKey);
      if (jsonStr.length > 40)
        jsonStr = jsonStr.substring(0, 36) + '..."';
      warn(ctx.doc.options.logLevel, `Keys with collection values will be stringified due to JS Object restrictions: ${jsonStr}. Set mapAsMap: true to use object keys.`);
      ctx.mapKeyWarned = true;
    }
    return strKey;
  }
  return JSON.stringify(jsKey);
}

// node_modules/yaml/browser/dist/nodes/Pair.js
function createPair(key, value, ctx) {
  const k = createNode(key, void 0, ctx);
  const v = createNode(value, void 0, ctx);
  return new Pair(k, v);
}
var Pair = class _Pair {
  constructor(key, value = null) {
    Object.defineProperty(this, NODE_TYPE, { value: PAIR });
    this.key = key;
    this.value = value;
  }
  clone(schema4) {
    let { key, value } = this;
    if (isNode(key))
      key = key.clone(schema4);
    if (isNode(value))
      value = value.clone(schema4);
    return new _Pair(key, value);
  }
  toJSON(_, ctx) {
    const pair = (ctx == null ? void 0 : ctx.mapAsMap) ? /* @__PURE__ */ new Map() : {};
    return addPairToJSMap(ctx, pair, this);
  }
  toString(ctx, onComment, onChompKeep) {
    return (ctx == null ? void 0 : ctx.doc) ? stringifyPair(this, ctx, onComment, onChompKeep) : JSON.stringify(this);
  }
};

// node_modules/yaml/browser/dist/stringify/stringifyCollection.js
function stringifyCollection(collection, ctx, options) {
  const flow = ctx.inFlow ?? collection.flow;
  const stringify4 = flow ? stringifyFlowCollection : stringifyBlockCollection;
  return stringify4(collection, ctx, options);
}
function stringifyBlockCollection({ comment, items }, ctx, { blockItemPrefix, flowChars, itemIndent, onChompKeep, onComment }) {
  const { indent, options: { commentString } } = ctx;
  const itemCtx = Object.assign({}, ctx, { indent: itemIndent, type: null });
  let chompKeep = false;
  const lines = [];
  for (let i = 0; i < items.length; ++i) {
    const item = items[i];
    let comment2 = null;
    if (isNode(item)) {
      if (!chompKeep && item.spaceBefore)
        lines.push("");
      addCommentBefore(ctx, lines, item.commentBefore, chompKeep);
      if (item.comment)
        comment2 = item.comment;
    } else if (isPair(item)) {
      const ik = isNode(item.key) ? item.key : null;
      if (ik) {
        if (!chompKeep && ik.spaceBefore)
          lines.push("");
        addCommentBefore(ctx, lines, ik.commentBefore, chompKeep);
      }
    }
    chompKeep = false;
    let str2 = stringify(item, itemCtx, () => comment2 = null, () => chompKeep = true);
    if (comment2)
      str2 += lineComment(str2, itemIndent, commentString(comment2));
    if (chompKeep && comment2)
      chompKeep = false;
    lines.push(blockItemPrefix + str2);
  }
  let str;
  if (lines.length === 0) {
    str = flowChars.start + flowChars.end;
  } else {
    str = lines[0];
    for (let i = 1; i < lines.length; ++i) {
      const line = lines[i];
      str += line ? `
${indent}${line}` : "\n";
    }
  }
  if (comment) {
    str += "\n" + indentComment(commentString(comment), indent);
    if (onComment)
      onComment();
  } else if (chompKeep && onChompKeep)
    onChompKeep();
  return str;
}
function stringifyFlowCollection({ items }, ctx, { flowChars, itemIndent }) {
  const { indent, indentStep, flowCollectionPadding: fcPadding, options: { commentString } } = ctx;
  itemIndent += indentStep;
  const itemCtx = Object.assign({}, ctx, {
    indent: itemIndent,
    inFlow: true,
    type: null
  });
  let reqNewline = false;
  let linesAtValue = 0;
  const lines = [];
  for (let i = 0; i < items.length; ++i) {
    const item = items[i];
    let comment = null;
    if (isNode(item)) {
      if (item.spaceBefore)
        lines.push("");
      addCommentBefore(ctx, lines, item.commentBefore, false);
      if (item.comment)
        comment = item.comment;
    } else if (isPair(item)) {
      const ik = isNode(item.key) ? item.key : null;
      if (ik) {
        if (ik.spaceBefore)
          lines.push("");
        addCommentBefore(ctx, lines, ik.commentBefore, false);
        if (ik.comment)
          reqNewline = true;
      }
      const iv = isNode(item.value) ? item.value : null;
      if (iv) {
        if (iv.comment)
          comment = iv.comment;
        if (iv.commentBefore)
          reqNewline = true;
      } else if (item.value == null && (ik == null ? void 0 : ik.comment)) {
        comment = ik.comment;
      }
    }
    if (comment)
      reqNewline = true;
    let str = stringify(item, itemCtx, () => comment = null);
    if (i < items.length - 1)
      str += ",";
    if (comment)
      str += lineComment(str, itemIndent, commentString(comment));
    if (!reqNewline && (lines.length > linesAtValue || str.includes("\n")))
      reqNewline = true;
    lines.push(str);
    linesAtValue = lines.length;
  }
  const { start, end } = flowChars;
  if (lines.length === 0) {
    return start + end;
  } else {
    if (!reqNewline) {
      const len = lines.reduce((sum, line) => sum + line.length + 2, 2);
      reqNewline = ctx.options.lineWidth > 0 && len > ctx.options.lineWidth;
    }
    if (reqNewline) {
      let str = start;
      for (const line of lines)
        str += line ? `
${indentStep}${indent}${line}` : "\n";
      return `${str}
${indent}${end}`;
    } else {
      return `${start}${fcPadding}${lines.join(" ")}${fcPadding}${end}`;
    }
  }
}
function addCommentBefore({ indent, options: { commentString } }, lines, comment, chompKeep) {
  if (comment && chompKeep)
    comment = comment.replace(/^\n+/, "");
  if (comment) {
    const ic = indentComment(commentString(comment), indent);
    lines.push(ic.trimStart());
  }
}

// node_modules/yaml/browser/dist/nodes/YAMLMap.js
function findPair(items, key) {
  const k = isScalar(key) ? key.value : key;
  for (const it of items) {
    if (isPair(it)) {
      if (it.key === key || it.key === k)
        return it;
      if (isScalar(it.key) && it.key.value === k)
        return it;
    }
  }
  return void 0;
}
var YAMLMap = class extends Collection {
  static get tagName() {
    return "tag:yaml.org,2002:map";
  }
  constructor(schema4) {
    super(MAP, schema4);
    this.items = [];
  }
  /**
   * A generic collection parsing method that can be extended
   * to other node classes that inherit from YAMLMap
   */
  static from(schema4, obj, ctx) {
    const { keepUndefined, replacer } = ctx;
    const map2 = new this(schema4);
    const add = (key, value) => {
      if (typeof replacer === "function")
        value = replacer.call(obj, key, value);
      else if (Array.isArray(replacer) && !replacer.includes(key))
        return;
      if (value !== void 0 || keepUndefined)
        map2.items.push(createPair(key, value, ctx));
    };
    if (obj instanceof Map) {
      for (const [key, value] of obj)
        add(key, value);
    } else if (obj && typeof obj === "object") {
      for (const key of Object.keys(obj))
        add(key, obj[key]);
    }
    if (typeof schema4.sortMapEntries === "function") {
      map2.items.sort(schema4.sortMapEntries);
    }
    return map2;
  }
  /**
   * Adds a value to the collection.
   *
   * @param overwrite - If not set `true`, using a key that is already in the
   *   collection will throw. Otherwise, overwrites the previous value.
   */
  add(pair, overwrite) {
    var _a;
    let _pair;
    if (isPair(pair))
      _pair = pair;
    else if (!pair || typeof pair !== "object" || !("key" in pair)) {
      _pair = new Pair(pair, pair == null ? void 0 : pair.value);
    } else
      _pair = new Pair(pair.key, pair.value);
    const prev = findPair(this.items, _pair.key);
    const sortEntries = (_a = this.schema) == null ? void 0 : _a.sortMapEntries;
    if (prev) {
      if (!overwrite)
        throw new Error(`Key ${_pair.key} already set`);
      if (isScalar(prev.value) && isScalarValue(_pair.value))
        prev.value.value = _pair.value;
      else
        prev.value = _pair.value;
    } else if (sortEntries) {
      const i = this.items.findIndex((item) => sortEntries(_pair, item) < 0);
      if (i === -1)
        this.items.push(_pair);
      else
        this.items.splice(i, 0, _pair);
    } else {
      this.items.push(_pair);
    }
  }
  delete(key) {
    const it = findPair(this.items, key);
    if (!it)
      return false;
    const del = this.items.splice(this.items.indexOf(it), 1);
    return del.length > 0;
  }
  get(key, keepScalar) {
    const it = findPair(this.items, key);
    const node = it == null ? void 0 : it.value;
    return (!keepScalar && isScalar(node) ? node.value : node) ?? void 0;
  }
  has(key) {
    return !!findPair(this.items, key);
  }
  set(key, value) {
    this.add(new Pair(key, value), true);
  }
  /**
   * @param ctx - Conversion context, originally set in Document#toJS()
   * @param {Class} Type - If set, forces the returned collection type
   * @returns Instance of Type, Map, or Object
   */
  toJSON(_, ctx, Type) {
    const map2 = Type ? new Type() : (ctx == null ? void 0 : ctx.mapAsMap) ? /* @__PURE__ */ new Map() : {};
    if (ctx == null ? void 0 : ctx.onCreate)
      ctx.onCreate(map2);
    for (const item of this.items)
      addPairToJSMap(ctx, map2, item);
    return map2;
  }
  toString(ctx, onComment, onChompKeep) {
    if (!ctx)
      return JSON.stringify(this);
    for (const item of this.items) {
      if (!isPair(item))
        throw new Error(`Map items must all be pairs; found ${JSON.stringify(item)} instead`);
    }
    if (!ctx.allNullValues && this.hasAllNullValues(false))
      ctx = Object.assign({}, ctx, { allNullValues: true });
    return stringifyCollection(this, ctx, {
      blockItemPrefix: "",
      flowChars: { start: "{", end: "}" },
      itemIndent: ctx.indent || "",
      onChompKeep,
      onComment
    });
  }
};

// node_modules/yaml/browser/dist/schema/common/map.js
var map = {
  collection: "map",
  default: true,
  nodeClass: YAMLMap,
  tag: "tag:yaml.org,2002:map",
  resolve(map2, onError) {
    if (!isMap(map2))
      onError("Expected a mapping for this tag");
    return map2;
  },
  createNode: (schema4, obj, ctx) => YAMLMap.from(schema4, obj, ctx)
};

// node_modules/yaml/browser/dist/nodes/YAMLSeq.js
var YAMLSeq = class extends Collection {
  static get tagName() {
    return "tag:yaml.org,2002:seq";
  }
  constructor(schema4) {
    super(SEQ, schema4);
    this.items = [];
  }
  add(value) {
    this.items.push(value);
  }
  /**
   * Removes a value from the collection.
   *
   * `key` must contain a representation of an integer for this to succeed.
   * It may be wrapped in a `Scalar`.
   *
   * @returns `true` if the item was found and removed.
   */
  delete(key) {
    const idx = asItemIndex(key);
    if (typeof idx !== "number")
      return false;
    const del = this.items.splice(idx, 1);
    return del.length > 0;
  }
  get(key, keepScalar) {
    const idx = asItemIndex(key);
    if (typeof idx !== "number")
      return void 0;
    const it = this.items[idx];
    return !keepScalar && isScalar(it) ? it.value : it;
  }
  /**
   * Checks if the collection includes a value with the key `key`.
   *
   * `key` must contain a representation of an integer for this to succeed.
   * It may be wrapped in a `Scalar`.
   */
  has(key) {
    const idx = asItemIndex(key);
    return typeof idx === "number" && idx < this.items.length;
  }
  /**
   * Sets a value in this collection. For `!!set`, `value` needs to be a
   * boolean to add/remove the item from the set.
   *
   * If `key` does not contain a representation of an integer, this will throw.
   * It may be wrapped in a `Scalar`.
   */
  set(key, value) {
    const idx = asItemIndex(key);
    if (typeof idx !== "number")
      throw new Error(`Expected a valid index, not ${key}.`);
    const prev = this.items[idx];
    if (isScalar(prev) && isScalarValue(value))
      prev.value = value;
    else
      this.items[idx] = value;
  }
  toJSON(_, ctx) {
    const seq2 = [];
    if (ctx == null ? void 0 : ctx.onCreate)
      ctx.onCreate(seq2);
    let i = 0;
    for (const item of this.items)
      seq2.push(toJS(item, String(i++), ctx));
    return seq2;
  }
  toString(ctx, onComment, onChompKeep) {
    if (!ctx)
      return JSON.stringify(this);
    return stringifyCollection(this, ctx, {
      blockItemPrefix: "- ",
      flowChars: { start: "[", end: "]" },
      itemIndent: (ctx.indent || "") + "  ",
      onChompKeep,
      onComment
    });
  }
  static from(schema4, obj, ctx) {
    const { replacer } = ctx;
    const seq2 = new this(schema4);
    if (obj && Symbol.iterator in Object(obj)) {
      let i = 0;
      for (let it of obj) {
        if (typeof replacer === "function") {
          const key = obj instanceof Set ? it : String(i++);
          it = replacer.call(obj, key, it);
        }
        seq2.items.push(createNode(it, void 0, ctx));
      }
    }
    return seq2;
  }
};
function asItemIndex(key) {
  let idx = isScalar(key) ? key.value : key;
  if (idx && typeof idx === "string")
    idx = Number(idx);
  return typeof idx === "number" && Number.isInteger(idx) && idx >= 0 ? idx : null;
}

// node_modules/yaml/browser/dist/schema/common/seq.js
var seq = {
  collection: "seq",
  default: true,
  nodeClass: YAMLSeq,
  tag: "tag:yaml.org,2002:seq",
  resolve(seq2, onError) {
    if (!isSeq(seq2))
      onError("Expected a sequence for this tag");
    return seq2;
  },
  createNode: (schema4, obj, ctx) => YAMLSeq.from(schema4, obj, ctx)
};

// node_modules/yaml/browser/dist/schema/common/string.js
var string = {
  identify: (value) => typeof value === "string",
  default: true,
  tag: "tag:yaml.org,2002:str",
  resolve: (str) => str,
  stringify(item, ctx, onComment, onChompKeep) {
    ctx = Object.assign({ actualString: true }, ctx);
    return stringifyString(item, ctx, onComment, onChompKeep);
  }
};

// node_modules/yaml/browser/dist/schema/common/null.js
var nullTag = {
  identify: (value) => value == null,
  createNode: () => new Scalar(null),
  default: true,
  tag: "tag:yaml.org,2002:null",
  test: /^(?:~|[Nn]ull|NULL)?$/,
  resolve: () => new Scalar(null),
  stringify: ({ source }, ctx) => typeof source === "string" && nullTag.test.test(source) ? source : ctx.options.nullStr
};

// node_modules/yaml/browser/dist/schema/core/bool.js
var boolTag = {
  identify: (value) => typeof value === "boolean",
  default: true,
  tag: "tag:yaml.org,2002:bool",
  test: /^(?:[Tt]rue|TRUE|[Ff]alse|FALSE)$/,
  resolve: (str) => new Scalar(str[0] === "t" || str[0] === "T"),
  stringify({ source, value }, ctx) {
    if (source && boolTag.test.test(source)) {
      const sv = source[0] === "t" || source[0] === "T";
      if (value === sv)
        return source;
    }
    return value ? ctx.options.trueStr : ctx.options.falseStr;
  }
};

// node_modules/yaml/browser/dist/stringify/stringifyNumber.js
function stringifyNumber({ format, minFractionDigits, tag, value }) {
  if (typeof value === "bigint")
    return String(value);
  const num = typeof value === "number" ? value : Number(value);
  if (!isFinite(num))
    return isNaN(num) ? ".nan" : num < 0 ? "-.inf" : ".inf";
  let n = JSON.stringify(value);
  if (!format && minFractionDigits && (!tag || tag === "tag:yaml.org,2002:float") && /^\d/.test(n)) {
    let i = n.indexOf(".");
    if (i < 0) {
      i = n.length;
      n += ".";
    }
    let d = minFractionDigits - (n.length - i - 1);
    while (d-- > 0)
      n += "0";
  }
  return n;
}

// node_modules/yaml/browser/dist/schema/core/float.js
var floatNaN = {
  identify: (value) => typeof value === "number",
  default: true,
  tag: "tag:yaml.org,2002:float",
  test: /^(?:[-+]?\.(?:inf|Inf|INF)|\.nan|\.NaN|\.NAN)$/,
  resolve: (str) => str.slice(-3).toLowerCase() === "nan" ? NaN : str[0] === "-" ? Number.NEGATIVE_INFINITY : Number.POSITIVE_INFINITY,
  stringify: stringifyNumber
};
var floatExp = {
  identify: (value) => typeof value === "number",
  default: true,
  tag: "tag:yaml.org,2002:float",
  format: "EXP",
  test: /^[-+]?(?:\.[0-9]+|[0-9]+(?:\.[0-9]*)?)[eE][-+]?[0-9]+$/,
  resolve: (str) => parseFloat(str),
  stringify(node) {
    const num = Number(node.value);
    return isFinite(num) ? num.toExponential() : stringifyNumber(node);
  }
};
var float = {
  identify: (value) => typeof value === "number",
  default: true,
  tag: "tag:yaml.org,2002:float",
  test: /^[-+]?(?:\.[0-9]+|[0-9]+\.[0-9]*)$/,
  resolve(str) {
    const node = new Scalar(parseFloat(str));
    const dot = str.indexOf(".");
    if (dot !== -1 && str[str.length - 1] === "0")
      node.minFractionDigits = str.length - dot - 1;
    return node;
  },
  stringify: stringifyNumber
};

// node_modules/yaml/browser/dist/schema/core/int.js
var intIdentify = (value) => typeof value === "bigint" || Number.isInteger(value);
var intResolve = (str, offset, radix, { intAsBigInt }) => intAsBigInt ? BigInt(str) : parseInt(str.substring(offset), radix);
function intStringify(node, radix, prefix) {
  const { value } = node;
  if (intIdentify(value) && value >= 0)
    return prefix + value.toString(radix);
  return stringifyNumber(node);
}
var intOct = {
  identify: (value) => intIdentify(value) && value >= 0,
  default: true,
  tag: "tag:yaml.org,2002:int",
  format: "OCT",
  test: /^0o[0-7]+$/,
  resolve: (str, _onError, opt) => intResolve(str, 2, 8, opt),
  stringify: (node) => intStringify(node, 8, "0o")
};
var int = {
  identify: intIdentify,
  default: true,
  tag: "tag:yaml.org,2002:int",
  test: /^[-+]?[0-9]+$/,
  resolve: (str, _onError, opt) => intResolve(str, 0, 10, opt),
  stringify: stringifyNumber
};
var intHex = {
  identify: (value) => intIdentify(value) && value >= 0,
  default: true,
  tag: "tag:yaml.org,2002:int",
  format: "HEX",
  test: /^0x[0-9a-fA-F]+$/,
  resolve: (str, _onError, opt) => intResolve(str, 2, 16, opt),
  stringify: (node) => intStringify(node, 16, "0x")
};

// node_modules/yaml/browser/dist/schema/core/schema.js
var schema = [
  map,
  seq,
  string,
  nullTag,
  boolTag,
  intOct,
  int,
  intHex,
  floatNaN,
  floatExp,
  float
];

// node_modules/yaml/browser/dist/schema/json/schema.js
function intIdentify2(value) {
  return typeof value === "bigint" || Number.isInteger(value);
}
var stringifyJSON = ({ value }) => JSON.stringify(value);
var jsonScalars = [
  {
    identify: (value) => typeof value === "string",
    default: true,
    tag: "tag:yaml.org,2002:str",
    resolve: (str) => str,
    stringify: stringifyJSON
  },
  {
    identify: (value) => value == null,
    createNode: () => new Scalar(null),
    default: true,
    tag: "tag:yaml.org,2002:null",
    test: /^null$/,
    resolve: () => null,
    stringify: stringifyJSON
  },
  {
    identify: (value) => typeof value === "boolean",
    default: true,
    tag: "tag:yaml.org,2002:bool",
    test: /^true$|^false$/,
    resolve: (str) => str === "true",
    stringify: stringifyJSON
  },
  {
    identify: intIdentify2,
    default: true,
    tag: "tag:yaml.org,2002:int",
    test: /^-?(?:0|[1-9][0-9]*)$/,
    resolve: (str, _onError, { intAsBigInt }) => intAsBigInt ? BigInt(str) : parseInt(str, 10),
    stringify: ({ value }) => intIdentify2(value) ? value.toString() : JSON.stringify(value)
  },
  {
    identify: (value) => typeof value === "number",
    default: true,
    tag: "tag:yaml.org,2002:float",
    test: /^-?(?:0|[1-9][0-9]*)(?:\.[0-9]*)?(?:[eE][-+]?[0-9]+)?$/,
    resolve: (str) => parseFloat(str),
    stringify: stringifyJSON
  }
];
var jsonError = {
  default: true,
  tag: "",
  test: /^/,
  resolve(str, onError) {
    onError(`Unresolved plain scalar ${JSON.stringify(str)}`);
    return str;
  }
};
var schema2 = [map, seq].concat(jsonScalars, jsonError);

// node_modules/yaml/browser/dist/schema/yaml-1.1/binary.js
var binary = {
  identify: (value) => value instanceof Uint8Array,
  // Buffer inherits from Uint8Array
  default: false,
  tag: "tag:yaml.org,2002:binary",
  /**
   * Returns a Buffer in node and an Uint8Array in browsers
   *
   * To use the resulting buffer as an image, you'll want to do something like:
   *
   *   const blob = new Blob([buffer], { type: 'image/jpeg' })
   *   document.querySelector('#photo').src = URL.createObjectURL(blob)
   */
  resolve(src, onError) {
    if (typeof atob === "function") {
      const str = atob(src.replace(/[\n\r]/g, ""));
      const buffer = new Uint8Array(str.length);
      for (let i = 0; i < str.length; ++i)
        buffer[i] = str.charCodeAt(i);
      return buffer;
    } else {
      onError("This environment does not support reading binary tags; either Buffer or atob is required");
      return src;
    }
  },
  stringify({ comment, type, value }, ctx, onComment, onChompKeep) {
    if (!value)
      return "";
    const buf = value;
    let str;
    if (typeof btoa === "function") {
      let s = "";
      for (let i = 0; i < buf.length; ++i)
        s += String.fromCharCode(buf[i]);
      str = btoa(s);
    } else {
      throw new Error("This environment does not support writing binary tags; either Buffer or btoa is required");
    }
    type ?? (type = Scalar.BLOCK_LITERAL);
    if (type !== Scalar.QUOTE_DOUBLE) {
      const lineWidth = Math.max(ctx.options.lineWidth - ctx.indent.length, ctx.options.minContentWidth);
      const n = Math.ceil(str.length / lineWidth);
      const lines = new Array(n);
      for (let i = 0, o = 0; i < n; ++i, o += lineWidth) {
        lines[i] = str.substr(o, lineWidth);
      }
      str = lines.join(type === Scalar.BLOCK_LITERAL ? "\n" : " ");
    }
    return stringifyString({ comment, type, value: str }, ctx, onComment, onChompKeep);
  }
};

// node_modules/yaml/browser/dist/schema/yaml-1.1/pairs.js
function resolvePairs(seq2, onError) {
  if (isSeq(seq2)) {
    for (let i = 0; i < seq2.items.length; ++i) {
      let item = seq2.items[i];
      if (isPair(item))
        continue;
      else if (isMap(item)) {
        if (item.items.length > 1)
          onError("Each pair must have its own sequence indicator");
        const pair = item.items[0] || new Pair(new Scalar(null));
        if (item.commentBefore)
          pair.key.commentBefore = pair.key.commentBefore ? `${item.commentBefore}
${pair.key.commentBefore}` : item.commentBefore;
        if (item.comment) {
          const cn = pair.value ?? pair.key;
          cn.comment = cn.comment ? `${item.comment}
${cn.comment}` : item.comment;
        }
        item = pair;
      }
      seq2.items[i] = isPair(item) ? item : new Pair(item);
    }
  } else
    onError("Expected a sequence for this tag");
  return seq2;
}
function createPairs(schema4, iterable, ctx) {
  const { replacer } = ctx;
  const pairs2 = new YAMLSeq(schema4);
  pairs2.tag = "tag:yaml.org,2002:pairs";
  let i = 0;
  if (iterable && Symbol.iterator in Object(iterable))
    for (let it of iterable) {
      if (typeof replacer === "function")
        it = replacer.call(iterable, String(i++), it);
      let key, value;
      if (Array.isArray(it)) {
        if (it.length === 2) {
          key = it[0];
          value = it[1];
        } else
          throw new TypeError(`Expected [key, value] tuple: ${it}`);
      } else if (it && it instanceof Object) {
        const keys = Object.keys(it);
        if (keys.length === 1) {
          key = keys[0];
          value = it[key];
        } else {
          throw new TypeError(`Expected tuple with one key, not ${keys.length} keys`);
        }
      } else {
        key = it;
      }
      pairs2.items.push(createPair(key, value, ctx));
    }
  return pairs2;
}
var pairs = {
  collection: "seq",
  default: false,
  tag: "tag:yaml.org,2002:pairs",
  resolve: resolvePairs,
  createNode: createPairs
};

// node_modules/yaml/browser/dist/schema/yaml-1.1/omap.js
var YAMLOMap = class _YAMLOMap extends YAMLSeq {
  constructor() {
    super();
    this.add = YAMLMap.prototype.add.bind(this);
    this.delete = YAMLMap.prototype.delete.bind(this);
    this.get = YAMLMap.prototype.get.bind(this);
    this.has = YAMLMap.prototype.has.bind(this);
    this.set = YAMLMap.prototype.set.bind(this);
    this.tag = _YAMLOMap.tag;
  }
  /**
   * If `ctx` is given, the return type is actually `Map<unknown, unknown>`,
   * but TypeScript won't allow widening the signature of a child method.
   */
  toJSON(_, ctx) {
    if (!ctx)
      return super.toJSON(_);
    const map2 = /* @__PURE__ */ new Map();
    if (ctx == null ? void 0 : ctx.onCreate)
      ctx.onCreate(map2);
    for (const pair of this.items) {
      let key, value;
      if (isPair(pair)) {
        key = toJS(pair.key, "", ctx);
        value = toJS(pair.value, key, ctx);
      } else {
        key = toJS(pair, "", ctx);
      }
      if (map2.has(key))
        throw new Error("Ordered maps must not include duplicate keys");
      map2.set(key, value);
    }
    return map2;
  }
  static from(schema4, iterable, ctx) {
    const pairs2 = createPairs(schema4, iterable, ctx);
    const omap2 = new this();
    omap2.items = pairs2.items;
    return omap2;
  }
};
YAMLOMap.tag = "tag:yaml.org,2002:omap";
var omap = {
  collection: "seq",
  identify: (value) => value instanceof Map,
  nodeClass: YAMLOMap,
  default: false,
  tag: "tag:yaml.org,2002:omap",
  resolve(seq2, onError) {
    const pairs2 = resolvePairs(seq2, onError);
    const seenKeys = [];
    for (const { key } of pairs2.items) {
      if (isScalar(key)) {
        if (seenKeys.includes(key.value)) {
          onError(`Ordered maps must not include duplicate keys: ${key.value}`);
        } else {
          seenKeys.push(key.value);
        }
      }
    }
    return Object.assign(new YAMLOMap(), pairs2);
  },
  createNode: (schema4, iterable, ctx) => YAMLOMap.from(schema4, iterable, ctx)
};

// node_modules/yaml/browser/dist/schema/yaml-1.1/bool.js
function boolStringify({ value, source }, ctx) {
  const boolObj = value ? trueTag : falseTag;
  if (source && boolObj.test.test(source))
    return source;
  return value ? ctx.options.trueStr : ctx.options.falseStr;
}
var trueTag = {
  identify: (value) => value === true,
  default: true,
  tag: "tag:yaml.org,2002:bool",
  test: /^(?:Y|y|[Yy]es|YES|[Tt]rue|TRUE|[Oo]n|ON)$/,
  resolve: () => new Scalar(true),
  stringify: boolStringify
};
var falseTag = {
  identify: (value) => value === false,
  default: true,
  tag: "tag:yaml.org,2002:bool",
  test: /^(?:N|n|[Nn]o|NO|[Ff]alse|FALSE|[Oo]ff|OFF)$/,
  resolve: () => new Scalar(false),
  stringify: boolStringify
};

// node_modules/yaml/browser/dist/schema/yaml-1.1/float.js
var floatNaN2 = {
  identify: (value) => typeof value === "number",
  default: true,
  tag: "tag:yaml.org,2002:float",
  test: /^(?:[-+]?\.(?:inf|Inf|INF)|\.nan|\.NaN|\.NAN)$/,
  resolve: (str) => str.slice(-3).toLowerCase() === "nan" ? NaN : str[0] === "-" ? Number.NEGATIVE_INFINITY : Number.POSITIVE_INFINITY,
  stringify: stringifyNumber
};
var floatExp2 = {
  identify: (value) => typeof value === "number",
  default: true,
  tag: "tag:yaml.org,2002:float",
  format: "EXP",
  test: /^[-+]?(?:[0-9][0-9_]*)?(?:\.[0-9_]*)?[eE][-+]?[0-9]+$/,
  resolve: (str) => parseFloat(str.replace(/_/g, "")),
  stringify(node) {
    const num = Number(node.value);
    return isFinite(num) ? num.toExponential() : stringifyNumber(node);
  }
};
var float2 = {
  identify: (value) => typeof value === "number",
  default: true,
  tag: "tag:yaml.org,2002:float",
  test: /^[-+]?(?:[0-9][0-9_]*)?\.[0-9_]*$/,
  resolve(str) {
    const node = new Scalar(parseFloat(str.replace(/_/g, "")));
    const dot = str.indexOf(".");
    if (dot !== -1) {
      const f = str.substring(dot + 1).replace(/_/g, "");
      if (f[f.length - 1] === "0")
        node.minFractionDigits = f.length;
    }
    return node;
  },
  stringify: stringifyNumber
};

// node_modules/yaml/browser/dist/schema/yaml-1.1/int.js
var intIdentify3 = (value) => typeof value === "bigint" || Number.isInteger(value);
function intResolve2(str, offset, radix, { intAsBigInt }) {
  const sign = str[0];
  if (sign === "-" || sign === "+")
    offset += 1;
  str = str.substring(offset).replace(/_/g, "");
  if (intAsBigInt) {
    switch (radix) {
      case 2:
        str = `0b${str}`;
        break;
      case 8:
        str = `0o${str}`;
        break;
      case 16:
        str = `0x${str}`;
        break;
    }
    const n2 = BigInt(str);
    return sign === "-" ? BigInt(-1) * n2 : n2;
  }
  const n = parseInt(str, radix);
  return sign === "-" ? -1 * n : n;
}
function intStringify2(node, radix, prefix) {
  const { value } = node;
  if (intIdentify3(value)) {
    const str = value.toString(radix);
    return value < 0 ? "-" + prefix + str.substr(1) : prefix + str;
  }
  return stringifyNumber(node);
}
var intBin = {
  identify: intIdentify3,
  default: true,
  tag: "tag:yaml.org,2002:int",
  format: "BIN",
  test: /^[-+]?0b[0-1_]+$/,
  resolve: (str, _onError, opt) => intResolve2(str, 2, 2, opt),
  stringify: (node) => intStringify2(node, 2, "0b")
};
var intOct2 = {
  identify: intIdentify3,
  default: true,
  tag: "tag:yaml.org,2002:int",
  format: "OCT",
  test: /^[-+]?0[0-7_]+$/,
  resolve: (str, _onError, opt) => intResolve2(str, 1, 8, opt),
  stringify: (node) => intStringify2(node, 8, "0")
};
var int2 = {
  identify: intIdentify3,
  default: true,
  tag: "tag:yaml.org,2002:int",
  test: /^[-+]?[0-9][0-9_]*$/,
  resolve: (str, _onError, opt) => intResolve2(str, 0, 10, opt),
  stringify: stringifyNumber
};
var intHex2 = {
  identify: intIdentify3,
  default: true,
  tag: "tag:yaml.org,2002:int",
  format: "HEX",
  test: /^[-+]?0x[0-9a-fA-F_]+$/,
  resolve: (str, _onError, opt) => intResolve2(str, 2, 16, opt),
  stringify: (node) => intStringify2(node, 16, "0x")
};

// node_modules/yaml/browser/dist/schema/yaml-1.1/set.js
var YAMLSet = class _YAMLSet extends YAMLMap {
  constructor(schema4) {
    super(schema4);
    this.tag = _YAMLSet.tag;
  }
  add(key) {
    let pair;
    if (isPair(key))
      pair = key;
    else if (key && typeof key === "object" && "key" in key && "value" in key && key.value === null)
      pair = new Pair(key.key, null);
    else
      pair = new Pair(key, null);
    const prev = findPair(this.items, pair.key);
    if (!prev)
      this.items.push(pair);
  }
  /**
   * If `keepPair` is `true`, returns the Pair matching `key`.
   * Otherwise, returns the value of that Pair's key.
   */
  get(key, keepPair) {
    const pair = findPair(this.items, key);
    return !keepPair && isPair(pair) ? isScalar(pair.key) ? pair.key.value : pair.key : pair;
  }
  set(key, value) {
    if (typeof value !== "boolean")
      throw new Error(`Expected boolean value for set(key, value) in a YAML set, not ${typeof value}`);
    const prev = findPair(this.items, key);
    if (prev && !value) {
      this.items.splice(this.items.indexOf(prev), 1);
    } else if (!prev && value) {
      this.items.push(new Pair(key));
    }
  }
  toJSON(_, ctx) {
    return super.toJSON(_, ctx, Set);
  }
  toString(ctx, onComment, onChompKeep) {
    if (!ctx)
      return JSON.stringify(this);
    if (this.hasAllNullValues(true))
      return super.toString(Object.assign({}, ctx, { allNullValues: true }), onComment, onChompKeep);
    else
      throw new Error("Set items must all have null values");
  }
  static from(schema4, iterable, ctx) {
    const { replacer } = ctx;
    const set2 = new this(schema4);
    if (iterable && Symbol.iterator in Object(iterable))
      for (let value of iterable) {
        if (typeof replacer === "function")
          value = replacer.call(iterable, value, value);
        set2.items.push(createPair(value, null, ctx));
      }
    return set2;
  }
};
YAMLSet.tag = "tag:yaml.org,2002:set";
var set = {
  collection: "map",
  identify: (value) => value instanceof Set,
  nodeClass: YAMLSet,
  default: false,
  tag: "tag:yaml.org,2002:set",
  createNode: (schema4, iterable, ctx) => YAMLSet.from(schema4, iterable, ctx),
  resolve(map2, onError) {
    if (isMap(map2)) {
      if (map2.hasAllNullValues(true))
        return Object.assign(new YAMLSet(), map2);
      else
        onError("Set items must all have null values");
    } else
      onError("Expected a mapping for this tag");
    return map2;
  }
};

// node_modules/yaml/browser/dist/schema/yaml-1.1/timestamp.js
function parseSexagesimal(str, asBigInt) {
  const sign = str[0];
  const parts = sign === "-" || sign === "+" ? str.substring(1) : str;
  const num = (n) => asBigInt ? BigInt(n) : Number(n);
  const res = parts.replace(/_/g, "").split(":").reduce((res2, p) => res2 * num(60) + num(p), num(0));
  return sign === "-" ? num(-1) * res : res;
}
function stringifySexagesimal(node) {
  let { value } = node;
  let num = (n) => n;
  if (typeof value === "bigint")
    num = (n) => BigInt(n);
  else if (isNaN(value) || !isFinite(value))
    return stringifyNumber(node);
  let sign = "";
  if (value < 0) {
    sign = "-";
    value *= num(-1);
  }
  const _60 = num(60);
  const parts = [value % _60];
  if (value < 60) {
    parts.unshift(0);
  } else {
    value = (value - parts[0]) / _60;
    parts.unshift(value % _60);
    if (value >= 60) {
      value = (value - parts[0]) / _60;
      parts.unshift(value);
    }
  }
  return sign + parts.map((n) => String(n).padStart(2, "0")).join(":").replace(/000000\d*$/, "");
}
var intTime = {
  identify: (value) => typeof value === "bigint" || Number.isInteger(value),
  default: true,
  tag: "tag:yaml.org,2002:int",
  format: "TIME",
  test: /^[-+]?[0-9][0-9_]*(?::[0-5]?[0-9])+$/,
  resolve: (str, _onError, { intAsBigInt }) => parseSexagesimal(str, intAsBigInt),
  stringify: stringifySexagesimal
};
var floatTime = {
  identify: (value) => typeof value === "number",
  default: true,
  tag: "tag:yaml.org,2002:float",
  format: "TIME",
  test: /^[-+]?[0-9][0-9_]*(?::[0-5]?[0-9])+\.[0-9_]*$/,
  resolve: (str) => parseSexagesimal(str, false),
  stringify: stringifySexagesimal
};
var timestamp = {
  identify: (value) => value instanceof Date,
  default: true,
  tag: "tag:yaml.org,2002:timestamp",
  // If the time zone is omitted, the timestamp is assumed to be specified in UTC. The time part
  // may be omitted altogether, resulting in a date format. In such a case, the time part is
  // assumed to be 00:00:00Z (start of day, UTC).
  test: RegExp("^([0-9]{4})-([0-9]{1,2})-([0-9]{1,2})(?:(?:t|T|[ \\t]+)([0-9]{1,2}):([0-9]{1,2}):([0-9]{1,2}(\\.[0-9]+)?)(?:[ \\t]*(Z|[-+][012]?[0-9](?::[0-9]{2})?))?)?$"),
  resolve(str) {
    const match = str.match(timestamp.test);
    if (!match)
      throw new Error("!!timestamp expects a date, starting with yyyy-mm-dd");
    const [, year, month, day, hour, minute, second] = match.map(Number);
    const millisec = match[7] ? Number((match[7] + "00").substr(1, 3)) : 0;
    let date = Date.UTC(year, month - 1, day, hour || 0, minute || 0, second || 0, millisec);
    const tz = match[8];
    if (tz && tz !== "Z") {
      let d = parseSexagesimal(tz, false);
      if (Math.abs(d) < 30)
        d *= 60;
      date -= 6e4 * d;
    }
    return new Date(date);
  },
  stringify: ({ value }) => (value == null ? void 0 : value.toISOString().replace(/(T00:00:00)?\.000Z$/, "")) ?? ""
};

// node_modules/yaml/browser/dist/schema/yaml-1.1/schema.js
var schema3 = [
  map,
  seq,
  string,
  nullTag,
  trueTag,
  falseTag,
  intBin,
  intOct2,
  int2,
  intHex2,
  floatNaN2,
  floatExp2,
  float2,
  binary,
  merge,
  omap,
  pairs,
  set,
  intTime,
  floatTime,
  timestamp
];

// node_modules/yaml/browser/dist/schema/tags.js
var schemas = /* @__PURE__ */ new Map([
  ["core", schema],
  ["failsafe", [map, seq, string]],
  ["json", schema2],
  ["yaml11", schema3],
  ["yaml-1.1", schema3]
]);
var tagsByName = {
  binary,
  bool: boolTag,
  float,
  floatExp,
  floatNaN,
  floatTime,
  int,
  intHex,
  intOct,
  intTime,
  map,
  merge,
  null: nullTag,
  omap,
  pairs,
  seq,
  set,
  timestamp
};
var coreKnownTags = {
  "tag:yaml.org,2002:binary": binary,
  "tag:yaml.org,2002:merge": merge,
  "tag:yaml.org,2002:omap": omap,
  "tag:yaml.org,2002:pairs": pairs,
  "tag:yaml.org,2002:set": set,
  "tag:yaml.org,2002:timestamp": timestamp
};
function getTags(customTags, schemaName, addMergeTag) {
  const schemaTags = schemas.get(schemaName);
  if (schemaTags && !customTags) {
    return addMergeTag && !schemaTags.includes(merge) ? schemaTags.concat(merge) : schemaTags.slice();
  }
  let tags = schemaTags;
  if (!tags) {
    if (Array.isArray(customTags))
      tags = [];
    else {
      const keys = Array.from(schemas.keys()).filter((key) => key !== "yaml11").map((key) => JSON.stringify(key)).join(", ");
      throw new Error(`Unknown schema "${schemaName}"; use one of ${keys} or define customTags array`);
    }
  }
  if (Array.isArray(customTags)) {
    for (const tag of customTags)
      tags = tags.concat(tag);
  } else if (typeof customTags === "function") {
    tags = customTags(tags.slice());
  }
  if (addMergeTag)
    tags = tags.concat(merge);
  return tags.reduce((tags2, tag) => {
    const tagObj = typeof tag === "string" ? tagsByName[tag] : tag;
    if (!tagObj) {
      const tagName = JSON.stringify(tag);
      const keys = Object.keys(tagsByName).map((key) => JSON.stringify(key)).join(", ");
      throw new Error(`Unknown custom tag ${tagName}; use one of ${keys}`);
    }
    if (!tags2.includes(tagObj))
      tags2.push(tagObj);
    return tags2;
  }, []);
}

// node_modules/yaml/browser/dist/schema/Schema.js
var sortMapEntriesByKey = (a, b) => a.key < b.key ? -1 : a.key > b.key ? 1 : 0;
var Schema = class _Schema {
  constructor({ compat, customTags, merge: merge2, resolveKnownTags, schema: schema4, sortMapEntries, toStringDefaults }) {
    this.compat = Array.isArray(compat) ? getTags(compat, "compat") : compat ? getTags(null, compat) : null;
    this.name = typeof schema4 === "string" && schema4 || "core";
    this.knownTags = resolveKnownTags ? coreKnownTags : {};
    this.tags = getTags(customTags, this.name, merge2);
    this.toStringOptions = toStringDefaults ?? null;
    Object.defineProperty(this, MAP, { value: map });
    Object.defineProperty(this, SCALAR, { value: string });
    Object.defineProperty(this, SEQ, { value: seq });
    this.sortMapEntries = typeof sortMapEntries === "function" ? sortMapEntries : sortMapEntries === true ? sortMapEntriesByKey : null;
  }
  clone() {
    const copy = Object.create(_Schema.prototype, Object.getOwnPropertyDescriptors(this));
    copy.tags = this.tags.slice();
    return copy;
  }
};

// node_modules/yaml/browser/dist/stringify/stringifyDocument.js
function stringifyDocument(doc, options) {
  var _a;
  const lines = [];
  let hasDirectives = options.directives === true;
  if (options.directives !== false && doc.directives) {
    const dir = doc.directives.toString(doc);
    if (dir) {
      lines.push(dir);
      hasDirectives = true;
    } else if (doc.directives.docStart)
      hasDirectives = true;
  }
  if (hasDirectives)
    lines.push("---");
  const ctx = createStringifyContext(doc, options);
  const { commentString } = ctx.options;
  if (doc.commentBefore) {
    if (lines.length !== 1)
      lines.unshift("");
    const cs = commentString(doc.commentBefore);
    lines.unshift(indentComment(cs, ""));
  }
  let chompKeep = false;
  let contentComment = null;
  if (doc.contents) {
    if (isNode(doc.contents)) {
      if (doc.contents.spaceBefore && hasDirectives)
        lines.push("");
      if (doc.contents.commentBefore) {
        const cs = commentString(doc.contents.commentBefore);
        lines.push(indentComment(cs, ""));
      }
      ctx.forceBlockIndent = !!doc.comment;
      contentComment = doc.contents.comment;
    }
    const onChompKeep = contentComment ? void 0 : () => chompKeep = true;
    let body = stringify(doc.contents, ctx, () => contentComment = null, onChompKeep);
    if (contentComment)
      body += lineComment(body, "", commentString(contentComment));
    if ((body[0] === "|" || body[0] === ">") && lines[lines.length - 1] === "---") {
      lines[lines.length - 1] = `--- ${body}`;
    } else
      lines.push(body);
  } else {
    lines.push(stringify(doc.contents, ctx));
  }
  if ((_a = doc.directives) == null ? void 0 : _a.docEnd) {
    if (doc.comment) {
      const cs = commentString(doc.comment);
      if (cs.includes("\n")) {
        lines.push("...");
        lines.push(indentComment(cs, ""));
      } else {
        lines.push(`... ${cs}`);
      }
    } else {
      lines.push("...");
    }
  } else {
    let dc = doc.comment;
    if (dc && chompKeep)
      dc = dc.replace(/^\n+/, "");
    if (dc) {
      if ((!chompKeep || contentComment) && lines[lines.length - 1] !== "")
        lines.push("");
      lines.push(indentComment(commentString(dc), ""));
    }
  }
  return lines.join("\n") + "\n";
}

// node_modules/yaml/browser/dist/doc/Document.js
var Document = class _Document {
  constructor(value, replacer, options) {
    this.commentBefore = null;
    this.comment = null;
    this.errors = [];
    this.warnings = [];
    Object.defineProperty(this, NODE_TYPE, { value: DOC });
    let _replacer = null;
    if (typeof replacer === "function" || Array.isArray(replacer)) {
      _replacer = replacer;
    } else if (options === void 0 && replacer) {
      options = replacer;
      replacer = void 0;
    }
    const opt = Object.assign({
      intAsBigInt: false,
      keepSourceTokens: false,
      logLevel: "warn",
      prettyErrors: true,
      strict: true,
      stringKeys: false,
      uniqueKeys: true,
      version: "1.2"
    }, options);
    this.options = opt;
    let { version } = opt;
    if (options == null ? void 0 : options._directives) {
      this.directives = options._directives.atDocument();
      if (this.directives.yaml.explicit)
        version = this.directives.yaml.version;
    } else
      this.directives = new Directives({ version });
    this.setSchema(version, options);
    this.contents = value === void 0 ? null : this.createNode(value, _replacer, options);
  }
  /**
   * Create a deep copy of this Document and its contents.
   *
   * Custom Node values that inherit from `Object` still refer to their original instances.
   */
  clone() {
    const copy = Object.create(_Document.prototype, {
      [NODE_TYPE]: { value: DOC }
    });
    copy.commentBefore = this.commentBefore;
    copy.comment = this.comment;
    copy.errors = this.errors.slice();
    copy.warnings = this.warnings.slice();
    copy.options = Object.assign({}, this.options);
    if (this.directives)
      copy.directives = this.directives.clone();
    copy.schema = this.schema.clone();
    copy.contents = isNode(this.contents) ? this.contents.clone(copy.schema) : this.contents;
    if (this.range)
      copy.range = this.range.slice();
    return copy;
  }
  /** Adds a value to the document. */
  add(value) {
    if (assertCollection(this.contents))
      this.contents.add(value);
  }
  /** Adds a value to the document. */
  addIn(path, value) {
    if (assertCollection(this.contents))
      this.contents.addIn(path, value);
  }
  /**
   * Create a new `Alias` node, ensuring that the target `node` has the required anchor.
   *
   * If `node` already has an anchor, `name` is ignored.
   * Otherwise, the `node.anchor` value will be set to `name`,
   * or if an anchor with that name is already present in the document,
   * `name` will be used as a prefix for a new unique anchor.
   * If `name` is undefined, the generated anchor will use 'a' as a prefix.
   */
  createAlias(node, name) {
    if (!node.anchor) {
      const prev = anchorNames(this);
      node.anchor = // eslint-disable-next-line @typescript-eslint/prefer-nullish-coalescing
      !name || prev.has(name) ? findNewAnchor(name || "a", prev) : name;
    }
    return new Alias(node.anchor);
  }
  createNode(value, replacer, options) {
    let _replacer = void 0;
    if (typeof replacer === "function") {
      value = replacer.call({ "": value }, "", value);
      _replacer = replacer;
    } else if (Array.isArray(replacer)) {
      const keyToStr = (v) => typeof v === "number" || v instanceof String || v instanceof Number;
      const asStr = replacer.filter(keyToStr).map(String);
      if (asStr.length > 0)
        replacer = replacer.concat(asStr);
      _replacer = replacer;
    } else if (options === void 0 && replacer) {
      options = replacer;
      replacer = void 0;
    }
    const { aliasDuplicateObjects, anchorPrefix, flow, keepUndefined, onTagObj, tag } = options ?? {};
    const { onAnchor, setAnchors, sourceObjects } = createNodeAnchors(
      this,
      // eslint-disable-next-line @typescript-eslint/prefer-nullish-coalescing
      anchorPrefix || "a"
    );
    const ctx = {
      aliasDuplicateObjects: aliasDuplicateObjects ?? true,
      keepUndefined: keepUndefined ?? false,
      onAnchor,
      onTagObj,
      replacer: _replacer,
      schema: this.schema,
      sourceObjects
    };
    const node = createNode(value, tag, ctx);
    if (flow && isCollection(node))
      node.flow = true;
    setAnchors();
    return node;
  }
  /**
   * Convert a key and a value into a `Pair` using the current schema,
   * recursively wrapping all values as `Scalar` or `Collection` nodes.
   */
  createPair(key, value, options = {}) {
    const k = this.createNode(key, null, options);
    const v = this.createNode(value, null, options);
    return new Pair(k, v);
  }
  /**
   * Removes a value from the document.
   * @returns `true` if the item was found and removed.
   */
  delete(key) {
    return assertCollection(this.contents) ? this.contents.delete(key) : false;
  }
  /**
   * Removes a value from the document.
   * @returns `true` if the item was found and removed.
   */
  deleteIn(path) {
    if (isEmptyPath(path)) {
      if (this.contents == null)
        return false;
      this.contents = null;
      return true;
    }
    return assertCollection(this.contents) ? this.contents.deleteIn(path) : false;
  }
  /**
   * Returns item at `key`, or `undefined` if not found. By default unwraps
   * scalar values from their surrounding node; to disable set `keepScalar` to
   * `true` (collections are always returned intact).
   */
  get(key, keepScalar) {
    return isCollection(this.contents) ? this.contents.get(key, keepScalar) : void 0;
  }
  /**
   * Returns item at `path`, or `undefined` if not found. By default unwraps
   * scalar values from their surrounding node; to disable set `keepScalar` to
   * `true` (collections are always returned intact).
   */
  getIn(path, keepScalar) {
    if (isEmptyPath(path))
      return !keepScalar && isScalar(this.contents) ? this.contents.value : this.contents;
    return isCollection(this.contents) ? this.contents.getIn(path, keepScalar) : void 0;
  }
  /**
   * Checks if the document includes a value with the key `key`.
   */
  has(key) {
    return isCollection(this.contents) ? this.contents.has(key) : false;
  }
  /**
   * Checks if the document includes a value at `path`.
   */
  hasIn(path) {
    if (isEmptyPath(path))
      return this.contents !== void 0;
    return isCollection(this.contents) ? this.contents.hasIn(path) : false;
  }
  /**
   * Sets a value in this document. For `!!set`, `value` needs to be a
   * boolean to add/remove the item from the set.
   */
  set(key, value) {
    if (this.contents == null) {
      this.contents = collectionFromPath(this.schema, [key], value);
    } else if (assertCollection(this.contents)) {
      this.contents.set(key, value);
    }
  }
  /**
   * Sets a value in this document. For `!!set`, `value` needs to be a
   * boolean to add/remove the item from the set.
   */
  setIn(path, value) {
    if (isEmptyPath(path)) {
      this.contents = value;
    } else if (this.contents == null) {
      this.contents = collectionFromPath(this.schema, Array.from(path), value);
    } else if (assertCollection(this.contents)) {
      this.contents.setIn(path, value);
    }
  }
  /**
   * Change the YAML version and schema used by the document.
   * A `null` version disables support for directives, explicit tags, anchors, and aliases.
   * It also requires the `schema` option to be given as a `Schema` instance value.
   *
   * Overrides all previously set schema options.
   */
  setSchema(version, options = {}) {
    if (typeof version === "number")
      version = String(version);
    let opt;
    switch (version) {
      case "1.1":
        if (this.directives)
          this.directives.yaml.version = "1.1";
        else
          this.directives = new Directives({ version: "1.1" });
        opt = { resolveKnownTags: false, schema: "yaml-1.1" };
        break;
      case "1.2":
      case "next":
        if (this.directives)
          this.directives.yaml.version = version;
        else
          this.directives = new Directives({ version });
        opt = { resolveKnownTags: true, schema: "core" };
        break;
      case null:
        if (this.directives)
          delete this.directives;
        opt = null;
        break;
      default: {
        const sv = JSON.stringify(version);
        throw new Error(`Expected '1.1', '1.2' or null as first argument, but found: ${sv}`);
      }
    }
    if (options.schema instanceof Object)
      this.schema = options.schema;
    else if (opt)
      this.schema = new Schema(Object.assign(opt, options));
    else
      throw new Error(`With a null YAML version, the { schema: Schema } option is required`);
  }
  // json & jsonArg are only used from toJSON()
  toJS({ json, jsonArg, mapAsMap, maxAliasCount, onAnchor, reviver } = {}) {
    const ctx = {
      anchors: /* @__PURE__ */ new Map(),
      doc: this,
      keep: !json,
      mapAsMap: mapAsMap === true,
      mapKeyWarned: false,
      maxAliasCount: typeof maxAliasCount === "number" ? maxAliasCount : 100
    };
    const res = toJS(this.contents, jsonArg ?? "", ctx);
    if (typeof onAnchor === "function")
      for (const { count, res: res2 } of ctx.anchors.values())
        onAnchor(res2, count);
    return typeof reviver === "function" ? applyReviver(reviver, { "": res }, "", res) : res;
  }
  /**
   * A JSON representation of the document `contents`.
   *
   * @param jsonArg Used by `JSON.stringify` to indicate the array index or
   *   property name.
   */
  toJSON(jsonArg, onAnchor) {
    return this.toJS({ json: true, jsonArg, mapAsMap: false, onAnchor });
  }
  /** A YAML representation of the document. */
  toString(options = {}) {
    if (this.errors.length > 0)
      throw new Error("Document with errors cannot be stringified");
    if ("indent" in options && (!Number.isInteger(options.indent) || Number(options.indent) <= 0)) {
      const s = JSON.stringify(options.indent);
      throw new Error(`"indent" option must be a positive integer, not ${s}`);
    }
    return stringifyDocument(this, options);
  }
};
function assertCollection(contents) {
  if (isCollection(contents))
    return true;
  throw new Error("Expected a YAML collection as document contents");
}

// node_modules/yaml/browser/dist/errors.js
var YAMLError = class extends Error {
  constructor(name, pos, code, message) {
    super();
    this.name = name;
    this.code = code;
    this.message = message;
    this.pos = pos;
  }
};
var YAMLParseError = class extends YAMLError {
  constructor(pos, code, message) {
    super("YAMLParseError", pos, code, message);
  }
};
var YAMLWarning = class extends YAMLError {
  constructor(pos, code, message) {
    super("YAMLWarning", pos, code, message);
  }
};
var prettifyError = (src, lc) => (error) => {
  if (error.pos[0] === -1)
    return;
  error.linePos = error.pos.map((pos) => lc.linePos(pos));
  const { line, col } = error.linePos[0];
  error.message += ` at line ${line}, column ${col}`;
  let ci = col - 1;
  let lineStr = src.substring(lc.lineStarts[line - 1], lc.lineStarts[line]).replace(/[\n\r]+$/, "");
  if (ci >= 60 && lineStr.length > 80) {
    const trimStart = Math.min(ci - 39, lineStr.length - 79);
    lineStr = "…" + lineStr.substring(trimStart);
    ci -= trimStart - 1;
  }
  if (lineStr.length > 80)
    lineStr = lineStr.substring(0, 79) + "…";
  if (line > 1 && /^ *$/.test(lineStr.substring(0, ci))) {
    let prev = src.substring(lc.lineStarts[line - 2], lc.lineStarts[line - 1]);
    if (prev.length > 80)
      prev = prev.substring(0, 79) + "…\n";
    lineStr = prev + lineStr;
  }
  if (/[^ ]/.test(lineStr)) {
    let count = 1;
    const end = error.linePos[1];
    if (end && end.line === line && end.col > col) {
      count = Math.max(1, Math.min(end.col - col, 80 - ci));
    }
    const pointer = " ".repeat(ci) + "^".repeat(count);
    error.message += `:

${lineStr}
${pointer}
`;
  }
};

// node_modules/yaml/browser/dist/compose/resolve-props.js
function resolveProps(tokens, { flow, indicator, next, offset, onError, parentIndent, startOnNewline }) {
  let spaceBefore = false;
  let atNewline = startOnNewline;
  let hasSpace = startOnNewline;
  let comment = "";
  let commentSep = "";
  let hasNewline = false;
  let reqSpace = false;
  let tab = null;
  let anchor = null;
  let tag = null;
  let newlineAfterProp = null;
  let comma = null;
  let found = null;
  let start = null;
  for (const token of tokens) {
    if (reqSpace) {
      if (token.type !== "space" && token.type !== "newline" && token.type !== "comma")
        onError(token.offset, "MISSING_CHAR", "Tags and anchors must be separated from the next token by white space");
      reqSpace = false;
    }
    if (tab) {
      if (atNewline && token.type !== "comment" && token.type !== "newline") {
        onError(tab, "TAB_AS_INDENT", "Tabs are not allowed as indentation");
      }
      tab = null;
    }
    switch (token.type) {
      case "space":
        if (!flow && (indicator !== "doc-start" || (next == null ? void 0 : next.type) !== "flow-collection") && token.source.includes("	")) {
          tab = token;
        }
        hasSpace = true;
        break;
      case "comment": {
        if (!hasSpace)
          onError(token, "MISSING_CHAR", "Comments must be separated from other tokens by white space characters");
        const cb = token.source.substring(1) || " ";
        if (!comment)
          comment = cb;
        else
          comment += commentSep + cb;
        commentSep = "";
        atNewline = false;
        break;
      }
      case "newline":
        if (atNewline) {
          if (comment)
            comment += token.source;
          else if (!found || indicator !== "seq-item-ind")
            spaceBefore = true;
        } else
          commentSep += token.source;
        atNewline = true;
        hasNewline = true;
        if (anchor || tag)
          newlineAfterProp = token;
        hasSpace = true;
        break;
      case "anchor":
        if (anchor)
          onError(token, "MULTIPLE_ANCHORS", "A node can have at most one anchor");
        if (token.source.endsWith(":"))
          onError(token.offset + token.source.length - 1, "BAD_ALIAS", "Anchor ending in : is ambiguous", true);
        anchor = token;
        start ?? (start = token.offset);
        atNewline = false;
        hasSpace = false;
        reqSpace = true;
        break;
      case "tag": {
        if (tag)
          onError(token, "MULTIPLE_TAGS", "A node can have at most one tag");
        tag = token;
        start ?? (start = token.offset);
        atNewline = false;
        hasSpace = false;
        reqSpace = true;
        break;
      }
      case indicator:
        if (anchor || tag)
          onError(token, "BAD_PROP_ORDER", `Anchors and tags must be after the ${token.source} indicator`);
        if (found)
          onError(token, "UNEXPECTED_TOKEN", `Unexpected ${token.source} in ${flow ?? "collection"}`);
        found = token;
        atNewline = indicator === "seq-item-ind" || indicator === "explicit-key-ind";
        hasSpace = false;
        break;
      case "comma":
        if (flow) {
          if (comma)
            onError(token, "UNEXPECTED_TOKEN", `Unexpected , in ${flow}`);
          comma = token;
          atNewline = false;
          hasSpace = false;
          break;
        }
      default:
        onError(token, "UNEXPECTED_TOKEN", `Unexpected ${token.type} token`);
        atNewline = false;
        hasSpace = false;
    }
  }
  const last = tokens[tokens.length - 1];
  const end = last ? last.offset + last.source.length : offset;
  if (reqSpace && next && next.type !== "space" && next.type !== "newline" && next.type !== "comma" && (next.type !== "scalar" || next.source !== "")) {
    onError(next.offset, "MISSING_CHAR", "Tags and anchors must be separated from the next token by white space");
  }
  if (tab && (atNewline && tab.indent <= parentIndent || (next == null ? void 0 : next.type) === "block-map" || (next == null ? void 0 : next.type) === "block-seq"))
    onError(tab, "TAB_AS_INDENT", "Tabs are not allowed as indentation");
  return {
    comma,
    found,
    spaceBefore,
    comment,
    hasNewline,
    anchor,
    tag,
    newlineAfterProp,
    end,
    start: start ?? end
  };
}

// node_modules/yaml/browser/dist/compose/util-contains-newline.js
function containsNewline(key) {
  if (!key)
    return null;
  switch (key.type) {
    case "alias":
    case "scalar":
    case "double-quoted-scalar":
    case "single-quoted-scalar":
      if (key.source.includes("\n"))
        return true;
      if (key.end) {
        for (const st of key.end)
          if (st.type === "newline")
            return true;
      }
      return false;
    case "flow-collection":
      for (const it of key.items) {
        for (const st of it.start)
          if (st.type === "newline")
            return true;
        if (it.sep) {
          for (const st of it.sep)
            if (st.type === "newline")
              return true;
        }
        if (containsNewline(it.key) || containsNewline(it.value))
          return true;
      }
      return false;
    default:
      return true;
  }
}

// node_modules/yaml/browser/dist/compose/util-flow-indent-check.js
function flowIndentCheck(indent, fc, onError) {
  if ((fc == null ? void 0 : fc.type) === "flow-collection") {
    const end = fc.end[0];
    if (end.indent === indent && (end.source === "]" || end.source === "}") && containsNewline(fc)) {
      const msg = "Flow end indicator should be more indented than parent";
      onError(end, "BAD_INDENT", msg, true);
    }
  }
}

// node_modules/yaml/browser/dist/compose/util-map-includes.js
function mapIncludes(ctx, items, search) {
  const { uniqueKeys } = ctx.options;
  if (uniqueKeys === false)
    return false;
  const isEqual = typeof uniqueKeys === "function" ? uniqueKeys : (a, b) => a === b || isScalar(a) && isScalar(b) && a.value === b.value;
  return items.some((pair) => isEqual(pair.key, search));
}

// node_modules/yaml/browser/dist/compose/resolve-block-map.js
var startColMsg = "All mapping items must start at the same column";
function resolveBlockMap({ composeNode: composeNode2, composeEmptyNode: composeEmptyNode2 }, ctx, bm, onError, tag) {
  var _a;
  const NodeClass = (tag == null ? void 0 : tag.nodeClass) ?? YAMLMap;
  const map2 = new NodeClass(ctx.schema);
  if (ctx.atRoot)
    ctx.atRoot = false;
  let offset = bm.offset;
  let commentEnd = null;
  for (const collItem of bm.items) {
    const { start, key, sep, value } = collItem;
    const keyProps = resolveProps(start, {
      indicator: "explicit-key-ind",
      next: key ?? (sep == null ? void 0 : sep[0]),
      offset,
      onError,
      parentIndent: bm.indent,
      startOnNewline: true
    });
    const implicitKey = !keyProps.found;
    if (implicitKey) {
      if (key) {
        if (key.type === "block-seq")
          onError(offset, "BLOCK_AS_IMPLICIT_KEY", "A block sequence may not be used as an implicit map key");
        else if ("indent" in key && key.indent !== bm.indent)
          onError(offset, "BAD_INDENT", startColMsg);
      }
      if (!keyProps.anchor && !keyProps.tag && !sep) {
        commentEnd = keyProps.end;
        if (keyProps.comment) {
          if (map2.comment)
            map2.comment += "\n" + keyProps.comment;
          else
            map2.comment = keyProps.comment;
        }
        continue;
      }
      if (keyProps.newlineAfterProp || containsNewline(key)) {
        onError(key ?? start[start.length - 1], "MULTILINE_IMPLICIT_KEY", "Implicit keys need to be on a single line");
      }
    } else if (((_a = keyProps.found) == null ? void 0 : _a.indent) !== bm.indent) {
      onError(offset, "BAD_INDENT", startColMsg);
    }
    ctx.atKey = true;
    const keyStart = keyProps.end;
    const keyNode = key ? composeNode2(ctx, key, keyProps, onError) : composeEmptyNode2(ctx, keyStart, start, null, keyProps, onError);
    if (ctx.schema.compat)
      flowIndentCheck(bm.indent, key, onError);
    ctx.atKey = false;
    if (mapIncludes(ctx, map2.items, keyNode))
      onError(keyStart, "DUPLICATE_KEY", "Map keys must be unique");
    const valueProps = resolveProps(sep ?? [], {
      indicator: "map-value-ind",
      next: value,
      offset: keyNode.range[2],
      onError,
      parentIndent: bm.indent,
      startOnNewline: !key || key.type === "block-scalar"
    });
    offset = valueProps.end;
    if (valueProps.found) {
      if (implicitKey) {
        if ((value == null ? void 0 : value.type) === "block-map" && !valueProps.hasNewline)
          onError(offset, "BLOCK_AS_IMPLICIT_KEY", "Nested mappings are not allowed in compact mappings");
        if (ctx.options.strict && keyProps.start < valueProps.found.offset - 1024)
          onError(keyNode.range, "KEY_OVER_1024_CHARS", "The : indicator must be at most 1024 chars after the start of an implicit block mapping key");
      }
      const valueNode = value ? composeNode2(ctx, value, valueProps, onError) : composeEmptyNode2(ctx, offset, sep, null, valueProps, onError);
      if (ctx.schema.compat)
        flowIndentCheck(bm.indent, value, onError);
      offset = valueNode.range[2];
      const pair = new Pair(keyNode, valueNode);
      if (ctx.options.keepSourceTokens)
        pair.srcToken = collItem;
      map2.items.push(pair);
    } else {
      if (implicitKey)
        onError(keyNode.range, "MISSING_CHAR", "Implicit map keys need to be followed by map values");
      if (valueProps.comment) {
        if (keyNode.comment)
          keyNode.comment += "\n" + valueProps.comment;
        else
          keyNode.comment = valueProps.comment;
      }
      const pair = new Pair(keyNode);
      if (ctx.options.keepSourceTokens)
        pair.srcToken = collItem;
      map2.items.push(pair);
    }
  }
  if (commentEnd && commentEnd < offset)
    onError(commentEnd, "IMPOSSIBLE", "Map comment with trailing content");
  map2.range = [bm.offset, offset, commentEnd ?? offset];
  return map2;
}

// node_modules/yaml/browser/dist/compose/resolve-block-seq.js
function resolveBlockSeq({ composeNode: composeNode2, composeEmptyNode: composeEmptyNode2 }, ctx, bs, onError, tag) {
  const NodeClass = (tag == null ? void 0 : tag.nodeClass) ?? YAMLSeq;
  const seq2 = new NodeClass(ctx.schema);
  if (ctx.atRoot)
    ctx.atRoot = false;
  if (ctx.atKey)
    ctx.atKey = false;
  let offset = bs.offset;
  let commentEnd = null;
  for (const { start, value } of bs.items) {
    const props = resolveProps(start, {
      indicator: "seq-item-ind",
      next: value,
      offset,
      onError,
      parentIndent: bs.indent,
      startOnNewline: true
    });
    if (!props.found) {
      if (props.anchor || props.tag || value) {
        if (value && value.type === "block-seq")
          onError(props.end, "BAD_INDENT", "All sequence items must start at the same column");
        else
          onError(offset, "MISSING_CHAR", "Sequence item without - indicator");
      } else {
        commentEnd = props.end;
        if (props.comment)
          seq2.comment = props.comment;
        continue;
      }
    }
    const node = value ? composeNode2(ctx, value, props, onError) : composeEmptyNode2(ctx, props.end, start, null, props, onError);
    if (ctx.schema.compat)
      flowIndentCheck(bs.indent, value, onError);
    offset = node.range[2];
    seq2.items.push(node);
  }
  seq2.range = [bs.offset, offset, commentEnd ?? offset];
  return seq2;
}

// node_modules/yaml/browser/dist/compose/resolve-end.js
function resolveEnd(end, offset, reqSpace, onError) {
  let comment = "";
  if (end) {
    let hasSpace = false;
    let sep = "";
    for (const token of end) {
      const { source, type } = token;
      switch (type) {
        case "space":
          hasSpace = true;
          break;
        case "comment": {
          if (reqSpace && !hasSpace)
            onError(token, "MISSING_CHAR", "Comments must be separated from other tokens by white space characters");
          const cb = source.substring(1) || " ";
          if (!comment)
            comment = cb;
          else
            comment += sep + cb;
          sep = "";
          break;
        }
        case "newline":
          if (comment)
            sep += source;
          hasSpace = true;
          break;
        default:
          onError(token, "UNEXPECTED_TOKEN", `Unexpected ${type} at node end`);
      }
      offset += source.length;
    }
  }
  return { comment, offset };
}

// node_modules/yaml/browser/dist/compose/resolve-flow-collection.js
var blockMsg = "Block collections are not allowed within flow collections";
var isBlock = (token) => token && (token.type === "block-map" || token.type === "block-seq");
function resolveFlowCollection({ composeNode: composeNode2, composeEmptyNode: composeEmptyNode2 }, ctx, fc, onError, tag) {
  const isMap2 = fc.start.source === "{";
  const fcName = isMap2 ? "flow map" : "flow sequence";
  const NodeClass = (tag == null ? void 0 : tag.nodeClass) ?? (isMap2 ? YAMLMap : YAMLSeq);
  const coll = new NodeClass(ctx.schema);
  coll.flow = true;
  const atRoot = ctx.atRoot;
  if (atRoot)
    ctx.atRoot = false;
  if (ctx.atKey)
    ctx.atKey = false;
  let offset = fc.offset + fc.start.source.length;
  for (let i = 0; i < fc.items.length; ++i) {
    const collItem = fc.items[i];
    const { start, key, sep, value } = collItem;
    const props = resolveProps(start, {
      flow: fcName,
      indicator: "explicit-key-ind",
      next: key ?? (sep == null ? void 0 : sep[0]),
      offset,
      onError,
      parentIndent: fc.indent,
      startOnNewline: false
    });
    if (!props.found) {
      if (!props.anchor && !props.tag && !sep && !value) {
        if (i === 0 && props.comma)
          onError(props.comma, "UNEXPECTED_TOKEN", `Unexpected , in ${fcName}`);
        else if (i < fc.items.length - 1)
          onError(props.start, "UNEXPECTED_TOKEN", `Unexpected empty item in ${fcName}`);
        if (props.comment) {
          if (coll.comment)
            coll.comment += "\n" + props.comment;
          else
            coll.comment = props.comment;
        }
        offset = props.end;
        continue;
      }
      if (!isMap2 && ctx.options.strict && containsNewline(key))
        onError(
          key,
          // checked by containsNewline()
          "MULTILINE_IMPLICIT_KEY",
          "Implicit keys of flow sequence pairs need to be on a single line"
        );
    }
    if (i === 0) {
      if (props.comma)
        onError(props.comma, "UNEXPECTED_TOKEN", `Unexpected , in ${fcName}`);
    } else {
      if (!props.comma)
        onError(props.start, "MISSING_CHAR", `Missing , between ${fcName} items`);
      if (props.comment) {
        let prevItemComment = "";
        loop: for (const st of start) {
          switch (st.type) {
            case "comma":
            case "space":
              break;
            case "comment":
              prevItemComment = st.source.substring(1);
              break loop;
            default:
              break loop;
          }
        }
        if (prevItemComment) {
          let prev = coll.items[coll.items.length - 1];
          if (isPair(prev))
            prev = prev.value ?? prev.key;
          if (prev.comment)
            prev.comment += "\n" + prevItemComment;
          else
            prev.comment = prevItemComment;
          props.comment = props.comment.substring(prevItemComment.length + 1);
        }
      }
    }
    if (!isMap2 && !sep && !props.found) {
      const valueNode = value ? composeNode2(ctx, value, props, onError) : composeEmptyNode2(ctx, props.end, sep, null, props, onError);
      coll.items.push(valueNode);
      offset = valueNode.range[2];
      if (isBlock(value))
        onError(valueNode.range, "BLOCK_IN_FLOW", blockMsg);
    } else {
      ctx.atKey = true;
      const keyStart = props.end;
      const keyNode = key ? composeNode2(ctx, key, props, onError) : composeEmptyNode2(ctx, keyStart, start, null, props, onError);
      if (isBlock(key))
        onError(keyNode.range, "BLOCK_IN_FLOW", blockMsg);
      ctx.atKey = false;
      const valueProps = resolveProps(sep ?? [], {
        flow: fcName,
        indicator: "map-value-ind",
        next: value,
        offset: keyNode.range[2],
        onError,
        parentIndent: fc.indent,
        startOnNewline: false
      });
      if (valueProps.found) {
        if (!isMap2 && !props.found && ctx.options.strict) {
          if (sep)
            for (const st of sep) {
              if (st === valueProps.found)
                break;
              if (st.type === "newline") {
                onError(st, "MULTILINE_IMPLICIT_KEY", "Implicit keys of flow sequence pairs need to be on a single line");
                break;
              }
            }
          if (props.start < valueProps.found.offset - 1024)
            onError(valueProps.found, "KEY_OVER_1024_CHARS", "The : indicator must be at most 1024 chars after the start of an implicit flow sequence key");
        }
      } else if (value) {
        if ("source" in value && value.source && value.source[0] === ":")
          onError(value, "MISSING_CHAR", `Missing space after : in ${fcName}`);
        else
          onError(valueProps.start, "MISSING_CHAR", `Missing , or : between ${fcName} items`);
      }
      const valueNode = value ? composeNode2(ctx, value, valueProps, onError) : valueProps.found ? composeEmptyNode2(ctx, valueProps.end, sep, null, valueProps, onError) : null;
      if (valueNode) {
        if (isBlock(value))
          onError(valueNode.range, "BLOCK_IN_FLOW", blockMsg);
      } else if (valueProps.comment) {
        if (keyNode.comment)
          keyNode.comment += "\n" + valueProps.comment;
        else
          keyNode.comment = valueProps.comment;
      }
      const pair = new Pair(keyNode, valueNode);
      if (ctx.options.keepSourceTokens)
        pair.srcToken = collItem;
      if (isMap2) {
        const map2 = coll;
        if (mapIncludes(ctx, map2.items, keyNode))
          onError(keyStart, "DUPLICATE_KEY", "Map keys must be unique");
        map2.items.push(pair);
      } else {
        const map2 = new YAMLMap(ctx.schema);
        map2.flow = true;
        map2.items.push(pair);
        const endRange = (valueNode ?? keyNode).range;
        map2.range = [keyNode.range[0], endRange[1], endRange[2]];
        coll.items.push(map2);
      }
      offset = valueNode ? valueNode.range[2] : valueProps.end;
    }
  }
  const expectedEnd = isMap2 ? "}" : "]";
  const [ce, ...ee] = fc.end;
  let cePos = offset;
  if (ce && ce.source === expectedEnd)
    cePos = ce.offset + ce.source.length;
  else {
    const name = fcName[0].toUpperCase() + fcName.substring(1);
    const msg = atRoot ? `${name} must end with a ${expectedEnd}` : `${name} in block collection must be sufficiently indented and end with a ${expectedEnd}`;
    onError(offset, atRoot ? "MISSING_CHAR" : "BAD_INDENT", msg);
    if (ce && ce.source.length !== 1)
      ee.unshift(ce);
  }
  if (ee.length > 0) {
    const end = resolveEnd(ee, cePos, ctx.options.strict, onError);
    if (end.comment) {
      if (coll.comment)
        coll.comment += "\n" + end.comment;
      else
        coll.comment = end.comment;
    }
    coll.range = [fc.offset, cePos, end.offset];
  } else {
    coll.range = [fc.offset, cePos, cePos];
  }
  return coll;
}

// node_modules/yaml/browser/dist/compose/compose-collection.js
function resolveCollection(CN2, ctx, token, onError, tagName, tag) {
  const coll = token.type === "block-map" ? resolveBlockMap(CN2, ctx, token, onError, tag) : token.type === "block-seq" ? resolveBlockSeq(CN2, ctx, token, onError, tag) : resolveFlowCollection(CN2, ctx, token, onError, tag);
  const Coll = coll.constructor;
  if (tagName === "!" || tagName === Coll.tagName) {
    coll.tag = Coll.tagName;
    return coll;
  }
  if (tagName)
    coll.tag = tagName;
  return coll;
}
function composeCollection(CN2, ctx, token, props, onError) {
  var _a;
  const tagToken = props.tag;
  const tagName = !tagToken ? null : ctx.directives.tagName(tagToken.source, (msg) => onError(tagToken, "TAG_RESOLVE_FAILED", msg));
  if (token.type === "block-seq") {
    const { anchor, newlineAfterProp: nl } = props;
    const lastProp = anchor && tagToken ? anchor.offset > tagToken.offset ? anchor : tagToken : anchor ?? tagToken;
    if (lastProp && (!nl || nl.offset < lastProp.offset)) {
      const message = "Missing newline after block sequence props";
      onError(lastProp, "MISSING_CHAR", message);
    }
  }
  const expType = token.type === "block-map" ? "map" : token.type === "block-seq" ? "seq" : token.start.source === "{" ? "map" : "seq";
  if (!tagToken || !tagName || tagName === "!" || tagName === YAMLMap.tagName && expType === "map" || tagName === YAMLSeq.tagName && expType === "seq") {
    return resolveCollection(CN2, ctx, token, onError, tagName);
  }
  let tag = ctx.schema.tags.find((t) => t.tag === tagName && t.collection === expType);
  if (!tag) {
    const kt = ctx.schema.knownTags[tagName];
    if (kt && kt.collection === expType) {
      ctx.schema.tags.push(Object.assign({}, kt, { default: false }));
      tag = kt;
    } else {
      if (kt) {
        onError(tagToken, "BAD_COLLECTION_TYPE", `${kt.tag} used for ${expType} collection, but expects ${kt.collection ?? "scalar"}`, true);
      } else {
        onError(tagToken, "TAG_RESOLVE_FAILED", `Unresolved tag: ${tagName}`, true);
      }
      return resolveCollection(CN2, ctx, token, onError, tagName);
    }
  }
  const coll = resolveCollection(CN2, ctx, token, onError, tagName, tag);
  const res = ((_a = tag.resolve) == null ? void 0 : _a.call(tag, coll, (msg) => onError(tagToken, "TAG_RESOLVE_FAILED", msg), ctx.options)) ?? coll;
  const node = isNode(res) ? res : new Scalar(res);
  node.range = coll.range;
  node.tag = tagName;
  if (tag == null ? void 0 : tag.format)
    node.format = tag.format;
  return node;
}

// node_modules/yaml/browser/dist/compose/resolve-block-scalar.js
function resolveBlockScalar(ctx, scalar, onError) {
  const start = scalar.offset;
  const header = parseBlockScalarHeader(scalar, ctx.options.strict, onError);
  if (!header)
    return { value: "", type: null, comment: "", range: [start, start, start] };
  const type = header.mode === ">" ? Scalar.BLOCK_FOLDED : Scalar.BLOCK_LITERAL;
  const lines = scalar.source ? splitLines(scalar.source) : [];
  let chompStart = lines.length;
  for (let i = lines.length - 1; i >= 0; --i) {
    const content = lines[i][1];
    if (content === "" || content === "\r")
      chompStart = i;
    else
      break;
  }
  if (chompStart === 0) {
    const value2 = header.chomp === "+" && lines.length > 0 ? "\n".repeat(Math.max(1, lines.length - 1)) : "";
    let end2 = start + header.length;
    if (scalar.source)
      end2 += scalar.source.length;
    return { value: value2, type, comment: header.comment, range: [start, end2, end2] };
  }
  let trimIndent = scalar.indent + header.indent;
  let offset = scalar.offset + header.length;
  let contentStart = 0;
  for (let i = 0; i < chompStart; ++i) {
    const [indent, content] = lines[i];
    if (content === "" || content === "\r") {
      if (header.indent === 0 && indent.length > trimIndent)
        trimIndent = indent.length;
    } else {
      if (indent.length < trimIndent) {
        const message = "Block scalars with more-indented leading empty lines must use an explicit indentation indicator";
        onError(offset + indent.length, "MISSING_CHAR", message);
      }
      if (header.indent === 0)
        trimIndent = indent.length;
      contentStart = i;
      if (trimIndent === 0 && !ctx.atRoot) {
        const message = "Block scalar values in collections must be indented";
        onError(offset, "BAD_INDENT", message);
      }
      break;
    }
    offset += indent.length + content.length + 1;
  }
  for (let i = lines.length - 1; i >= chompStart; --i) {
    if (lines[i][0].length > trimIndent)
      chompStart = i + 1;
  }
  let value = "";
  let sep = "";
  let prevMoreIndented = false;
  for (let i = 0; i < contentStart; ++i)
    value += lines[i][0].slice(trimIndent) + "\n";
  for (let i = contentStart; i < chompStart; ++i) {
    let [indent, content] = lines[i];
    offset += indent.length + content.length + 1;
    const crlf = content[content.length - 1] === "\r";
    if (crlf)
      content = content.slice(0, -1);
    if (content && indent.length < trimIndent) {
      const src = header.indent ? "explicit indentation indicator" : "first line";
      const message = `Block scalar lines must not be less indented than their ${src}`;
      onError(offset - content.length - (crlf ? 2 : 1), "BAD_INDENT", message);
      indent = "";
    }
    if (type === Scalar.BLOCK_LITERAL) {
      value += sep + indent.slice(trimIndent) + content;
      sep = "\n";
    } else if (indent.length > trimIndent || content[0] === "	") {
      if (sep === " ")
        sep = "\n";
      else if (!prevMoreIndented && sep === "\n")
        sep = "\n\n";
      value += sep + indent.slice(trimIndent) + content;
      sep = "\n";
      prevMoreIndented = true;
    } else if (content === "") {
      if (sep === "\n")
        value += "\n";
      else
        sep = "\n";
    } else {
      value += sep + content;
      sep = " ";
      prevMoreIndented = false;
    }
  }
  switch (header.chomp) {
    case "-":
      break;
    case "+":
      for (let i = chompStart; i < lines.length; ++i)
        value += "\n" + lines[i][0].slice(trimIndent);
      if (value[value.length - 1] !== "\n")
        value += "\n";
      break;
    default:
      value += "\n";
  }
  const end = start + header.length + scalar.source.length;
  return { value, type, comment: header.comment, range: [start, end, end] };
}
function parseBlockScalarHeader({ offset, props }, strict, onError) {
  if (props[0].type !== "block-scalar-header") {
    onError(props[0], "IMPOSSIBLE", "Block scalar header not found");
    return null;
  }
  const { source } = props[0];
  const mode = source[0];
  let indent = 0;
  let chomp = "";
  let error = -1;
  for (let i = 1; i < source.length; ++i) {
    const ch = source[i];
    if (!chomp && (ch === "-" || ch === "+"))
      chomp = ch;
    else {
      const n = Number(ch);
      if (!indent && n)
        indent = n;
      else if (error === -1)
        error = offset + i;
    }
  }
  if (error !== -1)
    onError(error, "UNEXPECTED_TOKEN", `Block scalar header includes extra characters: ${source}`);
  let hasSpace = false;
  let comment = "";
  let length = source.length;
  for (let i = 1; i < props.length; ++i) {
    const token = props[i];
    switch (token.type) {
      case "space":
        hasSpace = true;
      case "newline":
        length += token.source.length;
        break;
      case "comment":
        if (strict && !hasSpace) {
          const message = "Comments must be separated from other tokens by white space characters";
          onError(token, "MISSING_CHAR", message);
        }
        length += token.source.length;
        comment = token.source.substring(1);
        break;
      case "error":
        onError(token, "UNEXPECTED_TOKEN", token.message);
        length += token.source.length;
        break;
      default: {
        const message = `Unexpected token in block scalar header: ${token.type}`;
        onError(token, "UNEXPECTED_TOKEN", message);
        const ts = token.source;
        if (ts && typeof ts === "string")
          length += ts.length;
      }
    }
  }
  return { mode, indent, chomp, comment, length };
}
function splitLines(source) {
  const split = source.split(/\n( *)/);
  const first = split[0];
  const m = first.match(/^( *)/);
  const line0 = (m == null ? void 0 : m[1]) ? [m[1], first.slice(m[1].length)] : ["", first];
  const lines = [line0];
  for (let i = 1; i < split.length; i += 2)
    lines.push([split[i], split[i + 1]]);
  return lines;
}

// node_modules/yaml/browser/dist/compose/resolve-flow-scalar.js
function resolveFlowScalar(scalar, strict, onError) {
  const { offset, type, source, end } = scalar;
  let _type;
  let value;
  const _onError = (rel, code, msg) => onError(offset + rel, code, msg);
  switch (type) {
    case "scalar":
      _type = Scalar.PLAIN;
      value = plainValue(source, _onError);
      break;
    case "single-quoted-scalar":
      _type = Scalar.QUOTE_SINGLE;
      value = singleQuotedValue(source, _onError);
      break;
    case "double-quoted-scalar":
      _type = Scalar.QUOTE_DOUBLE;
      value = doubleQuotedValue(source, _onError);
      break;
    default:
      onError(scalar, "UNEXPECTED_TOKEN", `Expected a flow scalar value, but found: ${type}`);
      return {
        value: "",
        type: null,
        comment: "",
        range: [offset, offset + source.length, offset + source.length]
      };
  }
  const valueEnd = offset + source.length;
  const re = resolveEnd(end, valueEnd, strict, onError);
  return {
    value,
    type: _type,
    comment: re.comment,
    range: [offset, valueEnd, re.offset]
  };
}
function plainValue(source, onError) {
  let badChar = "";
  switch (source[0]) {
    case "	":
      badChar = "a tab character";
      break;
    case ",":
      badChar = "flow indicator character ,";
      break;
    case "%":
      badChar = "directive indicator character %";
      break;
    case "|":
    case ">": {
      badChar = `block scalar indicator ${source[0]}`;
      break;
    }
    case "@":
    case "`": {
      badChar = `reserved character ${source[0]}`;
      break;
    }
  }
  if (badChar)
    onError(0, "BAD_SCALAR_START", `Plain value cannot start with ${badChar}`);
  return foldLines(source);
}
function singleQuotedValue(source, onError) {
  if (source[source.length - 1] !== "'" || source.length === 1)
    onError(source.length, "MISSING_CHAR", "Missing closing 'quote");
  return foldLines(source.slice(1, -1)).replace(/''/g, "'");
}
function foldLines(source) {
  let first, line;
  try {
    first = new RegExp("(.*?)(?<![ 	])[ 	]*\r?\n", "sy");
    line = new RegExp("[ 	]*(.*?)(?:(?<![ 	])[ 	]*)?\r?\n", "sy");
  } catch {
    first = /(.*?)[ \t]*\r?\n/sy;
    line = /[ \t]*(.*?)[ \t]*\r?\n/sy;
  }
  let match = first.exec(source);
  if (!match)
    return source;
  let res = match[1];
  let sep = " ";
  let pos = first.lastIndex;
  line.lastIndex = pos;
  while (match = line.exec(source)) {
    if (match[1] === "") {
      if (sep === "\n")
        res += sep;
      else
        sep = "\n";
    } else {
      res += sep + match[1];
      sep = " ";
    }
    pos = line.lastIndex;
  }
  const last = /[ \t]*(.*)/sy;
  last.lastIndex = pos;
  match = last.exec(source);
  return res + sep + ((match == null ? void 0 : match[1]) ?? "");
}
function doubleQuotedValue(source, onError) {
  let res = "";
  for (let i = 1; i < source.length - 1; ++i) {
    const ch = source[i];
    if (ch === "\r" && source[i + 1] === "\n")
      continue;
    if (ch === "\n") {
      const { fold, offset } = foldNewline(source, i);
      res += fold;
      i = offset;
    } else if (ch === "\\") {
      let next = source[++i];
      const cc = escapeCodes[next];
      if (cc)
        res += cc;
      else if (next === "\n") {
        next = source[i + 1];
        while (next === " " || next === "	")
          next = source[++i + 1];
      } else if (next === "\r" && source[i + 1] === "\n") {
        next = source[++i + 1];
        while (next === " " || next === "	")
          next = source[++i + 1];
      } else if (next === "x" || next === "u" || next === "U") {
        const length = { x: 2, u: 4, U: 8 }[next];
        res += parseCharCode(source, i + 1, length, onError);
        i += length;
      } else {
        const raw = source.substr(i - 1, 2);
        onError(i - 1, "BAD_DQ_ESCAPE", `Invalid escape sequence ${raw}`);
        res += raw;
      }
    } else if (ch === " " || ch === "	") {
      const wsStart = i;
      let next = source[i + 1];
      while (next === " " || next === "	")
        next = source[++i + 1];
      if (next !== "\n" && !(next === "\r" && source[i + 2] === "\n"))
        res += i > wsStart ? source.slice(wsStart, i + 1) : ch;
    } else {
      res += ch;
    }
  }
  if (source[source.length - 1] !== '"' || source.length === 1)
    onError(source.length, "MISSING_CHAR", 'Missing closing "quote');
  return res;
}
function foldNewline(source, offset) {
  let fold = "";
  let ch = source[offset + 1];
  while (ch === " " || ch === "	" || ch === "\n" || ch === "\r") {
    if (ch === "\r" && source[offset + 2] !== "\n")
      break;
    if (ch === "\n")
      fold += "\n";
    offset += 1;
    ch = source[offset + 1];
  }
  if (!fold)
    fold = " ";
  return { fold, offset };
}
var escapeCodes = {
  "0": "\0",
  // null character
  a: "\x07",
  // bell character
  b: "\b",
  // backspace
  e: "\x1B",
  // escape character
  f: "\f",
  // form feed
  n: "\n",
  // line feed
  r: "\r",
  // carriage return
  t: "	",
  // horizontal tab
  v: "\v",
  // vertical tab
  N: "",
  // Unicode next line
  _: " ",
  // Unicode non-breaking space
  L: "\u2028",
  // Unicode line separator
  P: "\u2029",
  // Unicode paragraph separator
  " ": " ",
  '"': '"',
  "/": "/",
  "\\": "\\",
  "	": "	"
};
function parseCharCode(source, offset, length, onError) {
  const cc = source.substr(offset, length);
  const ok = cc.length === length && /^[0-9a-fA-F]+$/.test(cc);
  const code = ok ? parseInt(cc, 16) : NaN;
  if (isNaN(code)) {
    const raw = source.substr(offset - 2, length + 2);
    onError(offset - 2, "BAD_DQ_ESCAPE", `Invalid escape sequence ${raw}`);
    return raw;
  }
  return String.fromCodePoint(code);
}

// node_modules/yaml/browser/dist/compose/compose-scalar.js
function composeScalar(ctx, token, tagToken, onError) {
  const { value, type, comment, range } = token.type === "block-scalar" ? resolveBlockScalar(ctx, token, onError) : resolveFlowScalar(token, ctx.options.strict, onError);
  const tagName = tagToken ? ctx.directives.tagName(tagToken.source, (msg) => onError(tagToken, "TAG_RESOLVE_FAILED", msg)) : null;
  let tag;
  if (ctx.options.stringKeys && ctx.atKey) {
    tag = ctx.schema[SCALAR];
  } else if (tagName)
    tag = findScalarTagByName(ctx.schema, value, tagName, tagToken, onError);
  else if (token.type === "scalar")
    tag = findScalarTagByTest(ctx, value, token, onError);
  else
    tag = ctx.schema[SCALAR];
  let scalar;
  try {
    const res = tag.resolve(value, (msg) => onError(tagToken ?? token, "TAG_RESOLVE_FAILED", msg), ctx.options);
    scalar = isScalar(res) ? res : new Scalar(res);
  } catch (error) {
    const msg = error instanceof Error ? error.message : String(error);
    onError(tagToken ?? token, "TAG_RESOLVE_FAILED", msg);
    scalar = new Scalar(value);
  }
  scalar.range = range;
  scalar.source = value;
  if (type)
    scalar.type = type;
  if (tagName)
    scalar.tag = tagName;
  if (tag.format)
    scalar.format = tag.format;
  if (comment)
    scalar.comment = comment;
  return scalar;
}
function findScalarTagByName(schema4, value, tagName, tagToken, onError) {
  var _a;
  if (tagName === "!")
    return schema4[SCALAR];
  const matchWithTest = [];
  for (const tag of schema4.tags) {
    if (!tag.collection && tag.tag === tagName) {
      if (tag.default && tag.test)
        matchWithTest.push(tag);
      else
        return tag;
    }
  }
  for (const tag of matchWithTest)
    if ((_a = tag.test) == null ? void 0 : _a.test(value))
      return tag;
  const kt = schema4.knownTags[tagName];
  if (kt && !kt.collection) {
    schema4.tags.push(Object.assign({}, kt, { default: false, test: void 0 }));
    return kt;
  }
  onError(tagToken, "TAG_RESOLVE_FAILED", `Unresolved tag: ${tagName}`, tagName !== "tag:yaml.org,2002:str");
  return schema4[SCALAR];
}
function findScalarTagByTest({ atKey, directives, schema: schema4 }, value, token, onError) {
  const tag = schema4.tags.find((tag2) => {
    var _a;
    return (tag2.default === true || atKey && tag2.default === "key") && ((_a = tag2.test) == null ? void 0 : _a.test(value));
  }) || schema4[SCALAR];
  if (schema4.compat) {
    const compat = schema4.compat.find((tag2) => {
      var _a;
      return tag2.default && ((_a = tag2.test) == null ? void 0 : _a.test(value));
    }) ?? schema4[SCALAR];
    if (tag.tag !== compat.tag) {
      const ts = directives.tagString(tag.tag);
      const cs = directives.tagString(compat.tag);
      const msg = `Value may be parsed as either ${ts} or ${cs}`;
      onError(token, "TAG_RESOLVE_FAILED", msg, true);
    }
  }
  return tag;
}

// node_modules/yaml/browser/dist/compose/util-empty-scalar-position.js
function emptyScalarPosition(offset, before, pos) {
  if (before) {
    pos ?? (pos = before.length);
    for (let i = pos - 1; i >= 0; --i) {
      let st = before[i];
      switch (st.type) {
        case "space":
        case "comment":
        case "newline":
          offset -= st.source.length;
          continue;
      }
      st = before[++i];
      while ((st == null ? void 0 : st.type) === "space") {
        offset += st.source.length;
        st = before[++i];
      }
      break;
    }
  }
  return offset;
}

// node_modules/yaml/browser/dist/compose/compose-node.js
var CN = { composeNode, composeEmptyNode };
function composeNode(ctx, token, props, onError) {
  const atKey = ctx.atKey;
  const { spaceBefore, comment, anchor, tag } = props;
  let node;
  let isSrcToken = true;
  switch (token.type) {
    case "alias":
      node = composeAlias(ctx, token, onError);
      if (anchor || tag)
        onError(token, "ALIAS_PROPS", "An alias node must not specify any properties");
      break;
    case "scalar":
    case "single-quoted-scalar":
    case "double-quoted-scalar":
    case "block-scalar":
      node = composeScalar(ctx, token, tag, onError);
      if (anchor)
        node.anchor = anchor.source.substring(1);
      break;
    case "block-map":
    case "block-seq":
    case "flow-collection":
      node = composeCollection(CN, ctx, token, props, onError);
      if (anchor)
        node.anchor = anchor.source.substring(1);
      break;
    default: {
      const message = token.type === "error" ? token.message : `Unsupported token (type: ${token.type})`;
      onError(token, "UNEXPECTED_TOKEN", message);
      node = composeEmptyNode(ctx, token.offset, void 0, null, props, onError);
      isSrcToken = false;
    }
  }
  if (anchor && node.anchor === "")
    onError(anchor, "BAD_ALIAS", "Anchor cannot be an empty string");
  if (atKey && ctx.options.stringKeys && (!isScalar(node) || typeof node.value !== "string" || node.tag && node.tag !== "tag:yaml.org,2002:str")) {
    const msg = "With stringKeys, all keys must be strings";
    onError(tag ?? token, "NON_STRING_KEY", msg);
  }
  if (spaceBefore)
    node.spaceBefore = true;
  if (comment) {
    if (token.type === "scalar" && token.source === "")
      node.comment = comment;
    else
      node.commentBefore = comment;
  }
  if (ctx.options.keepSourceTokens && isSrcToken)
    node.srcToken = token;
  return node;
}
function composeEmptyNode(ctx, offset, before, pos, { spaceBefore, comment, anchor, tag, end }, onError) {
  const token = {
    type: "scalar",
    offset: emptyScalarPosition(offset, before, pos),
    indent: -1,
    source: ""
  };
  const node = composeScalar(ctx, token, tag, onError);
  if (anchor) {
    node.anchor = anchor.source.substring(1);
    if (node.anchor === "")
      onError(anchor, "BAD_ALIAS", "Anchor cannot be an empty string");
  }
  if (spaceBefore)
    node.spaceBefore = true;
  if (comment) {
    node.comment = comment;
    node.range[2] = end;
  }
  return node;
}
function composeAlias({ options }, { offset, source, end }, onError) {
  const alias = new Alias(source.substring(1));
  if (alias.source === "")
    onError(offset, "BAD_ALIAS", "Alias cannot be an empty string");
  if (alias.source.endsWith(":"))
    onError(offset + source.length - 1, "BAD_ALIAS", "Alias ending in : is ambiguous", true);
  const valueEnd = offset + source.length;
  const re = resolveEnd(end, valueEnd, options.strict, onError);
  alias.range = [offset, valueEnd, re.offset];
  if (re.comment)
    alias.comment = re.comment;
  return alias;
}

// node_modules/yaml/browser/dist/compose/compose-doc.js
function composeDoc(options, directives, { offset, start, value, end }, onError) {
  const opts = Object.assign({ _directives: directives }, options);
  const doc = new Document(void 0, opts);
  const ctx = {
    atKey: false,
    atRoot: true,
    directives: doc.directives,
    options: doc.options,
    schema: doc.schema
  };
  const props = resolveProps(start, {
    indicator: "doc-start",
    next: value ?? (end == null ? void 0 : end[0]),
    offset,
    onError,
    parentIndent: 0,
    startOnNewline: true
  });
  if (props.found) {
    doc.directives.docStart = true;
    if (value && (value.type === "block-map" || value.type === "block-seq") && !props.hasNewline)
      onError(props.end, "MISSING_CHAR", "Block collection cannot start on same line with directives-end marker");
  }
  doc.contents = value ? composeNode(ctx, value, props, onError) : composeEmptyNode(ctx, props.end, start, null, props, onError);
  const contentEnd = doc.contents.range[2];
  const re = resolveEnd(end, contentEnd, false, onError);
  if (re.comment)
    doc.comment = re.comment;
  doc.range = [offset, contentEnd, re.offset];
  return doc;
}

// node_modules/yaml/browser/dist/compose/composer.js
function getErrorPos(src) {
  if (typeof src === "number")
    return [src, src + 1];
  if (Array.isArray(src))
    return src.length === 2 ? src : [src[0], src[1]];
  const { offset, source } = src;
  return [offset, offset + (typeof source === "string" ? source.length : 1)];
}
function parsePrelude(prelude) {
  var _a;
  let comment = "";
  let atComment = false;
  let afterEmptyLine = false;
  for (let i = 0; i < prelude.length; ++i) {
    const source = prelude[i];
    switch (source[0]) {
      case "#":
        comment += (comment === "" ? "" : afterEmptyLine ? "\n\n" : "\n") + (source.substring(1) || " ");
        atComment = true;
        afterEmptyLine = false;
        break;
      case "%":
        if (((_a = prelude[i + 1]) == null ? void 0 : _a[0]) !== "#")
          i += 1;
        atComment = false;
        break;
      default:
        if (!atComment)
          afterEmptyLine = true;
        atComment = false;
    }
  }
  return { comment, afterEmptyLine };
}
var Composer = class {
  constructor(options = {}) {
    this.doc = null;
    this.atDirectives = false;
    this.prelude = [];
    this.errors = [];
    this.warnings = [];
    this.onError = (source, code, message, warning) => {
      const pos = getErrorPos(source);
      if (warning)
        this.warnings.push(new YAMLWarning(pos, code, message));
      else
        this.errors.push(new YAMLParseError(pos, code, message));
    };
    this.directives = new Directives({ version: options.version || "1.2" });
    this.options = options;
  }
  decorate(doc, afterDoc) {
    const { comment, afterEmptyLine } = parsePrelude(this.prelude);
    if (comment) {
      const dc = doc.contents;
      if (afterDoc) {
        doc.comment = doc.comment ? `${doc.comment}
${comment}` : comment;
      } else if (afterEmptyLine || doc.directives.docStart || !dc) {
        doc.commentBefore = comment;
      } else if (isCollection(dc) && !dc.flow && dc.items.length > 0) {
        let it = dc.items[0];
        if (isPair(it))
          it = it.key;
        const cb = it.commentBefore;
        it.commentBefore = cb ? `${comment}
${cb}` : comment;
      } else {
        const cb = dc.commentBefore;
        dc.commentBefore = cb ? `${comment}
${cb}` : comment;
      }
    }
    if (afterDoc) {
      Array.prototype.push.apply(doc.errors, this.errors);
      Array.prototype.push.apply(doc.warnings, this.warnings);
    } else {
      doc.errors = this.errors;
      doc.warnings = this.warnings;
    }
    this.prelude = [];
    this.errors = [];
    this.warnings = [];
  }
  /**
   * Current stream status information.
   *
   * Mostly useful at the end of input for an empty stream.
   */
  streamInfo() {
    return {
      comment: parsePrelude(this.prelude).comment,
      directives: this.directives,
      errors: this.errors,
      warnings: this.warnings
    };
  }
  /**
   * Compose tokens into documents.
   *
   * @param forceDoc - If the stream contains no document, still emit a final document including any comments and directives that would be applied to a subsequent document.
   * @param endOffset - Should be set if `forceDoc` is also set, to set the document range end and to indicate errors correctly.
   */
  *compose(tokens, forceDoc = false, endOffset = -1) {
    for (const token of tokens)
      yield* this.next(token);
    yield* this.end(forceDoc, endOffset);
  }
  /** Advance the composer by one CST token. */
  *next(token) {
    switch (token.type) {
      case "directive":
        this.directives.add(token.source, (offset, message, warning) => {
          const pos = getErrorPos(token);
          pos[0] += offset;
          this.onError(pos, "BAD_DIRECTIVE", message, warning);
        });
        this.prelude.push(token.source);
        this.atDirectives = true;
        break;
      case "document": {
        const doc = composeDoc(this.options, this.directives, token, this.onError);
        if (this.atDirectives && !doc.directives.docStart)
          this.onError(token, "MISSING_CHAR", "Missing directives-end/doc-start indicator line");
        this.decorate(doc, false);
        if (this.doc)
          yield this.doc;
        this.doc = doc;
        this.atDirectives = false;
        break;
      }
      case "byte-order-mark":
      case "space":
        break;
      case "comment":
      case "newline":
        this.prelude.push(token.source);
        break;
      case "error": {
        const msg = token.source ? `${token.message}: ${JSON.stringify(token.source)}` : token.message;
        const error = new YAMLParseError(getErrorPos(token), "UNEXPECTED_TOKEN", msg);
        if (this.atDirectives || !this.doc)
          this.errors.push(error);
        else
          this.doc.errors.push(error);
        break;
      }
      case "doc-end": {
        if (!this.doc) {
          const msg = "Unexpected doc-end without preceding document";
          this.errors.push(new YAMLParseError(getErrorPos(token), "UNEXPECTED_TOKEN", msg));
          break;
        }
        this.doc.directives.docEnd = true;
        const end = resolveEnd(token.end, token.offset + token.source.length, this.doc.options.strict, this.onError);
        this.decorate(this.doc, true);
        if (end.comment) {
          const dc = this.doc.comment;
          this.doc.comment = dc ? `${dc}
${end.comment}` : end.comment;
        }
        this.doc.range[2] = end.offset;
        break;
      }
      default:
        this.errors.push(new YAMLParseError(getErrorPos(token), "UNEXPECTED_TOKEN", `Unsupported token ${token.type}`));
    }
  }
  /**
   * Call at end of input to yield any remaining document.
   *
   * @param forceDoc - If the stream contains no document, still emit a final document including any comments and directives that would be applied to a subsequent document.
   * @param endOffset - Should be set if `forceDoc` is also set, to set the document range end and to indicate errors correctly.
   */
  *end(forceDoc = false, endOffset = -1) {
    if (this.doc) {
      this.decorate(this.doc, true);
      yield this.doc;
      this.doc = null;
    } else if (forceDoc) {
      const opts = Object.assign({ _directives: this.directives }, this.options);
      const doc = new Document(void 0, opts);
      if (this.atDirectives)
        this.onError(endOffset, "MISSING_CHAR", "Missing directives-end indicator line");
      doc.range = [0, endOffset, endOffset];
      this.decorate(doc, false);
      yield doc;
    }
  }
};

// node_modules/yaml/browser/dist/parse/line-counter.js
var LineCounter = class {
  constructor() {
    this.lineStarts = [];
    this.addNewLine = (offset) => this.lineStarts.push(offset);
    this.linePos = (offset) => {
      let low = 0;
      let high = this.lineStarts.length;
      while (low < high) {
        const mid = low + high >> 1;
        if (this.lineStarts[mid] < offset)
          low = mid + 1;
        else
          high = mid;
      }
      if (this.lineStarts[low] === offset)
        return { line: low + 1, col: 1 };
      if (low === 0)
        return { line: 0, col: offset };
      const start = this.lineStarts[low - 1];
      return { line: low, col: offset - start + 1 };
    };
  }
};

// node_modules/yaml/browser/dist/parse/cst-visit.js
var BREAK2 = Symbol("break visit");
var SKIP2 = Symbol("skip children");
var REMOVE2 = Symbol("remove item");
function visit2(cst, visitor) {
  if ("type" in cst && cst.type === "document")
    cst = { start: cst.start, value: cst.value };
  _visit(Object.freeze([]), cst, visitor);
}
visit2.BREAK = BREAK2;
visit2.SKIP = SKIP2;
visit2.REMOVE = REMOVE2;
visit2.itemAtPath = (cst, path) => {
  let item = cst;
  for (const [field, index] of path) {
    const tok = item == null ? void 0 : item[field];
    if (tok && "items" in tok) {
      item = tok.items[index];
    } else
      return void 0;
  }
  return item;
};
visit2.parentCollection = (cst, path) => {
  const parent = visit2.itemAtPath(cst, path.slice(0, -1));
  const field = path[path.length - 1][0];
  const coll = parent == null ? void 0 : parent[field];
  if (coll && "items" in coll)
    return coll;
  throw new Error("Parent collection not found");
};
function _visit(path, item, visitor) {
  let ctrl = visitor(item, path);
  if (typeof ctrl === "symbol")
    return ctrl;
  for (const field of ["key", "value"]) {
    const token = item[field];
    if (token && "items" in token) {
      for (let i = 0; i < token.items.length; ++i) {
        const ci = _visit(Object.freeze(path.concat([[field, i]])), token.items[i], visitor);
        if (typeof ci === "number")
          i = ci - 1;
        else if (ci === BREAK2)
          return BREAK2;
        else if (ci === REMOVE2) {
          token.items.splice(i, 1);
          i -= 1;
        }
      }
      if (typeof ctrl === "function" && field === "key")
        ctrl = ctrl(item, path);
    }
  }
  return typeof ctrl === "function" ? ctrl(item, path) : ctrl;
}

// node_modules/yaml/browser/dist/parse/cst.js
var BOM = "\uFEFF";
var DOCUMENT = "";
var FLOW_END = "";
var SCALAR2 = "";
function tokenType(source) {
  switch (source) {
    case BOM:
      return "byte-order-mark";
    case DOCUMENT:
      return "doc-mode";
    case FLOW_END:
      return "flow-error-end";
    case SCALAR2:
      return "scalar";
    case "---":
      return "doc-start";
    case "...":
      return "doc-end";
    case "":
    case "\n":
    case "\r\n":
      return "newline";
    case "-":
      return "seq-item-ind";
    case "?":
      return "explicit-key-ind";
    case ":":
      return "map-value-ind";
    case "{":
      return "flow-map-start";
    case "}":
      return "flow-map-end";
    case "[":
      return "flow-seq-start";
    case "]":
      return "flow-seq-end";
    case ",":
      return "comma";
  }
  switch (source[0]) {
    case " ":
    case "	":
      return "space";
    case "#":
      return "comment";
    case "%":
      return "directive-line";
    case "*":
      return "alias";
    case "&":
      return "anchor";
    case "!":
      return "tag";
    case "'":
      return "single-quoted-scalar";
    case '"':
      return "double-quoted-scalar";
    case "|":
    case ">":
      return "block-scalar-header";
  }
  return null;
}

// node_modules/yaml/browser/dist/parse/lexer.js
function isEmpty(ch) {
  switch (ch) {
    case void 0:
    case " ":
    case "\n":
    case "\r":
    case "	":
      return true;
    default:
      return false;
  }
}
var hexDigits = new Set("0123456789ABCDEFabcdef");
var tagChars = new Set("0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz-#;/?:@&=+$_.!~*'()");
var flowIndicatorChars = new Set(",[]{}");
var invalidAnchorChars = new Set(" ,[]{}\n\r	");
var isNotAnchorChar = (ch) => !ch || invalidAnchorChars.has(ch);
var Lexer = class {
  constructor() {
    this.atEnd = false;
    this.blockScalarIndent = -1;
    this.blockScalarKeep = false;
    this.buffer = "";
    this.flowKey = false;
    this.flowLevel = 0;
    this.indentNext = 0;
    this.indentValue = 0;
    this.lineEndPos = null;
    this.next = null;
    this.pos = 0;
  }
  /**
   * Generate YAML tokens from the `source` string. If `incomplete`,
   * a part of the last line may be left as a buffer for the next call.
   *
   * @returns A generator of lexical tokens
   */
  *lex(source, incomplete = false) {
    if (source) {
      if (typeof source !== "string")
        throw TypeError("source is not a string");
      this.buffer = this.buffer ? this.buffer + source : source;
      this.lineEndPos = null;
    }
    this.atEnd = !incomplete;
    let next = this.next ?? "stream";
    while (next && (incomplete || this.hasChars(1)))
      next = yield* this.parseNext(next);
  }
  atLineEnd() {
    let i = this.pos;
    let ch = this.buffer[i];
    while (ch === " " || ch === "	")
      ch = this.buffer[++i];
    if (!ch || ch === "#" || ch === "\n")
      return true;
    if (ch === "\r")
      return this.buffer[i + 1] === "\n";
    return false;
  }
  charAt(n) {
    return this.buffer[this.pos + n];
  }
  continueScalar(offset) {
    let ch = this.buffer[offset];
    if (this.indentNext > 0) {
      let indent = 0;
      while (ch === " ")
        ch = this.buffer[++indent + offset];
      if (ch === "\r") {
        const next = this.buffer[indent + offset + 1];
        if (next === "\n" || !next && !this.atEnd)
          return offset + indent + 1;
      }
      return ch === "\n" || indent >= this.indentNext || !ch && !this.atEnd ? offset + indent : -1;
    }
    if (ch === "-" || ch === ".") {
      const dt = this.buffer.substr(offset, 3);
      if ((dt === "---" || dt === "...") && isEmpty(this.buffer[offset + 3]))
        return -1;
    }
    return offset;
  }
  getLine() {
    let end = this.lineEndPos;
    if (typeof end !== "number" || end !== -1 && end < this.pos) {
      end = this.buffer.indexOf("\n", this.pos);
      this.lineEndPos = end;
    }
    if (end === -1)
      return this.atEnd ? this.buffer.substring(this.pos) : null;
    if (this.buffer[end - 1] === "\r")
      end -= 1;
    return this.buffer.substring(this.pos, end);
  }
  hasChars(n) {
    return this.pos + n <= this.buffer.length;
  }
  setNext(state) {
    this.buffer = this.buffer.substring(this.pos);
    this.pos = 0;
    this.lineEndPos = null;
    this.next = state;
    return null;
  }
  peek(n) {
    return this.buffer.substr(this.pos, n);
  }
  *parseNext(next) {
    switch (next) {
      case "stream":
        return yield* this.parseStream();
      case "line-start":
        return yield* this.parseLineStart();
      case "block-start":
        return yield* this.parseBlockStart();
      case "doc":
        return yield* this.parseDocument();
      case "flow":
        return yield* this.parseFlowCollection();
      case "quoted-scalar":
        return yield* this.parseQuotedScalar();
      case "block-scalar":
        return yield* this.parseBlockScalar();
      case "plain-scalar":
        return yield* this.parsePlainScalar();
    }
  }
  *parseStream() {
    let line = this.getLine();
    if (line === null)
      return this.setNext("stream");
    if (line[0] === BOM) {
      yield* this.pushCount(1);
      line = line.substring(1);
    }
    if (line[0] === "%") {
      let dirEnd = line.length;
      let cs = line.indexOf("#");
      while (cs !== -1) {
        const ch = line[cs - 1];
        if (ch === " " || ch === "	") {
          dirEnd = cs - 1;
          break;
        } else {
          cs = line.indexOf("#", cs + 1);
        }
      }
      while (true) {
        const ch = line[dirEnd - 1];
        if (ch === " " || ch === "	")
          dirEnd -= 1;
        else
          break;
      }
      const n = (yield* this.pushCount(dirEnd)) + (yield* this.pushSpaces(true));
      yield* this.pushCount(line.length - n);
      this.pushNewline();
      return "stream";
    }
    if (this.atLineEnd()) {
      const sp = yield* this.pushSpaces(true);
      yield* this.pushCount(line.length - sp);
      yield* this.pushNewline();
      return "stream";
    }
    yield DOCUMENT;
    return yield* this.parseLineStart();
  }
  *parseLineStart() {
    const ch = this.charAt(0);
    if (!ch && !this.atEnd)
      return this.setNext("line-start");
    if (ch === "-" || ch === ".") {
      if (!this.atEnd && !this.hasChars(4))
        return this.setNext("line-start");
      const s = this.peek(3);
      if ((s === "---" || s === "...") && isEmpty(this.charAt(3))) {
        yield* this.pushCount(3);
        this.indentValue = 0;
        this.indentNext = 0;
        return s === "---" ? "doc" : "stream";
      }
    }
    this.indentValue = yield* this.pushSpaces(false);
    if (this.indentNext > this.indentValue && !isEmpty(this.charAt(1)))
      this.indentNext = this.indentValue;
    return yield* this.parseBlockStart();
  }
  *parseBlockStart() {
    const [ch0, ch1] = this.peek(2);
    if (!ch1 && !this.atEnd)
      return this.setNext("block-start");
    if ((ch0 === "-" || ch0 === "?" || ch0 === ":") && isEmpty(ch1)) {
      const n = (yield* this.pushCount(1)) + (yield* this.pushSpaces(true));
      this.indentNext = this.indentValue + 1;
      this.indentValue += n;
      return yield* this.parseBlockStart();
    }
    return "doc";
  }
  *parseDocument() {
    yield* this.pushSpaces(true);
    const line = this.getLine();
    if (line === null)
      return this.setNext("doc");
    let n = yield* this.pushIndicators();
    switch (line[n]) {
      case "#":
        yield* this.pushCount(line.length - n);
      case void 0:
        yield* this.pushNewline();
        return yield* this.parseLineStart();
      case "{":
      case "[":
        yield* this.pushCount(1);
        this.flowKey = false;
        this.flowLevel = 1;
        return "flow";
      case "}":
      case "]":
        yield* this.pushCount(1);
        return "doc";
      case "*":
        yield* this.pushUntil(isNotAnchorChar);
        return "doc";
      case '"':
      case "'":
        return yield* this.parseQuotedScalar();
      case "|":
      case ">":
        n += yield* this.parseBlockScalarHeader();
        n += yield* this.pushSpaces(true);
        yield* this.pushCount(line.length - n);
        yield* this.pushNewline();
        return yield* this.parseBlockScalar();
      default:
        return yield* this.parsePlainScalar();
    }
  }
  *parseFlowCollection() {
    let nl, sp;
    let indent = -1;
    do {
      nl = yield* this.pushNewline();
      if (nl > 0) {
        sp = yield* this.pushSpaces(false);
        this.indentValue = indent = sp;
      } else {
        sp = 0;
      }
      sp += yield* this.pushSpaces(true);
    } while (nl + sp > 0);
    const line = this.getLine();
    if (line === null)
      return this.setNext("flow");
    if (indent !== -1 && indent < this.indentNext && line[0] !== "#" || indent === 0 && (line.startsWith("---") || line.startsWith("...")) && isEmpty(line[3])) {
      const atFlowEndMarker = indent === this.indentNext - 1 && this.flowLevel === 1 && (line[0] === "]" || line[0] === "}");
      if (!atFlowEndMarker) {
        this.flowLevel = 0;
        yield FLOW_END;
        return yield* this.parseLineStart();
      }
    }
    let n = 0;
    while (line[n] === ",") {
      n += yield* this.pushCount(1);
      n += yield* this.pushSpaces(true);
      this.flowKey = false;
    }
    n += yield* this.pushIndicators();
    switch (line[n]) {
      case void 0:
        return "flow";
      case "#":
        yield* this.pushCount(line.length - n);
        return "flow";
      case "{":
      case "[":
        yield* this.pushCount(1);
        this.flowKey = false;
        this.flowLevel += 1;
        return "flow";
      case "}":
      case "]":
        yield* this.pushCount(1);
        this.flowKey = true;
        this.flowLevel -= 1;
        return this.flowLevel ? "flow" : "doc";
      case "*":
        yield* this.pushUntil(isNotAnchorChar);
        return "flow";
      case '"':
      case "'":
        this.flowKey = true;
        return yield* this.parseQuotedScalar();
      case ":": {
        const next = this.charAt(1);
        if (this.flowKey || isEmpty(next) || next === ",") {
          this.flowKey = false;
          yield* this.pushCount(1);
          yield* this.pushSpaces(true);
          return "flow";
        }
      }
      default:
        this.flowKey = false;
        return yield* this.parsePlainScalar();
    }
  }
  *parseQuotedScalar() {
    const quote = this.charAt(0);
    let end = this.buffer.indexOf(quote, this.pos + 1);
    if (quote === "'") {
      while (end !== -1 && this.buffer[end + 1] === "'")
        end = this.buffer.indexOf("'", end + 2);
    } else {
      while (end !== -1) {
        let n = 0;
        while (this.buffer[end - 1 - n] === "\\")
          n += 1;
        if (n % 2 === 0)
          break;
        end = this.buffer.indexOf('"', end + 1);
      }
    }
    const qb = this.buffer.substring(0, end);
    let nl = qb.indexOf("\n", this.pos);
    if (nl !== -1) {
      while (nl !== -1) {
        const cs = this.continueScalar(nl + 1);
        if (cs === -1)
          break;
        nl = qb.indexOf("\n", cs);
      }
      if (nl !== -1) {
        end = nl - (qb[nl - 1] === "\r" ? 2 : 1);
      }
    }
    if (end === -1) {
      if (!this.atEnd)
        return this.setNext("quoted-scalar");
      end = this.buffer.length;
    }
    yield* this.pushToIndex(end + 1, false);
    return this.flowLevel ? "flow" : "doc";
  }
  *parseBlockScalarHeader() {
    this.blockScalarIndent = -1;
    this.blockScalarKeep = false;
    let i = this.pos;
    while (true) {
      const ch = this.buffer[++i];
      if (ch === "+")
        this.blockScalarKeep = true;
      else if (ch > "0" && ch <= "9")
        this.blockScalarIndent = Number(ch) - 1;
      else if (ch !== "-")
        break;
    }
    return yield* this.pushUntil((ch) => isEmpty(ch) || ch === "#");
  }
  *parseBlockScalar() {
    let nl = this.pos - 1;
    let indent = 0;
    let ch;
    loop: for (let i2 = this.pos; ch = this.buffer[i2]; ++i2) {
      switch (ch) {
        case " ":
          indent += 1;
          break;
        case "\n":
          nl = i2;
          indent = 0;
          break;
        case "\r": {
          const next = this.buffer[i2 + 1];
          if (!next && !this.atEnd)
            return this.setNext("block-scalar");
          if (next === "\n")
            break;
        }
        default:
          break loop;
      }
    }
    if (!ch && !this.atEnd)
      return this.setNext("block-scalar");
    if (indent >= this.indentNext) {
      if (this.blockScalarIndent === -1)
        this.indentNext = indent;
      else {
        this.indentNext = this.blockScalarIndent + (this.indentNext === 0 ? 1 : this.indentNext);
      }
      do {
        const cs = this.continueScalar(nl + 1);
        if (cs === -1)
          break;
        nl = this.buffer.indexOf("\n", cs);
      } while (nl !== -1);
      if (nl === -1) {
        if (!this.atEnd)
          return this.setNext("block-scalar");
        nl = this.buffer.length;
      }
    }
    let i = nl + 1;
    ch = this.buffer[i];
    while (ch === " ")
      ch = this.buffer[++i];
    if (ch === "	") {
      while (ch === "	" || ch === " " || ch === "\r" || ch === "\n")
        ch = this.buffer[++i];
      nl = i - 1;
    } else if (!this.blockScalarKeep) {
      do {
        let i2 = nl - 1;
        let ch2 = this.buffer[i2];
        if (ch2 === "\r")
          ch2 = this.buffer[--i2];
        const lastChar = i2;
        while (ch2 === " ")
          ch2 = this.buffer[--i2];
        if (ch2 === "\n" && i2 >= this.pos && i2 + 1 + indent > lastChar)
          nl = i2;
        else
          break;
      } while (true);
    }
    yield SCALAR2;
    yield* this.pushToIndex(nl + 1, true);
    return yield* this.parseLineStart();
  }
  *parsePlainScalar() {
    const inFlow = this.flowLevel > 0;
    let end = this.pos - 1;
    let i = this.pos - 1;
    let ch;
    while (ch = this.buffer[++i]) {
      if (ch === ":") {
        const next = this.buffer[i + 1];
        if (isEmpty(next) || inFlow && flowIndicatorChars.has(next))
          break;
        end = i;
      } else if (isEmpty(ch)) {
        let next = this.buffer[i + 1];
        if (ch === "\r") {
          if (next === "\n") {
            i += 1;
            ch = "\n";
            next = this.buffer[i + 1];
          } else
            end = i;
        }
        if (next === "#" || inFlow && flowIndicatorChars.has(next))
          break;
        if (ch === "\n") {
          const cs = this.continueScalar(i + 1);
          if (cs === -1)
            break;
          i = Math.max(i, cs - 2);
        }
      } else {
        if (inFlow && flowIndicatorChars.has(ch))
          break;
        end = i;
      }
    }
    if (!ch && !this.atEnd)
      return this.setNext("plain-scalar");
    yield SCALAR2;
    yield* this.pushToIndex(end + 1, true);
    return inFlow ? "flow" : "doc";
  }
  *pushCount(n) {
    if (n > 0) {
      yield this.buffer.substr(this.pos, n);
      this.pos += n;
      return n;
    }
    return 0;
  }
  *pushToIndex(i, allowEmpty) {
    const s = this.buffer.slice(this.pos, i);
    if (s) {
      yield s;
      this.pos += s.length;
      return s.length;
    } else if (allowEmpty)
      yield "";
    return 0;
  }
  *pushIndicators() {
    switch (this.charAt(0)) {
      case "!":
        return (yield* this.pushTag()) + (yield* this.pushSpaces(true)) + (yield* this.pushIndicators());
      case "&":
        return (yield* this.pushUntil(isNotAnchorChar)) + (yield* this.pushSpaces(true)) + (yield* this.pushIndicators());
      case "-":
      case "?":
      case ":": {
        const inFlow = this.flowLevel > 0;
        const ch1 = this.charAt(1);
        if (isEmpty(ch1) || inFlow && flowIndicatorChars.has(ch1)) {
          if (!inFlow)
            this.indentNext = this.indentValue + 1;
          else if (this.flowKey)
            this.flowKey = false;
          return (yield* this.pushCount(1)) + (yield* this.pushSpaces(true)) + (yield* this.pushIndicators());
        }
      }
    }
    return 0;
  }
  *pushTag() {
    if (this.charAt(1) === "<") {
      let i = this.pos + 2;
      let ch = this.buffer[i];
      while (!isEmpty(ch) && ch !== ">")
        ch = this.buffer[++i];
      return yield* this.pushToIndex(ch === ">" ? i + 1 : i, false);
    } else {
      let i = this.pos + 1;
      let ch = this.buffer[i];
      while (ch) {
        if (tagChars.has(ch))
          ch = this.buffer[++i];
        else if (ch === "%" && hexDigits.has(this.buffer[i + 1]) && hexDigits.has(this.buffer[i + 2])) {
          ch = this.buffer[i += 3];
        } else
          break;
      }
      return yield* this.pushToIndex(i, false);
    }
  }
  *pushNewline() {
    const ch = this.buffer[this.pos];
    if (ch === "\n")
      return yield* this.pushCount(1);
    else if (ch === "\r" && this.charAt(1) === "\n")
      return yield* this.pushCount(2);
    else
      return 0;
  }
  *pushSpaces(allowTabs) {
    let i = this.pos - 1;
    let ch;
    do {
      ch = this.buffer[++i];
    } while (ch === " " || allowTabs && ch === "	");
    const n = i - this.pos;
    if (n > 0) {
      yield this.buffer.substr(this.pos, n);
      this.pos = i;
    }
    return n;
  }
  *pushUntil(test) {
    let i = this.pos;
    let ch = this.buffer[i];
    while (!test(ch))
      ch = this.buffer[++i];
    return yield* this.pushToIndex(i, false);
  }
};

// node_modules/yaml/browser/dist/parse/parser.js
function includesToken(list, type) {
  for (let i = 0; i < list.length; ++i)
    if (list[i].type === type)
      return true;
  return false;
}
function findNonEmptyIndex(list) {
  for (let i = 0; i < list.length; ++i) {
    switch (list[i].type) {
      case "space":
      case "comment":
      case "newline":
        break;
      default:
        return i;
    }
  }
  return -1;
}
function isFlowToken(token) {
  switch (token == null ? void 0 : token.type) {
    case "alias":
    case "scalar":
    case "single-quoted-scalar":
    case "double-quoted-scalar":
    case "flow-collection":
      return true;
    default:
      return false;
  }
}
function getPrevProps(parent) {
  switch (parent.type) {
    case "document":
      return parent.start;
    case "block-map": {
      const it = parent.items[parent.items.length - 1];
      return it.sep ?? it.start;
    }
    case "block-seq":
      return parent.items[parent.items.length - 1].start;
    default:
      return [];
  }
}
function getFirstKeyStartProps(prev) {
  var _a;
  if (prev.length === 0)
    return [];
  let i = prev.length;
  loop: while (--i >= 0) {
    switch (prev[i].type) {
      case "doc-start":
      case "explicit-key-ind":
      case "map-value-ind":
      case "seq-item-ind":
      case "newline":
        break loop;
    }
  }
  while (((_a = prev[++i]) == null ? void 0 : _a.type) === "space") {
  }
  return prev.splice(i, prev.length);
}
function fixFlowSeqItems(fc) {
  if (fc.start.type === "flow-seq-start") {
    for (const it of fc.items) {
      if (it.sep && !it.value && !includesToken(it.start, "explicit-key-ind") && !includesToken(it.sep, "map-value-ind")) {
        if (it.key)
          it.value = it.key;
        delete it.key;
        if (isFlowToken(it.value)) {
          if (it.value.end)
            Array.prototype.push.apply(it.value.end, it.sep);
          else
            it.value.end = it.sep;
        } else
          Array.prototype.push.apply(it.start, it.sep);
        delete it.sep;
      }
    }
  }
}
var Parser = class {
  /**
   * @param onNewLine - If defined, called separately with the start position of
   *   each new line (in `parse()`, including the start of input).
   */
  constructor(onNewLine) {
    this.atNewLine = true;
    this.atScalar = false;
    this.indent = 0;
    this.offset = 0;
    this.onKeyLine = false;
    this.stack = [];
    this.source = "";
    this.type = "";
    this.lexer = new Lexer();
    this.onNewLine = onNewLine;
  }
  /**
   * Parse `source` as a YAML stream.
   * If `incomplete`, a part of the last line may be left as a buffer for the next call.
   *
   * Errors are not thrown, but yielded as `{ type: 'error', message }` tokens.
   *
   * @returns A generator of tokens representing each directive, document, and other structure.
   */
  *parse(source, incomplete = false) {
    if (this.onNewLine && this.offset === 0)
      this.onNewLine(0);
    for (const lexeme of this.lexer.lex(source, incomplete))
      yield* this.next(lexeme);
    if (!incomplete)
      yield* this.end();
  }
  /**
   * Advance the parser by the `source` of one lexical token.
   */
  *next(source) {
    this.source = source;
    if (this.atScalar) {
      this.atScalar = false;
      yield* this.step();
      this.offset += source.length;
      return;
    }
    const type = tokenType(source);
    if (!type) {
      const message = `Not a YAML token: ${source}`;
      yield* this.pop({ type: "error", offset: this.offset, message, source });
      this.offset += source.length;
    } else if (type === "scalar") {
      this.atNewLine = false;
      this.atScalar = true;
      this.type = "scalar";
    } else {
      this.type = type;
      yield* this.step();
      switch (type) {
        case "newline":
          this.atNewLine = true;
          this.indent = 0;
          if (this.onNewLine)
            this.onNewLine(this.offset + source.length);
          break;
        case "space":
          if (this.atNewLine && source[0] === " ")
            this.indent += source.length;
          break;
        case "explicit-key-ind":
        case "map-value-ind":
        case "seq-item-ind":
          if (this.atNewLine)
            this.indent += source.length;
          break;
        case "doc-mode":
        case "flow-error-end":
          return;
        default:
          this.atNewLine = false;
      }
      this.offset += source.length;
    }
  }
  /** Call at end of input to push out any remaining constructions */
  *end() {
    while (this.stack.length > 0)
      yield* this.pop();
  }
  get sourceToken() {
    const st = {
      type: this.type,
      offset: this.offset,
      indent: this.indent,
      source: this.source
    };
    return st;
  }
  *step() {
    const top = this.peek(1);
    if (this.type === "doc-end" && (!top || top.type !== "doc-end")) {
      while (this.stack.length > 0)
        yield* this.pop();
      this.stack.push({
        type: "doc-end",
        offset: this.offset,
        source: this.source
      });
      return;
    }
    if (!top)
      return yield* this.stream();
    switch (top.type) {
      case "document":
        return yield* this.document(top);
      case "alias":
      case "scalar":
      case "single-quoted-scalar":
      case "double-quoted-scalar":
        return yield* this.scalar(top);
      case "block-scalar":
        return yield* this.blockScalar(top);
      case "block-map":
        return yield* this.blockMap(top);
      case "block-seq":
        return yield* this.blockSequence(top);
      case "flow-collection":
        return yield* this.flowCollection(top);
      case "doc-end":
        return yield* this.documentEnd(top);
    }
    yield* this.pop();
  }
  peek(n) {
    return this.stack[this.stack.length - n];
  }
  *pop(error) {
    const token = error ?? this.stack.pop();
    if (!token) {
      const message = "Tried to pop an empty stack";
      yield { type: "error", offset: this.offset, source: "", message };
    } else if (this.stack.length === 0) {
      yield token;
    } else {
      const top = this.peek(1);
      if (token.type === "block-scalar") {
        token.indent = "indent" in top ? top.indent : 0;
      } else if (token.type === "flow-collection" && top.type === "document") {
        token.indent = 0;
      }
      if (token.type === "flow-collection")
        fixFlowSeqItems(token);
      switch (top.type) {
        case "document":
          top.value = token;
          break;
        case "block-scalar":
          top.props.push(token);
          break;
        case "block-map": {
          const it = top.items[top.items.length - 1];
          if (it.value) {
            top.items.push({ start: [], key: token, sep: [] });
            this.onKeyLine = true;
            return;
          } else if (it.sep) {
            it.value = token;
          } else {
            Object.assign(it, { key: token, sep: [] });
            this.onKeyLine = !it.explicitKey;
            return;
          }
          break;
        }
        case "block-seq": {
          const it = top.items[top.items.length - 1];
          if (it.value)
            top.items.push({ start: [], value: token });
          else
            it.value = token;
          break;
        }
        case "flow-collection": {
          const it = top.items[top.items.length - 1];
          if (!it || it.value)
            top.items.push({ start: [], key: token, sep: [] });
          else if (it.sep)
            it.value = token;
          else
            Object.assign(it, { key: token, sep: [] });
          return;
        }
        default:
          yield* this.pop();
          yield* this.pop(token);
      }
      if ((top.type === "document" || top.type === "block-map" || top.type === "block-seq") && (token.type === "block-map" || token.type === "block-seq")) {
        const last = token.items[token.items.length - 1];
        if (last && !last.sep && !last.value && last.start.length > 0 && findNonEmptyIndex(last.start) === -1 && (token.indent === 0 || last.start.every((st) => st.type !== "comment" || st.indent < token.indent))) {
          if (top.type === "document")
            top.end = last.start;
          else
            top.items.push({ start: last.start });
          token.items.splice(-1, 1);
        }
      }
    }
  }
  *stream() {
    switch (this.type) {
      case "directive-line":
        yield { type: "directive", offset: this.offset, source: this.source };
        return;
      case "byte-order-mark":
      case "space":
      case "comment":
      case "newline":
        yield this.sourceToken;
        return;
      case "doc-mode":
      case "doc-start": {
        const doc = {
          type: "document",
          offset: this.offset,
          start: []
        };
        if (this.type === "doc-start")
          doc.start.push(this.sourceToken);
        this.stack.push(doc);
        return;
      }
    }
    yield {
      type: "error",
      offset: this.offset,
      message: `Unexpected ${this.type} token in YAML stream`,
      source: this.source
    };
  }
  *document(doc) {
    if (doc.value)
      return yield* this.lineEnd(doc);
    switch (this.type) {
      case "doc-start": {
        if (findNonEmptyIndex(doc.start) !== -1) {
          yield* this.pop();
          yield* this.step();
        } else
          doc.start.push(this.sourceToken);
        return;
      }
      case "anchor":
      case "tag":
      case "space":
      case "comment":
      case "newline":
        doc.start.push(this.sourceToken);
        return;
    }
    const bv = this.startBlockValue(doc);
    if (bv)
      this.stack.push(bv);
    else {
      yield {
        type: "error",
        offset: this.offset,
        message: `Unexpected ${this.type} token in YAML document`,
        source: this.source
      };
    }
  }
  *scalar(scalar) {
    if (this.type === "map-value-ind") {
      const prev = getPrevProps(this.peek(2));
      const start = getFirstKeyStartProps(prev);
      let sep;
      if (scalar.end) {
        sep = scalar.end;
        sep.push(this.sourceToken);
        delete scalar.end;
      } else
        sep = [this.sourceToken];
      const map2 = {
        type: "block-map",
        offset: scalar.offset,
        indent: scalar.indent,
        items: [{ start, key: scalar, sep }]
      };
      this.onKeyLine = true;
      this.stack[this.stack.length - 1] = map2;
    } else
      yield* this.lineEnd(scalar);
  }
  *blockScalar(scalar) {
    switch (this.type) {
      case "space":
      case "comment":
      case "newline":
        scalar.props.push(this.sourceToken);
        return;
      case "scalar":
        scalar.source = this.source;
        this.atNewLine = true;
        this.indent = 0;
        if (this.onNewLine) {
          let nl = this.source.indexOf("\n") + 1;
          while (nl !== 0) {
            this.onNewLine(this.offset + nl);
            nl = this.source.indexOf("\n", nl) + 1;
          }
        }
        yield* this.pop();
        break;
      default:
        yield* this.pop();
        yield* this.step();
    }
  }
  *blockMap(map2) {
    var _a;
    const it = map2.items[map2.items.length - 1];
    switch (this.type) {
      case "newline":
        this.onKeyLine = false;
        if (it.value) {
          const end = "end" in it.value ? it.value.end : void 0;
          const last = Array.isArray(end) ? end[end.length - 1] : void 0;
          if ((last == null ? void 0 : last.type) === "comment")
            end == null ? void 0 : end.push(this.sourceToken);
          else
            map2.items.push({ start: [this.sourceToken] });
        } else if (it.sep) {
          it.sep.push(this.sourceToken);
        } else {
          it.start.push(this.sourceToken);
        }
        return;
      case "space":
      case "comment":
        if (it.value) {
          map2.items.push({ start: [this.sourceToken] });
        } else if (it.sep) {
          it.sep.push(this.sourceToken);
        } else {
          if (this.atIndentedComment(it.start, map2.indent)) {
            const prev = map2.items[map2.items.length - 2];
            const end = (_a = prev == null ? void 0 : prev.value) == null ? void 0 : _a.end;
            if (Array.isArray(end)) {
              Array.prototype.push.apply(end, it.start);
              end.push(this.sourceToken);
              map2.items.pop();
              return;
            }
          }
          it.start.push(this.sourceToken);
        }
        return;
    }
    if (this.indent >= map2.indent) {
      const atMapIndent = !this.onKeyLine && this.indent === map2.indent;
      const atNextItem = atMapIndent && (it.sep || it.explicitKey) && this.type !== "seq-item-ind";
      let start = [];
      if (atNextItem && it.sep && !it.value) {
        const nl = [];
        for (let i = 0; i < it.sep.length; ++i) {
          const st = it.sep[i];
          switch (st.type) {
            case "newline":
              nl.push(i);
              break;
            case "space":
              break;
            case "comment":
              if (st.indent > map2.indent)
                nl.length = 0;
              break;
            default:
              nl.length = 0;
          }
        }
        if (nl.length >= 2)
          start = it.sep.splice(nl[1]);
      }
      switch (this.type) {
        case "anchor":
        case "tag":
          if (atNextItem || it.value) {
            start.push(this.sourceToken);
            map2.items.push({ start });
            this.onKeyLine = true;
          } else if (it.sep) {
            it.sep.push(this.sourceToken);
          } else {
            it.start.push(this.sourceToken);
          }
          return;
        case "explicit-key-ind":
          if (!it.sep && !it.explicitKey) {
            it.start.push(this.sourceToken);
            it.explicitKey = true;
          } else if (atNextItem || it.value) {
            start.push(this.sourceToken);
            map2.items.push({ start, explicitKey: true });
          } else {
            this.stack.push({
              type: "block-map",
              offset: this.offset,
              indent: this.indent,
              items: [{ start: [this.sourceToken], explicitKey: true }]
            });
          }
          this.onKeyLine = true;
          return;
        case "map-value-ind":
          if (it.explicitKey) {
            if (!it.sep) {
              if (includesToken(it.start, "newline")) {
                Object.assign(it, { key: null, sep: [this.sourceToken] });
              } else {
                const start2 = getFirstKeyStartProps(it.start);
                this.stack.push({
                  type: "block-map",
                  offset: this.offset,
                  indent: this.indent,
                  items: [{ start: start2, key: null, sep: [this.sourceToken] }]
                });
              }
            } else if (it.value) {
              map2.items.push({ start: [], key: null, sep: [this.sourceToken] });
            } else if (includesToken(it.sep, "map-value-ind")) {
              this.stack.push({
                type: "block-map",
                offset: this.offset,
                indent: this.indent,
                items: [{ start, key: null, sep: [this.sourceToken] }]
              });
            } else if (isFlowToken(it.key) && !includesToken(it.sep, "newline")) {
              const start2 = getFirstKeyStartProps(it.start);
              const key = it.key;
              const sep = it.sep;
              sep.push(this.sourceToken);
              delete it.key;
              delete it.sep;
              this.stack.push({
                type: "block-map",
                offset: this.offset,
                indent: this.indent,
                items: [{ start: start2, key, sep }]
              });
            } else if (start.length > 0) {
              it.sep = it.sep.concat(start, this.sourceToken);
            } else {
              it.sep.push(this.sourceToken);
            }
          } else {
            if (!it.sep) {
              Object.assign(it, { key: null, sep: [this.sourceToken] });
            } else if (it.value || atNextItem) {
              map2.items.push({ start, key: null, sep: [this.sourceToken] });
            } else if (includesToken(it.sep, "map-value-ind")) {
              this.stack.push({
                type: "block-map",
                offset: this.offset,
                indent: this.indent,
                items: [{ start: [], key: null, sep: [this.sourceToken] }]
              });
            } else {
              it.sep.push(this.sourceToken);
            }
          }
          this.onKeyLine = true;
          return;
        case "alias":
        case "scalar":
        case "single-quoted-scalar":
        case "double-quoted-scalar": {
          const fs = this.flowScalar(this.type);
          if (atNextItem || it.value) {
            map2.items.push({ start, key: fs, sep: [] });
            this.onKeyLine = true;
          } else if (it.sep) {
            this.stack.push(fs);
          } else {
            Object.assign(it, { key: fs, sep: [] });
            this.onKeyLine = true;
          }
          return;
        }
        default: {
          const bv = this.startBlockValue(map2);
          if (bv) {
            if (bv.type === "block-seq") {
              if (!it.explicitKey && it.sep && !includesToken(it.sep, "newline")) {
                yield* this.pop({
                  type: "error",
                  offset: this.offset,
                  message: "Unexpected block-seq-ind on same line with key",
                  source: this.source
                });
                return;
              }
            } else if (atMapIndent) {
              map2.items.push({ start });
            }
            this.stack.push(bv);
            return;
          }
        }
      }
    }
    yield* this.pop();
    yield* this.step();
  }
  *blockSequence(seq2) {
    var _a;
    const it = seq2.items[seq2.items.length - 1];
    switch (this.type) {
      case "newline":
        if (it.value) {
          const end = "end" in it.value ? it.value.end : void 0;
          const last = Array.isArray(end) ? end[end.length - 1] : void 0;
          if ((last == null ? void 0 : last.type) === "comment")
            end == null ? void 0 : end.push(this.sourceToken);
          else
            seq2.items.push({ start: [this.sourceToken] });
        } else
          it.start.push(this.sourceToken);
        return;
      case "space":
      case "comment":
        if (it.value)
          seq2.items.push({ start: [this.sourceToken] });
        else {
          if (this.atIndentedComment(it.start, seq2.indent)) {
            const prev = seq2.items[seq2.items.length - 2];
            const end = (_a = prev == null ? void 0 : prev.value) == null ? void 0 : _a.end;
            if (Array.isArray(end)) {
              Array.prototype.push.apply(end, it.start);
              end.push(this.sourceToken);
              seq2.items.pop();
              return;
            }
          }
          it.start.push(this.sourceToken);
        }
        return;
      case "anchor":
      case "tag":
        if (it.value || this.indent <= seq2.indent)
          break;
        it.start.push(this.sourceToken);
        return;
      case "seq-item-ind":
        if (this.indent !== seq2.indent)
          break;
        if (it.value || includesToken(it.start, "seq-item-ind"))
          seq2.items.push({ start: [this.sourceToken] });
        else
          it.start.push(this.sourceToken);
        return;
    }
    if (this.indent > seq2.indent) {
      const bv = this.startBlockValue(seq2);
      if (bv) {
        this.stack.push(bv);
        return;
      }
    }
    yield* this.pop();
    yield* this.step();
  }
  *flowCollection(fc) {
    const it = fc.items[fc.items.length - 1];
    if (this.type === "flow-error-end") {
      let top;
      do {
        yield* this.pop();
        top = this.peek(1);
      } while (top && top.type === "flow-collection");
    } else if (fc.end.length === 0) {
      switch (this.type) {
        case "comma":
        case "explicit-key-ind":
          if (!it || it.sep)
            fc.items.push({ start: [this.sourceToken] });
          else
            it.start.push(this.sourceToken);
          return;
        case "map-value-ind":
          if (!it || it.value)
            fc.items.push({ start: [], key: null, sep: [this.sourceToken] });
          else if (it.sep)
            it.sep.push(this.sourceToken);
          else
            Object.assign(it, { key: null, sep: [this.sourceToken] });
          return;
        case "space":
        case "comment":
        case "newline":
        case "anchor":
        case "tag":
          if (!it || it.value)
            fc.items.push({ start: [this.sourceToken] });
          else if (it.sep)
            it.sep.push(this.sourceToken);
          else
            it.start.push(this.sourceToken);
          return;
        case "alias":
        case "scalar":
        case "single-quoted-scalar":
        case "double-quoted-scalar": {
          const fs = this.flowScalar(this.type);
          if (!it || it.value)
            fc.items.push({ start: [], key: fs, sep: [] });
          else if (it.sep)
            this.stack.push(fs);
          else
            Object.assign(it, { key: fs, sep: [] });
          return;
        }
        case "flow-map-end":
        case "flow-seq-end":
          fc.end.push(this.sourceToken);
          return;
      }
      const bv = this.startBlockValue(fc);
      if (bv)
        this.stack.push(bv);
      else {
        yield* this.pop();
        yield* this.step();
      }
    } else {
      const parent = this.peek(2);
      if (parent.type === "block-map" && (this.type === "map-value-ind" && parent.indent === fc.indent || this.type === "newline" && !parent.items[parent.items.length - 1].sep)) {
        yield* this.pop();
        yield* this.step();
      } else if (this.type === "map-value-ind" && parent.type !== "flow-collection") {
        const prev = getPrevProps(parent);
        const start = getFirstKeyStartProps(prev);
        fixFlowSeqItems(fc);
        const sep = fc.end.splice(1, fc.end.length);
        sep.push(this.sourceToken);
        const map2 = {
          type: "block-map",
          offset: fc.offset,
          indent: fc.indent,
          items: [{ start, key: fc, sep }]
        };
        this.onKeyLine = true;
        this.stack[this.stack.length - 1] = map2;
      } else {
        yield* this.lineEnd(fc);
      }
    }
  }
  flowScalar(type) {
    if (this.onNewLine) {
      let nl = this.source.indexOf("\n") + 1;
      while (nl !== 0) {
        this.onNewLine(this.offset + nl);
        nl = this.source.indexOf("\n", nl) + 1;
      }
    }
    return {
      type,
      offset: this.offset,
      indent: this.indent,
      source: this.source
    };
  }
  startBlockValue(parent) {
    switch (this.type) {
      case "alias":
      case "scalar":
      case "single-quoted-scalar":
      case "double-quoted-scalar":
        return this.flowScalar(this.type);
      case "block-scalar-header":
        return {
          type: "block-scalar",
          offset: this.offset,
          indent: this.indent,
          props: [this.sourceToken],
          source: ""
        };
      case "flow-map-start":
      case "flow-seq-start":
        return {
          type: "flow-collection",
          offset: this.offset,
          indent: this.indent,
          start: this.sourceToken,
          items: [],
          end: []
        };
      case "seq-item-ind":
        return {
          type: "block-seq",
          offset: this.offset,
          indent: this.indent,
          items: [{ start: [this.sourceToken] }]
        };
      case "explicit-key-ind": {
        this.onKeyLine = true;
        const prev = getPrevProps(parent);
        const start = getFirstKeyStartProps(prev);
        start.push(this.sourceToken);
        return {
          type: "block-map",
          offset: this.offset,
          indent: this.indent,
          items: [{ start, explicitKey: true }]
        };
      }
      case "map-value-ind": {
        this.onKeyLine = true;
        const prev = getPrevProps(parent);
        const start = getFirstKeyStartProps(prev);
        return {
          type: "block-map",
          offset: this.offset,
          indent: this.indent,
          items: [{ start, key: null, sep: [this.sourceToken] }]
        };
      }
    }
    return null;
  }
  atIndentedComment(start, indent) {
    if (this.type !== "comment")
      return false;
    if (this.indent <= indent)
      return false;
    return start.every((st) => st.type === "newline" || st.type === "space");
  }
  *documentEnd(docEnd) {
    if (this.type !== "doc-mode") {
      if (docEnd.end)
        docEnd.end.push(this.sourceToken);
      else
        docEnd.end = [this.sourceToken];
      if (this.type === "newline")
        yield* this.pop();
    }
  }
  *lineEnd(token) {
    switch (this.type) {
      case "comma":
      case "doc-start":
      case "doc-end":
      case "flow-seq-end":
      case "flow-map-end":
      case "map-value-ind":
        yield* this.pop();
        yield* this.step();
        break;
      case "newline":
        this.onKeyLine = false;
      case "space":
      case "comment":
      default:
        if (token.end)
          token.end.push(this.sourceToken);
        else
          token.end = [this.sourceToken];
        if (this.type === "newline")
          yield* this.pop();
    }
  }
};

// node_modules/yaml/browser/dist/public-api.js
function parseOptions(options) {
  const prettyErrors = options.prettyErrors !== false;
  const lineCounter = options.lineCounter || prettyErrors && new LineCounter() || null;
  return { lineCounter, prettyErrors };
}
function parseDocument(source, options = {}) {
  const { lineCounter, prettyErrors } = parseOptions(options);
  const parser = new Parser(lineCounter == null ? void 0 : lineCounter.addNewLine);
  const composer = new Composer(options);
  let doc = null;
  for (const _doc of composer.compose(parser.parse(source), true, source.length)) {
    if (!doc)
      doc = _doc;
    else if (doc.options.logLevel !== "silent") {
      doc.errors.push(new YAMLParseError(_doc.range.slice(0, 2), "MULTIPLE_DOCS", "Source contains multiple documents; please use YAML.parseAllDocuments()"));
      break;
    }
  }
  if (prettyErrors && lineCounter) {
    doc.errors.forEach(prettifyError(source, lineCounter));
    doc.warnings.forEach(prettifyError(source, lineCounter));
  }
  return doc;
}
function parse(src, reviver, options) {
  let _reviver = void 0;
  if (typeof reviver === "function") {
    _reviver = reviver;
  } else if (options === void 0 && reviver && typeof reviver === "object") {
    options = reviver;
  }
  const doc = parseDocument(src, options);
  if (!doc)
    return null;
  doc.warnings.forEach((warning) => warn(doc.options.logLevel, warning));
  if (doc.errors.length > 0) {
    if (doc.options.logLevel !== "silent")
      throw doc.errors[0];
    else
      doc.errors = [];
  }
  return doc.toJS(Object.assign({ reviver: _reviver }, options));
}

export {
  parse,
  require_dist
};
//# sourceMappingURL=chunk-ZR3HKCUB.js.map
