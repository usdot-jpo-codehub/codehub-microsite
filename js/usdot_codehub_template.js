Vue.component('dot-header',{
    template:`<div id="dotTopBanner" style="width: 100%; background: #152350; height: 60px; padding: 5px 0 0 10px">
                <a style="background: none" href="https://transportation.gov">
                    <img src="images/icons/dot_logo2.svg" style="height: 35px; margin-left: 25px; margin-top: 8px;"alt="department of transportation logo">
                </a>
                <div id="dotTopLinks" style="line-height: 30px; background: #152350">
                    <a class="headHovers" href="https://www.transportation.gov/mission/about-us" style="font-size: 11px; width: 70px; background: #152350">ABOUT DOT&emsp;&nbsp;|</a>
                    <a class="headHovers" href="https://www.transportation.gov/briefingroom" style="font-size: 11px; width: 80px; background: #152350">&emsp;&nbsp;BRIEFING ROOM&emsp;&nbsp;|</a>
                    <a class="headHovers" href="https://www.transportation.gov/our-activities" style="margin-right: 30px; font-size: 11px; width: 70px; background: #152350">&emsp;&nbsp;OUR ACTIVITIES</a>
                </div>
            </div>`
    
})

Vue.component('navigation-top', {
    template:`<div class="navigation-bar navBarLinks">
                 <a class="headHovers navBarLinks" href="/">ITS JPO SITE</a> <div style="font-size: 15px; padding:3px 7px 3px 7px; display: inline;">|</div>
                 <a class="headHovers navBarLinks" href="/code">HOME</a> <div style="font-size: 15px; padding:3px 5px 7px 7px; display: inline;">|</div>
                 <a class="headHovers navBarLinks" href="/code/repository-registration.htm">REPOSITORY REGISTRATION</a><div style="font-size: 15px; padding:3px 5px 7px 7px; display: inline;">|</div>
                 <a class="headHovers navBarLinks" href="/code/faqs.htm">FAQ</a><div style="font-size: 15px; padding:3px 5px 7px 7px; display: inline;">|</div>
                 <a class="headHovers navBarLinks" href="/code/additional-resources.htm">ADDITIONAL RESOURCES</a>
               </div>`
} )

Vue.component('microsite-footer',{
    data: function(){
        return{
            contact_email:"data.itsjpo@dot.gov"
        }
    },
   created: function(){
        var self = this;
        $.getJSON("./settings/site-settings.json", function (json) {
            self.contact_email = json.contact_email;
        });
    },
    template:   `<div><div id="footerInfo" style="padding-top: 20px;">
                    <div style="display:inline; font-size:50px; font-weight:100; text-align:center">
                        <img src="images/icons/dot_logo.png" style="height: 50px;margin-right: 3px;" alt="DOT Logo" /> 
                        |
                        <img src="images/icons/ITS_JPO.png" style="height: 45px" alt="ITS JPO Logo" /> 
                    </div>
                    <p style="font-weight: bold;">Questions? Contact Us</p>
                    <a id="contactEmail" style="color:white; font-size: 12px;" href="mailto:data.itsjpo@dot.gov">{{ contact_email }}</a>
                </div>
                <div id="footerBox" style="width: 100%; margin-top: 10px;">
                    <div class="footerblack">
                        <a href="https://www.transportation.gov/administrations/research-and-technology/" target="_blank" rel="noopener noreferrer">Office of the Assistant Secretary for Research and Technology (OST-R)</a> • <a href="https://www.transportation.gov/" target="_blank" rel="noopener noreferrer">U.S. Department of Transportation (US DOT)</a>  <br>1200 New Jersey Avenue, SE • Washington, DC 20590 • 800.853.1351
                    </div>
                    
                    <div class="footerblack">
                        <br>
                        <a href="https://www.transportation.gov/web-policies" target="_blank" rel="noopener noreferrer">Web Policies &amp; Notices</a> | 
                        <a href="https://www.transportation.gov/accessibility" target="_blank" rel="noopener noreferrer">Accessibility</a> | 
                        <a href="https://www.transportation.gov/careers" target="_blank" rel="noopener noreferrer">Careers</a> | 
                        <a href="https://www.transportation.gov/foia" target="_blank" rel="noopener noreferrer">FOIA</a> | 
                        <a href="https://www.transportation.gov/privacy" target="_blank" rel="noopener noreferrer">Privacy Policy</a> | 
                        <a href="https://www.transportation.gov/regulations/dot-information-dissemination-quality-guidelines/" target="_blank" rel="noopener noreferrer">Information Quality</a> | 
                        <a href="https://www.civilrights.dot.gov/civil-rights-awareness-enforcement/employment-related/affirmative-employment/no-fear-act" target="_blank" rel="noopener noreferrer">No FEAR Act Data</a> | 
                        <a href="https://www.transportation.gov/ethics" target="_blank" rel="noopener noreferrer">Ethics</a> <br>
                        <a href="https://www.civilrights.dot.gov/" target="_blank" rel="noopener noreferrer">Civil Rights</a> | 
                        <a href="https://www.oig.dot.gov/" target="_blank" rel="noopener noreferrer">Office of Inspector General</a> | 
                        <a href="https://www.oig.dot.gov/Hotline" target="_blank" rel="noopener noreferrer">OIG Hotline</a> | 
                        <a href="https://business.usa.gov/" target="_blank" rel="noopener noreferrer">BusinessUSA</a> | 
                        <a href="https://usa.gov/" target="_blank" rel="noopener noreferrer">USA.gov</a> | 
                        <a href="https://whitehouse.gov/" target="_blank" rel="noopener noreferrer">White House</a>
                    </div>
                    
                    <!-- <div class="footerblacksmall">
                        OST-R's privacy policies and procedures do not necessarily apply to external web sites. We suggest contacting these sites directly for information on
                        their data collection and distribution policies.<br />
                        <br />
                    </div>-->
                </div></div>
                `
})

