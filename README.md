# ![AlgoSigner](media/algosigner-wallet-banner-3.png)

## MV3 Branch - (In Progress) 

This branch is dedicted to making changes for Google's swap with extensions to MV3. General information can be found at https://developer.chrome.com/docs/extensions/mv3/


## Changes
<u>manifest.json</u>
  - Updated "version" from 2 to 3
  - Changed "background" to use service worker instead of scripts and removed "persistent" as it is no longer allowed
  - Renamed "browser_action" to "action" as both page and browser are combined now
  - Modified "content_security_policy" to use a child object of "extension_pages" that requires a url instead of hash for any src
    - Both style src added as temporary workarounds
  - Expanded "web_accessible_resources" to be an array which allows the "AlgoSigner.min.js" on all URLs
  - Added "host_permissions" as all urls 
  
<u>crypto\src\secureStorageContext.ts</u>
  - Removed window prefix in multiple locations as window object is not available and crypto is given access directly
  
<u>ui\styles.scss</u>
  - Removed the import fonts via URL 
  - Added fonts as package imports
  
<u>ui\package.json</u>
  - Added fonts "@fontsource/open-sans" and "@fontsource/roboto" since they can't be accessed as before 
  
<u>ui\index.html</u>
  - Removed forbidden link to stylesheet 
  - Removed forbidden script injection
    - A permanent fix has not been addressed for this issue
  
<u>extension\src\background\messaging\internalMethods.ts</u>
  - Changed "extension.browser" calls to "extension.runtime" since this has moved to service worker
  
## Remaining Known Issues
<u>extension\src\background\messaging\internalMethods.ts (Not Complete)</u>
- Swap internal calls to indexer and algod to fetch
	- There is a partial example of this swap in the loadAccountAssetsDetails method
	- The locations that need changing have comments beginning "TODO MV3: Swap call to fetch"
- Validation of the session needs to occur for methods that use it
	- Reason: The service worker will stop if idle and lose the cache 
	- New method validateSession expected to check the session and callback when it is updated
	- There is a partial example that calls the validateSession in in the ImportAccount method

