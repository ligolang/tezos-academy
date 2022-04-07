import * as React from 'react'
import Markdown from 'markdown-to-jsx'
import { Dialog } from 'pages/Chapter/Chapter.components/Dialog/Dialog.controller'

import { data } from './ChapterAbout.data'
//prettier-ignore
import {  ChapterAboutStyled, ChapterCourse, ChapterH1, ChapterH2, ChapterH3 } from "./ChapterAbout.style";

export const ChapterAboutView = () => {
  return (
    <ChapterAboutStyled>
      <ChapterCourse>
        <Markdown
          children={data}
          options={{
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
              dialog: {
                component: Dialog,
              },
            },
          }}
        />
      </ChapterCourse>
    </ChapterAboutStyled>
  )
}