Vue.component('search-main', {
    data: function(){
        return{
            background_image: '',   //Background image for search bar, set in load_json
            search_placeholder: '', //Placeholder text for search bar on home page

            socrata_domain: 'data.transportation.gov',  //Domain of Socrata site to search, set in load_json
            query: sessionStorage.getItem("sentSearchTerm"),
            totalDataCount: 0
        }
    },
    // Function runs on page load
    created: function () {
        this.datasetCount(); //Sets the total number of datasets available visual
        var self = this;
        $.getJSON("./settings/site-settings.json", function (json) {
            self.background_image = json.background_image;
        });
    },
    methods: {
        //===============================================SEARCH PAGE INITIALIZATION FUNCTIONS===============================================
        // Finds the total count of data for search bar placeholder text, would need to be modified if different search domain is used
        datasetCount: function () {
            var self = this;
            $.getJSON("settings/github-data-backup.json", function(data) {
                self.totalDataCount = data.length;
                self.search_placeholder = self.totalDataCount.toString() + " repositories and counting!";
            });
        },
            
        //Sets search term and sends it to search html page
        searchSend: function (search_query) {
            this.query = search_query;
            sessionStorage.setItem("sentSearchTerm", search_query);
            window.location.href = "search.htm";
        },

    },
    template: ` <div>
                    <div style="width: 33%; position: absolute; padding-top: 40px;">
                        <img style="height: 180px;" src="images/its_jpo_30_anniversary_logo.png" alt="ITS JPO 30th anniversary logo">
                    </div>
                    <div class="TitleText" style="padding-top: 40px;">
                        <h1 class="searchHeaderText">ITS CodeHub</h1>
                        <h3 style="font-size: 18px; font-family: Arial, sans; color: white; text-align: center; margin-top: 10px;">The U.S. Department of Transportation's portal for open-source, ITS source code.</h3>
                        <p style="font-size: 18px; font-family: Arial, Tahoma, sans; color: white; text-align: center; margin-bottom: 12px;">Use the search bar to find all of the source code ITS CodeHub makes discoverable.</p>
                        <label for="mainSearch" class="hidden">Search</label>
                        <input class="mainSearch" id="mainSearch" v-model="query" v-on:keyup.enter="searchSend(query)" v-bind:placeholder="search_placeholder"><button class="searchButton" v-on:click="searchSend(query)">SEARCH</button>
                    </div>
                </div>
                `
})

