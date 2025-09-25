// Simple test for the suggestion converter
const SuggestionConverter = require('./src/converters/suggestion_converter');

// Test the converter functionality
const converter = new SuggestionConverter();

console.log('=== Tree Suggestion Converter Test ===');

// Test 1: Check if trees data loads
console.log('1. Trees data loaded:', converter.treesData.length, 'trees');

// Test 2: Test single soil suggestion
const testSoilData = {
    pH: 6.5,
    humidity: 50,
    moisture: 35
};

try {
    const suggestions = converter.getTreeSuggestions(testSoilData, { maxResults: 5 });
    console.log('2. Single soil suggestion test - SUCCESS');
    console.log('   Found:', suggestions.totalFound, 'compatible trees');
    console.log('   Top suggestion:', suggestions.suggestions[0]?.name || 'None');
} catch (error) {
    console.log('2. Single soil suggestion test - ERROR:', error.message);
}

// Test 3: Test multiple zones
const testZones = [
    { pH: 6.0, humidity: 45, moisture: 30 },
    { pH: 7.0, humidity: 60, moisture: 40 },
    { pH: 6.8, humidity: 55, moisture: 35 }
];

try {
    const zonesResult = converter.processSoilZones(testZones);
    console.log('3. Multiple zones test - SUCCESS');
    console.log('   Processed zones:', zonesResult.processedZones, '/', zonesResult.totalZones);
} catch (error) {
    console.log('3. Multiple zones test - ERROR:', error.message);
}

// Test 4: Test summary
try {
    const summary = converter.getSoilAnalysisSummary(testZones);
    console.log('4. Summary test - SUCCESS');
    console.log('   Average pH:', summary?.averageConditions?.pH);
    console.log('   Average humidity:', summary?.averageConditions?.humidity);
} catch (error) {
    console.log('4. Summary test - ERROR:', error.message);
}

console.log('\n=== Test Complete ===');