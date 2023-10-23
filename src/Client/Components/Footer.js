import { collection, getDocs } from 'firebase/firestore';
import React, { useEffect, useState } from 'react'
import { db } from '../../Config/Firebase';
import { Link } from 'react-router-dom';
import Map from './Map';
function Footer() {
    const [info, setInfo] = useState([]);
    const getInfo = async () => {
        try {
            const querrySnapShot = await getDocs(collection(db, "info"));
            const data = querrySnapShot.docs.map((doc) => ({
                id: doc.id,
                ...doc.data(),
            }));
            setInfo(data);
        } catch (error) { }
    };
    useEffect(() => {
        getInfo();
    }, []);

    const [showMap, setShowMap] = useState(false);
    function show() {
        setShowMap(!showMap);
    }
    return (
        <div>
            {showMap && <Map />}
            {info.map((data, index) => (
                <div className="footer" key={index}>
                    <footer>
                        <div class="container">
                            <div class="row">
                                <div class="col-xl-3 col-lg-4 col-md-6">
                                    <div>
                                        <h1>Pro_Stay</h1>
                                        <p class="mb-30 footer-desc">
                                            Lorem ipsum dolor sit amet consectetur adipisicing elit.
                                            Ad soluta facilis eos quia optio iusto odit atque eum
                                            tempore, quisquam officiis vero veniam hic,
                                        </p>
                                        <div className="icons">
                                            <i
                                                className="fa fa-facebook-official"
                                                aria-hidden="true"
                                            ></i>
                                            <i
                                                className="fa fa-twitter-square"
                                                aria-hidden="true"
                                            ></i>
                                            <i className="fa fa-instagram" aria-hidden="true"></i>
                                        </div>
                                        <br />
                                    </div>
                                </div>
                                <div class="col-xl-2 offset-xl-1 col-lg-2 col-md-6">
                                    <div class="">
                                        <h4>Quick Link</h4>
                                        <ul class="list-unstyled">
                                            <li>
                                                <a href="#" class="text-decoration-none">
                                                    <Link to="/ClientDashboard">
                                                        Home
                                                    </Link>
                                                </a>
                                            </li>
                                            <li>
                                                <a href="#" class="text-decoration-none">
                                                    <Link to="/ClientHotelPolicies">
                                                        About Us
                                                    </Link>
                                                </a>
                                            </li>
                                            <li>
                                                <a href="#" class="text-decoration-none">
                                                    {" "}
                                                    <Link to="/ClientHotelPolicies" className="policies">
                                                        Hotel policies
                                                    </Link>
                                                </a>
                                            </li>
                                            <li>
                                                <a href="#" class="text-decoration-none">
                                                    {" "}
                                                    <Link className="policies" onClick={show}>
                                                        Show Map
                                                    </Link>
                                                </a>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                                <div class="col-xl-3 col-lg-3 col-md-6">
                                    <div>
                                        <h4>Rooms Available</h4>
                                        <ul class="list-unstyled">
                                            <li>
                                                <a href="#" class="text-decoration-none">
                                                    Deluxe
                                                </a>
                                            </li>
                                            <li>
                                                <a href="#" class="text-decoration-none">
                                                    Suite
                                                </a>
                                            </li>
                                            <li>
                                                <a href="#" class="text-decoration-none">
                                                    Self-Catering
                                                </a>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                                <div class="col-xl-3 col-lg-3 col-md-6">
                                    <div>
                                        <h4>Address</h4>
                                        <ul class="list-unstyled">
                                            <li>
                                                <p>{data.telephone}</p>
                                            </li>
                                            <li>
                                                <p>
                                                    <a href="#">{data.email}</a>
                                                </p>
                                            </li>
                                            <li>
                                                <p>{data.adress}</p>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                            <div class="d-flex justify-content-center">
                                <div class="copyright">
                                    <p>
                                        Developed and maintained by{" "}
                                        <a href="https://react-portfolio-one-eta.vercel.app/" target="_blank">
                                            @PromiseMagoa
                                        </a>
                                    </p>
                                </div>
                            </div>
                        </div>
                    </footer>
                </div>
            ))}
        </div>
    )
}

export default Footer