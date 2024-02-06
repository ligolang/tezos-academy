import Editor, { DiffEditor } from '@monaco-editor/react'
import Markdown from 'markdown-to-jsx'
import * as PropTypes from 'prop-types'
import * as React from 'react'
import { useState } from 'react'
import { useLocation } from 'react-router-dom'

import { PENDING, RIGHT, WRONG } from '../ChapterAbout/ChapterAbout.constants'
import {
  Button,
  ButtonBorder,
  ButtonText,
  ChapterCourse,
  ChapterGrid,
  ChapterGridTabNav,
  ChapterH1,
  ChapterH2,
  ChapterH3,
  ChapterItalic,
  ChapterMonaco,
  ChapterStyled,
  ChapterTab,
  ChapterValidator,
  ChapterValidatorContent,
  ChapterValidatorContentWrapper,
  ChapterValidatorInside,
  ChapterValidatorTitle,
} from '../ChapterAbout/ChapterAbout.style'
import { Dialog } from './Chapter.components/Dialog/Dialog.controller'
import { Light } from './Chapter.components/Light/Light.view'

const monacoTheme = 'vs-dark'
const monacoFontOpt = {
  lineNumbers: true,
  scrollBeyondLastLine: true,
  minimap: { enabled: false },
  scrollbar: { vertical: 'hidden', verticalScrollbarSize: 0 },
  folding: true,
  readOnly: true,
  fontSize: 12,
  fontFamily: 'go_monoregular',
}

const MonacoReadOnly = ({ children }: any) => {
  const height = children.split('\n').length * 22
  return (
    <div style={{ marginTop: '10px' }}>
      <Editor
        height={height}
        value={children}
        language="jsligo"
        theme={monacoTheme}
        options={{
          ...monacoFontOpt,
          lineNumbers: false,
          scrollBeyondLastLine: false,
          scrollbar: { vertical: 'hidden', verticalScrollbarSize: 0, alwaysConsumeMouseWheel: false },
          folding: false,
          readOnly: true,
        }}
      />
    </div>
  )
}

const MonacoEditorSupport = ({ support }: any) => {
  return (
    <div>
      <Editor height="500px" value={support} language="jsligo" theme={monacoTheme} options={monacoFontOpt} />
    </div>
  )
}

const MonacoEditor = ({ proposedSolution, proposedSolutionCallback }: any) => {
  return (
    <div>
      <Editor
        height="500px"
        value={proposedSolution}
        language="jsligo"
        theme={monacoTheme}
        onChange={(val, _) => proposedSolutionCallback(val)}
        options={{ ...monacoFontOpt, readOnly: false }}
      />
    </div>
  )
}

const MonacoDiff = ({ solution, proposedSolution }: any) => {
  return (
    <div>
      <DiffEditor
        height="500px"
        original={proposedSolution}
        modified={solution}
        language="jsligo"
        // @ts-ignore
        theme={monacoTheme}
        options={{ ...monacoFontOpt, readOnly: false }}
      />
    </div>
  )
}

const Validator = ({ validatorState, validateCallback }: any) => (
  <ChapterValidator className={validatorState === RIGHT ? 'ok' : 'no'}>
    <ChapterValidatorInside className={validatorState === RIGHT ? 'ok' : 'no'}>
      {validatorState === PENDING && (
        <ChapterValidatorContentWrapper>
          <ChapterValidatorTitle>AWAITING VALIDATION</ChapterValidatorTitle>
          <ChapterValidatorContent>Type your solution above and validate your answer</ChapterValidatorContent>
          <Button>
            <ButtonBorder />
            <ButtonText onClick={() => validateCallback()}>VALIDATE MISSION</ButtonText>
          </Button>
        </ChapterValidatorContentWrapper>
      )}
      {validatorState === RIGHT && (
        <ChapterValidatorContentWrapper>
          <ChapterValidatorTitle>MISSION SUCCESSFUL</ChapterValidatorTitle>
          <ChapterValidatorContent>Go on to the next mission</ChapterValidatorContent>
        </ChapterValidatorContentWrapper>
      )}
      {validatorState === WRONG && (
        <ChapterValidatorContentWrapper>
          <ChapterValidatorTitle>MISSION FAILED</ChapterValidatorTitle>
          <ChapterValidatorContent>Checkout the solution above and try again</ChapterValidatorContent>
          <Button>
            <ButtonBorder />
            <ButtonText onClick={() => validateCallback()}>TRY AGAIN</ButtonText>
          </Button>
        </ChapterValidatorContentWrapper>
      )}
    </ChapterValidatorInside>
  </ChapterValidator>
)

const Content = ({ course }: any) => (
  <Markdown
    children={course}
    options={{
      // disableParsingRawHTML: true,
      overrides: {
        h1: {
          component: ChapterH1,
        },
        h2: {
          component: ChapterH2,
        },
        h3: {
          component: ChapterH3,
        },
        code: {
          component: MonacoReadOnly,
        },
        em: {
          component: ChapterItalic,
        },
        dialog: {
          component: Dialog,
        },
        light: {
          component: Light,
        },
      },
    }}
  />
)

type ChapterViewProps = {
  validatorState: string
  validateCallback: () => void
  solution: string
  proposedSolution: string
  proposedSolutionCallback: (e: string) => void
  showDiff: boolean
  course?: string
  supports: Record<string, string | undefined>
}

export const ChapterView = ({
  validatorState,
  validateCallback,
  solution,
  proposedSolution,
  proposedSolutionCallback,
  showDiff,
  course,
  supports,
}: ChapterViewProps) => {
  const [display, setDisplay] = useState('solution')
  const { pathname } = useLocation()

  let extension = ''
  if (pathname.match(/js/i)) extension = 'jsligo'
  if (pathname.match(/camel/i)) extension = 'mligo'

  return (
    <ChapterStyled>
      <ChapterCourse>
        <Content course={course || ''} />
      </ChapterCourse>
      <ChapterGrid hasTabs={Object.keys(supports).length > 0}>
        {Object.keys(supports).length > 0 && (
          <ChapterGridTabNav>
            <ChapterTab isSelected={display === 'solution'} onClick={() => setDisplay('solution')}>
              Exercise
            </ChapterTab>
            {Object.keys(supports).map((key, index) => (
              <ChapterTab key={key} isSelected={display === key} onClick={() => setDisplay(key)}>
                {`${key}.${extension}`}
              </ChapterTab>
            ))}
          </ChapterGridTabNav>
        )}
        {display === 'solution' ? (
          <ChapterMonaco>
            {showDiff ? (
              <MonacoDiff {...{ solution, proposedSolution }} />
            ) : (
              <MonacoEditor {...{ proposedSolution, proposedSolutionCallback }} />
            )}
          </ChapterMonaco>
        ) : (
          <ChapterMonaco>
            <MonacoEditorSupport support={supports[display]} />
          </ChapterMonaco>
        )}
        <Validator {...{ validatorState, validateCallback }} />
      </ChapterGrid>
    </ChapterStyled>
  )
}

ChapterView.propTypes = {
  validatorState: PropTypes.string,
  validateCallback: PropTypes.func.isRequired,
  solution: PropTypes.string,
  proposedSolution: PropTypes.string,
  showDiff: PropTypes.bool.isRequired,
  proposedSolutionCallback: PropTypes.func.isRequired,
  course: PropTypes.string,
  supports: PropTypes.object.isRequired,
}

ChapterView.defaultProps = {
  validatorState: PENDING,
  solution: '',
  proposedSolution: '',
}
