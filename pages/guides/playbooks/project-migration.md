# Project Migration Playbook

As companies grow and evolve, projects often become siloed, with data scattered across multiple systems or initiatives. Bringing siloed data into a unified project enhances decision-making and ensures consistency and clarity across teams. Migrating data across projects is a critical process that can significantly impact the efficiency and success of your organization’s operations.

The effort needed for a project migration can vary based on your organization’s specific use case. Generally, more time and resources are required if your data governance practices have not been standardized over time. Key factors, such as the volume of data, the number of projects being migrated, the complexity of events and properties being tracked, your approach to identity management, the standardization of naming conventions, and the severity of the issues can all impact the timeline. By understanding your organization’s objectives and ultimate goals, you can better identify and prioritize which data is essential to transfer and where to focus your efforts.

This project migration playbook is designed to guide you through the complexities of merging and/or migrating project data, providing you with the strategies, best practices, and actionable steps needed to ensure a smooth and successful migration.

We will cover the following key areas:

- **Understanding the Scope:** Assess your data sources and define the objectives of your project migration.
- **Planning and Preparation:** Establish a clear plan, and identify which data is critical to your business.
- **Execution:** Follow our step-by-step guidance on effectively migrating and validating data.
- **Post-Migration Review:** Validate our checklist of best practices for ensuring data integrity, migrating saved entities, and addressing any issues that arise.

This guide will help you navigate the process, minimize risks, and streamline your data consolidation efforts, leading to more informed decision-making and better alignment across your organization.

# When project migrations may be needed
There are various reasons why you may want to complete a project migration. 

- Security and Data Access
    - You want to better govern data access in Mixpanel. Consolidating data into one Mixpanel project and leveraging our features such as data views and data classification can ensure that only users with the correct permissions can view certain data.
- Identity Management
    - Addressing identity management issues and resolving problems related to defining unique users across projects.
- Group Analytics
    - You have existing project data that does not contain the group key data that you need in order to run your analysis. You  need to backfill group key data on historical event data.
- Messy data
    - Your organization has been relying on a legacy project for quite some time, but the data has become increasingly difficult to use. You’re looking to create a streamlined, more efficient version of the project while ensuring you can retain the valuable data that is still actively utilized by your organization.
- Consolidating siloed data
    - You have data in multiple Mixpanel projects based on product, platform, or location, but would like to consolidate the data to ensure analysis can be done cross-product, cross-platform, or cross-location.
 
# Establish Scope & Key Stakeholders
To better understand the goals of investing in a project migration, it’s best to define the scope and objectives upfront with key stakeholders.

**1. Define the Project Scope**

- **Objectives and Goals:**
    - **Clearly state the objectives** of the migration. What are you aiming to achieve? This could include consolidating data in one place, improving data governance, etc.
    - **Identify what is in scope** for this migration. Do you want to bring all data from all projects into one or select a subset of data to retain?
- **Timeline and Milestones:**
    - **Create a high-level timeline** that outlines key phases of the migration, such as planning, execution, validation, and post-migration review. This will help keep the project on schedule.
        - **Best practice:** For larger migrations, the planning phase can become more complex. Using a phased approach to break down the data migration process, with multiple QA checkpoints along the way, helps identify and resolve issues early. This approach reduces the risk of discovering problems in later stages and minimizes the need to reimport quality improvements in subsequent phases.        

**2. Identify Key Stakeholders and Define Owners**

