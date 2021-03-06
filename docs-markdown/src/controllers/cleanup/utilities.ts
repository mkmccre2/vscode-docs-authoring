
/**
 * Checks if array has only one item. if so, then return that item.
 * @param content takes in string data as content and retuns
 * first item in array if the array only has one item in array.
 */
export function handleSingleItemArray(content: string | undefined) {
    if (content && Array.isArray(content) && content.length == 1) {
        return content[0];
    }
}

/**
 * Takes in data, metadata key, and value to replace,
 * does a find and replace of the matching metadata tag
 * @param data string data from parsed file
 * @param value value to replace regex match of metadata
 * @param variable metadata key as variable
 */
export function singleValueMetadata(data: any, variable: string) {
    const dashRegex = new RegExp(`${variable}:\\s+-\\s(["'\\sA-Za-z0-9\\-\\_]+)$`, "m");
    const bracketRegex = new RegExp(`${variable}:\\s+\\[(["'\\sA-Za-z0-9\\-\\_]+)\\]$`, "m");
    const dashMatches = dashRegex.exec(data);
    const bracketMatch = bracketRegex.exec(data);
    if (dashMatches) {
        return data.replace(dashRegex, `${variable}: ${dashMatches[1]}`);
    } else if (bracketMatch) {
        return data.replace(bracketRegex, `${variable}: ${bracketMatch[1]}`);
    } else {
        return data;
    }
}

/**
 * check if the data origin is the same as updated data
 * Write file if change occured. Calculate the percent complete
 * If the percentage complete has changed, report the value
 * And output percentage complete to output console.
 * @param index index of current loop used to get completed percentage
 * @param files list of files
 * @param percentComplete percentage complete for program
 */
export function showProgress(index: number | null, files: string[] | null, percentComplete: number, progress: any, message: string) {
    if (!files || !index) {
        return 100;
    }
    const currentCompletedPercent = Math.round(((index / files.length) * 100));
    if (percentComplete < currentCompletedPercent) {
        percentComplete = currentCompletedPercent;
        progress.report({ increment: percentComplete, message: `${message} ${percentComplete}%` });
    }
    return percentComplete;
}