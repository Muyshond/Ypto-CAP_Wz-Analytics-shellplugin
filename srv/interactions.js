const cds = require('@sap/cds');
const { getDestination } = require('@sap-cloud-sdk/connectivity');

module.exports = cds.service.impl(async function () {

    
    this.on('getWorkzoneID', async (req) => {
        
        try{

            
            // Basic destination retrieval 
            const destination = await getDestination({ destinationName: 'Piwik' });
    
            if (!destination) {
            console.log('Destination not found!');
            return;
            }
            console.log('URL:', destination.url); 
            console.log('Authentication:', destination.authentication); 
            console.log('Custom Headers:', destination.headers);            

           
            const siteId = destination.originalProperties?.PiwikSiteID || 'No PiwikSiteID';

            return siteId;
            
        } catch(error){
            return "error fetching Workzone ID"  + error; 
        }
        
    });






});