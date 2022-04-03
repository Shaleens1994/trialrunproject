import React from "react";

function Footer() {

  return (
    <footer className="px-4">
      <div className="flex-column container footerWrapper">
        <div className="flex-row space-between footer-row footer-row-top">
          
          <div>
            <form className="flex-column">
                <label htmlFor="mailing-list">
                <h6>
                CONTACT US
                </h6>
              </label>
              <div>
              <form style={{ width: '60rem',  border: '7px solid black'}}>      
  <input type="text" id="mailing-list" name="mailing-list" placeholder="Email address" style={{ width: '59rem'}}/>   
    <textarea name="text" class="feedback-input" placeholder="Comment"style={{ textAlign:"center", width: '59rem'}}></textarea>
  <input className="mailing-list-btn" type="submit" value="CONTACT US" style={{ textAlign:"center", width: '59rem'}}/>
</form>       
         </div>
    </form>
          </div>
        </div>

        
        <div className="flex-row footer-row space-between">
          <p>
          This page is owned by HomdeckⓇ
          </p>
 
          </div>
        </div>
    
    </footer>
  );
}

export default Footer;
