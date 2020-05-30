const config = {
  // 数据库配置
  database: {
    HOST: 'localhost',
    PORT: '3306',
    USER: 'root',
    PASSWORD: '******',
    DATABASE: 'dada_map',
  },
  jwt: {
    secret: '507f191e810c19729de860ea',
    options: {
      algorithm: 'HS256',
      expiresIn: '2h'
    }
  }
};

module.exports = config;