- **Identify key points of contact upfront**:
    - **Project Manager**: Point of contact responsible for developing a detailed project plan that includes scope, objectives, timelines, and resources. Engage with stakeholders to understand their requirements and expectations. Regularly communicate progress, risks, and issues to ensure everyone is aligned and informed.
    - **Key *Product* Stakeholders**: Point of contact responsible for documenting established KPIs and the product-specific requirements for the data migration. Ensure that the data migration aligns with the overall business goals and objectives of the team. Provide input and feedback on the migration plan and give final approval on data mapping and transformation to ensure that the product team can clearly understand and utilize the ingested data.
    - **Key *Data* Stakeholders**: Serve as the primary contact for defining data migration requirements, including what data needs to be migrated, how it should be transformed, and any specific constraints or needs in order to report on product’s established metrics. Ensure that the migration team has the necessary data access for each required tool. Assist in assessing and validating data quality, including identifying and resolving issues such as duplicates, inconsistencies, or errors.
    - **Executive Buy in**: Gaining strategic alignment is imperative to the success of this project. This point of contact is responsible for ensuring the data migration initiative aligns with broader business goals. Without it, there’s a risk the project could be deprioritized, leading to delays or incomplete execution.

**3. Document the Project Plan**

- **Feedback mechanisms**, such as having Project Managers create a shared project plan where stakeholders can stay informed about progress, decisions, and issues, can help generate greater visibility throughout the project migration process.

  [Example Data Migration Project Plan](https://docs.google.com/spreadsheets/d/1zSh2OuFuIejieZ7BGTDM6ovdIQ9nuq7DYgpgEeePoU0/edit?gid=0#gid=0)

# Steps
## Step 1: Create New Project
Go to your Mixpanel UI, select the project down-drop at the top left-hand corner of your window, and select “Create Project.”

In your Organization settings navigate to the “Identity Merge” tab. There will be a “New projects in this organization will default to” drop-down, ensure this is set to “Simplified API”.

![image](/simplified_api.png)

## Step 2: Data Audit
Conducting a thorough data audit is essential for a successful project migration. By systematically reviewing and assessing your data, you can ensure that only the most relevant and high-impact information is transferred. Follow these steps to audit your data effectively and streamline your migration process:

**Prioritize Current Uses Cases:**

- Your project Lexicon provides insight into the number of UI and API queries performed by end users over the past 30 days. Focus on consolidating a list of events and properties where the “30-day queries” count is greater than 0. Prioritize migrating only the data that is actively being queried or has a clear, measurable business impact.
- Build out a reverse spec that is inclusive of only the events/properties being utilized today. You can export your Lexicon data dictionary from the legacy projects as a starting point for the reverse spec. Be sure to note which events and properties will be retained for the new project as your metrics and business needs become formalized. 

**Understand Your Analytic Strategy:**

- If you haven’t done so already, consider running an [analytics strategy session](/guides/plan/framework) to develop a framework of KPIs and identify the events and properties that are needed to unlock this analysis.
- Using the reverse spec built above, denote the events and properties that enable the analysis of each KPI deemed important during your analytic strategy discussion. If none of the events and properties in the reverse spec can be used to report on a KPI that was surfaced in the analytics strategy, scope out events and properties that would be needed in the next sprint to achieve this analysis.
    - Conversely, if events and properties are included in the reverse spec but are not being used to measure any KPIs from your strategic discuss, determine if these events and properties are crucial to your analysis or if they can be removed from tracking.

**Assess Data Quality:**

- When merging multiple projects, review the event and property taxonomy across all projects to identify opportunities for consolidation during the ETL process. This can help reduce the number of events and properties being transferred to the new project, streamlining the dataset and improving overall efficiency. This includes data type conflicts, inconsistent naming conventions, duplicate/missing values, and identity management strategies. When comparing the data schemas of the projects being migrated, ensure that key event and property names align and that there are no conflicts in data types, structures, or naming conventions.

The output of these steps should serve as the scope and implementation plan that defines your new project schema.

**Outline Scope:**

- Once these key steps are complete you should have a clear & explicit set of events & properties in scope for this migration. As well as established requirements around how far back you expect the data to go, which user identifier will define uniqueness, and an established naming convention to avoid type conflicts moving forward.


  💡 **Best practices for scoping data:**
  - Only migrate events and properties that are being actively utilized to avoid cluttering your project data.
  - Mixpanel only retains data for up to five years. It is worth surveying your team to understand time intervals of the metrics most important to them as to not bring over years of data that may go unused.

## Step 3: Export Existing Data
Once you have determined how far back your data requirement is you can export this data via our [Raw Export API](https://developer.mixpanel.com/reference/raw-event-export) or, if your organization has our Data Pipelines add-on, you can leverage the data you already have in your data warehouse. We recommend exporting a raw pipeline, as opposed to a schematized pipeline, this will export events as JSON to a cloud storage bucket.

With the [raw data export API](https://developer.mixpanel.com/reference/raw-event-export) you can export all event data as the 'event' parameter is optional. See example request below:

```bash
curl --request GET \
     --url 'https://data.mixpanel.com/api/2.0/export?project_id=<YOUR_PROJECT_ID>&from_date=<FROM_DATE>&to_date=<TO_DATE>' \
     --header 'accept: text/plain' \
     --header 'authorization: Basic ' # set up service account auth
```

*Note:* 
- The API will allow for a maximum of 100 concurrent queries, 60 queries per hour, and 3 queries per second.
- If your original project was created prior to March 2023, time should be converted to UTC.

If you choose to export a subset of events to bring over to your new project, you can leverage the `event` or `where` parameters to query for the specific event data you’re looking to migrate.

## Step 4: Transform Data
Upload the exported event data to your storage object, the process here may vary depending on the data warehouse you use. Our [warehouse connector](/docs/tracking-methods/warehouse-connectors) supports integrations with BigQuery, Snowflake, Databricks, and Redshift.

Checklist before running transformations:

- [ ]  Compare the timezones from your existing projects to the new project to determine any [**timezone offsets**](/docs/orgs-and-projects/managing-projects#manage-timezones-for-projects) that are necessary
- [ ]  Understand if any transformations are required to uniquely [**identify**](/docs/tracking-methods/id-management) your users
- [ ]  Determine a To/From **Date**

Optionally:

- [ ]  Add a [group identifier](/docs/data-structure/group-analytics#group-by-a-custom-identifier) if you’re looking to backfill analysis on a group analytics key.
- [ ]  Add a super property to utilize [data views](/docs/data-governance/data-views-and-classification) to leverage access to a subset of data for a group of users within a single Mixpanel project.

Begin here and add in transformations and filters to support the table or view that will be leveraged to pull in data from your data warehouse. 

```sql
CREATE VIEW `project.dataset.view` AS
SELECT
    event_name,
    event_time,
    distinct_id,
    properties,
    mp_processing_time_ms, -- insert time
    -- Add in your transformations here
FROM `project.dataset.table`
WHERE condition; -- filter your view here
```

## Step 5: Import Data
Once your event table/view is formatted as expected, navigate to the new project you created in Step 1 in your project settings and connect your warehouse source to Mixpanel. Find your table/view in the drop-down settings and map your fields accordingly. 

**Setup**

Source: find your source

Dataset: find your dataset

Table/View: find your table/view 

**Map Columns**: `Default Event`

  Event Name: Select the ellipsis and choose `Map to Column` select `event_name` 
  
  Event Time: `event_time`
  
  User ID: `user_id` (this will serve as your canonical ID) 
  
  Device ID: `anonymous_id` (this will serve as your pre-authenticated ID)
  
  +Add Mapping Button: Select `JSON Properties` and select `properties`

**Sync Settings**

  Sync Mode: `Append` (if you’re actively sending data to Mixpanel otherwise you can select `One Time`)
  
  Insert Time: `mp_processing_time_ms`

If you are not leveraging our warehouse connectors offering, you can use our [import API](https://developer.mixpanel.com/reference/import-events) instead. Review the GCS batch import script below and modify it to suite your needs (i.e. If your project is stored in the EU adjust your API endpoints accordingly):

```python
import gzip
import json
import random
import time

from google.cloud import storage
import requests

SECRET = "" # located in project settings
BUCKET_NAME = "" # located in gcs cloud storage
EVENTS_PER_BATCH = 2000
BYTES_PER_BATCH = 2 * 1024 * 1024

def transform_to_event(line):
    """Convert a line of the file to a json string in Mixpanel's format."""
    event = json.loads(line)
    if event["event"] == "$identify":
        return None

    if "$user_id" in event["properties"]:
        event["properties"]["distinct_id"] = event["properties"]["$user_id"]

    return json.dumps(event)

def flush(batch):
    payload = gzip.compress("\n".join(batch).encode("utf-8"))
    tries = 0
    while True:
        resp = requests.post(
            "https://api.mixpanel.com/import",
            params={"strict": "1"},
            headers={
                "Content-Type": "application/x-ndjson",
                "Content-Encoding": "gzip",
                "User-Agent": "mixpanel-gcs"
            },
            auth=(SECRET, ""),
            data=payload,
        )
        if resp.status_code == 429 or resp.status_code >= 500:
            time.sleep(min(2 ** tries, 60) + random.randint(1, 5))
            tries += 1
            continue
        return resp

def main():
    gcs = storage.Client()
    bucket = gcs.get_bucket(BUCKET_NAME)

    for blob in bucket.list_blobs():
        # Skip files that do not end with 'export.json.gz'
        if not blob.name.endswith('export.json.gz'):
            continue

        error = None
        batch, batch_bytes = [], 0

        f = blob.open("rb")
        if blob.name.endswith(".gz") and blob.content_encoding != "gzip":
            f = gzip.open(f)

        for line in f:
            transformed_line = transform_to_event(line)

            if transformed_line is None:
                continue

            batch.append(transformed_line)
            batch_bytes += len(transformed_line)

            if len(batch) == EVENTS_PER_BATCH or batch_bytes >= BYTES_PER_BATCH:
                resp = flush(batch)
                batch, batch_bytes = [], 0

                if resp.status_code != 200:
                    error = resp.json()
                    break

        # Flush final batch
        if batch and not error:
            resp = flush(batch)
            if resp.status_code != 200:
                error = resp.json()

        f.close()
        print(
            json.dumps(
                {
                    "message": "Import complete for blob: {blob.name}",
                    "success": error is None,
                    "first_error": error,
                    "severity": "INFO",
                }
            )
        )

if __name__ == "__main__":
    main()
```

## (Optional) Step 6: Export Users

This step is optional if you would like to migrate historical user properties into your new project. 

If you have our [Data Pipelines add-on](/docs/data-pipelines) you can use the user table in your data warehouse.

If you do not have access to this user profile data outside of Mixpanel, you can utilize the python script below to export user profile data.

Run `pip install mixpanel-api` in your command line

```python
from mixpanel_api import Mixpanel

if __name__ == '__main__':

 api_secret = 'YOURAPISECRET'
 project_token = 'YOURPROJECT'

 m = Mixpanel(api_secret,token=project_token, pool_size=4, debug=True)

 selector = ''
 behaviors = ''
 parameters = {'selector': selector, 'behaviors': behaviors}
 m.export_people('people_export.csv',parameters,timezone_offset=-8,format='csv')
```

Update the above script with your project inputs. The API secret and project token can be located in your project settings. To find the selector and behavior inputs you can look at the XHR request on the Users page that contains the profiles you want to export. This is done by pressing CMD+option+J on Chrome for macOS and then selecting the Network tab.

## (Optional) Step 7: Transform Users
Using the imported user data in your data warehouse, you can build out logic in SQL to create a view to pull specific data in or import your table as is.

Example SQL logic to build out transformations to import as user profiles in Mixpanel:

```sql
CREATE VIEW `project.dataset.view` AS
SELECT
    distinct_id
    -- Add in your transformations here
FROM `project.dataset.table`
WHERE condition; -- filter your view here
```

It’s important to check that each project will be using the same values for distinct_id across projects to ensure you’re not updating the wrong user profile or creating duplicates.

## (Optional) Step 8: Import Users
Once your user table/view is formatted as expected navigate to your new project, head over to your project settings and connect your warehouse source to Mixpanel. Find your table/view in the drop-down settings and map your fields accordingly. 

If you have not purchased warehouse connectors, you can leverage our [Engage API](https://developer.mixpanel.com/reference/profile-set) instead. Here's some sample code to get you started, utilizing the `$set` operator to update user profiles:

```python
# Fill this out. You can get it from https://mixpanel.com/settings/project
PROJECT_TOKEN = ""
 
import json
import requests
 
 
def get_users_from_database():
    # Replace this with code that reads users from your database or CRM.
    # Note: $name and $email are optional, but useful properties that automatically populate certain parts of our UI when Mixpanel detects them.
    return [
        {"user_id": "123", "$name": "Alice", "$email": "alice@linear.app", "department": "engineering"},
        {"user_id": "456", "$name": "Bob", "$email": "bob@notion.so", "department": "product"},
        {"user_id": "789", "$name": "Carol", "$email": "carol@figma.com", "department": "design"}
    ]
 
def transform_to_mp_format(user):
    """Transform the above into Mixpanel's format"""
    # It's important to set this to the same distinct_id that you use when tracking events.
    # We recommend using the primary key of your users' table for this.
    distinct_id = user.pop("user_id")
 
    # Note: we set `$ip` to 0 here to tell Mixpanel not to look up the IP of this user.
    return {"$distinct_id": distinct_id, "$token": PROJECT_TOKEN, "$ip": "0", "$set": user}
 
 
users = get_users_from_database()
profiles = [transform_to_mp_format(u) for u in users]
 
# We recommend calling this API with batches of 200 user profiles to do this at scale.
resp = requests.post(
    "https://api.mixpanel.com/engage",
    params={"verbose": "2"},
    headers={"Content-Type": "application/json"},
    data=json.dumps(profiles)
)
 
print(resp.json())
```
## Step 9: Redirect Project Data

Update the project token for platforms actively sending data to Mixpanel today. If any ETL work was completed during the migration to consolidate events and properties or change unique identifiers, make sure your implementation incorporates these changes. This will ensure that all new data streaming into your project aligns with the migrated data.

## Step 10: Data Validation

**1. Post-Migration Data Quality Checks**

- **Count Verification:** After the migration, verify that the number of events (totals & uniques) in the migrated dataset matches the expected total. This can be easily verified using our Insights report. Any discrepancies should be investigated and resolved.
- **Data Consistency Check:** Ensure that the data is consistent across all events. For example, verify that all related properties have been correctly migrated and that no data types, or naming convention conflicts exist.
- **Unique Identifier Validation:** Check that all unique identifiers remain unique after the migration and that no duplicates have been introduced.

💡 **Note:** For projects created before 1 Jan 2023, Mixpanel converts event timestamps to your project timezone before writing the event to your Mixpanel data stores, meaning that event timestamps are stored based on the project timezone setting at the time of ingestion. 

**2. Stakeholder Review**

- **Collaborative Validation:** Involve key stakeholders, such as data owners, project managers, and end-users, in the validation process. Their insights can help identify potential issues that automated checks might miss. Ensure they can pull the KPIs they’ve identified as critical in the analytic strategy discussion. Document the KPI in a shared board and how you gained this insight for future reference.
    - Pro tip: Creating a reference guide at this step can serve as a helpful guide as you socialize the new project with end users getting up to speed at your organization.
- **Feedback Loop:** Create a feedback loop where stakeholders can report any issues or concerns after reviewing the migrated data. This feedback is essential for making final adjustments.
- **Obtain Sign-Off:** Before the migrated data is put into production, obtain formal sign-off from all relevant stakeholders to confirm that the data has been validated and meets the necessary standards.

## Step 11: Migrate Saved Entities

Saved entities, such as reports, boards, custom events, custom properties, cohorts, and lexicon metadata, are critical components that provide valuable insights and streamline workflows. During a project migration, it's essential to carefully migrate these entities to ensure continuity and maintain the integrity of your analyses.

**Steps for Migrating Saved Entities:**

1. **Inventory and Categorize Saved Entities:**
    - Begin by creating a comprehensive inventory of all saved entities in each project. Categorize them by type (i.e. boards, reports) and by their usage frequency and importance.
    - Identify any duplicate or obsolete entities that may not need to be migrated, streamlining the overall process.
2. **Map Saved Entities to the New Project Structure:**
    - Review how saved entities relate to the data model and taxonomy in the new project. Update or adjust entity configurations as needed to align with the new structure.
      - For example, if event names or properties have been consolidated during the ETL process, ensure that these changes are reflected in the saved entities.
3. **Migrate Entities in Phases:**
    - Consider migrating saved entities in phases, starting with the most critical and frequently used ones.
    - Engage key stakeholders to review and validate the migrated entities, as their input can help identify any issues that might have been missed.
4. **Update Documentation:**
    - Update any documentation related to the saved entities to reflect changes made during the migration. This includes updating success plans, reference guides, and any other resources that refer to these entities.
5. **Communicate with End Users:**
    - Notify end users of the migration and provide them with any necessary training or resources to understand changes in the saved entities.
    - Offer support channels for users who may encounter issues or have questions about the migrated entities.

💡 **Best Practices:**
- **Prioritize Key Entities:** Focus on migrating the most important and frequently used entities first to ensure critical business functions continue uninterrupted.
- **Collaborate with Stakeholders:** Involve key stakeholders throughout the migration process to ensure that their needs are met and that the migrated entities align with their expectations.
- **Boards & Reports**: Utilize [Move](/docs/boards/move-boards) to transfer saved boards and reports across the same region (i.e. US, EU data centers). Permissions are managed by group admins allowing Boards to be moved across Projects or Organizations, depending on your use case.
    - Move does not support the migration of custom events, custom properties, cohorts, and lexicon metadata. This would need to be done manually. Review these lists with stakeholders and decide if any of these saved entities would need to be recreated in the new project to set your end users up for success.
    - Lexicon metadata can be [retrieved](https://developer.mixpanel.com/reference/list-all-schemas-for-project) from existing projects and [recreated](https://developer.mixpanel.com/reference/upload-schemas-for-project) in the new project via our Lexicon Schemas API.

## Ongoing Optimization
As organizations grow and new use cases become available to become analyzed it presents an opportunity for data to drift from the governed processes we put in place throughout this playbook. Having a process in place for new teams to follow allows for your customer to scale cleanly. 

Leveraging our in-product data governance tools can help support ongoing structure throughout your customers projects. Implementing the use of “verified” metrics, events, and formulas helps end users identify trusted content across the organization. Once your trusted governance owner(s) verify content, a blue checkmark badge will be displayed in the query builder as well as within a dedicated category within the query builder to help users quickly filter to see only trusted content.

Having pinned and favorite boards for new users to jump into as they familiarize themselves with the data is a great place to start. We see the most success when companies have a trusted metrics board for each team or product that leverages this. These boards not only guide users in exploring new use cases but also ensure they leverage the correct events and properties to get the answers they need.

Our in-product data standards tooling empowers your organization to scale your data operations by acting on your data at scale through the a rule based system.

Today, you can define the following standards:

- All my events must be [X] case
- All my events must include a description
- All my events must include an owner

If Data Standards are violated, you can define actions to be automatically applied. As a result, you can ensure your data quality stays high, without needing to invest corresponding amounts of time enforcing manually. 

By enforcing continuous governance practices and leveraging our in-product tooling, you can proactively address potential inconsistencies and maintain alignment across your new and existing data in Mixpanel, fostering reliability and long-term data quality.
