import React from 'react'

function About() {
  return (
    <div className='container pt-5'>
      <img src="images/DREAM.png" alt="" />      
      <h1>
        <strong>Drug Rehabilitation Education And Mentoring</strong>
      </h1>
      <h3>
      A rights-based initiative to empower lakhs of children and youth to dream beyond drugs
      </h3>
      <h4>
      Started in Kerala: November 2021
      </h4>
      <img src="images/BREAD.png" alt="" style={{marginLeft:"80%"}}/>
      <div className='d-flex' style={{width:"100%",paddingLeft:"500px"}}>
        <a href="https://www.instagram.com/people.of.breads/" target='_blank'><img src="images/instagram.png" alt="" style={{height:"30px",width:"30px",marginRight:"10px"}}/></a>
        <a href="https://www.facebook.com/breadsbangalore.org" target='_blank'><img src="images/facebook.png" alt="" style={{height:"30px",width:"30px",marginRight:"10px"}}/></a>
        <a href="https://www.linkedin.com/in/breads-bangalore-a45543aa/" target='_blank'><img src="images/linkedin.png" alt="" style={{height:"30px",width:"30px"}}/></a>
      </div>  
    </div>
  )
}

export default About
