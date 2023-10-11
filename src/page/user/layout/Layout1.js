import React, { useEffect } from 'react'
import { Outlet } from 'react-router-dom'
import { MenuUser } from '../component/MenuUser'
import { Footer } from '../component/Footer'
import { ScrollToTop } from '../component/ScrollToTop'
import { useDispatch } from 'react-redux'
import { getUser } from '../../../redux/action/accountAction'

export const Layout1 = () => {

  const pathname = window.location.pathname;

  const dispatch = useDispatch();

  useEffect(()=> {
    window.scrollTo(0,0);
  }, [pathname])

  useEffect(()=> {
    const jwt = JSON.parse(localStorage.getItem('jwt'));
    dispatch(getUser(jwt));

// !function() {
//   var t = window.driftt = window.drift = window.driftt || [];
//   if (!t.init) {
//     if (t.invoked) return void (window.console && console.error && console.error("Drift snippet included twice."));
//     t.invoked = !0, t.methods = [ "identify", "config", "track", "reset", "debug", "show", "ping", "page", "hide", "off", "on" ], 
//     t.factory = function(e) {
//       return function() {
//         var n = Array.prototype.slice.call(arguments);
//         return n.unshift(e), t.push(n), t;
//       };
//     }, t.methods.forEach(function(e) {
//       t[e] = t.factory(e);
//     }), t.load = function(t) {
//       var e = 3e5, n = Math.ceil(new Date() / e) * e, o = document.createElement("script");
//       o.type = "text/javascript", o.async = !0, o.crossorigin = "anonymous", o.src = "https://js.driftt.com/include/" + n + "/" + t + ".js";
//       var i = document.getElementsByTagName("script")[0];
//       i.parentNode.insertBefore(o, i);
//     };
//   }
// }();
// drift.SNIPPET_VERSION = '0.3.1';
// drift.load('d5i9nmchfnmt');
  }, []);

  return (
    <div className='user bg-[#fcfcfc]'>
      <MenuUser/>
      <div className="pt-[70px] md:pt-[60px] lg:pt-[75px] min-h-screen flex flex-col justify-between">
        <Outlet/>
        <Footer/>
      </div>
      <ScrollToTop/>
    </div>
  )
}
