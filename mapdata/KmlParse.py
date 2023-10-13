########################################
#
# "kmlParse.py"
#
# Written by J. Boyer and J. Naylor
# for ServeReedley
# 
#
# This Python program reads in a KML 
# file to extract boundary data to 
# format data for use with the
# geolib API
#
########################################

########################################
# Import python libs/modules used
########################################

# import pyKML
import kml2geojson.main
import json

########################################
# Open test.kml
########################################
kml_file = open('Serve Reedley Areas of Concern.kml')
kml_data = kml_file.read()
kml_json_dict = kml2geojson.main.convert('Serve Reedley Areas of Concern.kml')
pt = 0


#######################################
# Variables
#######################################
areas_of_concern = []

#######################################
# Build areas_of_concern dictionary
#######################################

for feature in kml_json_dict[0]['features']:
    polygon = []
    area_of_concern = {'name':feature['properties']['name'],'polygon':polygon}
    areas_of_concern.append(area_of_concern)
    for coord in feature['geometry']['coordinates']:
        pt = 0 # Reset point counter
        for point in coord:
            polygon.append({'latitude':point[1],'longitude':point[0]})
            
            
#######################################
# Build JSON file 
#######################################

with open("../src/data/areasOfConcern.json", "w") as fp:
    json.dump(areas_of_concern , fp)
    

########################################
# dump kml file - Troubleshooting
########################################

print(areas_of_concern)