Vue.component('search-results', {
    data: function(){
        return{
            gitHubRepositories: [],
            query: sessionStorage.getItem("sentSearchTerm"),
            seeMoreToggler: [],
            searchResults: [],                  // List of combined search results
            relevanceSortedSearchResults: [],   // List of combined search results sorted by relevance
            updatedSortedSearchResults: [],        // List of combined search results sorted by date
            nameSortedSearchResults: [],        // List of combined search results sorted by name
            gitHubRepositoriesStringDebug: ""
        }
    },
    created: function(){
        $.ajaxSetup({
            async: false
        });

        // loads all GitHub repo data and stores it
        var secretData = {};
        $.getJSON("./settings/secret.json", function(data) {
            secretData = data;
        }, 'text');
        this.authUser = secretData["username"];
        this.authTok = secretData["token"];

        //for blank queries return all results
        if (this.query == '' || this.query == 'null') {
            this.gitHubRateLimitExceeded = true;
            this.searchResults = this.loadGitHubRepositories();
            this.query = "";
            sessionStorage.setItem("sentSearchTerm","");
        }

        else {

            // boolean that catches when GitHub rate limit has been exceeded
            this.isGitHubRateLimitExceeded = false;

            // loads all GitHub repo data and stores it
            this.gitHubRepositories = this.loadGitHubRepositories();

            // variable to store the GitHub repositories when it's time to update github-data-backup.json
            this.gitHubRepositoriesStringDebug = JSON.stringify(this.gitHubRepositories);
            
            // conducts the search
            this.searchResults = this.searchRepositories(this.query);
        }

        // orders search results based on relevance, name, and date
        this.onSearchResults(this.searchResults);
        var mainSearchElement = document.getElementById("mainSearch");
        if (mainSearchElement != null)  mainSearchElement.value = search_query;
    },
    methods: {

        //===============================================SEARCH FUNCTIONS===============================================

        // Loads all GitHub repo data and stores it
        loadGitHubRepositories: function () {
            $.ajaxSetup({
                async: false
            });

            // stores repository data from GitHub API
            var gitHubResults = [];

            // stores data from repo-settings.json
            var codeHubData = {}; 
            $.getJSON("./settings/repo-settings.json", function(data) {
                codeHubData = data;
            }, 'text');
            var orgs = codeHubData["organizations"];
            var users = codeHubData["users"];

            // get org data
            for (var orgCount = 0; orgCount < orgs.length; orgCount++) {

                // if API request rate is exceeded, stop requesting data
                if (this.isGitHubRateLimitExceeded) break;

                // otherwise, continue
                var org_url = `https://api.github.com/orgs/${orgs[orgCount]["name"]}/repos`; // example: "https://api.github.com/orgs/VolpeUSDOT/repos"
                gitHubResults = gitHubResults.concat(this.getGitHubApiJson(org_url, "organization", orgs[orgCount]["repositories"]));
            }

            // get user data
            for (var userCount = 0; userCount < users.length; userCount++) {
                // if API request rate is exceeded, stop requesting data
                if (this.isGitHubRateLimitExceeded) break;

                // otherwise, continue
                var user_url = `https://api.github.com/users/${users[userCount]["name"]}/repos`; // example: "https://api.github.com/users/usdot-its-jpo-code/repos"
                gitHubResults = gitHubResults.concat(this.getGitHubApiJson(user_url, "user", users[userCount]["repositories"]));
            }

            // if API request rate is exceeded, this retrieves data from the backup file
            if (this.isGitHubRateLimitExceeded) gitHubResults = this.getGitHubResultsFromBackupFile();

            // adds appropriate language icon to each repository
            this.populateLanguageIcons(gitHubResults);

            return gitHubResults;
        },

        // Returns the filtered API search result
        getGitHubApiJson: function (fullUrl, ownerType, reposToFilter) {
            var jsonList = [];
            var reposAreFiltered = reposToFilter[0] != "*";
            var self = this;

            // pulls up category data
            var categoryData = {};
            $.getJSON("./settings/site-settings.json", function(data) {
                categoryData = data;
            });
            
            // populates data for all repositories
            $.ajax({
                type: "GET",
                url: fullUrl,
                dataType: 'json',
                headers: {
                    "Authorization": "Basic " + btoa(this.authUser + ":" + this.authTok)
                },
                success: function (json){
                    const defaultVal = "N/A"
                    for (var itemCount = 0; itemCount < json.length; itemCount++) {
                        var tempJson = {};
    
                        // populate data
                        tempJson["name"] = json[itemCount]["name"] != null ? json[itemCount]["name"] : defaultVal;
                        if(reposAreFiltered && !reposToFilter.includes(tempJson["name"])) continue; // if the current repo is not in the filter, ignore and move on
                        tempJson["url"] = json[itemCount]["html_url"]                   != null ? json[itemCount]["html_url"] : defaultVal;
                        tempJson["description"] = json[itemCount]["description"]        != null ? json[itemCount]["description"] : defaultVal;
                        tempJson["owner"] = json[itemCount]["owner"]["login"]           != null ? json[itemCount]["owner"]["login"] : defaultVal;
                        tempJson["ownerType"] = ownerType;
                        tempJson["language"] = json[itemCount]["language"]              != null ? json[itemCount]["language"] : defaultVal;
                        tempJson["pushedAt"] = json[itemCount]["pushed_at"]           != null ? json[itemCount]["pushed_at"] : defaultVal;
                        tempJson["forksCount"] = json[itemCount]["forks_count"]         != null ? json[itemCount]["forks_count"] : defaultVal;
                        tempJson["watchersCount"] = json[itemCount]["watchers_count"]   != null ? json[itemCount]["watchers_count"] : defaultVal;

                        // categorize entry
                        var category = "Other";
                        for (var categoryCount = 0; categoryCount < categoryData.categories.length; categoryCount++) {
                            var cat = categoryData.categories[categoryCount];
                            if (cat["repositories"].includes(`${tempJson["owner"]}/${tempJson["name"]}`)) category = cat["name"];
                        }
                        tempJson["category"] = category;
                        
                        jsonList.push(tempJson);
                    }
                },
                error: function() {
                    //console.log("GitHub request rate limit likely exceeded.");
                    self.isGitHubRateLimitExceeded = true;
                }
            });

            return jsonList;
        },

        getGitHubResultsFromBackupFile: function() {
            $.getJSON("settings/github-data-backup.json", function(data) {
                backupData = data;
            }, 'text');

            return backupData;
        },

        // Adds appropriate language icon to each repository
        populateLanguageIcons: function(gitHubRepoData) {
            
            // Extracts information from language-icon-settings.json
            $.getJSON("./settings/language-icon-settings.json", function (json) {
                languageIconsJson = json
            });

            // find the correct language icon for all repos
            for (repoCount = 0; repoCount < gitHubRepoData.length; repoCount++) {
                var imageUrl = "./images/icons/generic-language-icon.svg"
                var language = gitHubRepoData[repoCount]["language"];
                for (j = 0; j < languageIconsJson.length; j++) {
                    if (languageIconsJson[j].language == language) {
                        imageUrl = languageIconsJson[j].icon;
                        break;
                    }
                }
                gitHubRepoData[repoCount]["languageIconUrl"] = imageUrl;
            }
        },

        // Queries through stored GitHub repository data
        searchRepositories: function (search_query) {
            
            // looks for filter keys
            search_query_split = search_query.split(":");
            if (search_query_split.length > 1) {
                var isSearchingByCategory = search_query_split[0].toLowerCase() == "category";
                var isSearchingByLanguage = search_query_split[0].toLowerCase() == "language";
                search_query = search_query_split[1];
            }

            var searchResults = [];
            self = this;
            for (repoCount = 0; repoCount < self.gitHubRepositories.length; repoCount++) {
                var item = self.gitHubRepositories[repoCount];

                if (!(isSearchingByCategory || isSearchingByLanguage)) {

                    // match name
                    if (item["name"].toLowerCase().search(search_query.toLowerCase()) > -1 && !self.matchHasDuplicate(item, searchResults)) searchResults.push(item);

                    // match description
                    else if (item["description"].toLowerCase().search(search_query.toLowerCase()) > -1 && !self.matchHasDuplicate(item, searchResults)) searchResults.push(item);
                }

                // match language
                if (!isSearchingByCategory && !self.matchHasDuplicate(item, searchResults) && item["language"].toLowerCase().search(search_query.toLowerCase()) > -1) searchResults.push(item);

                // match category
                if (!isSearchingByLanguage && !self.matchHasDuplicate(item, searchResults) && item["category"].toLowerCase().search(search_query.toLowerCase()) > -1) searchResults.push(item);
            }

            return searchResults;
        },

        // Sorts search results by relevance, date, or name. Also removes duplicates.
        onSearchResults: function (searchResults){
            var self = this;
            self.relevanceSortedSearchResults = searchResults.slice();

            self.updatedSortedSearchResults = searchResults.slice();
            self.updatedSortedSearchResults.sort(self.compareUpdated);

            self.nameSortedSearchResults = searchResults.slice();
            self.nameSortedSearchResults.sort(self.compareName);

            for (var i = 0; i < self.searchResults.length; i = i + 1) {
                self.seeMoreToggler[i] = true;
            }
        },

        matchHasDuplicate: function (match, searchResults) {
            matchName = match["name"];
            matchUrl = match["url"];
            matchOwner = match["owner"];

            for (var iSearchResult = 0; iSearchResult < searchResults.length; iSearchResult++) {
                var item = searchResults[iSearchResult];
                if (item["name"] == matchName && item["url"] == matchUrl && item["owner"] == matchOwner) return true;
            }
            return false;
        },
        
        //Sets search term and sends it to search html page
        searchSend: function (search_query) {
            this.query = search_query;
            sessionStorage.setItem("sentSearchTerm", search_query);
            window.location.href = "search.htm";
        },

        //===============================================SEARCH HELPER FUNCTIONS===============================================

        // Sorts search results by dataset title alphabetically
        compareName: function (a, b) {
            var self = this;
            const titleA = a.name.toUpperCase();
            const titleB = b.name.toUpperCase();

            let comparison = 0;
            if (titleA > titleB) {
                comparison = 1;
            } else if (titleA < titleB) {
                comparison = -1;
            }
            return comparison;
        },
        
        // Sorts search results by date created
        compareUpdated: function(a, b) {
            var self = this;
            var dateA = new Date(a.pushedAt);
            var dateB = new Date(b.pushedAt);

            let comparison = 0;
            if (dateA < dateB) {
                comparison = 1;
            } else if (dateA > dateB) {
                comparison = -1;
            }
            return comparison;
        },

        //===============================================SEARCH RESULT PAGE FORMATTING FUNCTIONS===============================================

        //Creates buttons to select how to organize search results by Name, Date or Relevance
        dropDownFilter: function () {
            var self = this;
            if (document.getElementsByClassName("filterName")[0].checked) {
                self.searchResults = self.nameSortedSearchResults;
            }
            else if (document.getElementsByClassName("filterUpdate")[0].checked) {
                self.searchResults = self.updatedSortedSearchResults;
            }
            else if (document.getElementsByClassName("filterRelevance")[0].checked) {
                self.searchResults = self.relevanceSortedSearchResults;
            }
        },

        //Allows the user to expand the dataset description
        toggleSeeMore: function (index) {
            this.seeMoreToggler[index] = !this.seeMoreToggler[index];
            this.$forceUpdate();
        },

        // Triggers the data set disclaimer before continuing to the page
        dataDisclaimer: function (address) {
            var response = confirm(`DISCLAIMER: The data discoverable through ITS CodeHub is offered as a public service by the U.S. Department of Transportation (U.S. DOT) and is expressly provided “AS IS” and “AS AVAILABLE”.

No warranty or guarantee is made by the U.S. DOT as to the accuracy, reliability, relevancy, timeliness, utility, quality, availability, or completeness of the data. No active effort has been or will be made to monitor the format and any risks related to the format of the data becoming obsolete. The U.S. DOT assumes no responsibility for errors or omissions found in data discovered through ITS CodeHub. The U.S. DOT reserves the right to discontinue availability of content on ITS CodeHub at any time and for any reason. U.S. DOT disclaims any responsibility or legal liability whatsoever, including payment of any damages of any kind, such as, lost profits, lost savings, or any other incidental or consequential damages. U.S. DOT makes such disclaimer of any and all claims based on its provision of the data, your use or reliance on the data, or on any requests for technical assistance through data.itsjpo@dot.gov or the U.S. DOT. The user assumes the entire risk associated with the use or misuse of the data. Users should also review any relevant disclaimers found within storage systems used by ITS CodeHub and/or datasets discoverable through ITS CodeHub.

If you choose to not accept, you will be unable to access the data discoverable through ITS CodeHub. Please contact data.itsjpo@dot.gov with any questions or concerns.`
            );
            if (response == true) window.open(address, '_blank');
        },

        //Sets search term and sends it to search html page
        searchSend: function (search_query) {
            this.query = search_query;
            sessionStorage.setItem("sentSearchTerm", search_query);
            window.location.href = "search.htm";
        }

    },
    template: `<div id="searchresults" class="contentArea searchResults">
                    <br>
                    <div style="display: flex;">
                        <a id="returnPage" class="readButton" style="font-size: 15px; margin-left: 80px;margin-bottom: 10px" v-on:click="window.location.href = '/code/'">Return to Home Page &raquo;</a>
                    </div>
                    <div style="display: flex; float: right; margin-right: 80px">
                        <p style="line-height: 1.8" class="resultsSectionHeading">Sort By: &nbsp;</p>
                        <nav class="segmented-button">
                            <input v-on:click="dropDownFilter" type="radio" name="seg-1" value="R" id="seg-Relevance" class="filterRelevance" checked>
                            <label for="seg-Relevance" class="first">Relevance</label>
                            <input v-on:click="dropDownFilter" type="radio" name="seg-1" value="N" id="seg-Name" class="filterName">
                            <label for="seg-Name" class="first">Name</label>
                            <input v-on:click="dropDownFilter" type="radio" name="seg-1" value="D" id="seg-Update" class="filterUpdate">
                            <label for="seg-Update" class="last">Last Update</label>
                        </nav>
                    </div>
                    <div style="display: flex;">
                        <p class="resultsSectionHeading"><b>SEARCH RESULTS FOR:&nbsp;</b></p>
                        <p class="resultsQuery"><b id="resultsQuery">{{query}}</b></p><br>
                    </div>

                    <div style="display: flex;">
                        <p class="resultsSectionHeading"><b>Number of results:&nbsp;</b><p>
                        <p class="resultsCount"><b>{{searchResults.length}}</b></p><br>
                    </div>


                    <hr class="resultsDivider" noshade>
                    <br>


                    <!--generates a bullet point for each search result item-->
                    <div class="search-results-div" style="margin-left: 100px; margin-right: 100px;">

                        <!--displays results if there are results-->
                        <ul v-if="searchResults.length > 0" style="list-style: none; padding-left: 0px;">
                            <li v-model="seeMoreToggler" v-for="(item,index) in searchResults" style="margin-bottom: 30px; list-style: none;">

                                <table style="width: 100%">
                                    <tr>
                                        <td style="width: 70%">
                                            <!--the data set name-->
                                            <a class='resultItemHeader' style="padding-right: 0%" v-on:click="dataDisclaimer(item.url)" target="_blank">
                                                <td>
                                                    <img v-bind:src="item.languageIconUrl" v-bind:alt="item.language" style="width: 30px;">
                                                </td>
                                                <td>
                                                    {{ item.name }}
                                                <td>
                                            </a>
                                        </td>
                                        <td style="text-align: right; width: 30%;">
                                            <p class="resultItemHeader date-access">
                                                <span class="slightly-bold">Last Update:</span>
                                                {{ item.pushedAt.substring(0,10) }}
                                                <br />
                                            </p>
                                        </td>
                                    </tr>
                                </table>

                                <!--quick stats-->
                                <table>
                                    <tr>
                                        <td>
                                            <p class="tags-tag" style="float:left; height: auto; line-height: 20px;">Language: </p>
                                        </td>
                                        <td>
                                            <button class='tag' v-on:click="searchSend('language:' + item.language)">
                                                {{item.language}}
                                            </button>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>
                                            <p class="tags-tag" style="float:left; height: auto; line-height: 20px;">Category: </p>
                                        </td>
                                        <td>
                                            <button class='tag' v-on:click="searchSend('category:' + item.category)">
                                                {{item.category}}
                                            </button>
                                        </td>
                                    </tr>
                                </table>
                                <table>
                                    <tr>
                                        <td>
                                            <p class="tags-tag" style="float:left; height: auto; line-height: 20px;">Forks: </p>
                                        </td>
                                        <td>
                                            <p class='tag'>
                                                {{item.forksCount}}
                                            </p>
                                        </td>
                                        <td>
                                            <p class="tags-tag" style="float:left; height: auto; line-height: 20px;">Watchers: </p>
                                        </td>
                                        <td>
                                            <p class='tag'>
                                                {{item.watchersCount}}
                                            </p>
                                        </td>
                                    </tr>
                                </table>

                                <!--the data set description-->
                                <p class="dataset-description" v-if="item.description.length > 300 && seeMoreToggler[index] && item.description.indexOf(' ', 290) != -1" style="font-size: 15px; padding-top: 5px;"><span v-html="item.description.substring(0,item.description.indexOf(' ', 290))"></span>...&nbsp;&nbsp; <button class="btn-read-more-less one" v-on:click="toggleSeeMore(index)">Read More</button></p>
                                <p class="dataset-description" v-else-if="item.description.length > 300 && seeMoreToggler[index]" style="font-size: 15px; padding-top: 5px;"><span v-html="item.description.substring(0,item.description.lastIndexOf(' '))"></span>{{ item.description.substring(0,item.description.lastIndexOf(" "))}}...&nbsp;&nbsp; <button class="btn-read-more-less two" v-on:click="toggleSeeMore(index)">Read More</button></p>
                                <p class="dataset-description" v-else-if="item.description.length > 300 && !seeMoreToggler[index]" style="font-size: 15px; padding-top: 5px;"><span v-html="item.description"></span>&nbsp;&nbsp; <button class="btn-read-more-less three" v-on:click="toggleSeeMore(index)">Read Less</button></p>
                                <p class="dataset-description" v-else-if="item.description.length > 0" style="font-size: 15px; padding-top: 5px;"><span v-html="item.description"></span></p>
                                <p class="dataset-description" v-else style="font-size: 15px; padding-top: 5px;">No description available.</p>

                                <!--lists the domain tags-->
                                <!--
                                <div v-if="item.tags.length > 0" style="padding-top: 5px;">
                                    <table>
                                        <td>
                                            <p class="tags-tag" style="float:left; height: auto; line-height: 20px;">Tags: </p>
                                        </td>
                                        <td>
                                            <button v-for="(tag, index) in item.tags" class='tag' v-on:click="search(tag)">
                                                {{tag}}
                                                <span v-if="index != item.tags.length - 1">,</span>    
                                            </button>
                                            
                                        </td>
                                    </table>
                                </div>
                                -->
                                <hr v-if="searchResults.length != index+1" style="border-color: #DEDEDE" noshade>
                            </li>
                        </ul>
                        <div v-else>
                            <p>No search results.</p>
                        </div>
                    </div>
                </div>`
})

