import { ChangePassword } from 'pages/ChangePassword/ChangePassword.controller'
import { Chapter } from 'pages/Chapter/Chapter.controller'
import { ChapterAbout } from 'pages/ChapterAbout/ChapterAbout.controller'
import { Error404 } from 'pages/Error404/Error404.controller'
import { ForgotPassword } from 'pages/ForgotPassword/ForgotPassword.controller'
import { Home } from 'pages/Home/Home.controller'
import { Login } from 'pages/Login/Login.controller'
import { ResetPassword } from 'pages/ResetPassword/ResetPassword.controller'
import { SignUp } from 'pages/SignUp/SignUp.controller'
import { User } from 'pages/User/User.controller'
import React from 'react'
import { Route, Switch } from 'react-router-dom'

export const AppRoutes = ({ location }: any) => (
  <Switch location={location}>
    <Route exact path="/">
      <Home />
    </Route>
    <Route exact path="/brave">
      <Home />
    </Route>
    <Route exact path="/sign-up">
      <SignUp />
    </Route>
    <Route exact path="/login">
      <Login />
    </Route>
    <Route exact path="/forgot-password">
      <ForgotPassword />
    </Route>
    <Route exact path="/reset-password/:token">
      <ResetPassword />
    </Route>
    <Route exact path="/change-password">
      <ChangePassword />
    </Route>
    <Route exact path="/js/chapter-about">
      <ChapterAbout />
    </Route>
    <Route exact path="/camel/chapter-about">
      <ChapterAbout />
    </Route>
    <Route path="/js/chapter-*">
      <Chapter />
    </Route>
    <Route path="/camel/chapter-*">
      <Chapter />
    </Route>
    <Route exact path="/user/:username">
      <User />
    </Route>
    <Route>
      <Error404 />
    </Route>
  </Switch>
)
