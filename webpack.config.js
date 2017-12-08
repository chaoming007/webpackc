const path=require("path")
const webpack=require("webpack")
const HtmlWebpackPlugin = require('html-webpack-plugin')  
const CleanWebpackPlugin = require('clean-webpack-plugin')
const ExtractTextPlugin = require("extract-text-webpack-plugin")

module.exports={
    entry:{
        jquery:path.join(__dirname,"src/js/jquery-3.2.1.min"),
        app:path.join(__dirname,"src/index.js")
    },
    output:{
        path:path.join(__dirname,"dist/"),
        filename:"js/"+"[name]-[hash:4].js"
    },
    module:{
        loaders:[
            {
                test:/\.css$/gi,
                loader:ExtractTextPlugin.extract({
                    fallback: "style-loader",
                    use: "css-loader"
                  })
            },
            {
                test:/\.(sass|scss)$/gi,
                loader:ExtractTextPlugin.extract({
                    fallback: "style-loader",
                    use: ["css-loader","sass-loader"]
                  })
            },
            {
                test:/\.js$/gi,
                loader:"babel-loader",
                exclude: /node_modules/
            },
            {
                test: /\.(png|jpg|gif|svg)$/,
                loader:"url-loader?limit=1024&name=[name].[ext]?[hash]"
            }

        ]
    },
    devtool: '#eval-source-map',
    resolve: { 
        extensions: ['*', '.js', '.vue', '.json']
    },
    plugins:[
        new HtmlWebpackPlugin({
            //template: 'src/index.html'
            filename: 'index.html',         //输出文件名
            template: 'src/index.html'     //模板名字   
        }),
        new ExtractTextPlugin("css/[name].css"),
        new CleanWebpackPlugin(
            ['app-*.js','jquery-*.js'],　 //匹配删除的文件
            {
                root: path.join(__dirname,"dist/js/"),  //根目录
                verbose:  true,        　　　　　　　　　　//开启在控制台输出信息
                dry:      false        　　　　　　　　　　//启用删除文件
            }
        ),
        new webpack.ProvidePlugin({
            $: 'jquery',
            jQuery: 'jquery'
        }),
        new webpack.optimize.UglifyJsPlugin({
            sourceMap: true,
            compress: {
              warnings: false
            }
        }),
        new webpack.LoaderOptionsPlugin({
            minimize: true
        })
    ]

}