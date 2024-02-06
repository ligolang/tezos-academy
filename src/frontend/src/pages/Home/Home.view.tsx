import * as React from 'react'
import { Link } from 'react-router-dom'

import { Button, ButtonBorder, ButtonText } from '../ChapterAbout/ChapterAbout.style'
//prettier-ignore
import { HomeAdventure, HomeEditor, HomeFooter, HomeFooterGrid, HomeHeader, HomeHeaderGrid, HomeHeaderLeft, HomeHeaderRight, HomeLanguage, HomeLanguageGrid, HomeStyled } from './Home.style'

export const HomeView = () => {
  const isMobile = Math.max(document.documentElement.clientWidth, window.innerWidth || 0) <= 600

  return (
    <HomeStyled>
      <HomeHeader>
        <HomeHeaderGrid>
          <HomeHeaderLeft>
            <h1>Learn to code Tezos Smart Contracts the easy way!</h1>
            <p>Tezos Academy is a fun interactive tutorial to the LIGO language</p>
            <Link to="/js/chapter-about">
              <Button>
                <ButtonBorder />
                <ButtonText onClick={() => { }}>
                  <img alt="rocket" src="/icons/rocket.svg" />
                  GET STARTED
                </ButtonText>
              </Button>
            </Link>
          </HomeHeaderLeft>
          <HomeHeaderRight>
            <img src="/images/ship.png" />
          </HomeHeaderRight>
        </HomeHeaderGrid>
      </HomeHeader>

      <HomeAdventure>
        <h1>Take part in an epic adventure</h1>
        <p>Tezos Academy is a fun interactive tutorial to the LIGO language</p>
        <img alt="adventure" src="/images/adventure.png" />
      </HomeAdventure>

      <HomeLanguage>
        <h1>Choose your language</h1>
        <p>Tezos Academy is compatible with PascaLIGO, CameLIGO and JsLIGO</p>
        <HomeLanguageGrid>
          <div>
            <h3>CameLIGO</h3>
            <p>CameLIGO has a syntax close to OCaml, great for leaning formal languages.</p>
            <img alt="camel" src="/images/camel.svg" />
            <Link to="/camel/chapter-about">
              <Button>
                <ButtonBorder />
                <ButtonText onClick={() => { }}>
                  <img alt="rocket" src="/icons/rocket.svg" />
                  START WITH CAMEL
                </ButtonText>
              </Button>
            </Link>
          </div>

          <div>
            <h3>JsLIGO</h3>
            <p>JsLIGO has a syntax close to JavaScript, great for web developers.</p>
            <img alt="js" src="/images/js.svg" />
            <Link to="/js/chapter-about">
              <Button>
                <ButtonBorder />
                <ButtonText onClick={() => { }}>
                  <img alt="rocket" src="/icons/rocket.svg" />
                  START WITH JS
                </ButtonText>
              </Button>
            </Link>
          </div>
        </HomeLanguageGrid>
      </HomeLanguage>

      <HomeEditor>
        <h1>Interactive editor with git-diff solutions</h1>
        <p>Type your solution to each exercise online and compare with the solution</p>
        <img alt="editor" src="/images/editor.png" />
      </HomeEditor>

      <HomeFooter>
        <HomeFooterGrid>
          <div>
            <img alt="logo" src="/images/logo.svg" />
            <a href="https://github.com/ligolang/tezos-academy" target="_blank">
              Github
            </a>
          </div>
          <div>
            <p>About LIGO</p>
            <a href="https://ligolang.org/docs/intro/introduction" target="_blank">
              Documentation
            </a>
            <a href="https://ide.ligolang.org/" target="_blank">
              Online IDE
            </a>
          </div>
          <div>
            <p>About Tezos</p>
            <a href="mailto:aymeric.bethencourt@smart-chain.fr" target="_blank">
              Support
            </a>
            <a href="https://www.reddit.com/r/tezos/" target="_blank">
              Reddit
            </a>
          </div>
          <div>
            <p>About SmartChain</p>
            <a href="https://smart-chain.fr/" target="_blank">
              Homepage
            </a>
            <a href="https://twitter.com/smartchain_" target="_blank">
              Twitter
            </a>
          </div>
          <div>
            <p>About the devs</p>
            <a href="https://www.linkedin.com/in/aymeric-bethencourt-96665046/" target="_blank">
              Aymeric Bethencourt
            </a>
            <a href="https://www.linkedin.com/in/frank-hillard-300b6b106/" target="_blank">
              Frank Hillard
            </a>
          </div>
          <div>
            <img className="centered" alt="SmartChain logo" src="/images/Smart-Chain-Logo.png" height="30" />
          </div>
        </HomeFooterGrid>
      </HomeFooter>
    </HomeStyled>
  )
}
