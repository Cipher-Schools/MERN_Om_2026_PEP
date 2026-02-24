import axios from "axios";

export const searchStock = async(req, res) => {
    const { symbol } = req.params;

    try {
        const response = await axios.get(
            'https://www.alphavantage.co/query',
            {
                params: {
                    function: 'GLOBAL_QUOTE',
                    symbol,
                    apikey: process.env.STOCK_API_KEY
                }
            }
        )
        res.json(response.data);
        return;
    } catch (err) {
        console.log('Error: ', err);
        res.send('Error while getting current data');
        return

    }
}