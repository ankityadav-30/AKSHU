import{j as o,aa as l,J as p}from"./index-B2k6myg6.js";function d(){return"919876543210".replace(/\D/g,"")}function u(t,i="contact"){const n=d();let e="";if(i==="estimator"&&typeof t=="object"){const{result:s,selections:a}=t;s?e=`Hi AKSHU Technologies! 👋

I calculated a preliminary estimate on your website and would like to discuss my project:

• Project Type: ${s.projectTypeTitle||a?.projectType}
• Scope Size: ${s.projectSizeTitle||a?.projectSize}
• Design Level: ${s.designLevelTitle||a?.designLevel}
• Timeline: ${s.timelineTitle||a?.timeline}
• Estimated Range: ${s.formattedRange}

I'd like to discuss the requirements further.`:e=`Hi AKSHU Technologies! 👋

I used your project estimator and would like to discuss my requirements.`}else if(typeof t=="string"&&t.trim().length>0)e=t;else switch(i){case"services":e=`Hi AKSHU Technologies! 👋

I'd like to discuss your development services.`;break;case"projects":e=`Hi AKSHU Technologies! 👋

I explored your projects and would like to discuss a similar product idea.`;break;default:e=`Hi AKSHU Technologies! 👋

I'd like to discuss a project with you.`;break}const r=encodeURIComponent(e);return`https://wa.me/${n}?text=${r}`}const m=({message:t,contextType:i="contact",variant:n="secondary",size:e="md",children:r,className:s="",style:a={}})=>{const c=u(t,i);return o.jsxs("a",{href:c,target:"_blank",rel:"noopener noreferrer",className:`whatsapp-btn whatsapp-btn--${n} whatsapp-btn--${e} ${s}`,"aria-label":"Chat with AKSHU Technologies on WhatsApp",style:a,children:[o.jsx(l,{className:"whatsapp-btn__icon"}),o.jsx("span",{children:r||"Chat on WhatsApp"}),o.jsx(p,{className:"whatsapp-btn__arrow"})]})};export{m as W,u as b};
