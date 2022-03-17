
const amqp = require("amqplib");

const rabbitSettings = {
    protocol: 'amqp',
    hostname: 'localhost',
    port: 5672,
    username: 'dev-jorge',
    password: 'PwF!#FtzpCi82eV',
    vhost: '/',
    authMechanism: ['PLAIN', 'AMQPLAIN', 'EXTERNAL']
};

connect();
async function connect() {
    const queue = "employees";

    const enterprise = "Praxis mexico";

    try {
        const conn = await amqp.connect(rabbitSettings);
        console.log('Connection created...');

        const channel = await conn.createChannel();
        console.log('Channel created...');

        const res = await channel.assertQueue(queue);
        console.log('Queue created...');


        console.log(`Wait for messages from ${enterprise}`)

        channel.consume(queue, message => {
            let employee = JSON.parse(message.content.toString());
            console.log(`Received employee ${employee.name}`);
            console.log(employee); 
            channel.ack(message);
            // if(employee.enterprise === enterprise) {
            //     channel.ack(message);
            // }
        });



    } catch (error) {
        console.error(error);
    }
}
