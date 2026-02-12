(function($){$(document).ready(function(){addClassPwaClassForHtmlTag()
addActionGoToBackForElems($("[data-pwa-elem]"));elemsInstallPwaHandler($('[data-pwa-click="open-install-window"]'))
appInstallWindowHandler('[data-pwa-elem="app-install-window"]')
handlerInstallPwaBoxes()});function getPWADisplayMode(){const isStandalone=window.matchMedia('(display-mode: standalone)').matches;if(document.referrer.startsWith('android-app://')){return'twa';}else if(navigator.standalone||isStandalone){return'standalone';}
return'browser';}
function addClassPwaClassForHtmlTag(){if(getPWADisplayMode()!=='browser'){document.querySelector('html').classList.add('pwa')}}
function addActionGoToBackForElems(elems){if(getPWADisplayMode()==='browser')return
for(let i=0;i<elems.length;i++){const elem=elems[i];if(elem.getAttribute('data-pwa-click')==='go-to-link'){$(elem).addClass('pwa-show');}
if(elem.getAttribute('data-pwa-click')==='go-back'){$(elem).addClass('pwa-show');_addGoBackWhenClick(elem);}}
function _addGoBackWhenClick(elem){$(elem).click(function(e){e.preventDefault()
history.back()});}}
function elemsInstallPwaHandler(elems){for(let i=0;i<elems.length;i++){const elem=elems[i];$(elem).on('click',function(){$('[data-pwa-elem="app-install-window"]').addClass('pwa-show');});}}
function appInstallWindowHandler(selector_elem){const install_window=$(selector_elem)
const close_icon=install_window.find('.pwa-app-install-window__close')
const close_button=install_window.find('.pwa-app-install-window__button_cancel')
const link_reload=install_window.find('.pwa-app-install-window__link_reload')
if(!("serviceWorker"in navigator)){install_window.find('#pwa-install-window-content-install-not-ready').attr('data-reason','not-support-service-worker')}
$(close_icon).on('click',function(){install_window.removeClass('pwa-show')});$(close_button).on('click',function(){install_window.removeClass('pwa-show')});$(link_reload).on('click',function(){const SIGN_QUERY_STRING=(Boolean(location.search))?'&':'?'
let path_to_go=location.href
if(getUrlParam('pwa_open_installation_window')!='true'){path_to_go+=SIGN_QUERY_STRING+'pwa_open_installation_window=true'}
window.location.href=path_to_go;});if(getUrlParam('pwa_open_installation_window')=='true'){install_window.addClass('pwa-show')}}
function getUrlParam(name){var s=window.location.search;s=s.match(new RegExp(name+"=([^&=]+)"));return s?s[1]:false;}
async function handlerInstallPwaBoxes(){if(!("serviceWorker"in navigator)){return}
const boxes=$('.pwa-install-box')
const is_installed_pwa=await isInstalledPwa()
const is_app=getPWADisplayMode()!=='browser'
for(let i=0;i<boxes.length;i++){const box=$(boxes[i])
if(box.attr('data-browser-supports-pwa')==='support'){box.attr('data-state','computing')}
if(is_app){box.attr('data-state','install')
continue}
if(is_installed_pwa){box.attr('data-state','install')
continue}
setTimeout(()=>{if(box.attr('data-state')!=='install'){box.attr('data-state','install')}},15000);}}
async function isInstalledPwa(){if(!'getInstalledRelatedApps'in navigator)return false;try{const related_apps=await navigator.getInstalledRelatedApps();const pwa_is_installed=related_apps.length>0;return pwa_is_installed;}catch(error){return false}}})(jQuery);