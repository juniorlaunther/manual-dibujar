const fs = require('fs');
let code = fs.readFileSync('index.html', 'utf8');

const oldImage = "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEjVBkmUpPC40mcbTF6rbLXN8Jfi5rARiU8GAQC5wCopFj9u1k-BV21YlQdxI-jxKaM4s-wX7alqQ4za50nRT6iRBrRboz613AMx-3XQm1L2KUgRkzz2n0wrKDevnM8m5fbc6YwsMdHPxcriymdCrB_kcY0vdfx8MX8b-2ECsnKeEhwCbTkNvBUWS-YEpfM/w640-h360/link%20preview.png";
const newImage = "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEhLPtZMxIqt9P3RYkQSMrJzi1MBTyEpQNtsqDZvn0bwZUxj0LGT_t9zYsN1oK5mX1bsWodgI1Izkl4310VeJkyZlnMgaGTF4N-BlCwXw-LItG_wp8GcKWh8BP1tpewbB9wbZBUCJkguIh0F63SoHfDpq_0y-Dlmikgurya4OElM0Lf9qSeqnoRO4iuDhV8/w400-h225/link%20preview.png";

code = code.split(oldImage).join(newImage);

fs.writeFileSync('index.html', code);
