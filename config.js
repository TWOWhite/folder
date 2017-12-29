module.exports = {
    dlls: [
        { key: 'babel', list: ['babel-polyfill'] },
        { key: 'react', list: ['react', 'react-router-dom', 'react-dom'] },
        { key: 'antd', list: ['antd'], depends: ['react'] },
    ]
};
