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
    /* This is our first test - it tests to make sure that the
     * allFeeds variable has been defined and that it is not
     * empty. Experiment with this before you get started on
     * the rest of this project. What happens when you change
     * allFeeds in app.js to be an empty array and refresh the
     * page?
     */
    it('feeds are defined', function() {
      expect(allFeeds).toBeDefined();
      expect(allFeeds.length).toBeGreaterThan(0);
    });


    // Test in the allFeeds object if URL are defined and not empty.
    it('urls are defined', function() {
      for (var i in allFeeds) {
        expect(allFeeds[i].url).toBeDefined();
        expect(allFeeds[i].url.length).toBeGreaterThan(0);
      }
    });

    /* Test in the allFeeds object if name are defined and not empty.
     * Re-use the structure of the url test.
     */
    it('names are defined', function() {
      for (var i in allFeeds) {
        expect(allFeeds[i].name).toBeDefined();
        expect(allFeeds[i].name.length).toBeGreaterThan(0);
      }
    });
  });

  // Test suite for The Menu.
  describe('The Menu', function() {

    // First test to verify if the menu is hidden by default.
    it('menu is hidden', function() {
      expect($('body').hasClass('menu-hidden')).toBe(true);
    });

    // Test that ensures the menu changes visibility when the icon is clicked.
    it('menu changes visibility on click', function() {
      $('.menu-icon-link').click();
      expect($('body').hasClass('menu-hidden')).toBe(false);
      $('.menu-icon-link').click();
      expect($('body').hasClass('menu-hidden')).toBe(true);
    });
  });


  // Test suite named for Initial Entries.
  describe('Initial Entries', function() {

    // Wait for asynchronous call.
    beforeEach(function(done) {
      loadFeed(0, function() {
        done();
      });
    });

    // Test if the loadFeed function finish with at least an entry.
    it('define if feed has at least a single entry', function() {
      expect($('.feed .entry').length).toBeGreaterThan(0);
    });
  });

  // Test suite named New Feed Selection.
  describe('New Feed Selection', function() {
    let feedOne, feedTwo;

    // Wait for asynchronous call.
    beforeEach(function(done) {

      // Check for first feed.
      loadFeed(1, function() {
        feedOne = $('.feed').html();

        // Check for second feed.
        loadFeed(2, function() {
          done();
        });
      });
    });

    // Check if second feed not equal to first.
    it('checks if feeds are different', function() {
      feedTwo = $('.feed').html();
      expect(feedOne).not.toEqual(feedTwo);
    });
  });
});
