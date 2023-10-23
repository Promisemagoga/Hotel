import React from 'react'
import Navbar from '../Components/Navbar'

function About() {
    return (
        <div>
            <div className='aboutHeader'>
                <Navbar />
                <div className='aboutContent'>
                    <div class="row">
                        <div class="col-lg-4 col-md-12 mb-4 mb-lg-0">
                            <img
                                src="https://mdbcdn.b-cdn.net/img/Photos/Horizontal/Nature/4-col/img%20(73).webp"
                                class="w-100 shadow-1-strong rounded mb-4"
                                alt="Boat on Calm Water"
                            />

                            <img
                                src="https://mdbcdn.b-cdn.net/img/Photos/Vertical/mountain1.webp"
                                class="w-100 shadow-1-strong rounded mb-4"
                                alt="Wintry Mountain Landscape"
                            />
                        </div>

                        <div class="col-lg-4 mb-4 mb-lg-0">
                            <img
                                src="https://mdbcdn.b-cdn.net/img/Photos/Vertical/mountain2.webp"
                                class="w-100 shadow-1-strong rounded mb-4"
                                alt="Mountains in the Clouds"
                            />

                            <img
                                src="https://mdbcdn.b-cdn.net/img/Photos/Horizontal/Nature/4-col/img%20(73).webp"
                                class="w-100 shadow-1-strong rounded mb-4"
                                alt="Boat on Calm Water"
                            />
                        </div>

                        <div class="col-lg-4 mb-4 mb-lg-0">
                            <img
                                src="https://mdbcdn.b-cdn.net/img/Photos/Horizontal/Nature/4-col/img%20(18).webp"
                                class="w-100 shadow-1-strong rounded mb-4"
                                alt="Waves at Sea"
                            />

                            <img
                                src="https://mdbcdn.b-cdn.net/img/Photos/Vertical/mountain3.webp"
                                class="w-100 shadow-1-strong rounded mb-4"
                                alt="Yosemite National Park"
                            />
                        </div>
                    </div>
                    <div>
                    <h2>About Us</h2>
                    <h4>Get to know us a little more</h4>
                    <p>At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores 
                        et quas molestias excepturi sint occaecati cupiditate non provident, similique sunt in culpa qui officia deserunt mollitia animi, id est laborum et dolorum fuga. 
                        Et harum quidem rerum facilis est et expedita distinctio. Nam libero tempore, cum soluta nobis est eligendi optio cumque nihil impedit quo minus id quod maxime placeat facere possimus, 
                        omnis voluptas assumenda est, omnis dolor repellendus. Temporibus autem quibusdam et aut officiis debitis aut rerum necessitatibus saepe eveniet ut et voluptates repudiandae sint et 
                        molestiae non recusandae. Itaque earum rerum hic tenetur a sapiente delectus, ut aut reiciendis voluptatibus maiores alias consequatur aut perferendis doloribus asperiores repellat</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default About