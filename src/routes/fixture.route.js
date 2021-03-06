import { Router } from 'express';

import Controller from '../controllers';
import {
  checkAuthenticatedUser,
  adminAuth,
} from '../middleware/auth.middlerware';
import {
  fixtureId,
  fixtureSchema,
  status,
} from '../utils/validation-schema.utils';
import {
  validateReqBody,
  validateReqParams,
  validateReqQuery,
} from '../middleware/validate-input.middleware';
import tryCatch from '../utils/try-catch.utils';

const fixtureRouter = Router();

fixtureRouter.post(
  '/',
  validateReqBody(fixtureSchema),
  checkAuthenticatedUser,
  adminAuth,
  tryCatch(Controller.createFixture),
);

fixtureRouter.patch(
  '/:fixtureId',
  validateReqParams(fixtureId),
  validateReqBody(fixtureSchema),
  checkAuthenticatedUser,
  adminAuth,
  tryCatch(Controller.updateFixture),
);

fixtureRouter.delete(
  '/:fixtureId',
  validateReqParams(fixtureId),
  checkAuthenticatedUser,
  adminAuth,
  tryCatch(Controller.deleteFixture),
);

fixtureRouter.get(
  '/',
  checkAuthenticatedUser,
  tryCatch(Controller.getAllFixtures),
);

fixtureRouter.get(
  '/status/:status',
  validateReqQuery(status),
  checkAuthenticatedUser,
  tryCatch(Controller.getFixturesByStatus),
);

fixtureRouter.get(
  '/:fixtureId',
  validateReqParams(fixtureId),
  checkAuthenticatedUser,
  tryCatch(Controller.getSingleFixture),
);

export default fixtureRouter;
