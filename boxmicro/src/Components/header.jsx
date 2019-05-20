import React, { Component } from 'react'

export default class NavBar extends Component {
    constructor(props) {
        super(props)
        this.state = {
            topNavStyle: 'topnav'
        }
    }

setNav =()=> {
    // var x = document.getElementById("myTopnav");
    if (this.state.topNavStyle === "topnav") {
        // x.className += " responsive";
        console.log('topNav',this.state.topNavStyle)
        this.setState({
            topNavStyle: 'responsive'
        })
    } else {
        console.log('responsive', this.state.topNavStyle)

        this.setState({
            topNavStyle: 'topnav'
        })
        // x.className = "topnav";
    }
}
    render() {
    return (

    <div>
        <div className={this.state.topNavStyle} id="myTopnav">
            <a href="#" className="active">
                Login
				</a>
            <a href="#news">News</a>
            <a href="#contact">Contact</a>
            <a href="#about">About</a>
                <a href={void (0)} className="icon" onClick={this.setNav}>
                <i class="fa fa-bars" />
            </a>
        </div>
    </div>
);
}


  
  
}




// import React from "react";

// const NavBar = () => {
//     this.state = {
//         topNavStyle: 'topnav'
//     }
//     function setNav(){
// 		// var x = document.getElementById("myTopnav");
// 		if (this.state.topNavStyle === "topnav") {
//             // x.className += " responsive";
//             this.setState({
//                 topNavStyle:'responsive'
//             })
//         } else {
//             this.setState({
//                 topNavStyle: 'topnav'
//             })
//             // x.className = "topnav";
// 		}
//     }

//     return (
        
// 		<div>
//             <div className={this.state.topNavStyle} id="myTopnav">
// 				<a href="#home" className="active">
// 					Home
// 				</a>
// 				<a href="#news">News</a>
// 				<a href="#contact">Contact</a>
// 				<a href="#about">About</a>
// 				<a href="javascript:void(0);" className="icon" onlick="setNav()">
// 					<i class="fa fa-bars" />
// 				</a>
// 			</div>
// 		</div>
// 	);
// };

// export default NavBar;
