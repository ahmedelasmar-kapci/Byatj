import express from 'express';
import passport from 'passport';
import { authenticateJWT } from '../Auth/middlewares/authenticateJWT';
import { enforceUserOwnership } from '../../middlewares/userIsolation';
import { allUsers } from '../../services/userServices';
import { getUserById } from '../../services/driversServices';
import { uploadImage } from '../../middlewares/upload';
import { allDrivers, AllNearstDriver } from '../../services/driversServices';

const router = express.Router();

// Public: none (keep user data protected)

// Authenticated routes
router.get('/online', authenticateJWT(passport), allDrivers); // Consider restricting to admin on service side if needed
/*
  GET /drivers/nearby
 * Returns online drivers near a pickup point, with distance (km), using dynamic radius expansion.
 *
 * Query/body (either):
 *   lat: number (-90..90)
 *   lng: number (-180..180)
 *
 * Response:
 *   {
 *     success: true,
 *     foundRadiusKm: number | null,
 *     drivers: Array<{ ...driverFields, distanceKm: number }>
 *   }
 */
router.post('/drivers/nearby', authenticateJWT(passport), AllNearstDriver);

router.get(
  '/:id',
  authenticateJWT(passport),
  //   enforceUserOwnership('user'),
  getUserById,
);

export default router;
