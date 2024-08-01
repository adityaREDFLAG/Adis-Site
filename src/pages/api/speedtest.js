import speedTest from 'speedtest-net';

export default async (req, res) => {
  try {
    const test = speedTest({ acceptLicense: true, acceptGdpr: true });
    test.on('data', data => {
      res.status(200).json(data);
    });

    test.on('error', err => {
      res.status(500).json({ error: err.message });
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
