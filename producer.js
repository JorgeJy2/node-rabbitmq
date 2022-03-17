
const amqp = require("amqplib");

const rabbitSettings  ={
    protocol: 'amqp',
    hostname: 'localhost',
    port: 5672,
    username: 'dev-jorge',
    password: 'PwF!#FtzpCi82eV',
    vhost: '/',
    authMechanism: ['PLAIN','AMQPLAIN', 'EXTERNAL']
};

connect();
async function connect(){
    const queue = "employees";
    const queueClient = "clients";
    

    const messages = [
        {
            name: "Jorge jy2",
            enterprise: "Praxis mexico"
        },
        {
            name: "Jacobo",
            enterprise: "Praxis mexico"
        },
        {
            name: "Jorge",
            enterprise: "Developer js"
        },
        {
            name: "Francisco",
            enterprise: "Developer js"
        }
    ]

    try {
        const conn = await  amqp.connect(rabbitSettings);
        console.log('Connection created...');

        const channel = await  conn.createChannel();
        console.log('Channel created...');

        const employeeChannel = await channel.assertQueue(queue);
        console.log('Queue created...');

        messages.forEach(
            async(message) =>{
                const messageBuffer = Buffer.from(JSON.stringify(message));
                await channel.sendToQueue(queue,messageBuffer);
                console.log(`Message sent to queue ${message.name}`)
            }
        );


        const clientChannel = await channel.assertQueue(queueClient);


        messages.forEach(
            async(message) =>{
                const messageBuffer = Buffer.from(JSON.stringify(message));
                await channel.sendToQueue(queueClient,messageBuffer);
                console.log(`Message sent to queue ${message.name}`)
            }
        );


        
    } catch (error) {
        console.error(error);
    }
}
