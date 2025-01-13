import * as THREE from "three";
import {
    GLTFLoader
} from "GLTF";
// ************************************
// DETECT WBGL
// ************************************
function detectWebGL() {
    // Check for the WebGL rendering context
    if (!!window.WebGLRenderingContext) {
        var canvas = document.createElement("canvas"),
            names = ["webgl", "experimental-webgl", "moz-webgl", "webkit-3d"],
            context = false;

        for (var i in names) {
            try {
                context = canvas.getContext(names[i]);
                if (context && typeof context.getParameter === "function") {
                    // WebGL is enabled.
                    return 1;
                }
            } catch (e) {}
        }

        // WebGL is supported, but disabled.
        return 0;
    }
    // WebGL not supported.
    return -1;
}
// check hardware acceleration on
function isSwiftShaderRenderer() {
    const canvas = document.createElement("canvas");
    const gl = canvas.getContext("webgl");
    const debug_ext = gl.getExtension("WEBGL_debug_renderer_info");
    if (debug_ext) {
        const renderer = gl.getParameter(debug_ext.UNMASKED_RENDERER_WEBGL);
        if (renderer.indexOf("SwiftShader") >= 0) {
            return false;
        }
    }
    return true;
}

// ************************************
// ANIMATION
// ************************************

function webglAnim() {
    //var locationPath = '/dotlinecode/wp-content/themes/dotlinecode/assets/models/'; //use it on local
    var locationPath = "/wp-content/themes/dotlinecode/assets/models/"; //use it on production
    var locationPathImg =
        "/wp-content/themes/dotlinecode/assets/models/texture/"; //use it on production
    let camera, scene, renderer, mixer, empty, dot, line, code, mouseLight;
    let mouseX = 0;
    let mouseY = 0;

    let targetX = 0;
    let targetY = 0;

    const windowHalfX = window.innerWidth / 2;
    const windowHalfY = window.innerHeight / 2;
    var cd = 0;
    var dir = 0;

    scene = new THREE.Scene();
    if (window.innerWidth >= 992) {
        mouseLight = new THREE.PointLight(0xffffff, 10, 100);
        mouseLight.position.set(0, 0, 1);
        scene.add(mouseLight);
    }

    // ************************************
    // MODEL
    // ************************************
    const loader = new GLTFLoader().setPath(locationPath);
    var modelFile;
    if (window.innerWidth >= 992) {
        modelFile = "model-ok.gltf";
        // modelFile = "test2.gltf";
        // modelFile = "test.gltf";
    } else {
        modelFile = "model-ok--mobile.gltf";
    }

    loader.load(modelFile, function(gltf) {
        const model = gltf.scene.children[0];
        scene.add(gltf.scene);
        const textureLoader = new THREE.CubeTextureLoader();
        const texture = textureLoader.load([
            locationPathImg + "px.png",
            locationPathImg + "nx.png",
            locationPathImg + "py.png",
            locationPathImg + "ny.png",
            locationPathImg + "pz.png",
            locationPathImg + "nz.png",
        ]);
        texture.encoding = THREE.sRGBEncoding;
        scene.environment = texture;
        scene.background = null;
        scene.traverse(function(object) {
            if (object.isMesh) {
                object.material.envMap = texture;
                object.material.envMapIntensity = 2.5;
                object.material.needsUpdate = true;
            }
        });

        // ***********
        // ANIMATION
        // ***********
        empty = scene.getObjectByName("Empty");
        dot = scene.getObjectByName("Dot_Shape");
        line = scene.getObjectByName("Line_Shape");
        code = scene.getObjectByName("Code_Shape");

        mixer = new THREE.AnimationMixer(gltf.scene);
        var action0 = mixer.clipAction(gltf.animations[0]);
        var action1 = mixer.clipAction(gltf.animations[1]);
        var action2 = mixer.clipAction(gltf.animations[2]);
        var action3 = mixer.clipAction(gltf.animations[3]);

        action0.play();
        action1.play();
        action2.play();
        action3.play();

        // LOOP ANIAMATION - ALTERNATIVE
        // let actions = gltf.animations.map((clip) => mixer.clipAction(clip));
        // actions.forEach((action) => action.play());

        function createAnimation(mixer, action, clip) {
            let proxy = {
                get time() {
                    return mixer.time;
                },
                set time(value) {
                    action.paused = false;
                    mixer.setTime(value);
                    action.paused = true;
                    action.setLoop(THREE.LoopOnce);
                    action.clampWhenFinished = true;
                },
            };

            var sectionContact = document.querySelector("#sectionContact");
            var sectionContactStyles = window.getComputedStyle(sectionContact);
            var sectionContactPaddingTop = parseFloat(
                sectionContactStyles.paddingTop
            );
            var sectionContactTop = $(
                "#sectionContact .sectionTitle--white"
            ).offset().top;

            if ($(window).height() < 700) {
                var hymobile = -20;
            } else {
                var hymobile = -10 + "%";
            }

            if (window.innerWidth >= 992) {
                gsap.to(proxy, {
                    time: clip.duration,
                    ease: "none",
                    scrollTrigger: {
                        trigger: "body",
                        start: "top top",
                        end: "max",
                        scrub: true,
                    },
                });

                var stopCanvas =
                    $("#sectionContact").outerHeight() -
                    $("canvas").outerHeight() -
                    sectionContactPaddingTop / 2;
                var canvasCenter =
                    ($("#frontPageHero").outerHeight() -
                        $("canvas").outerHeight()) /
                    2;

                gsap.set("canvas", {
                    y: canvasCenter,
                });
                gsap.to("canvas", {
                    bottom: stopCanvas,
                    y: 0,
                    scrollTrigger: {
                        trigger: "body",
                        scrub: true,
                        start: "50%",
                        end: "max",
                    },
                });
            } else {
                var test =
                    $("body").outerHeight() -
                    $("#sectionContact").outerHeight();
                console.log(test); // height canvas in mobile

                $(window).on("scroll", function() {
                    if ($(this).scrollTop() > test) {
                        $("canvas").addClass("absolute");
                        $("canvas").css("top", test);
                        console.log("absolute");
                    } else {
                        $("canvas").removeClass("absolute");
                        console.log("fixed");
                        $("canvas").css("top", "auto");
                    }
                });

                gsap.to(proxy, {
                    time: clip.duration,
                    ease: "none",
                    scrollTrigger: {
                        trigger: "body",
                        start: "top top",
                        end: test,
                        scrub: true,
                    },
                });
                gsap.set("canvas", {
                    y: hymobile,
                });
                gsap.to("canvas", {
                    y: 0,
                    scrollTrigger: {
                        trigger: "body",
                        scrub: true,
                        start: "top top",
                        end: test,
                    },
                });
            }
        }
        createAnimation(mixer, action0, gltf.animations[0]);
    });

    renderer = new THREE.WebGLRenderer({
        antialias: true,
        alpha: true,
    });

    var CanvasHeight;
    var CanvasWidth;

    if ($(window).width() < 992) {
        CanvasWidth = window.innerWidth;
        CanvasHeight = window.innerHeight;
    } else if ($(window).width() > 1680) {
        CanvasWidth = 1680;
        CanvasHeight = Math.round(CanvasWidth * (9 / 16));
    } else {
        CanvasWidth = $(".mainMenu__bar").outerWidth();
        CanvasHeight = Math.round(CanvasWidth * (9 / 16));
    }

    camera = new THREE.PerspectiveCamera(
        45,
        CanvasWidth / CanvasHeight,
        0.1,
        1000
    );
    $("#hero3dModel").append(renderer.domElement);
    renderer.setSize(CanvasWidth, CanvasHeight);
    // *** old
    renderer.setPixelRatio(window.devicePixelRatio);
    // renderer.toneMapping = THREE.ACESFilmicToneMapping;
    // renderer.toneMappingExposure = 0.4;
    // renderer.outputEncoding = THREE.sRGBEncoding;
    // *** end old
    camera.position.set(0, 0, 1.1);

    // ***********
    // ROTATE
    // ***********
    if (window.innerWidth >= 992) {
        document.addEventListener("mousemove", onDocumentMouseMove);
    }

    function onDocumentMouseMove(event) {
        mouseX = event.clientX - 750 - windowHalfX;
        mouseY = event.clientY - windowHalfY;
        mouseLight.position.x = (event.clientX / window.innerWidth) * 2 - 0.75;
        mouseLight.position.y = -(event.clientY / window.innerHeight) * 2 + 1;
    }

    function rotate() {
        targetX = mouseX * 0.001;
        targetY = mouseY * 0.001;

        function renderRotate() {
            if (empty) {
                empty.rotation.y += 0.01 * (targetX - empty.rotation.y);
                empty.rotation.x += 0.01 * (targetY - empty.rotation.x);
            }
        }

        function renderRotateMobile() {
            if (empty) {
                //make sure it reset so no glitch
                if (cd == 1) {
                    empty.rotation.y = 0;
                    empty.rotation.X = 0;
                    cd = 0;
                }
                if (
                    (empty.rotation.x.toFixed(2) >= 0.2 &&
                        empty.rotation.y.toFixed(2) <= -0.2) ||
                    (empty.rotation.x.toFixed(2) >= 0.2 &&
                        empty.rotation.y.toFixed(2) == 0)
                ) {
                    dir = 2;
                } else if (
                    empty.rotation.x.toFixed(2) <= -0.2 &&
                    empty.rotation.y.toFixed(2) >= 0.2
                ) {
                    dir = 3;
                } else if (
                    empty.rotation.y.toFixed(2) >= 0.2 &&
                    empty.rotation.x.toFixed(2) >= 0.2
                ) {
                    dir = 1;
                } else if (
                    empty.rotation.y.toFixed(2) <= -0.2 &&
                    empty.rotation.x.toFixed(2) <= -0.2
                ) {
                    dir = 0;
                }

                if (dir == 0) {
                    empty.rotation.x += 0.001;
                } else if (dir == 1) {
                    empty.rotation.x -= 0.001;
                } else if (dir == 2) {
                    empty.rotation.y += 0.001;
                } else if (dir == 3) {
                    empty.rotation.y -= 0.001;
                }
                //console.log('x:' + empty.rotation.x.toFixed(2) + ', y:' + empty.rotation.y.toFixed(2));
            }
        }

        function renderBackRotate() {
            if (empty) {
                if (empty.rotation.y != 0) {
                    empty.rotation.y -= 0.01 * empty.rotation.y;
                }
                if (empty.rotation.x != 0) {
                    empty.rotation.x -= 0.01 * empty.rotation.x;
                }
            }
            if (dot) {
                dot.rotation.y += 0.0009 * (targetX - dot.rotation.y);
                dot.rotation.x += 0.0009 * (targetY - dot.rotation.x);
            }
            if (line) {
                line.rotation.y += 0.0009 * (targetX - line.rotation.y);
                line.rotation.x += 0.0009 * (targetY - line.rotation.x);
            }
            if (code) {
                code.rotation.y += 0.0009 * (targetX - code.rotation.y);
                code.rotation.x += 0.0009 * (targetY - code.rotation.x);
            }
        }

        function renderBackRotateMobile() {
            if (empty) {
                if (empty.rotation.y != 0) {
                    empty.rotation.y -= 0.01 * empty.rotation.y;
                }
                if (empty.rotation.x != 0) {
                    empty.rotation.x -= 0.01 * empty.rotation.x;
                }
                dir = 0;
            }
        }

        const footerOffsetTop =
            $("#sectionContact").offset().top -
            (window.innerHeight - $("#sectionContact").height());

        if (window.innerWidth >= 991) {
            if (window.scrollY < 1 || window.scrollY >= footerOffsetTop) {
                renderRotate();
            } else if (window.scrollY > 1 && window.scrollY < footerOffsetTop) {
                renderBackRotate();
            }
        } else {
            if (window.scrollY < 1 || window.scrollY >= footerOffsetTop) {
                renderRotateMobile();
            } else if (window.scrollY > 1 && window.scrollY < footerOffsetTop) {
                cd = 1;
                renderBackRotateMobile();
            }
        }
    }

    function animate() {
        requestAnimationFrame(animate);
        rotate();
        renderer.render(scene, camera);
    }
    animate();
}

