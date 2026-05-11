var grpc = require('@grpc/grpc-js');
var protoLoader = require('@grpc/proto-loader');
var PROTO_PATH = __dirname + "/../protos/Targets.proto";

var packageDefinition = protoLoader.loadSync(
    PROTO_PATH
);


var Targets_proto = grpc.loadPackageDefinition(packageDefinition).targets;

var client = new Targets_proto.TargetsService('localhost:40000', grpc.credentials.createInsecure());

function showTargets(callback){
    client.showTargets({}, function(err, response){
        if(err) console.error(err);
        callback(null, response);
    })
}

module.exports = {
    showTargets: showTargets
}


