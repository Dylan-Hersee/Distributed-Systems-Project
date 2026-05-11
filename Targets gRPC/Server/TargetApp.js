var grpc = require('@grpc/grpc-js');
var protoLoader = require('@grpc/proto-loader');
var PROTO_PATH = __dirname + "/../protos/Targets.proto";

var packageDefinition = protoLoader.loadSync(
    PROTO_PATH
);

var Targets_proto = grpc.loadPackageDefinition(packageDefinition).targets;

function showTargets (call, callback){
    try{
        var targetId = ["9.1", "9.2", "9.3", "9.4",  "9.5", "9.a", "9.b", "9.c"]
        var targetDesc =[
        "Develop quality, reliable, sustainable and resilient infrastructure, including regional and transborder infrastructure, to support economic development and human well-being, with a focus on affordable and equitable access for all", 
        "Promote inclusive and sustainable industrialization and, by 2030, significantly raise industry’s share of employment and gross domestic product, in line with national circumstances, and double its share in least developed countries", 
        "Increase the access of small-scale industrial and other enterprises, in particular in developing countries, to financial services, including affordable credit, and their integration into value chains and markets", 
        "By 2030, upgrade infrastructure and retrofit industries to make them sustainable, with increased resource-use efficiency and greater adoption of clean and environmentally sound technologies and industrial processes, with all countries taking action in accordance with their respective capabilities",
        "Enhance scientific research, upgrade the technological capabilities of industrial sectors in all countries, in particular developing countries, including, by 2030, encouraging innovation and substantially increasing the number of research and development workers per 1 million people and public and private research and development spending", 
        "Facilitate sustainable and resilient infrastructure development in developing countries through enhanced financial, technological and technical support to African countries, least developed countries, landlocked developing countries and small island developing States", 
        "Support domestic technology development, research and innovation in developing countries, including by ensuring a conducive policy environment for, inter alia, industrial diversification and value addition to commodities", 
        "Significantly increase access to information and communications technology and strive to provide universal and affordable access to the Internet in least developed countries by 2020"

        ]
        var indicators = [
    ["9.1.1", "9.1.2"],
    ["9.2.1", "9.2.2"],
    ["9.3.1", "9.3.2"],
    ["9.4.1"],
    ["9.5.1", "9.5.2"],
    ["9.a.1"],
    ["9.b.1"],
    ["9.c.1"]
        ]

        var indicatorDesc = [
    ["Proportion of the rural population who live within 2 km of an all-season road",
     "Passenger and freight volumes, by mode of transport"],
    ["Manufacturing value added as a proportion of GDP and per capita",
     "Manufacturing employment as a proportion of total employment"],
    ["Proportion of small-scale industries in total industry value added",
     "Proportion of small-scale industries with a loan or line of credit"],
    ["CO2 emission per unit of value added"],
    ["Research and development expenditure as a proportion of GDP",
     "Researchers (in full-time equivalent) per million inhabitants"],
    ["Total official international support to infrastructure"],
    ["Proportion of medium and high-tech industry value added in total value added"],
    ["Proportion of population covered by a mobile network, by technology"]
        ]

        let targets =[]
        for(let i = 0; i < targetId.length; i++){
            targets.push({
                targetId: targetId[i],
                targetDesc: targetDesc[i],
                indicators: indicators[i],
                indicatorDesc: indicatorDesc[i]
            })
        }
        callback(null, {
        targets: targets
    })
    
    } catch(e){
        console.error("An error has occured while fetching the targets: ", e);
        callback(e, null);
        return;
    }
    

}

var server = new grpc.Server();
server.addService(Targets_proto.TargetsService.service, {showTargets: showTargets});
server.bindAsync("0.0.0.0:40000", grpc.ServerCredentials.createInsecure(), function(){
    console.log('[Targets] Server running on port 40000');
})