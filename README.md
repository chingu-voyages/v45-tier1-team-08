# Voyage 45 - Project Fireball

## Table of Contents

- [Voyage 45 - Project Fireball](#voyage-45---project-fireball)
  - [Table of Contents](#table-of-contents)
  - [Overview](#overview)
  - [General Instructions](#general-instructions)
  - [Features](#features)
    - [Structure](#structure)
    - [Styling](#styling)
    - [Functionality](#functionality)
    - [Extras (TBD)](#extras-tbd)
  - [Acknowledgements](#acknowledgements)
  - [About Chingu](#about-chingu)

## Overview

[Meteorite strikes](https://rpubs.com/ag1712/1059267) occur when the orbit of a
meteorite travels close enough to the Earth to be captured by its gravity field.
The U.S. National Aeronautics & Space Administration
(NASA) maintains a dataset of all known (>45K) meteorite strikes and sponsors research
on these events.

![21st Century Meteorite Strikes](/Team_Docs/Team_info/21st_century_meteorite_strikes.png)

Our Voyage team will be using this data to create an app that will help
anyone interested in these events explore this data in novel ways. Our app will
summarize this data and will allow users to select subsets of it for more
detailed analysis.

This will provide us with an opportunity to build Web Development experience
dealing with large volumes of data, data analysis using statistics, and user
queries.

## General Instructions

Our team will use the requirements and specifications below, **_and_** define and
manage our project following the _Agile Methodology_ defined in the
[Voyage Handbook](https://chingucohorts.notion.site/Voyage-Guide-1e528dcbf1d241c9a93b4627f6f1c809).

Once we reach MVP, we will start implementing optional features. To add our unique spin,
we will present the website as a way to search for meteorites to use in crafting
jewelry or other artistic endeavors.

## Features

The following defines the minimum requirements and ideas for features we may
implement to enhance this app, if time permits.

#### Structure

- [ ] This is a purely front-end application. No backend is required.
- [ ] Useful links and resources:
  - [Meteorite Landings and Near Earth Objects](https://rpubs.com/ag1712/1059267)
  - [Public API](https://data.nasa.gov/resource/gh4g-9sfh.json)

#### Styling

- [ ] In general, you will find these [UI design principles](https://www.justinmind.com/ui-design/principles) helpful.
- [ ] Recommend using this resource for [clean CSS](https://www.devbridge.com/articles/implementing-clean-css-bem-method/)

#### Functionality

- User can see a landing page containing the following components:

  - [ ] Search fields allowing them to customize the detail data display
  - [ ] A scrollable detail data display containing the meteorite strike history based on the search criteria.
  - [ ] A summary metrics component.

- Search Component

  - [ ] User will be able to filter data in the search component by any of the following:
    - Name
    - Year of strike
    - Meteorite composition (`recclass`)
    - Mass range (e.g. low to high, inclusive)
  - [ ] A 'Clear' button that's part of the search component. When clicked this will clear any search criteria and reset the detail data display and summary metrics to use the entire data set.
  - [ ] A 'Search' button in the search component to perform the search based on the user input. When the search finishes the detailed data display should be updated with the filtered results of the search operation.

- Detail Data Display Component

  - [ ] Displays one row for each meteorite strike in the data set.
  - [ ] If no search criteria have been selected then the summary metrics will be for all meteorite strikes.

- Summary Metrics Component
  - [ ] Displays the following metrics for the data that has been selected:
    - Total number of strikes
    - Average mass
    - Histogram showing the number of strikes by year
    - Histogram showing the number of strikes by meteorite composition (`recclass`).
  - [ ] If no search criteria have been selected then the summary metrics will be for all meteorite strikes.

### Extras (TBD)

- Search Component
  - [ ] Allow search criteria to be saved across sessions and reselected from a dropdown
- Detail Data Display Component
  - [ ] Display a clickable button in the column heading to allow the user to sort in ascending or descending sequence based on that column.
  - [ ] Display a clickable button in the column heading to display a popup dialog with a definition of what data is contained in the column.
- Summary Metrics Component
  - [ ] In addition to the metrics for the selected data, also display these metrics for the entire data set. This should be suppressed if there are no search criteria so the display isn't duplicated.
    - Total number of strikes
    - Average mass
    - Histogram showing the number of strikes by year
    - Histogram showing the number of strikes by meteorite composition (`recclass`).
- General
  - [ ] Support dark/light mode
  - [ ] Allow the user options for customizing the font and font size

## Acknowledgements

Thanks to NASA and its partners for open-sourcing this data. You can find more
at [NASA Open Data Portal](https://data.nasa.gov/).

[Nick Grealy](https://stackoverflow.com/users/782034/nick-grealy) for his solution on sorting tables.

## About Chingu

If you aren’t yet a member of Chingu we invite you to join us. We help our
members transform what they’ve learned in courses & tutorials into the
practical experience employers need and want.