$(document).ready(function() {
    if ($('.page-template-front-page').length) {
        function detectWebGLRun() {
            if (detectWebGL() === 1) {
                if (isSwiftShaderRenderer() === true) {
                    console.log(
                        "WebGL is enabled, hardware acceleration is enabled."
                    );
                    $("#hideIfAcceleration").addClass("hideIfAcceleration--hidden");
                    $("#hideIfAccelerationFooter").addClass(
                        "sectionContact__hideIfAcceleration--hidden"
                    );
                    webglAnim();
                } else {
                    console.log(
                        "WebGL is enabled, hardware acceleration is disabled."
                    );
                    //$('#webGLInfo_noAcceleration').addClass('webGLInfo--active');
                }
            } else if (detectWebGL() === 0) {
                console.log("WebGL is supported, but disabled.");
                //$('#webGLInfo_disabled').addClass('webGLInfo--active');
            } else if (detectWebGL() === -1) {
                console.log("WebGL not supported.");
                //$('#webGLInfo_notSupported').addClass('webGLInfo--active');
            }
            $(".webGLInfo--active .webGLInfo__close").click(function() {
                $(this)
                    .parent()
                    .parent()
                    .parent()
                    .parent()
                    .removeClass("webGLInfo--active");
            });
        }
        detectWebGLRun();
    }

});

// const data = async () => {
//     let data = await navigator.userAgentData.getHighEntropyValues([ "architecture", "platform", "platformVersion", "model", "bitness", "uaFullVersion" ]);
//     console.log(data.platformVersion)
// }
// data();