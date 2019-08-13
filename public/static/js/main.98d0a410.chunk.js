(window.webpackJsonp=window.webpackJsonp||[]).push([[0],{186:function(e,t,n){},187:function(e,t,n){"use strict";n.r(t);var a=n(0),r=n.n(a),l=n(71),c=n.n(l),o=n(9),i=n(24),u=n(14),s=n(80),m=n(81),p=n(23),d=n(4),E=n(5),f=n(7),b=n(8),g=n.n(b);function v(){var e=Object(f.a)(["\n  query MeQuery {\n    me {\n      id\n      email \n      name\n      bankroll\n    }\n  }\n"]);return v=function(){return e},e}var S=g()(v());function h(){var e=Object(f.a)(["\n  query CurrencyPairInfo($fc: String, $tc: String) {\n    currencyPairInfo(tc: $tc, fc: $fc) {\n      fromCurrency \n      fromCurrencyName\n      toCurrency\n      toCurrencyName\n      exchangeRate\n      lastRefreshed\n      timeZone\n      bidPrice\n      askPrice\n    }\n  }\n"]);return h=function(){return e},e}var y=g()(h()),P=function(e){var t=e.fc,n=e.setFc,a=e.tc,l=e.setTc;return r.a.createElement("select",{value:"".concat(t,"/").concat(a),onChange:function(e){var t=e.target.value.split("/"),a=Object(d.a)(t,2),r=a[0],c=a[1];n(r),l(c)}},r.a.createElement("option",null,"EUR/USD"),r.a.createElement("option",null,"JPY/USD"),r.a.createElement("option",null,"GBP/USD"),r.a.createElement("option",null,"AUD/USD"),r.a.createElement("option",null,"USD/CHF"),r.a.createElement("option",null,"NZD/USD"),r.a.createElement("option",null,"USD/CAD"))},O=n(10),j=n.n(O),A=n(17);function C(){var e=Object(f.a)(["\n    mutation OpenPosition($pair: String!, $lotSize: Int!, $openedAt: Float!, $position: String!) {\n        openPosition(pair: $pair, lotSize: $lotSize, openedAt: $openedAt, position: $position) {\n            success\n            message\n            pair {\n                id\n                user\n                position\n                pair\n                lotSize\n                openedAt\n            }\n        }\n    }\n"]);return C=function(){return e},e}var w=g()(C());function k(){var e=Object(f.a)(["\n  query GetPairs {\n    getPairs {\n      id\n      user\n      pair\n      lotSize\n      openedAt\n      closedAt\n      pipDif\n      profitLoss\n      open\n      position\n      createdAt\n      updatedAt\n    }\n  }\n"]);return k=function(){return e},e}var L=g()(k()),D=function(e){var t=e.fc,n=e.tc,a=e.pairData,l=e.askPrice,c=e.setAskPrice,i=e.showModal,u=e.setShowModal,s=Object(E.a)(w,{variables:{pair:"".concat(t,"/").concat(n),lotSize:1e5,openedAt:l,position:"long"},update:function(e){var t=e.readQuery({query:S});t.me.bankroll-=1e5,e.writeQuery({query:S,data:{me:t.me}})},refetchQueries:[{query:L}]}),m=Object(d.a)(s,2),p=m[0],f=m[1],b=f.data,g=f.loading,v=f.error;return g?r.a.createElement("p",null,"Loading..."):v?r.a.createElement("p",null,v.message):p&&r.a.createElement(r.a.Fragment,null,r.a.createElement("button",{onClick:Object(A.a)(j.a.mark(function e(){return j.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,c(+a.currencyPairInfo.askPrice);case 2:return alert("Are you sure you want to buy?"),e.next=5,p();case 5:u(!0);case 6:case"end":return e.stop()}},e)}))},"Buy"),b&&b.openPosition.message&&i&&r.a.createElement("div",{className:"modal"},r.a.createElement("button",{onClick:function(){return u(!1)}},"x"),r.a.createElement("p",null,b.openPosition.message),r.a.createElement("p",null,"Currency Pair: ",b.openPosition.pair.pair),r.a.createElement("p",null,"Lot Size: ",b.openPosition.pair.lotSize.toLocaleString(),".00"),r.a.createElement("p",null,"Opened At: ",b.openPosition.pair.openedAt),r.a.createElement("p",null,"Position: ",b.openPosition.pair.position),r.a.createElement(o.b,{to:{pathname:"/account",state:{data:b}}},r.a.createElement("button",null,"Details"))))},x=function(e){var t=e.fc,n=e.tc,a=e.pairData,l=e.bidPrice,c=e.setBidPrice,i=e.showModal,u=e.setShowModal,s=Object(E.a)(w,{variables:{pair:"".concat(t,"/").concat(n),lotSize:1e5,openedAt:l,position:"short"},update:function(e){var t=e.readQuery({query:S});t.me.bankroll-=1e5,e.writeQuery({query:S,data:{me:t.me}})},refetchQueries:[{query:L}]}),m=Object(d.a)(s,2),p=m[0],f=m[1],b=f.data,g=f.loading,v=f.error;return g?r.a.createElement("p",null,"Loading..."):v?r.a.createElement("p",null,v.message):p&&r.a.createElement(r.a.Fragment,null,r.a.createElement("button",{onClick:Object(A.a)(j.a.mark(function e(){return j.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,c(+a.currencyPairInfo.bidPrice);case 2:return alert("Are you sure you want to sell short?"),e.next=5,p();case 5:u(!0);case 6:case"end":return e.stop()}},e)}))},"Sell"),b&&b.openPosition.message&&i&&r.a.createElement("div",{className:"modal"},r.a.createElement("button",{onClick:function(){return u(!1)}},"x"),r.a.createElement("p",null,b&&b.openPosition.message),r.a.createElement("p",null,"Currency Pair: ",b.openPosition.pair.pair),r.a.createElement("p",null,"Lot Size: ",b.openPosition.pair.lotSize.toLocaleString(),".00"),r.a.createElement("p",null,"Opened At: ",b.openPosition.pair.openedAt),r.a.createElement("p",null,"Position: ",b.openPosition.pair.position),r.a.createElement(o.b,{to:{pathname:"/account",state:{data:b}}},r.a.createElement("button",null,"Details"))))},$=function(){var e=Object(a.useState)("EUR"),t=Object(d.a)(e,2),n=t[0],l=t[1],c=Object(a.useState)("USD"),o=Object(d.a)(c,2),i=o[0],u=o[1],s=Object(a.useState)(0),m=Object(d.a)(s,2),p=m[0],f=m[1],b=Object(a.useState)(0),g=Object(d.a)(b,2),v=g[0],h=g[1],O=Object(a.useState)(!1),j=Object(d.a)(O,2),A=j[0],C=j[1],w=Object(E.b)(S),k=Object(E.b)(y,{variables:{fc:n,tc:i}}),L=k.data,$=k.loading,F=k.error,U=k.refetch;return $?r.a.createElement("p",null,"Loading..."):F?r.a.createElement("button",{onClick:function(){return U()}},"Retry"):L&&r.a.createElement("section",null,r.a.createElement("h2",null,"Currency Exchange"),w.data.me&&r.a.createElement("p",null,"Available Balance ",w.data.me.bankroll.toLocaleString(),".00"),r.a.createElement("div",null,r.a.createElement(P,{fc:n,tc:i,setFc:l,setTc:u}),r.a.createElement("button",{onClick:function(){return U()}},"Refresh"),w.data.me&&r.a.createElement(D,{fc:n,tc:i,pairData:L,askPrice:p,setAskPrice:f,showModal:A,setShowModal:C}),w.data.me&&r.a.createElement(x,{fc:n,tc:i,pairData:L,bidPrice:v,setBidPrice:h,showModal:A,setShowModal:C})),r.a.createElement("div",{className:"landing_pair_data"},L.currencyPairInfo&&Object.keys(L.currencyPairInfo).map(function(e){return r.a.createElement("div",{key:e,className:"data"},r.a.createElement("p",null,r.a.createElement("span",null,e,": "),L.currencyPairInfo[e]))})))};function F(){var e=Object(f.a)(["\n  mutation Logout {\n    logout\n  }\n"]);return F=function(){return e},e}var U=g()(F()),z=Object(p.g)(function(e){var t=Object(E.a)(U,{update:function(t){t.writeQuery({query:S,data:{me:null}}),e.history.push("/")}}),n=Object(d.a)(t,1)[0];return r.a.createElement("div",{onClick:function(){return n()}},"Logout")}),q=(n(94),function(){var e=Object(E.b)(S),t=e.data,n=e.loading,a=e.error;return n?r.a.createElement("p",null,"Loading...."):a?r.a.createElement(p.a,{to:"/login"}):t?r.a.createElement("div",{className:"navigation"},r.a.createElement("header",null,r.a.createElement(o.c,{exact:!0,to:"/"},"Forex")),t.me?r.a.createElement("ul",null,r.a.createElement("li",null,r.a.createElement(o.c,{to:"/chart"},"Chart")),r.a.createElement("li",null,r.a.createElement(o.c,{to:"/account"},"Account")),r.a.createElement("li",null,r.a.createElement(z,null))):r.a.createElement("ul",null,r.a.createElement("li",null,r.a.createElement(o.c,{exact:!0,to:"/login"},"Login")),r.a.createElement("li",null,r.a.createElement(o.c,{exact:!0,to:"/register"},"SignUp")))):r.a.createElement("p",null,"This is unfortunate")});function N(){var e=Object(f.a)(["\n    mutation RegisterMutation($email: String!, $password: String!, $name: String!) {\n        register(email: $email, password: $password, name: $name)  \n    }\n"]);return N=function(){return e},e}var R=g()(N());function B(e){var t=Object(a.useState)(""),n=Object(d.a)(t,2),l=n[0],c=n[1],o=Object(a.useState)(""),i=Object(d.a)(o,2),u=i[0],s=i[1],m=Object(a.useState)(""),p=Object(d.a)(m,2),f=p[0],b=p[1],g=Object(E.a)(R,{variables:{email:l,password:u,name:f}}),v=Object(d.a)(g,2),S=v[0],h=v[1].error;return r.a.createElement("div",{className:"register"},r.a.createElement("form",{onSubmit:function(){var t=Object(A.a)(j.a.mark(function t(n){return j.a.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:return n.preventDefault(),t.next=3,S();case 3:e.history.push("/login");case 4:case"end":return t.stop()}},t)}));return function(e){return t.apply(this,arguments)}}()},r.a.createElement("h2",null,"Sign Up"),r.a.createElement("input",{required:!0,name:"email",type:"email",value:l,onChange:function(e){return c(e.target.value)},placeholder:"Enter your email"}),r.a.createElement("input",{required:!0,type:"password",value:u,onChange:function(e){return s(e.target.value)},placeholder:"Enter your password"}),r.a.createElement("input",{required:!0,type:"text",value:f,onChange:function(e){return b(e.target.value)},placeholder:"Enter your name"}),h&&r.a.createElement("p",null,h.message),r.a.createElement("button",null,"SignUp")))}function M(){var e=Object(f.a)(["\n  mutation LoginMutation($email: String!, $password: String!) {\n    login(email: $email, password: $password) {\n      id\n      email\n      name\n    }\n  }\n"]);return M=function(){return e},e}var I=g()(M());function T(e){var t=Object(a.useState)(""),n=Object(d.a)(t,2),l=n[0],c=n[1],o=Object(a.useState)(""),i=Object(d.a)(o,2),u=i[0],s=i[1],m=Object(E.a)(I,{variables:{email:l,password:u},update:function(e,t){var n=t.data;n&&n.login&&(e.reset(),e.writeQuery({query:S,data:{me:n.login}}))}}),p=Object(d.a)(m,2),f=p[0],b=p[1].error;return r.a.createElement("div",{className:"login"},r.a.createElement("form",{onSubmit:function(){var t=Object(A.a)(j.a.mark(function t(n){return j.a.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:return n.preventDefault(),t.next=3,f();case 3:e.history.push("/");case 4:case"end":return t.stop()}},t)}));return function(e){return t.apply(this,arguments)}}()},r.a.createElement("h2",null,"Login"),r.a.createElement("input",{required:!0,name:"email",type:"email",value:l,onChange:function(e){return c(e.target.value)},placeholder:"Enter your email"}),r.a.createElement("input",{required:!0,type:"password",value:u,onChange:function(e){return s(e.target.value)},placeholder:"Enter your password"}),b&&r.a.createElement("p",null,b.message),r.a.createElement("button",{type:"submit"},"Login")))}function Q(){var e=Object(f.a)(["\n  mutation ($amount: Int!) {\n    addFunds(amount: $amount) {\n      success\n      message\n      user {\n        id\n        name\n        email\n        bankroll\n      }\n    }\n  }\n"]);return Q=function(){return e},e}var _=g()(Q());function H(){var e=Object(a.useState)(!1),t=Object(d.a)(e,2),n=t[0],l=t[1],c=Object(E.a)(_,{variables:{amount:1e6}}),o=Object(d.a)(c,2),i=o[0],u=o[1],s=u.data,m=u.loading,p=u.error;return m?r.a.createElement("p",null,"Loading..."):p?r.a.createElement("p",null,p.message):i&&r.a.createElement(r.a.Fragment,null,r.a.createElement("button",{onClick:Object(A.a)(j.a.mark(function e(){return j.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return alert("Are you sure?"),e.next=3,i();case 3:l(!0);case 4:case"end":return e.stop()}},e)}))},"Add Funds"),s&&s.addFunds.message&&n&&r.a.createElement("div",{className:"modal"},r.a.createElement("button",{onClick:function(){return l(!1)}},"x"),r.a.createElement("p",null,s.addFunds.message)))}var J=function(e){var t=e.data,n=e.open,a=e.user;return r.a.createElement("div",null,t.getPairs&&t.getPairs.map(function(e){return e.open&&n&&r.a.createElement("div",{className:"pair_divs",key:e.id},r.a.createElement(o.b,{to:{pathname:"/pair",state:{pair:e,me:a.data.me}}},e.pair&&r.a.createElement("p",null,r.a.createElement("span",null,"Currency Pair: "),e.pair),e.lotSize&&r.a.createElement("p",null,r.a.createElement("span",null,"Lot Size: "),e.lotSize.toLocaleString(),".00"),e.position&&r.a.createElement("p",null,r.a.createElement("span",null,"Position: "),e.position),e.openedAt&&r.a.createElement("p",null,r.a.createElement("span",null,"Opened At: "),e.openedAt.toFixed(4)),e.createdAt&&r.a.createElement("p",null,r.a.createElement("span",null,"Created At: "),new Date(+e.createdAt).toLocaleString()),e.updatedAt&&r.a.createElement("p",null,r.a.createElement("span",null,"Updated At: "),new Date(+e.updatedAt).toLocaleString())))}),t.getPairs&&t.getPairs.map(function(e){return!e.open&&!n&&r.a.createElement("div",{className:"pair_divs",key:e.id},r.a.createElement("div",null,e.pair&&r.a.createElement("p",null,r.a.createElement("span",null,"Currency Pair: "),e.pair),e.lotSize&&r.a.createElement("p",null,r.a.createElement("span",null,"Lot Size: "),e.lotSize.toLocaleString(),".00"),e.position&&r.a.createElement("p",null,r.a.createElement("span",null,"Position: "),e.position),e.openedAt&&r.a.createElement("p",null,r.a.createElement("span",null,"Opened At: "),e.openedAt.toFixed(4)),e.closedAt&&r.a.createElement("p",null,r.a.createElement("span",null,"Closed At: "),e.closedAt.toFixed(4)),r.a.createElement("p",null,r.a.createElement("span",null,"Pip Dif: "),e.pipDif||0),r.a.createElement("p",null,r.a.createElement("span",null,"Profit/Loss: "),e.profitLoss.toFixed(2)||0),e.createdAt&&r.a.createElement("p",null,r.a.createElement("span",null,"Created At: "),new Date(+e.createdAt).toLocaleString()),e.updatedAt&&r.a.createElement("p",null,r.a.createElement("span",null,"Updated At: "),new Date(+e.updatedAt).toLocaleString())))}))};function G(e){var t=e.state;return r.a.createElement("div",null,r.a.createElement("h3",null,"New Position"),r.a.createElement("div",{className:"pair_divs",style:{textAlign:"center"}},r.a.createElement("p",null,r.a.createElement("span",null,"Pair: "),t.data.openPosition.pair.pair),r.a.createElement("p",null,r.a.createElement("span",null,"Lot Size: "),t.data.openPosition.pair.lotSize.toLocaleString(),".00"),r.a.createElement("p",null,r.a.createElement("span",null,"Pip Dif: "),t.data.openPosition.pair.openedAt),r.a.createElement("p",null,r.a.createElement("span",null,"Position: "),t.data.openPosition.pair.position)))}function W(e){var t=Object(a.useState)(!0),n=Object(d.a)(t,2),l=n[0],c=n[1],o=Object(E.b)(S),i=Object(E.b)(L),u=i.data,s=i.loading,m=i.error;return o.error?r.a.createElement(p.a,{to:"/login"}):o.data&&o.data.me?s?r.a.createElement("p",null,"Loading..."):u?m?r.a.createElement("p",null,m.message):r.a.createElement("section",null,r.a.createElement("h2",null,o.data.me.name),r.a.createElement("div",null,r.a.createElement("p",null,r.a.createElement("span",null,"Available Balance: "),o.data.me.bankroll.toLocaleString(),".00"),r.a.createElement(H,null)),e.location.state&&r.a.createElement(G,{state:e.location.state}),r.a.createElement("h3",null,"Currency Pairs"),r.a.createElement("button",{onClick:function(){return c(!0)}},"open"),r.a.createElement("button",{onClick:function(){return c(!1)}},"closed"),r.a.createElement(J,{data:u,open:l,user:o})):r.a.createElement("section",null,r.a.createElement("h2",null,o.data.me.name),r.a.createElement("div",null,r.a.createElement("p",null,r.a.createElement("span",null,"Available Balance: "),o.data.me.bankroll.toLocaleString(),".00"),r.a.createElement(H,null))):r.a.createElement("p",null,"A man has no name")}function Z(){var e=Object(f.a)(["\n  mutation ClosePosition($id: ID!, $closedAt: Float!) {\n    closePosition(id: $id, closedAt: $closedAt) {\n      success\n      message\n      pair {\n        id\n        user\n        pair\n        lotSize\n        position\n        openedAt\n        closedAt\n        pipDif\n        profitLoss\n        open\n        createdAt\n        updatedAt\n      }\n    }\n  }\n"]);return Z=function(){return e},e}var X=g()(Z());function Y(e){var t=e.id,n=e.bidPrice,l=e.askPrice,c=e.position,i=Object(a.useState)(!1),u=Object(d.a)(i,2),s=u[0],m=u[1],p=Object(E.b)(S).refetch,f=Object(E.a)(X,{variables:"long"===c?{id:t,closedAt:+n}:{id:t,closedAt:+l},refetchQueries:[{query:L}]}),b=Object(d.a)(f,2),g=b[0],v=b[1],h=v.data,y=v.loading,P=v.error;return y?r.a.createElement("p",null,"Loading..."):P?r.a.createElement("p",null,P.message):g&&r.a.createElement(r.a.Fragment,null,r.a.createElement("button",{onClick:Object(A.a)(j.a.mark(function e(){return j.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return alert("Are you sure you want to close your ".concat("long"===c?"long":"short"," position?")),e.next=3,g();case 3:m(!0),p();case 5:case"end":return e.stop()}},e)}))},"long"===c?"Sell":"Buy"),h&&h.closePosition.message&&s&&r.a.createElement("div",{className:"modal"},r.a.createElement("button",{onClick:function(){return m(!1)}},"x"),r.a.createElement("p",null,h.closePosition.message),r.a.createElement(o.b,{to:"/account"},r.a.createElement("button",null,"Account"))))}var K=function(e){var t=e.pair,n=e.lotSize,a=e.openedAt,l=e.position,c=e.createdAt,o=e.askPrice,i=e.bidPrice,u=e.lastRefreshed,s=e.pipDifLong,m=e.pipDifShort,p=e.potentialProfitLoss;return r.a.createElement("div",null,r.a.createElement("p",null,r.a.createElement("span",null,"Currency Pair: "),t),r.a.createElement("p",null,r.a.createElement("span",null,"Lot Size: "),n.toLocaleString(),".00"),r.a.createElement("p",null,r.a.createElement("span",null,"Opened At: "),(+a).toFixed(4)),r.a.createElement("p",null,r.a.createElement("span",null,"Position: "),l),r.a.createElement("p",null,r.a.createElement("span",null,"Created At: "),new Date(+c).toLocaleString()),"long"===l?r.a.createElement(r.a.Fragment,null,r.a.createElement("br",null),r.a.createElement("p",null,r.a.createElement("span",null,"Current Bid Price: "),(+i).toFixed(4)),r.a.createElement("p",null,r.a.createElement("span",null,"Last Refreshed: "),u),r.a.createElement("p",null,r.a.createElement("span",null,"Current Pip Difference: "),s),r.a.createElement("p",null,r.a.createElement("span",null,"Potential PL: "),p.toLocaleString(),".00")):r.a.createElement(r.a.Fragment,null,r.a.createElement("br",null),r.a.createElement("p",null,r.a.createElement("span",null,"Current Ask Price: "),(+o).toFixed(4)),r.a.createElement("p",null,r.a.createElement("span",null,"Last Refreshed: "),u),r.a.createElement("p",null,r.a.createElement("span",null,"Current Pip Difference: "),m),r.a.createElement("p",null,r.a.createElement("span",null,"Potential PL: "),p.toLocaleString(),".00")))};function V(e){var t=e.location.state.pair,n=t.createdAt,a=t.lotSize,l=t.openedAt,c=t.pair,o=t.position,i=t.id,u=e.location.state.me,s=u.bankroll,m=u.name,p=c.split("/"),f=Object(d.a)(p,2),b=f[0],g=f[1],v=Object(E.b)(y,{variables:{fc:b,tc:g}}),S=v.data,h=v.loading,P=v.error,O=v.refetch;if(h)return r.a.createElement("p",null,"Loading...");if(P)return r.a.createElement("p",null,P.message);var j=S.currencyPairInfo,A=j.bidPrice,C=j.lastRefreshed,w=j.askPrice,k=(A-l).toFixed(4),L=(l-w).toFixed(4),D="long"===o?k*a:L*a,x=new Date(C+" UTC");return S&&r.a.createElement("section",null,r.a.createElement("div",{className:"landing_pair_data"},r.a.createElement("h3",null,"Pair Details"),r.a.createElement("div",null,r.a.createElement("p",null,m," your available balance is ",s.toLocaleString(),".00"),r.a.createElement("div",null,r.a.createElement("button",{onClick:function(){return O()}},"Refresh"),r.a.createElement(Y,{id:i,bidPrice:A,askPrice:w,position:o}))),r.a.createElement(K,{pair:c,lotSize:a,openedAt:l,position:o,createdAt:n,askPrice:w,bidPrice:A,lastRefreshed:x.toLocaleString(),pipDifLong:k,pipDifShort:L,potentialProfitLoss:D})))}var ee=n(78);function te(){var e=Object(f.a)(["\n  query MonthlyTimeSeries($fc: String, $tc: String) {\n    monthlyTimeSeries(fc: $fc, tc: $tc) {\n      timesArray\n      valuesArray\n    }\n  }\n"]);return te=function(){return e},e}var ne=g()(te());function ae(){var e=Object(a.useState)("EUR"),t=Object(d.a)(e,2),n=t[0],l=t[1],c=Object(a.useState)("USD"),o=Object(d.a)(c,2),i=o[0],u=o[1],s=Object(a.useState)("EUR"),m=Object(d.a)(s,2),p=m[0],f=m[1],b=Object(a.useState)("USD"),g=Object(d.a)(b,2),v=g[0],S=g[1],h=Object(E.b)(ne,{variables:{fc:n,tc:i}}),y=h.data,P=h.error,O=h.loading,j=h.refetch;if(O)return r.a.createElement("p",null,"loading...");if(P)return r.a.createElement("button",{onClick:function(){j({fc:"EUR",tc:"USD"}),window.location.href="/chart"}},"retry");var A=y&&y.monthlyTimeSeries.timesArray,C=y&&y.monthlyTimeSeries.valuesArray;return r.a.createElement("section",{className:"chartData"},r.a.createElement("form",{onSubmit:function(e){e.preventDefault(),l(p),u(v)}},r.a.createElement("input",{name:"fromCurrency",value:p,placeholder:"From Currency",onChange:function(e){return f(e.target.value.toUpperCase())}}),r.a.createElement("input",{name:"toCurrency",value:v,placeholder:"To Currency",onChange:function(e){return S(e.target.value.toUpperCase())}}),r.a.createElement("button",null,"submit")),r.a.createElement(ee.a,{data:{labels:A,datasets:[{label:"".concat(n,"/").concat(i," Time Series FX (Monthly)"),fill:!0,lineTension:.1,backgroundColor:"rgb(55, 131, 194)",borderColor:"white",borderCapStyle:"butt",borderDash:[],borderDashOffset:0,borderJoinStyle:"miter",pointBorderColor:"white",pointBackgroundColor:"#fff",pointBorderWidth:1,pointHoverRadius:5,pointHoverBackgroundColor:"white",pointHoverBorderColor:"rgba(220,220,220,1)",pointHoverBorderWidth:2,pointRadius:1,pointHitRadius:10,data:C}]}}))}var re=function(){return r.a.createElement(p.d,null,r.a.createElement(p.b,{path:"/login",component:T}),r.a.createElement(p.b,{path:"/",render:function(){return r.a.createElement(r.a.Fragment,null,r.a.createElement("div",{className:"navbar"},r.a.createElement(q,null)),r.a.createElement(p.b,{exact:!0,path:"/",component:$}),r.a.createElement(p.b,{path:"/register",component:B}),r.a.createElement(p.b,{path:"/account",component:W}),r.a.createElement(p.b,{path:"/pair",component:V}),r.a.createElement(p.b,{path:"/chart",component:ae}))}}))},le=(n(186),new s.a),ce=new i.a({cache:le,link:new m.a({uri:"/graphql",credentials:"include"})});c.a.render(r.a.createElement(o.a,null,r.a.createElement(u.a,{client:ce},r.a.createElement(re,null))),document.getElementById("root"))},82:function(e,t,n){e.exports=n(187)},94:function(e,t,n){}},[[82,1,2]]]);
//# sourceMappingURL=main.98d0a410.chunk.js.map