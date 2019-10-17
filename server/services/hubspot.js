const request = require("request");

const GET_LINK = "https://candidate.hubteam.com/candidateTest/v3/problem/dataset?userKey=e98b1a67613a4d643ac5d0f62a13";

const POST_LINK = "https://candidate.hubteam.com/candidateTest/v3/problem/result?userKey=e98b1a67613a4d643ac5d0f62a13";

/**
 * Returns a formatted object with a maximum number of partners attending a two-day event at each country.
 */
function getPartnerEventInvitations() {
    request(GET_LINK,  (err, res, body) => {
        const partners = JSON.parse(body).partners;
        const countries = parsePartners(partners);
        request.post(POST_LINK, {json: {countries : countries}}, (err, httpResponse, body) => {
            console.log(httpResponse.statusCode)
        });
    });
}

function parsePartners(partners) {
    const countriesToPartners = marshallPartnersToCountries(partners);
    const countries = [];
    for (const [country, partners] of Object.entries(countriesToPartners)) {
        const datesToPartners = {};
        for (const partner of partners) { 
            const availableDates = partner.availableDates;
            for (let i = 0; i < availableDates.length; i++) {
                if (availableDates[i+1] != null) {
                    const dateOne = getDate(availableDates[i]);
                    const dateTwo = getDate(availableDates[i+1]);
                    if (isOneDayApart(dateOne, dateTwo)) {
                        const dateKey = availableDates[i] + "|" + availableDates[i+1];
                        const date = datesToPartners[dateKey];
                        if (!date) {
                            datesToPartners[dateKey] = [partner.email];
                        }
                        else {
                            datesToPartners[dateKey].push(partner.email);
                        }
                    }
                }
            }
        }
        let maxPartners = 0;
        let curMax = null;
        let leastStartDate = null;
        for (const [dateKey, attendees] of Object.entries(datesToPartners)) {
            const hubDate =  dateKey.split("|")[0];
            if (attendees.length > maxPartners || ((attendees.length == maxPartners) && isDateLessThanOtherDate(hubDate, leastStartDate))) {
                curMax = {
                    startDate: hubDate,
                    attendees: attendees
                }
                leastStartDate = hubDate;
                maxPartners = attendees.length;
            }
        }
        if (Object.keys(datesToPartners).length != 0) {
            countries.push({
            name: country,
            attendeeCount:  curMax.attendees.length,
            startDate: curMax.startDate,
            attendees: curMax.attendees,
            })
        }
        else {
            countries.push({
            name: country,
            attendeeCount:  0,
            startDate: null,
            attendees: [],
            });
        }
    }
    return countries;
}

function getDate(hubDate){
	const dateArr = hubDate.split("-");
	return new Date(`${dateArr[1]}/${dateArr[2]}/${dateArr[0]}`);
}

function isDateLessThanOtherDate(dt1, dt2) {
    if (dt2 == null)
        return true;
    return getDate(dt1).getTime() < getDate(dt2).getTime();
}

function isOneDayApart(dt1, dt2) {
    const days = Math.floor((Date.UTC(dt2.getFullYear(), dt2.getMonth(), dt2.getDate()) - Date.UTC(dt1.getFullYear(), dt1.getMonth(), dt1.getDate()) ) /(1000 * 60 * 60 * 24));
    return days == 1;
}

function marshallPartnersToCountries(partners) {
    const countries = {};
    for (const partner of partners) {
        const partners = countries[partner.country];
        if (!partners) {
            countries[partner.country] = [partner];
        }
        else {
            countries[partner.country].push(partner);
        }
    }
    return countries;
}

getPartnerEventInvitations();