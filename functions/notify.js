import { CourierClient } from '@trycourier/courier'
import uuid4 from 'uuid4'

exports.handler = async function ({ event, context, callback }) {
  try {
    // const courier = CourierClient({
    //   authorizationToken: process.env.COURIER_AUTH_TOKEN,
    // })
    // console.log('Courier event: ', process.env.COURIER_TWILIO_NOTIFICATION_ID)
    // const { requestId } = await courier.send({
    //   message: {
    //     template: process.env.COURIER_TWILIO_NOTIFICATION_ID,
    //     to: {
    //       phone_number: '4802749288',
    //       email: 'anthony@yourwatchtower.com',
    //     },
    //   },
    // })

    // console.log('The request id from the courier interaction: ', requestId)

    // Return data to front end
    return {
      statusCode: 200,
      body: JSON.stringify({ data: 'You hit the notification route' }),
    }
  } catch (err) {
    console.log('There was an error with the notification route: ', err)
    return {
      statusCode: 404,
      body: JSON.stringify({
        message: err.response.data.message,
      }),
    }
  }
}
