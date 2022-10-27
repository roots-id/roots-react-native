import * as models from '../../models';
import { ROUTE_NAMES } from '../constants';

export function goToShowQrCode(
  navigation: any,
  data: models.contactShareable | models.vc | undefined
) {
  if (data) {
    console.log('QR code - Showing QR data', data);
    navigation.navigate(ROUTE_NAMES.SHOW_QR_CODE, { qrdata: data });
  } else {
    console.error('Not showing undefined data', data);
  }
}