Vue.component('featured-projects', {
    data:  function(){
        return{
            featured: [],
        }
    },
    created:function(){
        this.load_dataset_json();
    },
    methods: {
        load_dataset_json: function() {
            $.ajaxSetup({
                async: false
            });
            var self = this;

            // Extracts all information from datasets.json
            $.getJSON("./settings/site-settings.json", function (json) {
                dataSetsJson = json
            });

            // Extracts information from language-icon-settings.json
            $.getJSON("./settings/language-icon-settings.json", function (json) {
                languageIconsJson = json
            });

            var i;
            for (i = 0; i < Math.min(dataSetsJson.maxFeatured, dataSetsJson.featured.length) ; i++) {

                // find the correct language icon
                var language = dataSetsJson.featured[i].language;
                var imageUrl = "./images/icons/generic-language-icon.svg"
                for (j = 0; j < languageIconsJson.length; j++) {
                    if (languageIconsJson[j].language == language) {
                        imageUrl = languageIconsJson[j].icon;
                        break;
                    }
                }

                // store the data
                self.featured.push({
                    'url': dataSetsJson.featured[i].url,
                    'image': imageUrl,
                    'language': language,
                    'altText':dataSetsJson.featured[i].altText,
                    'name':dataSetsJson.featured[i].name,
                    'desc':dataSetsJson.featured[i].description,
                    'id': "fds" + i,
                    'dataId': dataSetsJson.featured[i].url.substring(dataSetsJson.featured[i].url.length - 9, dataSetsJson.featured[i].url.length)
                })
            }
            $.ajaxSetup({
                async: true
            });
        },

        // Triggers the data set disclaimer before continuing to the page
        dataDisclaimer: function (address) {
            var response = confirm(`DISCLAIMER: The data discoverable through ITS CodeHub is offered as a public service by the U.S. Department of Transportation (U.S. DOT) and is expressly provided “AS IS” and “AS AVAILABLE”.

No warranty or guarantee is made by the U.S. DOT as to the accuracy, reliability, relevancy, timeliness, utility, quality, availability, or completeness of the data. No active effort has been or will be made to monitor the format and any risks related to the format of the data becoming obsolete. The U.S. DOT assumes no responsibility for errors or omissions found in data discovered through ITS CodeHub. The U.S. DOT reserves the right to discontinue availability of content on ITS CodeHub at any time and for any reason. U.S. DOT disclaims any responsibility or legal liability whatsoever, including payment of any damages of any kind, such as, lost profits, lost savings, or any other incidental or consequential damages. U.S. DOT makes such disclaimer of any and all claims based on its provision of the data, your use or reliance on the data, or on any requests for technical assistance through data.itsjpo@dot.gov or the U.S. DOT. The user assumes the entire risk associated with the use or misuse of the data. Users should also review any relevant disclaimers found within storage systems used by ITS CodeHub and/or datasets discoverable through ITS CodeHub.

If you choose to not accept, you will be unable to access the data discoverable through ITS CodeHub. Please contact data.itsjpo@dot.gov with any questions or concerns.`
            );
            if (response == true) window.open(address, '_blank');
        }
    },
    template: `<div id="DatasetDiv" style="text-align: center;">
            <img class="contentIndicator" style="top: -30px" src="images/icons/ContentIndicator.png" alt="Content Indicator Arrow"/>
            <div id="FeaturedDataArea" style="background-image: url('images/Header.png');">
                <h3 class="headingFont" style="color: #152350; padding-top: 3%;"><b>FEATURED PROJECTS</b></h3>
                <div style="display: flex; margin-left: 8%; margin-right: 8%;" id="datasetArea">
                    <div id="bulmaDatasetFDS" class="columns is-multiline">
                        <div v-for="feature in featured" class="column is-one-quarter" style="background: #152350; margin: 5% auto; padding: 0; max-width: 50%; min-width: 300px; border-radius: 10px;" v-bind:id="feature.id">
                            <a v-on:click="dataDisclaimer(feature.url)" target="_blank">
                                <table style="margin-left: 7%; margin-right: 7%; margin-top: 7%; text-align: left">
                                    <td style="width: 30%;">
                                        <img v-bind:src="feature.image" v-bind:alt="feature.altText" class="codingLanguageIcon">
                                    </td>
                                    <td style="width: 70%;">
                                        <tr>
                                            <h3 class="featuredHeading">{{feature.name}}</h3>
                                        </tr>
                                        <tr>
                                            <p class="featuredHeading">{{feature.language}}</p>
                                        </tr>
                                    </td>
                                </table>
                                <p style="color: white; margin-left: 7%; margin-right: 7%; text-align: left">{{feature.desc}}</p>
                                <br> 
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </div>`
})

