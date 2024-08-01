export default async (req, res) => {
  try {
    const response = await fetch('https://api.fast.com/netflix/speedtest?https=true');
    const data = await response.json();

    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
