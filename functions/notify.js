import { CourierClient } from '@trycourier/courier'
import uuid4 from 'uuid4'

exports.handler = async function (event, context, callback) {
  try {
    // Parse data posted from front end
    let clientData = JSON.parse(event.body)
    console.log('Client data from front end: ', clientData)

    if (clientData.channelsToSend[0].channelName === 'text') {
      const courier = CourierClient({
        authorizationToken: process.env.COURIER_AUTH_TOKEN,
      })
      console.log('Courier event: ', process.env.COURIER_TWILIO_NOTIFICATION_ID)
      const { requestId } = await courier.send({
        message: {
          template: process.env.COURIER_TWILIO_NOTIFICATION_ID,
          to: {
            phone_number: '4802749288',
          },
          data: {
            messageTitle: clientData.broadcastTitle,
            messageBody: clientData.broadcastBody,
          },
        },
      })

      console.log('The request id from the courier interaction: ', requestId)
    }

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