Vue.component('category-search', {
    data: function(){
        return{
                // Entries for template data
                buttons: []
        }
    },
    created: function(){
        this.load_categories_json();
    },
    methods: {
        load_categories_json: function () {
            var self = this;
            $.ajaxSetup({
                async: false
            });

            // Extracts all information out of data.json
            $.getJSON("./settings/site-settings.json", function (json) {
                var i;
                for (i = 0; i < Math.min(json.maxCategories, json.categories.length) ; i++) {
                    self.buttons.push({ 'labels': json.categories[i].name,
                                        'imgIcons':json.categories[i].icon,
                                        'rolloverImages': json.categories[i].rolloverIcon,
                                        'altText': json.categories[i].altText,
                                        'id':"bterm" + i});
                }
            });
            $.ajaxSetup({
                async: true
            });
        },
        //===============================================SEARCH FUNCTIONS===============================================        
        //Sets search term and sends it to search html page
        searchSend: function (search_query) {
            this.query = search_query;
            sessionStorage.setItem("sentSearchTerm", search_query);
            window.location.href = "search.htm";
        }
    },
    template: `
        <div id="categoryDiv">
            <img class="contentIndicator" style="top: -57px" src="images/icons/ContentIndicator.png" alt="Content Indicator Arrow"/>
            <div id="CategoryAreaHead">
                <h3 class="headingFont" style="color: white"><b>CATEGORIES</b></h3>
            </div>

            <div id="categoryArea" class="contentArea categorylayout">
                <div id="bulmaDataset" class="columns is-multiline" style="padding: 0 0 5% 0; height: 100%">
                    <div class="bulmaCategories column is-one-quarter" v-for="btn in buttons">
                        <button v-bind:id="btn.id" class="topic" vertical-align="middle" style="padding-bottom: 10px;" v-on:click="searchSend('category:' + btn.labels)">
                            <img v-bind:src="btn.imgIcons" v-bind:alt="btn.altText" style="width: 48px; height: 48px; margin-bottom: 20%;" class="RegularThumbnail">
                            <img v-bind:src="btn.rolloverImages" v-bind:alt="btn.altText" class="HoverThumbnail">
                            <p class="categoryText" style="text-transform: uppercase;">{{btn.labels}}</p>
                        </button>
                    </div>
                </div>
            </div>
        </div>`
})

