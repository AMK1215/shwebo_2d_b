import React from 'react';
import { Helmet } from 'react-helmet';

const TawkTo = () => {
    return (
        <Helmet>
            <script type="text/javascript">
                {`
                var Tawk_API=Tawk_API||{}, Tawk_LoadStart=new Date();
                (function(){
                var s1=document.createElement("script"),s0=document.getElementsByTagName("script")[0];
                s1.async=true;
                s1.src='https://embed.tawk.to/666520ca981b6c56477b31ed/1hvtgg617';
                s1.charset='UTF-8';
                s1.setAttribute('crossorigin','*');
                s0.parentNode.insertBefore(s1,s0);
                })();
                `}
            </script>
        </Helmet>
    );
};

export default TawkTo;
