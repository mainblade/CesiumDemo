/*
* 功能：initialEarth()-用来地球主界面的一些基本加载
* 作者：zhujian
* 日期：2020-05-25
*/
function initialEarth(div) {
    /*
    * Cesium目前支持的影像服务类型有：
        ArcGisMapServerImageryProvider-支持ArcGIS Online和Server的相关服务
        BingMapsImageryProvider-Bing地图影像，可以指定mapStyle，详见BingMapsStyle类
        createOpenStreetMapImageryProvider-OSM影像服务，根据不同的url选择不同的风格
        createTileMapServiceImageryProvider-看文档是根据MapTiler规范，貌似是可以自己下载瓦片，发布服务，类似ArcGIS影像服务的过程
        GoogleEarthImageryProvider-企业级服务，没有用过
        ImageryProvider-基类，所有的影像服务最终都基于此类，如果你需要扩展新的Provider也会继承该类
        MapboxImageryProvider-Mapbox影像服务，根据mapId指定地图风格
        SingleTileImageryProvider-单张图片的影像服务，适合离线数据或对影像数据要求并不高的场景下
        UrlTemplateImageryProvider-指定url的format模版，方便用户实现自己的Provider，比如国内的高德，腾讯等影像服务，url都是一个固定的规范，都可以通过该Provider轻松实现。而OSM也是通过该类实现的。
        WebMapServiceImageryProvider-符合WMS规范的影像服务都可以通过该类封装，指定具体参数实现
        WebMapTileServiceImageryProvider-服务WMTS1.0.0规范的影像服务，都可以通过该类实现，比如国内的天地图
        TileCoordinatesImageryProvider-渲染每一个瓦片的围，方便调试
        GridImageryProvider-渲染每一个瓦片内部的格网，了解每个瓦片的精细度
    * */
    var viewer = new Cesium.Viewer(div, {
        baseLayerPicker: false
    });
    //ArcGis服务加载
    var esriLayer = new Cesium.ArcGisMapServerImageryProvider({
        url:'http://atlasmaps.esri.com/arcgis/rest/service/Esri/USA_Population_Density/MapServer',
        enablePickFeatures: false
    });

    var imageryLayers = viewer.imageryLayers;
    esriLayer = imageryLayers.addImageryProvider(esriLayer);
    esriLayer.alpha = 0.5;
    esriLayer.brightness = 2.0;

    var tiandituUrl_w = 'http://t0.tianditu.gov.cn/img_w/wmts?tk=cdc118872f09512b97ce4a06c7564b11';//Cesium加载地图默认为墨卡托投影，但是加载经纬度坐标时会更快
    var tiandituUrl_c = 'http://t0.tianditu.gov.cn/img_c/wmts?tk=cdc118872f09512b97ce4a06c7564b11';
   var tiandituLayer = new Cesium.WebMapTileServiceImageryProvider({
        url: tiandituUrl_c,
        layer: 'img',
        style: 'default',
        format: 'tiles',
        tileMatrixSetID: 'c',
        credit: new Cesium.Credit('天地图全球影像服务'),
        subdomains: ['t0', 't1', 't2', 't3', 't4', 't5', 't6', 't7'],
        maximumLevel: 18,
        tilingScheme: new Cesium.GeographicTilingScheme(),//当选择天地图的投影方式为经纬度时，需指定经纬度
        tileMatrixLabels:['1','2','3','4','5','6','7','8','9','10','11','12','13','14','15','16','17','18','19','20','21','22']//指定每一层级
    });
   viewer._cesiumWidget._creditContainer.style.display = "none";
}