Vue.component('registration', {
    template:`<div id="pageContent" class="codehub code-repositories">
                <!--start of right side container for sub pages-->
                <!-- TemplateBeginEditable name="EditRegionBODY" -->

                <div id="printReady">

                    <div class="h1wrapper_outer">
                        <div class="h1wrapper_inner">
                            <h1 id="codehub-page-heading"><img alt="Checkmark in box"
                                    style="width: 28px; height: auto; margin-right: 9px;" 
                                    src="images/repository_registration_icon.svg" />ITS CodeHub: Repository Registration</h1>
                        </div>
                    </div>
                    <div class="codehub-content registration-content" id="repository-registration">
                        <div class="lead-paragraph bottom-border flex-area_row">
                            <p>ITS CodeHub is committed to providing the ITS community simplified access to the
                                most relevant and useful repositories. If you would like to make a repository
                                discoverable through ITS CodeHub, please follow the steps listed below. For more information, click the button
                                below to download a the ITS JPO CodeHub Upload Process powerpoint presentation.
                            </p>
                            <button id="download-repository-form"><a href="documents/CodeHubUploadProcess.pptx" role="button">
                                DOWNLOAD INSTRUCTIONS <img
                                    src="images/downloadarrow_white.svg" alt="download-icon"
                                    class="download-icon" /></a></button>
                        </div>

                        <div class="flex-area_row">
                            <div class="flex-area_column">
                                <h2><span class="accent-color-text">Step 1</span><br><span class="gray-text">Submit
                                        Repository Information</span></h2>
                                <p>Begin the registration process by emailing the ITS JPO Data Program at 
                                    <a href="mailto:data.itsjpo@dot.gov">data.itsjpo@dot.gov</a>. In the email, provide the name of your project, 
                                    points of contact, the current status of the project/code, and information on how the project is funded (JPO, FHWA, etc.)</p>
                            </div>
                            <div class="flex-area_column">
                                <img src="images/ITSJPO_CodeHub_RepositoryRegistration_012820_1.svg"
                                    alt="Pen on top of several loosely stacked papers" width="110" height="110"
                                    class="repository-registration-step" />
                            </div>
                        </div>
                        <div class="flex-area_row">
                            <div class="flex-area_column">
                                <h2><span class="accent-color-text">Step 2</span><br><span
                                        class="gray-text">Project Submission Review</span></h2>
                                <p>The ITS JPO Support Team will confirm receipt of your email within two days and will
                                start a review of the submitted information. You will receive notice of whether your 
                                project has been approved for listing on ITS CodeHub within one week.</p>
                            </div>
                            <div class="flex-area_column">
                                <img src="images/ITSJPO_CodeHub_RepositoryRegistration_012820_2.svg"
                                    alt="Hand holding magnifying glass over loosely stacked papers" width="110" height="110"
                                    class="repository-registration-step" />
                            </div>
                        </div>
                        <div class="flex-area_row">
                            <div class="flex-area_column">
                                <h2><span class="accent-color-text">Step 3</span><br><span
                                        class="gray-text">Repository Listing</span></h2>
                                <p>If you have not already done so add your code to a public GitHub repository or if preferred, a GitHub repository
                                can also be created for you under the control of the ITS JPO Support Team. Include an appropriate README
                                following the <a href="documents/CodeHubREADMETemplate.md" rel="noopener noreferrer" target="_blank">ITS CodeHub README template<img src="images/new_tab_icon.svg" alt="External link icon" width="13px" height="12px" class="external-link-icon" /></a>. 
                                For Code Quality Best Practices, please download the <a href="documents/ITS_JPO_CodeHubs_Code_Quality_Best_Practices_Checklist.pdf" rel="noopener noreferrer" target="_blank">ITS CodeHub Code Quality Best Practices Checklist<img src="images/new_tab_icon.svg" alt="External link icon" width="13px" height="12px" class="external-link-icon" /></a>. 
                                The repository will be added to the list of ITS JPO repositories and made discoverable on the ITS CodeHub by the website's admins after
                                it has passed the final review of the code and documentation.</p>
                            </div>
                            <div class="flex-area_column">
                                <img src="images/ITSJPO_CodeHub_RepositoryRegistration_012820_3.svg"
                                    alt="Computer monitor displaying web page" width="110" height="110"
                                    class="repository-registration-step" />
                            </div>
                        </div>
                        <div class="flex-area_row">
                            <div class="flex-area_column">
                                <h2><span class="accent-color-text">Deprecation</span></h2>
                                <p>Those that wish to remove their repository from ITS CodeHub should contact
                                    the ITS JPO Support Team at <a
                                        href="mailto:data.itsjpo@dot.gov">data.itsjpo@dot.gov</a>.</p>
                            </div>
                            <div class="flex-area_column">
                                <img src="images/ITSJPO_CodeHub_RepositoryRegistration_012820_delete.svg"
                                    alt="Papers going into a trashcan" width="110" height="110"
                                    class="repository-registration-step" />
                            </div>
                        </div>
                    </div>
                </div>
        </div>`
} )

