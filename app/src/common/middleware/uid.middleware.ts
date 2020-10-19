
import { Request, Response } from 'express';
import * as _ from "lodash";

export const uid = (req: Request, res: Response, next: Function) => {
  let uid;
  if (req.params.uid) {
    uid = req.params.uid;
  } else if (req.query.uid) {
    uid = req.query.uid;
  } else if (req.body.uid) {
    uid = req.body.uid;
  } else if (req.headers.hasOwnProperty('uid')) {
    uid = req.headers.uid;
  }
  let email;
  if (req.headers.hasOwnProperty('email')) {
    email = req.headers.email;
  }

  let account;
  if (req.headers.hasOwnProperty('account')) {
    email = req.headers.email;
  }

  let clientVersion;
  if (req.headers.hasOwnProperty('client-version')) {
    email = req.headers['client-version'];
  }

  if (!_.isUndefined(uid)) {
    if (req.method === "POST" || req.method === "PUT") {
      req.body.uid = uid;
    }
    if (req.method === "GET") {
      req.query.uid = uid;
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