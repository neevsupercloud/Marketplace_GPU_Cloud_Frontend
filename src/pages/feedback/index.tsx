// import  { useEffect } from 'react';


declare global {
  interface Window {
    hbspt: {
      forms: {
        create(options: any): void;
      };
    };
  }
}

function FeedbackForm() {
  // useEffect(() => {
  //   const script = document.createElement('script');
  //   script.src = "//js.hsforms.net/forms/embed/v2.js";
  //   script.charset = "utf-8";
  //   script.type = "text/javascript";
  //   script.async = true;
  //   document.body.appendChild(script);

  //   script.onload = () => {
  //     if (window.hbspt) {
  //       window.hbspt.forms.create({
  //         region: "na1",
  //         portalId: "46619828",
  //         formId: "757320a6-d80f-4f73-a098-692b4a402b47",
  //         target: '#hubspotForm'
  //       });
  //     }
  //   };

  //   return () => {
  //     document.body.removeChild(script);
  //   };
  // }, []);

  return (
    // <div className="flex items-center justify-center min-h-screen bg-white">
    //   <div className="bg-white rounded-lg p-8 shadow-md" style={{width:"80%"}}>
    //     <div id="hubspotForm"></div>
    //   </div>
    // </div>
    <div>
      
    </div>
  );
}

export default FeedbackForm;