Vue.component('faq', {
    template:`<div id="pageContent" class="codehub faqs">
                       
                        <div id="printReady">

                            <div class="h1wrapper_outer">
                                <div class="h1wrapper_inner">
                                    <h1 id="codehub-page-heading"><img
                                        style="width: 42px; height: auto; margin-right: 9px;"
                                        src="images/faqs_icon.svg" alt="2 speech bubbles signifying a conversation"/>ITS CodeHub: Frequently Asked Questions</h1>
                                </div>
                            </div>
                            <div class="codehub-content">
                                <p class="faqs-question">What is ITS CodeHub? </p>
                                <p class="faqs-answer">ITS CodeHub provides a single point of entry to discover the U.S. Department of Transportation&#39;s (DOT) publicly available open source code funded by the Intelligent Transportation Systems (ITS) Joint Program Office (JPO).</p>
                                <p class="faqs-question">How can I register my repositories on ITS CodeHub?</p>
                                <p class="faqs-answer">Check out the detailed registration process on the <a href="/code/repository-registration.htm" rel="noopener noreferrer">Repository Registration page</a>. You will be asked to fill out and submit the linked form. Once complete, the ITS JPO Support Team will review your application and determine whether the repository will be made discoverable through ITS CodeHub. </p>
                                
                                <p class="faqs-question">Does ITS CodeHub have any guidelines for developing open source code?</p>
                                <p class="faqs-answer p_reduce-bottom-margin">ITS CodeHub encourages safe coding practices and for code to be developed with open standards in mind. Here is the ITS JPO CodeHub's Code Quality Best Practices Checklist:</p> 
                                <ul class="ul_remove-spacing_above-and-below">
                                    <li>No Usernames or Passwords</li>
                                    <li>No Confidential Business Information (CBI)</li>
                                    <li>No non-public internet protocol (IP) addresses</li>
                                    <li>Code uses open standards from <a href="https://www.transportation.gov/sites/dot.gov/files/docs/mission/284471/policy-135127-enterprise-architecture-implementation-instruction-source-code-managementfinal.pdf" target="_blank" rel="noopener noreferrer">U.S. DOT Source Code Management<img src="images/new_tab_icon.svg" alt="External link icon" width="12px" height="11px" class="external-link-icon inline"/></a></li>
                                    <li>Code uses Open Source Software (OSS) licenses</li>
                                    <li>Obtain appropriate data rights to custom-developed code</li>
                                    <li>Establish processes for the review and approval of all requests to release custom-developed code as OSS</li>
                                </ul>
                                <p class="p_reduce-top-margin"><a href="documents/ITS_JPO_CodeHubs_Code_Quality_Best_Practices_Checklist.pdf" rel="noopener noreferrer" target="_blank">Download the ITS JPO CodeHub's Code Quality Best Practices Checklist<img src="images/new_tab_icon.svg" alt="External link icon" width="13px" height="12px" class="external-link-icon inline" /></a>
                                </p> 
                                <p class="faqs-answer">For more information on coding practices, please see <a href="https://www.transportation.gov/digitalstrategy/policyarchive/open-source-management" target="_blank" rel="noopener noreferrer">U.S. DOT's Open Source Management<img src="images/new_tab_icon.svg" alt="External link icon" width="12px" height="11px" class="external-link-icon inline"/></a>.
                                </p>
                                
                                
                                <p class="faqs-question">May I freely use and distribute the open source code I discovered on ITS CodeHub?</p>
                                <p class="faqs-answer">The open source code repositories discoverable on ITS CodeHub come with open source license information including terms for use. Check each repository&#39;s accompanying LICENSE and/or README file for additional information about use and reuse.</p>
                                <p class="faqs-question">Is there a location where I can find transportation data to support the development and use of the source code discoverable through ITS CodeHub?</p>
                                <p class="faqs-answer">Yes, <a href="https://its.dot.gov/data/" target="_blank" rel="noopener noreferrer">ITS Datahub<img src="images/new_tab_icon.svg" alt="External link icon" width="12px" height="11px" class="external-link-icon inline"/></a> provides a single point of entry to discover U.S. DOT&#39;s publicly available, reusable, and open ITS research data, including connected vehicle data. A wide variety of datasets are available on ITS DataHub including: connected vehicle messages, automated vehicle data, trajectories, field test data and connected equipment data. ITS DataHub is an excellent location to search for highly documented transportation data to support the source code found on ITS CodeHub.</p>
                                <p class="faqs-question">What does &#34;open source&#34; mean?</p>
                                <p class="faqs-answer">Open source means the work is publicly accessible and can be used, modified, and shared by anyone. Open source works are distributed under licenses that comply with the definition provided by the Open Source Initiative. For additional information, please also see the Open License Guide (Link to Open License Guide).</p>
                                <p class="faqs-question">Who can I contact for additional information?</p>
                                <p class="faqs-answer">For more information and any additional questions or concerns, please contact the ITS JPO Support Team at <a href="mailto:data.itsjpo@dot.gov">data.itsjpo@dot.gov</a>.</p>
                            </div>
                        </div>
                        <!-- TemplateEndEditable -->
                        <!-- End of page content -->
                </div>`
} )

