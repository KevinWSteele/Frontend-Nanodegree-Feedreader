/* feedreader.js
 *
 * This is the spec file that Jasmine will read and contains
 * all of the tests that will be run against your application.
 */

/* We're placing all of our tests within the $() function,
 * since some of these tests may require DOM elements. We want
 * to ensure they don't run until the DOM is ready.
 */
$(function() {
    /* This is our first test suite - a test suite just contains
    * a related set of tests. This suite is all about the RSS
    * feeds definitions, the allFeeds variable in our application.
    */
    describe('RSS Feeds', function() {
        /* This tests to make sure that the
        * allFeeds variable has been defined and that it is not
        * empty.
        */
        var len = allFeeds.length;

        it('are defined', function() {
            expect(allFeeds).toBeDefined();
            expect(len).not.toBe(0);
        });

        /* Loop through each feed using forEach
        * in the allFeeds object and ensure each URL is defined
        * and not empty.
        */
        it ('URL of allFeeds objects are defined and not empty', function(){
            allFeeds.forEach(function(entry){
                expect(entry.url).toBeDefined();
                expect(entry.url).not.toBeNull();
                expect(entry.url.length).toBeGreaterThan(1);
            });
        });

        /* Loops through each feed using forEach
        * in the allFeeds object and ensures each name is defined
        * and not empty.
        */
        it ('Name of allFeeds objects are defined and not empty', function(){
            allFeeds.forEach(function(entry){
                expect(entry.name).toBeDefined();
                expect(entry.name).not.toBeNull();
                expect(entry.name.length).toBeGreaterThan(1);
            });
        });

    });

    /* Tests the functionality of the the menu" */
    describe('The menu', function() {
        /* The menu is hidden by a class called "menu-hidden".
        * When the menu icon is clicked, the "menu-hidden" class is removed
        * from the body element. When the icon is clicked again, the "menu-hidden"
        * class is added back into the body element. The following tests
        * make sure this feature works.
        */

        var body = document.body,
        className = className;

        //Tests that the body has a "menu-hidden" class when the page has loaded for the first time.
        it('Menu element is hidden by default', function() {
            expect(body.className).toBe('menu-hidden');
        });

        it('Menu changes visibly when the menu icon is clicked', function(){
            //On first click, menu appears and the "menu-hidden" class is removed from the body element.
            $('a.menu-icon-link').trigger('click');
            //expect(bodyClass).toBeNull();//code
            expect(body.className).not.toBe('menu-hidden');

            //On the second click, menu dissappears and the "menu-hidden" class gets added back onto the body element.
            $('a.menu-icon-link').trigger('click');
            expect(body.className).toBe('menu-hidden');
        });
    });

    describe('Initial Entries', function() {
        /* This test ensures that when the loadFeed
        * function is called and completes its work, there are four
        * entry elements within the .feed container.
        */

        //Makes sure that the async project finishes before the test.
        beforeEach(function(done){
            loadFeed(0, done);
        });

        //Tests for at least one entry elements.
        it('Feed contains at least one entry element', function(done){
            var entries = $('.feed .entry');
            expect(entries).toBeDefined();
            expect(entries.length).toBeGreaterThan(1);
            done();
        });
    });

    describe('New Feed Selection', function() {
        var feed1;
        /* Makes sure that when a new feed is loaded
        * by the loadFeed function, the content changes.
        */

        //Makes sure the async project finishes before the test.
        beforeEach(function(done){
            $('.feed').empty();
            loadFeed(1, function(){
               feed1 = $('.feed').html();
               done();
            });
        });

        //Tests that a new feed is loaded and the content changes.
        it('Content of first two feeds change', function(done){
            loadFeed(0, function(){
                expect($('.feed').html()).not.toEqual(feed1);
                done();
            });
        });
    });

}());