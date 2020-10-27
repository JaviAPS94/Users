
import { Request, Response } from 'express';
import * as _ from "lodash";

export const uid = (req: Request, res: Response, next: Function) => {
  let uidInRequest;
  if (req.params.uid) {
    uidInRequest = req.params.uid;
  } else if (req.query.uid) {
    uidInRequest = req.query.uid;
  } else if (req.body.uid) {
    uidInRequest = req.body.uid;
  } else if (req.headers.hasOwnProperty('uid')) {
    uidInRequest = req.headers.uid;
  }
  let email;
  if (req.headers.hasOwnProperty('email')) {
    email = req.headers.email;
  }

  let account;
  if (req.headers.hasOwnProperty('account')) {
    account = parseInt((req.headers.account).toString());
  }

  let clientVersion;
  if (req.headers.hasOwnProperty('client-version')) {
    email = req.headers['client-version'];
  }

  if (!_.isUndefined(uidInRequest)) {
    if (req.method === "POST" || req.method === "PUT") {
      req.body.uid = uidInRequest;
    }
    if (req.method === "GET") {
      req.query.uid = uidInRequest;
    }
  }
  if (!_.isUndefined(email)) {
    if (req.method === "POST" || req.method === "PUT") {
      req.body.email = email;
    }
    if (req.method === "GET") {
      req.query.email = email;
    }
  }
  if (!_.isUndefined(account)) {
    if (req.method === "POST" || req.method === "PUT") {
      req.body.account = account;
    }
    if (req.method === "GET") {
      req.query.account = account;
    }
  }
  if (!_.isUndefined(clientVersion)) {
    if (req.method === "POST" || req.method === "PUT") {
      req.body.clientVersion = clientVersion;
    }
    if (req.method === "GET") {
      req.query.clientVersion = clientVersion;
    }
  }
  next();
};