Vue.component('additional-resources', {
    template:`<div id="pageContent" class="codehub additional-resources">

                        <div id="printReady">
                            <div class="h1wrapper_outer">
                                <div class="h1wrapper_inner">
                                    <h1 id="codehub-page-heading"><img
                                        style="width: 42px; height: auto; margin-right: 9px;"
                                        src="images/additional_resources_icon.svg" alt="Computer cursor shown on a laptop monitor."/>ITS CodeHub: Additional Resources</h1>
                                </div>
                            </div>
                            <div class="codehub-content">
                                <h2><a href="https://www.transportation.gov/sites/dot.gov/files/docs/mission/284471/policy-135127-enterprise-architecture-implementation-instruction-source-code-managementfinal.pdf" rel="noopener noreferrer" target="_blank">Departmental Source Code Management Memorandum<img src="images/new_tab_icon.svg" alt="External link icon" width="13px" height="12px" class="external-link-icon"/></a></h2>
                                <p>The U.S. DOT&#39;s Departmental Source Code Management Memorandum is issued under <a href="https://www.transportation.gov/sites/dot.gov/files/docs/Enterprise%20Architecture.pdf" rel="noopener noreferrer" target="_blank">U.S. DOT Order 1351.27, Enterprise Architecture Policy<img src="images/new_tab_icon.svg" alt="External link icon" width="12px" height="11px" class="external-link-icon inline"/></a> and addresses the requirements set out in the &#34;Federal Source Code Policy&#34; seeking to &#34;ensure that new custom-developed Federal source code be made broadly available for reuse across the Federal Government.&#34; The Memorandum applies to source code custom-developed for the U.S. DOT.</p>

                                <h2><a href="https://www.transportation.gov/sites/dot.gov/files/docs/Official%20DOT%20Public%20Access%20Plan%20ver%201.1.pdf" rel="noopener noreferrer" target="_blank">Plan to Increase Public Access to the Results of Federally-Funded Scientific Research Results Version 1.1<img src="images/new_tab_icon.svg" alt="External link icon" width="13px" height="12px" class="external-link-icon"/></a></h2>
                                <p>This Plan establishes objectives to ensure public access to publications and digital data sets arising from U.S. DOT-managed research and development programs.
                                </p>
                                
                                <h2><a href="https://www.transportation.gov/digitalstrategy/policyarchive/Policy-Program-and-Archive" rel="noopener noreferrer" target="_blank">Policy Program and Archive | US Department of Transportation<img src="images/new_tab_icon.svg" alt="External link icon" width="13px" height="12px" class="external-link-icon"/></a></h2>
                                <p>This page contains links to the U.S. DOT&#39;s Office of the Chief Information Officer Policy Program documents on matters involving information and technology.</p>
                                
                                <h2><a href="https://ntl.bts.gov/ntl" rel="noopener noreferrer" target="_blank">National Transportation Library<img src="images/new_tab_icon.svg" alt="External link icon" width="13px" height="12px" class="external-link-icon"/></a></h2>
                                <p>The U.S. DOT&#39;s National Transportation Library provides access to transportation-related research, reports, data, and reference services.</p>
                                
                                <h2><a href="https://www.its.dot.gov/data/" rel="noopener noreferrer" target="_blank">ITS DataHub<img src="images/new_tab_icon.svg" alt="External link icon" width="13px" height="12px" class="external-link-icon"/></a></h2>
                                <p>ITS DataHub provides a single point of entry to discover the U.S. DOT&#39;s publicly available ITS research data, including connected vehicle data.</p>

                                <h2><a href="https://www.its.dot.gov/resources/fastfacts.htm" rel="noopener noreferrer" target="_blank">ITS Fast Facts<img src="images/new_tab_icon.svg" alt="External link icon" width="13px" height="12px" class="external-link-icon"/></a></h2>
                                <p>ITS Fast Facts provides an overview of intelligent transportation systems (ITS), how the U.S. DOT has invested in ITS, and the benefits ITS offers.</p>

                                <h2><a href="https://www.its.dot.gov/pilots/" rel="noopener noreferrer" target="_blank">ITS JPO Connected Vehicle Pilot Deployment Program<img src="images/new_tab_icon.svg" alt="External link icon" width="13px" height="12px" class="external-link-icon"/></a></h2>
                                <p>The U.S. DOT&#39;s Intelligent Transportation Systems (ITS) Joint Program Office (JPO) launched the Connected Vehicle Pilot Deployment Program in September 2015. The program deploys, tests, and operationalizes cutting-edge mobile and roadside technologies enabling multiple connected vehicle applications. This site provides a detailed description of the program and its objectives, phases, and research progress.</p>

                                <h2><a href="documents/ITS_JPO_CodeHubs_Code_Quality_Best_Practices_Checklist.pdf" rel="noopener noreferrer" target="_blank">ITS JPO CodeHub's Code Quality Best Practices Checklist<img src="images/new_tab_icon.svg" alt="External link icon" width="13px" height="12px" class="external-link-icon" /></a></h2>
                                <p class="faqs-answer p_reduce-bottom-margin">The ITS JPO CodeHub's Code Quality Best Practices Checklist provides a reference point to ensure code being developed and submitted for publishing on the ITS CodeHub website is in accordance with federal and best open source coding practice standards.</p> 
                            </div>
                        </div>
                </div>`
} )

var myVue = new Vue({
    el: '#searchTerms',
});

// Function allows the nav bar to move with the page
$(document).ready(function () {
    $(window).scroll(function () {
        // fixed header is strange.  For now it is hard coded to adjust padding otherwise the text moves
        if ($(window).scrollTop() > 58) {
            $('.navigation-bar').addClass('navbar-fixed');
            $('.TitleText').attr('style', 'padding-top:130px');
        }
        if ($(window).scrollTop() < 58) {
            $('.navigation-bar').removeClass('navbar-fixed');
            $('.TitleText').attr('style', 'padding-top:40px');
        }
    });
});