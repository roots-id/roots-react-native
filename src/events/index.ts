export const fakeCreateId =
    function (type: string, callback: (...args:any[]) => any) {
        console.log('RootsEvent - (DEFAULT) createId event received of type',type);
        const id = 'did:'+type+':fakeId'
        console.log('RootsEvent - (DEFAULT) fake id created',id);
        if(callback) {
            callback(id)
        }
    }
