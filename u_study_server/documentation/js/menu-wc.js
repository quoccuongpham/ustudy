'use strict';

customElements.define('compodoc-menu', class extends HTMLElement {
    constructor() {
        super();
        this.isNormalMode = this.getAttribute('mode') === 'normal';
    }

    connectedCallback() {
        this.render(this.isNormalMode);
    }

    render(isNormalMode) {
        let tp = lithtml.html(`
        <nav>
            <ul class="list">
                <li class="title">
                    <a href="index.html" data-type="index-link">u-study-server documentation</a>
                </li>

                <li class="divider"></li>
                ${ isNormalMode ? `<div id="book-search-input" role="search"><input type="text" placeholder="Type to search"></div>` : '' }
                <li class="chapter">
                    <a data-type="chapter-link" href="index.html"><span class="icon ion-ios-home"></span>Getting started</a>
                    <ul class="links">
                        <li class="link">
                            <a href="overview.html" data-type="chapter-link">
                                <span class="icon ion-ios-keypad"></span>Overview
                            </a>
                        </li>
                        <li class="link">
                            <a href="index.html" data-type="chapter-link">
                                <span class="icon ion-ios-paper"></span>README
                            </a>
                        </li>
                                <li class="link">
                                    <a href="dependencies.html" data-type="chapter-link">
                                        <span class="icon ion-ios-list"></span>Dependencies
                                    </a>
                                </li>
                                <li class="link">
                                    <a href="properties.html" data-type="chapter-link">
                                        <span class="icon ion-ios-apps"></span>Properties
                                    </a>
                                </li>
                    </ul>
                </li>
                    <li class="chapter modules">
                        <a data-type="chapter-link" href="modules.html">
                            <div class="menu-toggler linked" data-bs-toggle="collapse" ${ isNormalMode ?
                                'data-bs-target="#modules-links"' : 'data-bs-target="#xs-modules-links"' }>
                                <span class="icon ion-ios-archive"></span>
                                <span class="link-name">Modules</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                        </a>
                        <ul class="links collapse " ${ isNormalMode ? 'id="modules-links"' : 'id="xs-modules-links"' }>
                            <li class="link">
                                <a href="modules/AppModule.html" data-type="entity-link" >AppModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#controllers-links-module-AppModule-ef2d03071affa50e44e4f9eb0ca808cb0cf17256b3fcaf8472703c86eeab83d1bf1bfa5e097235638bbc69588f46846ae31a6fa8e6a13083b2f55eca4892e723"' : 'data-bs-target="#xs-controllers-links-module-AppModule-ef2d03071affa50e44e4f9eb0ca808cb0cf17256b3fcaf8472703c86eeab83d1bf1bfa5e097235638bbc69588f46846ae31a6fa8e6a13083b2f55eca4892e723"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-AppModule-ef2d03071affa50e44e4f9eb0ca808cb0cf17256b3fcaf8472703c86eeab83d1bf1bfa5e097235638bbc69588f46846ae31a6fa8e6a13083b2f55eca4892e723"' :
                                            'id="xs-controllers-links-module-AppModule-ef2d03071affa50e44e4f9eb0ca808cb0cf17256b3fcaf8472703c86eeab83d1bf1bfa5e097235638bbc69588f46846ae31a6fa8e6a13083b2f55eca4892e723"' }>
                                            <li class="link">
                                                <a href="controllers/AppController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AppController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-AppModule-ef2d03071affa50e44e4f9eb0ca808cb0cf17256b3fcaf8472703c86eeab83d1bf1bfa5e097235638bbc69588f46846ae31a6fa8e6a13083b2f55eca4892e723"' : 'data-bs-target="#xs-injectables-links-module-AppModule-ef2d03071affa50e44e4f9eb0ca808cb0cf17256b3fcaf8472703c86eeab83d1bf1bfa5e097235638bbc69588f46846ae31a6fa8e6a13083b2f55eca4892e723"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-AppModule-ef2d03071affa50e44e4f9eb0ca808cb0cf17256b3fcaf8472703c86eeab83d1bf1bfa5e097235638bbc69588f46846ae31a6fa8e6a13083b2f55eca4892e723"' :
                                        'id="xs-injectables-links-module-AppModule-ef2d03071affa50e44e4f9eb0ca808cb0cf17256b3fcaf8472703c86eeab83d1bf1bfa5e097235638bbc69588f46846ae31a6fa8e6a13083b2f55eca4892e723"' }>
                                        <li class="link">
                                            <a href="injectables/AppService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AppService</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/DatabaseService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >DatabaseService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/AuthModule.html" data-type="entity-link" >AuthModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#controllers-links-module-AuthModule-b8eac0ff7da225b37584e1b6dd34b41426e5fe2c6478c068fa67c7602e7473149f1a2461dd6ee8879502ea5d027821a3189b7592730953c57513ea9b92bce523"' : 'data-bs-target="#xs-controllers-links-module-AuthModule-b8eac0ff7da225b37584e1b6dd34b41426e5fe2c6478c068fa67c7602e7473149f1a2461dd6ee8879502ea5d027821a3189b7592730953c57513ea9b92bce523"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-AuthModule-b8eac0ff7da225b37584e1b6dd34b41426e5fe2c6478c068fa67c7602e7473149f1a2461dd6ee8879502ea5d027821a3189b7592730953c57513ea9b92bce523"' :
                                            'id="xs-controllers-links-module-AuthModule-b8eac0ff7da225b37584e1b6dd34b41426e5fe2c6478c068fa67c7602e7473149f1a2461dd6ee8879502ea5d027821a3189b7592730953c57513ea9b92bce523"' }>
                                            <li class="link">
                                                <a href="controllers/AuthController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AuthController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-AuthModule-b8eac0ff7da225b37584e1b6dd34b41426e5fe2c6478c068fa67c7602e7473149f1a2461dd6ee8879502ea5d027821a3189b7592730953c57513ea9b92bce523"' : 'data-bs-target="#xs-injectables-links-module-AuthModule-b8eac0ff7da225b37584e1b6dd34b41426e5fe2c6478c068fa67c7602e7473149f1a2461dd6ee8879502ea5d027821a3189b7592730953c57513ea9b92bce523"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-AuthModule-b8eac0ff7da225b37584e1b6dd34b41426e5fe2c6478c068fa67c7602e7473149f1a2461dd6ee8879502ea5d027821a3189b7592730953c57513ea9b92bce523"' :
                                        'id="xs-injectables-links-module-AuthModule-b8eac0ff7da225b37584e1b6dd34b41426e5fe2c6478c068fa67c7602e7473149f1a2461dd6ee8879502ea5d027821a3189b7592730953c57513ea9b92bce523"' }>
                                        <li class="link">
                                            <a href="injectables/AuthService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AuthService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/CategoryModule.html" data-type="entity-link" >CategoryModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#controllers-links-module-CategoryModule-d8c10bf6232ec6415ba2374f7f6f147b23e64a9901f85fa962f32aacfd9b7a552efda66d1ed6d23dc268f3c43f2c8dad2d298e0e64441f75a81bda9e363476de"' : 'data-bs-target="#xs-controllers-links-module-CategoryModule-d8c10bf6232ec6415ba2374f7f6f147b23e64a9901f85fa962f32aacfd9b7a552efda66d1ed6d23dc268f3c43f2c8dad2d298e0e64441f75a81bda9e363476de"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-CategoryModule-d8c10bf6232ec6415ba2374f7f6f147b23e64a9901f85fa962f32aacfd9b7a552efda66d1ed6d23dc268f3c43f2c8dad2d298e0e64441f75a81bda9e363476de"' :
                                            'id="xs-controllers-links-module-CategoryModule-d8c10bf6232ec6415ba2374f7f6f147b23e64a9901f85fa962f32aacfd9b7a552efda66d1ed6d23dc268f3c43f2c8dad2d298e0e64441f75a81bda9e363476de"' }>
                                            <li class="link">
                                                <a href="controllers/CategoryController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >CategoryController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-CategoryModule-d8c10bf6232ec6415ba2374f7f6f147b23e64a9901f85fa962f32aacfd9b7a552efda66d1ed6d23dc268f3c43f2c8dad2d298e0e64441f75a81bda9e363476de"' : 'data-bs-target="#xs-injectables-links-module-CategoryModule-d8c10bf6232ec6415ba2374f7f6f147b23e64a9901f85fa962f32aacfd9b7a552efda66d1ed6d23dc268f3c43f2c8dad2d298e0e64441f75a81bda9e363476de"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-CategoryModule-d8c10bf6232ec6415ba2374f7f6f147b23e64a9901f85fa962f32aacfd9b7a552efda66d1ed6d23dc268f3c43f2c8dad2d298e0e64441f75a81bda9e363476de"' :
                                        'id="xs-injectables-links-module-CategoryModule-d8c10bf6232ec6415ba2374f7f6f147b23e64a9901f85fa962f32aacfd9b7a552efda66d1ed6d23dc268f3c43f2c8dad2d298e0e64441f75a81bda9e363476de"' }>
                                        <li class="link">
                                            <a href="injectables/CategoryService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >CategoryService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/ChaptersModule.html" data-type="entity-link" >ChaptersModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#controllers-links-module-ChaptersModule-6a872dd57ecebee6d774133a4e0e962970d4468eb05c22d9223a655d245d19d707bb5b6e39b889bf41965be1a873eab8dafe9dd55b02d24d0f965fe9c33d4191"' : 'data-bs-target="#xs-controllers-links-module-ChaptersModule-6a872dd57ecebee6d774133a4e0e962970d4468eb05c22d9223a655d245d19d707bb5b6e39b889bf41965be1a873eab8dafe9dd55b02d24d0f965fe9c33d4191"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-ChaptersModule-6a872dd57ecebee6d774133a4e0e962970d4468eb05c22d9223a655d245d19d707bb5b6e39b889bf41965be1a873eab8dafe9dd55b02d24d0f965fe9c33d4191"' :
                                            'id="xs-controllers-links-module-ChaptersModule-6a872dd57ecebee6d774133a4e0e962970d4468eb05c22d9223a655d245d19d707bb5b6e39b889bf41965be1a873eab8dafe9dd55b02d24d0f965fe9c33d4191"' }>
                                            <li class="link">
                                                <a href="controllers/ChaptersController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ChaptersController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-ChaptersModule-6a872dd57ecebee6d774133a4e0e962970d4468eb05c22d9223a655d245d19d707bb5b6e39b889bf41965be1a873eab8dafe9dd55b02d24d0f965fe9c33d4191"' : 'data-bs-target="#xs-injectables-links-module-ChaptersModule-6a872dd57ecebee6d774133a4e0e962970d4468eb05c22d9223a655d245d19d707bb5b6e39b889bf41965be1a873eab8dafe9dd55b02d24d0f965fe9c33d4191"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-ChaptersModule-6a872dd57ecebee6d774133a4e0e962970d4468eb05c22d9223a655d245d19d707bb5b6e39b889bf41965be1a873eab8dafe9dd55b02d24d0f965fe9c33d4191"' :
                                        'id="xs-injectables-links-module-ChaptersModule-6a872dd57ecebee6d774133a4e0e962970d4468eb05c22d9223a655d245d19d707bb5b6e39b889bf41965be1a873eab8dafe9dd55b02d24d0f965fe9c33d4191"' }>
                                        <li class="link">
                                            <a href="injectables/ChaptersService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ChaptersService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/ChartModule.html" data-type="entity-link" >ChartModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#controllers-links-module-ChartModule-de90c5c4a570244942ce9c121f8d8437b5d5c7ad331f3dfdff6cddec13618f8612a4a08daa95f020266c8157b4ec743c240bf51adc332dc78e0083999733b11b"' : 'data-bs-target="#xs-controllers-links-module-ChartModule-de90c5c4a570244942ce9c121f8d8437b5d5c7ad331f3dfdff6cddec13618f8612a4a08daa95f020266c8157b4ec743c240bf51adc332dc78e0083999733b11b"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-ChartModule-de90c5c4a570244942ce9c121f8d8437b5d5c7ad331f3dfdff6cddec13618f8612a4a08daa95f020266c8157b4ec743c240bf51adc332dc78e0083999733b11b"' :
                                            'id="xs-controllers-links-module-ChartModule-de90c5c4a570244942ce9c121f8d8437b5d5c7ad331f3dfdff6cddec13618f8612a4a08daa95f020266c8157b4ec743c240bf51adc332dc78e0083999733b11b"' }>
                                            <li class="link">
                                                <a href="controllers/ChartController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ChartController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-ChartModule-de90c5c4a570244942ce9c121f8d8437b5d5c7ad331f3dfdff6cddec13618f8612a4a08daa95f020266c8157b4ec743c240bf51adc332dc78e0083999733b11b"' : 'data-bs-target="#xs-injectables-links-module-ChartModule-de90c5c4a570244942ce9c121f8d8437b5d5c7ad331f3dfdff6cddec13618f8612a4a08daa95f020266c8157b4ec743c240bf51adc332dc78e0083999733b11b"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-ChartModule-de90c5c4a570244942ce9c121f8d8437b5d5c7ad331f3dfdff6cddec13618f8612a4a08daa95f020266c8157b4ec743c240bf51adc332dc78e0083999733b11b"' :
                                        'id="xs-injectables-links-module-ChartModule-de90c5c4a570244942ce9c121f8d8437b5d5c7ad331f3dfdff6cddec13618f8612a4a08daa95f020266c8157b4ec743c240bf51adc332dc78e0083999733b11b"' }>
                                        <li class="link">
                                            <a href="injectables/ChartService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ChartService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/CommentModule.html" data-type="entity-link" >CommentModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#controllers-links-module-CommentModule-4ba40dce211fc7a215155a621472c209d62d2d12d6ba1abe2f8698661deba8c27ea596545480c836b377c5a67c271567cdcec37c49c3059f3f33b55bb6195737"' : 'data-bs-target="#xs-controllers-links-module-CommentModule-4ba40dce211fc7a215155a621472c209d62d2d12d6ba1abe2f8698661deba8c27ea596545480c836b377c5a67c271567cdcec37c49c3059f3f33b55bb6195737"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-CommentModule-4ba40dce211fc7a215155a621472c209d62d2d12d6ba1abe2f8698661deba8c27ea596545480c836b377c5a67c271567cdcec37c49c3059f3f33b55bb6195737"' :
                                            'id="xs-controllers-links-module-CommentModule-4ba40dce211fc7a215155a621472c209d62d2d12d6ba1abe2f8698661deba8c27ea596545480c836b377c5a67c271567cdcec37c49c3059f3f33b55bb6195737"' }>
                                            <li class="link">
                                                <a href="controllers/CommentController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >CommentController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-CommentModule-4ba40dce211fc7a215155a621472c209d62d2d12d6ba1abe2f8698661deba8c27ea596545480c836b377c5a67c271567cdcec37c49c3059f3f33b55bb6195737"' : 'data-bs-target="#xs-injectables-links-module-CommentModule-4ba40dce211fc7a215155a621472c209d62d2d12d6ba1abe2f8698661deba8c27ea596545480c836b377c5a67c271567cdcec37c49c3059f3f33b55bb6195737"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-CommentModule-4ba40dce211fc7a215155a621472c209d62d2d12d6ba1abe2f8698661deba8c27ea596545480c836b377c5a67c271567cdcec37c49c3059f3f33b55bb6195737"' :
                                        'id="xs-injectables-links-module-CommentModule-4ba40dce211fc7a215155a621472c209d62d2d12d6ba1abe2f8698661deba8c27ea596545480c836b377c5a67c271567cdcec37c49c3059f3f33b55bb6195737"' }>
                                        <li class="link">
                                            <a href="injectables/CommentService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >CommentService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/CoursesModule.html" data-type="entity-link" >CoursesModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#controllers-links-module-CoursesModule-7014d0e3e4ff51ec17a33c77d98bae33c36a8c79e9459caea29365e8f70405fe39bd59e64bdcb913c7588dafd0b4266abf3d85fd2fd3a03c0114682afd92e94b"' : 'data-bs-target="#xs-controllers-links-module-CoursesModule-7014d0e3e4ff51ec17a33c77d98bae33c36a8c79e9459caea29365e8f70405fe39bd59e64bdcb913c7588dafd0b4266abf3d85fd2fd3a03c0114682afd92e94b"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-CoursesModule-7014d0e3e4ff51ec17a33c77d98bae33c36a8c79e9459caea29365e8f70405fe39bd59e64bdcb913c7588dafd0b4266abf3d85fd2fd3a03c0114682afd92e94b"' :
                                            'id="xs-controllers-links-module-CoursesModule-7014d0e3e4ff51ec17a33c77d98bae33c36a8c79e9459caea29365e8f70405fe39bd59e64bdcb913c7588dafd0b4266abf3d85fd2fd3a03c0114682afd92e94b"' }>
                                            <li class="link">
                                                <a href="controllers/CoursesController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >CoursesController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-CoursesModule-7014d0e3e4ff51ec17a33c77d98bae33c36a8c79e9459caea29365e8f70405fe39bd59e64bdcb913c7588dafd0b4266abf3d85fd2fd3a03c0114682afd92e94b"' : 'data-bs-target="#xs-injectables-links-module-CoursesModule-7014d0e3e4ff51ec17a33c77d98bae33c36a8c79e9459caea29365e8f70405fe39bd59e64bdcb913c7588dafd0b4266abf3d85fd2fd3a03c0114682afd92e94b"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-CoursesModule-7014d0e3e4ff51ec17a33c77d98bae33c36a8c79e9459caea29365e8f70405fe39bd59e64bdcb913c7588dafd0b4266abf3d85fd2fd3a03c0114682afd92e94b"' :
                                        'id="xs-injectables-links-module-CoursesModule-7014d0e3e4ff51ec17a33c77d98bae33c36a8c79e9459caea29365e8f70405fe39bd59e64bdcb913c7588dafd0b4266abf3d85fd2fd3a03c0114682afd92e94b"' }>
                                        <li class="link">
                                            <a href="injectables/CoursesService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >CoursesService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/DatabaseModule.html" data-type="entity-link" >DatabaseModule</a>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-DatabaseModule-efd590b12813f36f4a0fb562018f22639d6c1b132897094363fedc8134943f14150cdd3e29c86879f43cf2eea611e08deb26dcfb68aa4c0b7bac5840a59127bb"' : 'data-bs-target="#xs-injectables-links-module-DatabaseModule-efd590b12813f36f4a0fb562018f22639d6c1b132897094363fedc8134943f14150cdd3e29c86879f43cf2eea611e08deb26dcfb68aa4c0b7bac5840a59127bb"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-DatabaseModule-efd590b12813f36f4a0fb562018f22639d6c1b132897094363fedc8134943f14150cdd3e29c86879f43cf2eea611e08deb26dcfb68aa4c0b7bac5840a59127bb"' :
                                        'id="xs-injectables-links-module-DatabaseModule-efd590b12813f36f4a0fb562018f22639d6c1b132897094363fedc8134943f14150cdd3e29c86879f43cf2eea611e08deb26dcfb68aa4c0b7bac5840a59127bb"' }>
                                        <li class="link">
                                            <a href="injectables/DatabaseService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >DatabaseService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/FoldersModule.html" data-type="entity-link" >FoldersModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#controllers-links-module-FoldersModule-a0ea08e0124b3674fbddc6dd8e7e7a77edef09cf365a133f69622089b8c4a28e81534c88eba59412ae1a1dbe5d5fc43e8410894ec7dfef8689889e977827d3d0"' : 'data-bs-target="#xs-controllers-links-module-FoldersModule-a0ea08e0124b3674fbddc6dd8e7e7a77edef09cf365a133f69622089b8c4a28e81534c88eba59412ae1a1dbe5d5fc43e8410894ec7dfef8689889e977827d3d0"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-FoldersModule-a0ea08e0124b3674fbddc6dd8e7e7a77edef09cf365a133f69622089b8c4a28e81534c88eba59412ae1a1dbe5d5fc43e8410894ec7dfef8689889e977827d3d0"' :
                                            'id="xs-controllers-links-module-FoldersModule-a0ea08e0124b3674fbddc6dd8e7e7a77edef09cf365a133f69622089b8c4a28e81534c88eba59412ae1a1dbe5d5fc43e8410894ec7dfef8689889e977827d3d0"' }>
                                            <li class="link">
                                                <a href="controllers/FoldersController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >FoldersController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-FoldersModule-a0ea08e0124b3674fbddc6dd8e7e7a77edef09cf365a133f69622089b8c4a28e81534c88eba59412ae1a1dbe5d5fc43e8410894ec7dfef8689889e977827d3d0"' : 'data-bs-target="#xs-injectables-links-module-FoldersModule-a0ea08e0124b3674fbddc6dd8e7e7a77edef09cf365a133f69622089b8c4a28e81534c88eba59412ae1a1dbe5d5fc43e8410894ec7dfef8689889e977827d3d0"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-FoldersModule-a0ea08e0124b3674fbddc6dd8e7e7a77edef09cf365a133f69622089b8c4a28e81534c88eba59412ae1a1dbe5d5fc43e8410894ec7dfef8689889e977827d3d0"' :
                                        'id="xs-injectables-links-module-FoldersModule-a0ea08e0124b3674fbddc6dd8e7e7a77edef09cf365a133f69622089b8c4a28e81534c88eba59412ae1a1dbe5d5fc43e8410894ec7dfef8689889e977827d3d0"' }>
                                        <li class="link">
                                            <a href="injectables/FoldersService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >FoldersService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/GatewayModule.html" data-type="entity-link" >GatewayModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/LearningModule.html" data-type="entity-link" >LearningModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#controllers-links-module-LearningModule-00582e65a5769a1c888b970d9a09b1fce0247f8ffe8fce1219bd148a174e038ddfbf28e716fbb2be5ea24682534877c451295b6033d2b6a2a48c09fb03eaf230"' : 'data-bs-target="#xs-controllers-links-module-LearningModule-00582e65a5769a1c888b970d9a09b1fce0247f8ffe8fce1219bd148a174e038ddfbf28e716fbb2be5ea24682534877c451295b6033d2b6a2a48c09fb03eaf230"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-LearningModule-00582e65a5769a1c888b970d9a09b1fce0247f8ffe8fce1219bd148a174e038ddfbf28e716fbb2be5ea24682534877c451295b6033d2b6a2a48c09fb03eaf230"' :
                                            'id="xs-controllers-links-module-LearningModule-00582e65a5769a1c888b970d9a09b1fce0247f8ffe8fce1219bd148a174e038ddfbf28e716fbb2be5ea24682534877c451295b6033d2b6a2a48c09fb03eaf230"' }>
                                            <li class="link">
                                                <a href="controllers/LearningController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >LearningController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-LearningModule-00582e65a5769a1c888b970d9a09b1fce0247f8ffe8fce1219bd148a174e038ddfbf28e716fbb2be5ea24682534877c451295b6033d2b6a2a48c09fb03eaf230"' : 'data-bs-target="#xs-injectables-links-module-LearningModule-00582e65a5769a1c888b970d9a09b1fce0247f8ffe8fce1219bd148a174e038ddfbf28e716fbb2be5ea24682534877c451295b6033d2b6a2a48c09fb03eaf230"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-LearningModule-00582e65a5769a1c888b970d9a09b1fce0247f8ffe8fce1219bd148a174e038ddfbf28e716fbb2be5ea24682534877c451295b6033d2b6a2a48c09fb03eaf230"' :
                                        'id="xs-injectables-links-module-LearningModule-00582e65a5769a1c888b970d9a09b1fce0247f8ffe8fce1219bd148a174e038ddfbf28e716fbb2be5ea24682534877c451295b6033d2b6a2a48c09fb03eaf230"' }>
                                        <li class="link">
                                            <a href="injectables/LearningService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >LearningService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/NotebookModule.html" data-type="entity-link" >NotebookModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#controllers-links-module-NotebookModule-467c6be7874e1eedfc43ffdfe32d7f67a3c3a51dacd51ea9ec284d8681d1ff3b1c1321c3c1c6801d9e09d50385fda257136adf8307e4f7cf3d64d1a49acfa230"' : 'data-bs-target="#xs-controllers-links-module-NotebookModule-467c6be7874e1eedfc43ffdfe32d7f67a3c3a51dacd51ea9ec284d8681d1ff3b1c1321c3c1c6801d9e09d50385fda257136adf8307e4f7cf3d64d1a49acfa230"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-NotebookModule-467c6be7874e1eedfc43ffdfe32d7f67a3c3a51dacd51ea9ec284d8681d1ff3b1c1321c3c1c6801d9e09d50385fda257136adf8307e4f7cf3d64d1a49acfa230"' :
                                            'id="xs-controllers-links-module-NotebookModule-467c6be7874e1eedfc43ffdfe32d7f67a3c3a51dacd51ea9ec284d8681d1ff3b1c1321c3c1c6801d9e09d50385fda257136adf8307e4f7cf3d64d1a49acfa230"' }>
                                            <li class="link">
                                                <a href="controllers/NotebookController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >NotebookController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-NotebookModule-467c6be7874e1eedfc43ffdfe32d7f67a3c3a51dacd51ea9ec284d8681d1ff3b1c1321c3c1c6801d9e09d50385fda257136adf8307e4f7cf3d64d1a49acfa230"' : 'data-bs-target="#xs-injectables-links-module-NotebookModule-467c6be7874e1eedfc43ffdfe32d7f67a3c3a51dacd51ea9ec284d8681d1ff3b1c1321c3c1c6801d9e09d50385fda257136adf8307e4f7cf3d64d1a49acfa230"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-NotebookModule-467c6be7874e1eedfc43ffdfe32d7f67a3c3a51dacd51ea9ec284d8681d1ff3b1c1321c3c1c6801d9e09d50385fda257136adf8307e4f7cf3d64d1a49acfa230"' :
                                        'id="xs-injectables-links-module-NotebookModule-467c6be7874e1eedfc43ffdfe32d7f67a3c3a51dacd51ea9ec284d8681d1ff3b1c1321c3c1c6801d9e09d50385fda257136adf8307e4f7cf3d64d1a49acfa230"' }>
                                        <li class="link">
                                            <a href="injectables/NotebookService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >NotebookService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/NotesModule.html" data-type="entity-link" >NotesModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#controllers-links-module-NotesModule-5906d27b4fc4c53081ea9aecf3a80855d846ee302c23dec0b2dfcf6cac731c19eba2d994af66033ed267cd03bf150191ed56ba5149b9032de03173b6b7485e84"' : 'data-bs-target="#xs-controllers-links-module-NotesModule-5906d27b4fc4c53081ea9aecf3a80855d846ee302c23dec0b2dfcf6cac731c19eba2d994af66033ed267cd03bf150191ed56ba5149b9032de03173b6b7485e84"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-NotesModule-5906d27b4fc4c53081ea9aecf3a80855d846ee302c23dec0b2dfcf6cac731c19eba2d994af66033ed267cd03bf150191ed56ba5149b9032de03173b6b7485e84"' :
                                            'id="xs-controllers-links-module-NotesModule-5906d27b4fc4c53081ea9aecf3a80855d846ee302c23dec0b2dfcf6cac731c19eba2d994af66033ed267cd03bf150191ed56ba5149b9032de03173b6b7485e84"' }>
                                            <li class="link">
                                                <a href="controllers/NotesController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >NotesController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-NotesModule-5906d27b4fc4c53081ea9aecf3a80855d846ee302c23dec0b2dfcf6cac731c19eba2d994af66033ed267cd03bf150191ed56ba5149b9032de03173b6b7485e84"' : 'data-bs-target="#xs-injectables-links-module-NotesModule-5906d27b4fc4c53081ea9aecf3a80855d846ee302c23dec0b2dfcf6cac731c19eba2d994af66033ed267cd03bf150191ed56ba5149b9032de03173b6b7485e84"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-NotesModule-5906d27b4fc4c53081ea9aecf3a80855d846ee302c23dec0b2dfcf6cac731c19eba2d994af66033ed267cd03bf150191ed56ba5149b9032de03173b6b7485e84"' :
                                        'id="xs-injectables-links-module-NotesModule-5906d27b4fc4c53081ea9aecf3a80855d846ee302c23dec0b2dfcf6cac731c19eba2d994af66033ed267cd03bf150191ed56ba5149b9032de03173b6b7485e84"' }>
                                        <li class="link">
                                            <a href="injectables/NotesService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >NotesService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/PaymentModule.html" data-type="entity-link" >PaymentModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#controllers-links-module-PaymentModule-97bd2e2b947c5f0e6882a6fc6bc15ce36dd1d1801ef3cf51f0b12f95a2aaf444da6300cc5bf065760b0484bcb9abc4bee03268d3da16ebb093ad66ec1db981c3"' : 'data-bs-target="#xs-controllers-links-module-PaymentModule-97bd2e2b947c5f0e6882a6fc6bc15ce36dd1d1801ef3cf51f0b12f95a2aaf444da6300cc5bf065760b0484bcb9abc4bee03268d3da16ebb093ad66ec1db981c3"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-PaymentModule-97bd2e2b947c5f0e6882a6fc6bc15ce36dd1d1801ef3cf51f0b12f95a2aaf444da6300cc5bf065760b0484bcb9abc4bee03268d3da16ebb093ad66ec1db981c3"' :
                                            'id="xs-controllers-links-module-PaymentModule-97bd2e2b947c5f0e6882a6fc6bc15ce36dd1d1801ef3cf51f0b12f95a2aaf444da6300cc5bf065760b0484bcb9abc4bee03268d3da16ebb093ad66ec1db981c3"' }>
                                            <li class="link">
                                                <a href="controllers/PaymentController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >PaymentController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-PaymentModule-97bd2e2b947c5f0e6882a6fc6bc15ce36dd1d1801ef3cf51f0b12f95a2aaf444da6300cc5bf065760b0484bcb9abc4bee03268d3da16ebb093ad66ec1db981c3"' : 'data-bs-target="#xs-injectables-links-module-PaymentModule-97bd2e2b947c5f0e6882a6fc6bc15ce36dd1d1801ef3cf51f0b12f95a2aaf444da6300cc5bf065760b0484bcb9abc4bee03268d3da16ebb093ad66ec1db981c3"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-PaymentModule-97bd2e2b947c5f0e6882a6fc6bc15ce36dd1d1801ef3cf51f0b12f95a2aaf444da6300cc5bf065760b0484bcb9abc4bee03268d3da16ebb093ad66ec1db981c3"' :
                                        'id="xs-injectables-links-module-PaymentModule-97bd2e2b947c5f0e6882a6fc6bc15ce36dd1d1801ef3cf51f0b12f95a2aaf444da6300cc5bf065760b0484bcb9abc4bee03268d3da16ebb093ad66ec1db981c3"' }>
                                        <li class="link">
                                            <a href="injectables/PaymentService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >PaymentService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/UsersModule.html" data-type="entity-link" >UsersModule</a>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-UsersModule-39dfaf1707f8a06327b01e3265fc57b29a6b86152c871029b0afea95862166ec097e061f6b25b03dcc5475716346ccec853c2c586117b1e012212f83b9e2c43b"' : 'data-bs-target="#xs-injectables-links-module-UsersModule-39dfaf1707f8a06327b01e3265fc57b29a6b86152c871029b0afea95862166ec097e061f6b25b03dcc5475716346ccec853c2c586117b1e012212f83b9e2c43b"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-UsersModule-39dfaf1707f8a06327b01e3265fc57b29a6b86152c871029b0afea95862166ec097e061f6b25b03dcc5475716346ccec853c2c586117b1e012212f83b9e2c43b"' :
                                        'id="xs-injectables-links-module-UsersModule-39dfaf1707f8a06327b01e3265fc57b29a6b86152c871029b0afea95862166ec097e061f6b25b03dcc5475716346ccec853c2c586117b1e012212f83b9e2c43b"' }>
                                        <li class="link">
                                            <a href="injectables/UsersService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >UsersService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/VideosModule.html" data-type="entity-link" >VideosModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#controllers-links-module-VideosModule-b77a468247fc8c7aafe733a3d50b10a51f9cdcb130e4b7f2309fdb8b929771997902d9e7ec2263bb85d5f0ae183cdeb349ec5d18731ed6ecef703cc998d6bcf7"' : 'data-bs-target="#xs-controllers-links-module-VideosModule-b77a468247fc8c7aafe733a3d50b10a51f9cdcb130e4b7f2309fdb8b929771997902d9e7ec2263bb85d5f0ae183cdeb349ec5d18731ed6ecef703cc998d6bcf7"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-VideosModule-b77a468247fc8c7aafe733a3d50b10a51f9cdcb130e4b7f2309fdb8b929771997902d9e7ec2263bb85d5f0ae183cdeb349ec5d18731ed6ecef703cc998d6bcf7"' :
                                            'id="xs-controllers-links-module-VideosModule-b77a468247fc8c7aafe733a3d50b10a51f9cdcb130e4b7f2309fdb8b929771997902d9e7ec2263bb85d5f0ae183cdeb349ec5d18731ed6ecef703cc998d6bcf7"' }>
                                            <li class="link">
                                                <a href="controllers/VideosController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >VideosController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-VideosModule-b77a468247fc8c7aafe733a3d50b10a51f9cdcb130e4b7f2309fdb8b929771997902d9e7ec2263bb85d5f0ae183cdeb349ec5d18731ed6ecef703cc998d6bcf7"' : 'data-bs-target="#xs-injectables-links-module-VideosModule-b77a468247fc8c7aafe733a3d50b10a51f9cdcb130e4b7f2309fdb8b929771997902d9e7ec2263bb85d5f0ae183cdeb349ec5d18731ed6ecef703cc998d6bcf7"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-VideosModule-b77a468247fc8c7aafe733a3d50b10a51f9cdcb130e4b7f2309fdb8b929771997902d9e7ec2263bb85d5f0ae183cdeb349ec5d18731ed6ecef703cc998d6bcf7"' :
                                        'id="xs-injectables-links-module-VideosModule-b77a468247fc8c7aafe733a3d50b10a51f9cdcb130e4b7f2309fdb8b929771997902d9e7ec2263bb85d5f0ae183cdeb349ec5d18731ed6ecef703cc998d6bcf7"' }>
                                        <li class="link">
                                            <a href="injectables/VideosService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >VideosService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                </ul>
                </li>
                        <li class="chapter">
                            <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ? 'data-bs-target="#controllers-links"' :
                                'data-bs-target="#xs-controllers-links"' }>
                                <span class="icon ion-md-swap"></span>
                                <span>Controllers</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                            <ul class="links collapse " ${ isNormalMode ? 'id="controllers-links"' : 'id="xs-controllers-links"' }>
                                <li class="link">
                                    <a href="controllers/AppController.html" data-type="entity-link" >AppController</a>
                                </li>
                                <li class="link">
                                    <a href="controllers/AuthController.html" data-type="entity-link" >AuthController</a>
                                </li>
                                <li class="link">
                                    <a href="controllers/CategoryController.html" data-type="entity-link" >CategoryController</a>
                                </li>
                                <li class="link">
                                    <a href="controllers/ChaptersController.html" data-type="entity-link" >ChaptersController</a>
                                </li>
                                <li class="link">
                                    <a href="controllers/ChartController.html" data-type="entity-link" >ChartController</a>
                                </li>
                                <li class="link">
                                    <a href="controllers/CommentController.html" data-type="entity-link" >CommentController</a>
                                </li>
                                <li class="link">
                                    <a href="controllers/CoursesController.html" data-type="entity-link" >CoursesController</a>
                                </li>
                                <li class="link">
                                    <a href="controllers/FoldersController.html" data-type="entity-link" >FoldersController</a>
                                </li>
                                <li class="link">
                                    <a href="controllers/LearningController.html" data-type="entity-link" >LearningController</a>
                                </li>
                                <li class="link">
                                    <a href="controllers/NotebookController.html" data-type="entity-link" >NotebookController</a>
                                </li>
                                <li class="link">
                                    <a href="controllers/NotesController.html" data-type="entity-link" >NotesController</a>
                                </li>
                                <li class="link">
                                    <a href="controllers/PaymentController.html" data-type="entity-link" >PaymentController</a>
                                </li>
                                <li class="link">
                                    <a href="controllers/VideosController.html" data-type="entity-link" >VideosController</a>
                                </li>
                            </ul>
                        </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ? 'data-bs-target="#classes-links"' :
                            'data-bs-target="#xs-classes-links"' }>
                            <span class="icon ion-ios-paper"></span>
                            <span>Classes</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="classes-links"' : 'id="xs-classes-links"' }>
                            <li class="link">
                                <a href="classes/Chapter.html" data-type="entity-link" >Chapter</a>
                            </li>
                            <li class="link">
                                <a href="classes/Course.html" data-type="entity-link" >Course</a>
                            </li>
                            <li class="link">
                                <a href="classes/CreateChapterDto.html" data-type="entity-link" >CreateChapterDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/CreateCommentDto.html" data-type="entity-link" >CreateCommentDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/CreateCourseDto.html" data-type="entity-link" >CreateCourseDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/CreateFolderDto.html" data-type="entity-link" >CreateFolderDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/CreateLearningDto.html" data-type="entity-link" >CreateLearningDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/CreateNotebookDto.html" data-type="entity-link" >CreateNotebookDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/CreateNoteDto.html" data-type="entity-link" >CreateNoteDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/CreatePaymentDto.html" data-type="entity-link" >CreatePaymentDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/CreateVideoDto.html" data-type="entity-link" >CreateVideoDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/Folder.html" data-type="entity-link" >Folder</a>
                            </li>
                            <li class="link">
                                <a href="classes/Gateway.html" data-type="entity-link" >Gateway</a>
                            </li>
                            <li class="link">
                                <a href="classes/Learning.html" data-type="entity-link" >Learning</a>
                            </li>
                            <li class="link">
                                <a href="classes/Note.html" data-type="entity-link" >Note</a>
                            </li>
                            <li class="link">
                                <a href="classes/Notebook.html" data-type="entity-link" >Notebook</a>
                            </li>
                            <li class="link">
                                <a href="classes/RegisterDto.html" data-type="entity-link" >RegisterDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/SignInDto.html" data-type="entity-link" >SignInDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/UpdateChapterDto.html" data-type="entity-link" >UpdateChapterDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/UpdateCourseDto.html" data-type="entity-link" >UpdateCourseDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/UpdateFolderDto.html" data-type="entity-link" >UpdateFolderDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/UpdateLearningDto.html" data-type="entity-link" >UpdateLearningDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/UpdateNotebookDto.html" data-type="entity-link" >UpdateNotebookDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/UpdateNoteDto.html" data-type="entity-link" >UpdateNoteDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/Video.html" data-type="entity-link" >Video</a>
                            </li>
                        </ul>
                    </li>
                        <li class="chapter">
                            <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ? 'data-bs-target="#injectables-links"' :
                                'data-bs-target="#xs-injectables-links"' }>
                                <span class="icon ion-md-arrow-round-down"></span>
                                <span>Injectables</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                            <ul class="links collapse " ${ isNormalMode ? 'id="injectables-links"' : 'id="xs-injectables-links"' }>
                                <li class="link">
                                    <a href="injectables/AppService.html" data-type="entity-link" >AppService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/AuthService.html" data-type="entity-link" >AuthService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/CategoryService.html" data-type="entity-link" >CategoryService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/ChaptersService.html" data-type="entity-link" >ChaptersService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/ChartService.html" data-type="entity-link" >ChartService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/CommentService.html" data-type="entity-link" >CommentService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/CoursesService.html" data-type="entity-link" >CoursesService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/DatabaseService.html" data-type="entity-link" >DatabaseService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/FoldersService.html" data-type="entity-link" >FoldersService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/LearningService.html" data-type="entity-link" >LearningService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/NotebookService.html" data-type="entity-link" >NotebookService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/NotesService.html" data-type="entity-link" >NotesService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/PaymentService.html" data-type="entity-link" >PaymentService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/UsersService.html" data-type="entity-link" >UsersService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/VideosService.html" data-type="entity-link" >VideosService</a>
                                </li>
                            </ul>
                        </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ? 'data-bs-target="#guards-links"' :
                            'data-bs-target="#xs-guards-links"' }>
                            <span class="icon ion-ios-lock"></span>
                            <span>Guards</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="guards-links"' : 'id="xs-guards-links"' }>
                            <li class="link">
                                <a href="guards/AuthGuard.html" data-type="entity-link" >AuthGuard</a>
                            </li>
                        </ul>
                    </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ? 'data-bs-target="#miscellaneous-links"'
                            : 'data-bs-target="#xs-miscellaneous-links"' }>
                            <span class="icon ion-ios-cube"></span>
                            <span>Miscellaneous</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="miscellaneous-links"' : 'id="xs-miscellaneous-links"' }>
                            <li class="link">
                                <a href="miscellaneous/functions.html" data-type="entity-link">Functions</a>
                            </li>
                            <li class="link">
                                <a href="miscellaneous/variables.html" data-type="entity-link">Variables</a>
                            </li>
                        </ul>
                    </li>
                    <li class="chapter">
                        <a data-type="chapter-link" href="coverage.html"><span class="icon ion-ios-stats"></span>Documentation coverage</a>
                    </li>
                    <li class="divider"></li>
                    <li class="copyright">
                        Documentation generated using <a href="https://compodoc.app/" target="_blank" rel="noopener noreferrer">
                            <img data-src="images/compodoc-vectorise.png" class="img-responsive" data-type="compodoc-logo">
                        </a>
                    </li>
            </ul>
        </nav>
        `);
        this.innerHTML = tp.strings;
    }
});