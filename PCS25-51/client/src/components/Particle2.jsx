import { useCallback } from "react";
import Particles from "react-tsparticles";
import { loadFull } from "tsparticles";
import React from 'react'

function Particle2() {
    const particlesInit = useCallback(async engine => {
        console.log(engine);
        // you can initiate the tsParticles instance (engine) here, adding custom shapes or presets
        // this loads the tsparticles package bundle, it's the easiest method for getting everything ready
        // starting from v2 you can add only the features you need reducing the bundle size
        await loadFull(engine);
    }, []);

    const particlesLoaded = useCallback(async container => {
        await console.log(container);
    }, []);


  return (
        <Particles
            id="tsparticles2"
            init={particlesInit}
            loaded={particlesLoaded}
            options={
               
                {
                    "fullScreen": {
                        "enable": true,
                        "zIndex": 1
                    },
                    "fpsLimit": 90,
                    "particles": {
                        "number": {
                            "value": 80,
                            "density": {
                                "enable": true,
                                "value_area": 1000
                            }
                        },
                        "color": {
                            "value": "#ff0000",
                            "animation": {
                                "enable": true,
                                "speed": 10,
                                "sync": true
                            }
                        },
                        "opacity": {
                            "value": 0.0
                        },
                        "size": {
                            "value": {
                                "min": 0.1,
                                "max": 1
                            }
                        },
                        "links": {
                            "enable": true,
                            "distance": 100,
                            "color": "#ffffff",
                            "opacity": 0.4,
                            "width": 1
                        },
                        "move": {
                            "enable": true,
                            "speed": 2,
                            "direction": "none",
                            "outModes": {
                                "default": "out"
                            }
                        }
                    },
                    "interactivity": {
                        "events": {
                            "onHover": {
                                "enable": true,
                                "mode": "repulse"
                            },
                            "onClick": {
                                "enable": true,
                                "mode": "push"
                            },
                            "resize": true
                        },
                        "modes": {
                            "repulse": {
                                "distance": 150
                            },
                            "push": {
                                "quantity": 4
                            }
                        }
                    },
                "retina_detect": true,
                "background": {
                    "color": "#000000",
                    "repeat": "no-repeat",
                    "size": "100%",
                    "opacity":"0%"
                }
            }}
        />
    );

}

export default Particle2