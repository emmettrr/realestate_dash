const clients = [
  { id: 1, name: 'Client 1', email: 'client1@example.com', interestedIn: 'Home 1', tourStatus: 'Scheduled for Tour' },
  { id: 2, name: 'Client 2', email: 'client2@example.com', interestedIn: 'Lot 1', tourStatus: 'Searching' },
  { id: 3, name: 'Client 3', email: 'client3@example.com', interestedIn: 'Home 2', tourStatus: 'Scheduled for Tour' },
];

const getClients = (req, res) => {
  res.json(clients);
};

module.exports = { getClients };